"use server";

import { sendBookingReceipt } from "@/email";
import { firestore } from "@/firebase/server";
import { sendTelegramNotification } from "@/lib/messages";
import { getErrorMessage } from "@/lib/utils";
import { Reservation, ReservationStatus } from "@/types/reservation";
import { bookingSchema } from "@/validation/bookingSchema";
import { Timestamp } from "firebase-admin/firestore";

export const createReservationAndSendMail = async (data: {
  email: string;
  name: string;
  service: string;
  date: Date;
  time: string;
  phone: string;
}): Promise<
  { error: false; reservation: Reservation } | { error: true; message: string }
> => {
  const validation = bookingSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message:
        validation.error.issues[0]?.message ??
        "Възникна грешка при резервацията.",
    };
  }

  const now = new Date();

  try {
    const ref = await firestore.collection("reservations").add({
      ...data,
      status: ReservationStatus.Pending,
      createdDate: now,
      updatedDate: now,
    });

    const reservation: Reservation = {
      id: ref.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      date: data.date,
      time: data.time,
      status: ReservationStatus.Pending,
    };

    sendBookingReceipt({ reservation: reservation });
    sendTelegramNotification(reservation);

    return { error: false, reservation };
  } catch (err) {
    console.error("Failed to create reservation", err);
    return {
      error: true,
      message: "Неуспешна резервация. Моля, опитайте отново.",
    };
  }
};

export const getReservationById = async (
  reservationId: string
): Promise<Reservation | null> => {
  if (!reservationId.length) return null;

  const doc = await firestore
    .collection("reservations")
    .doc(reservationId)
    .get();

  if (!doc.exists) return null;

  const data = doc.data();

  if (!data) return null;

  return {
    id: doc.id,
    name: data.name,
    email: data.email,
    service: data.service,
    phone: data.phone,
    time: data.time,
    status: data.status,
    date: (data.date as Timestamp)?.toDate?.() ?? null,
  };
};

export const getAllReservations = async (): Promise<Reservation[]> => {
  const snapshot = await firestore.collection("reservations").get();

  const reservations: Reservation[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    reservations.push({
      id: doc.id,
      name: data.name,
      email: data.email,
      service: data.service,
      phone: data.phone,
      time: data.time,
      status: data.status,
      date: (data.date as Timestamp)?.toDate?.() ?? null,
    });
  });

  return reservations;
};

export const approveReservation = async (reservationId: string) => {
  if (!reservationId) return;

  try {
    const doc = await firestore
      .collection("reservations")
      .doc(reservationId)
      .get();

    if (!doc.exists) {
      return { error: true, message: "Резервацията не е намерена." };
    }

    const data = doc.data() as Reservation;

    // ✅ Check if already approved
    if (data.status === 2) {
      return {
        error: true,
        message: "Резервацията вече е одобрена.",
      };
    }

    // ✅ Check if finalized and in the past
    const check = await checkIfReservationFinalized(reservationId);
    if (check.error) {
      return {
        error: true,
        message: check.message,
      };
    }

    await firestore
      .collection("reservations")
      .doc(reservationId)
      .update({ status: 2 }); // 2 = Approved

    return {
      error: false,
      message: `Резервацията ${reservationId} е одобрена.`,
    };
  } catch (error) {
    const message = getErrorMessage(error);
    return {
      error: true,
      message,
    };
  }
};

export const approveReservations = async (reservationIds: string[]) => {
  if (!reservationIds.length) {
    return { error: true, message: "No IDs provided." };
  }

  try {
    const docs = await Promise.all(
      reservationIds.map((id) =>
        firestore.collection("reservations").doc(id).get()
      )
    );

    // Check for:
    // - already approved (status === 2)
    // - finalized (status 2 or 3) AND date+time in the past
    const now = new Date();

    for (const doc of docs) {
      if (!doc.exists) continue;

      const data = doc.data() as Reservation;
      const status = data.status;
      const time = data.time as string;
      const rawDate = data.date;
      const date = rawDate instanceof Timestamp ? rawDate.toDate() : rawDate;

      if (!date || !time) {
        return {
          error: true,
          message: `Резервацията с ID ${doc.id} има невалидна дата или час.`,
        };
      }

      // If already approved
      if (status === 2) {
        return {
          error: true,
          message: `Резервацията с ID ${doc.id} вече е одобрена.`,
        };
      }

      // If status is 2 or 3 AND date+time is in the past → don't allow update
      if ([2, 3].includes(status)) {
        const [hours, minutes] = time.split(":").map(Number);
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        date.setMilliseconds(0);

        if (now > date) {
          return {
            error: true,
            message: `Резервацията с ID ${doc.id} не може да бъде променена, защото вече е в миналото.`,
          };
        }
      }
    }

    // ✅ All clear – batch approve
    const batch = firestore.batch();

    docs.forEach((doc) => {
      if (doc.exists) {
        const ref = firestore.collection("reservations").doc(doc.id);
        batch.update(ref, { status: 2 });
      }
    });

    await batch.commit();

    return {
      error: false,
      message: `Одобрени са ${reservationIds.length} резервации.`,
    };
  } catch (error) {
    const message = getErrorMessage(error);
    return {
      error: true,
      message,
    };
  }
};

export const cancelReservation = async (reservationId: string) => {
  if (!reservationId) return;

  try {
    const doc = await firestore
      .collection("reservations")
      .doc(reservationId)
      .get();

    if (!doc.exists) {
      return { error: true, message: "Резервацията не е намерена." };
    }

    const data = doc.data() as Reservation;
    const status = data.status;

    if (status === 3) {
      return {
        error: true,
        message: "Резервацията вече е отказана.",
      };
    }

    const time = data.time as string;
    const rawDate = data.date;
    const date = rawDate instanceof Timestamp ? rawDate.toDate() : rawDate;

    if (!date || !time) {
      return {
        error: true,
        message: "Липсва валидна дата или час.",
      };
    }

    const [hours, minutes] = time.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);

    if ([2, 3].includes(status) && new Date() > date) {
      return {
        error: true,
        message:
          "Веднъж променена резервацията не може да бъде отказана след изтичане на времето ѝ.",
      };
    }

    await firestore
      .collection("reservations")
      .doc(reservationId)
      .update({ status: 3 }); // 3 = Rejected / Canceled

    return {
      error: false,
      message: `Резервацията ${reservationId} е отказана.`,
    };
  } catch (error) {
    const message = getErrorMessage(error);
    return {
      error: true,
      message,
    };
  }
};

export const cancelReservations = async (reservationIds: string[]) => {
  if (!reservationIds.length)
    return { error: true, message: "No IDs provided." };

  try {
    const docs = await Promise.all(
      reservationIds.map((id) =>
        firestore.collection("reservations").doc(id).get()
      )
    );

    const now = new Date();

    for (const doc of docs) {
      if (!doc.exists) continue;

      const data = doc.data() as Reservation;
      const status = data.status;

      if (status === 3) {
        return {
          error: true,
          message: `Резервацията с ID ${doc.id} вече е отказана.`,
        };
      }

      const time = data.time as string;
      const rawDate = data.date;
      const date = rawDate instanceof Timestamp ? rawDate.toDate() : rawDate;

      if (!date || !time) {
        return {
          error: true,
          message: `Резервацията с ID ${doc.id} има невалидна дата или час.`,
        };
      }

      const [hours, minutes] = time.split(":").map(Number);
      date.setHours(hours, minutes, 0, 0);

      if ([2, 3].includes(status) && now > date) {
        return {
          error: true,
          message: `Резервацията с ID ${doc.id} не може да бъде променена, защото вече е в миналото.`,
        };
      }
    }

    // Proceed with cancellation
    const batch = firestore.batch();

    docs.forEach((doc) => {
      if (doc.exists) {
        const ref = firestore.collection("reservations").doc(doc.id);
        batch.update(ref, { status: 3 });
      }
    });

    await batch.commit();

    return {
      error: false,
      message: `Отказани са ${reservationIds.length} резервации.`,
    };
  } catch (error) {
    const message = getErrorMessage(error);
    return {
      error: true,
      message,
    };
  }
};

export const checkIfReservationFinalized = async (
  reservationId: string
): Promise<{ error: boolean; message?: string }> => {
  if (!reservationId) {
    return { error: true, message: "Невалиден ID на резервация." };
  }

  try {
    const doc = await firestore
      .collection("reservations")
      .doc(reservationId)
      .get();

    if (!doc.exists) {
      return { error: true, message: "Резервацията не е намерена." };
    }

    const data = doc.data() as Reservation;
    const status = data.status;

    // Ако статусът е различен от 2 или 3 — позволяваме промяна
    if (status !== 2 && status !== 3) {
      return { error: false };
    }

    const rawDate = data.date;

    const reservationDate: Date =
      rawDate instanceof Timestamp ? rawDate.toDate() : rawDate;

    const reservationTime: string = data.time ?? "00:00";

    if (!reservationDate || !reservationTime) {
      return {
        error: true,
        message: "Липсват дата или час на резервацията.",
      };
    }

    // Сглобяваме пълна дата + час
    const [hours, minutes] = reservationTime.split(":").map(Number);
    reservationDate.setHours(hours, minutes, 0, 0);

    const now = new Date();

    if (now > reservationDate) {
      return {
        error: true,
        message: "Минала резервация не може да бъде променяна",
      };
    }

    return { error: false };
  } catch (error) {
    return {
      error: true,
      message: getErrorMessage(error),
    };
  }
};

export const getReservationsByDate = async (
  date: Date,
  service?: string
): Promise<Reservation[]> => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  let queryRef = firestore
    .collection("reservations")
    .where("date", ">=", start)
    .where("date", "<=", end);

  if (service) {
    queryRef = queryRef.where("service", "==", service);
  }

  const snapshot = await queryRef.get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      email: data.email,
      service: data.service,
      phone: data.phone,
      time: data.time,
      status: data.status,
      date: (data.date as Timestamp)?.toDate?.() ?? null,
    };
  });
};
