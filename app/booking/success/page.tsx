"use server";
import { getReservationById } from "@/actions/reservation-actions";
import FireworkConfetti from "./canvas-confetti";

interface Props {
  searchParams: Promise<{ reservationId?: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { reservationId } = await searchParams;

  if (!reservationId) {
    return <p className="text-red-500">Невалиден линк за резервация.</p>;
  }

  const reservation = await getReservationById(reservationId);
  if (!reservation) {
    return <p className="text-red-500">Резервацията не е намерена.</p>;
  }

  return (
    <div>
      <FireworkConfetti>
        <div className="relative p-4 bg-pink-200 border border-pink-900 rounded-md max-w-md mx-auto mt-10">
          <h2 className="text-xl font-bold text-pink-900 mb-4">
            Успешна резервация
          </h2>
          <p>
            <strong>Име:</strong> {reservation.name}
          </p>
          <p>
            <strong>Имейл:</strong> {reservation.email}
          </p>
          <p>
            <strong>Телефон:</strong> {reservation.phone}
          </p>
          <p>
            <strong>Услуга:</strong> {reservation.service}
          </p>
          <p>
            <strong>Дата:</strong>{" "}
            {new Date(reservation.date).toLocaleDateString("bg-BG", {
              day: "numeric",
              month: "long", // shows month as full name: "март"
              year: "numeric",
            })}
          </p>
          <p>
            <strong>Час:</strong> {reservation.time}
          </p>
        </div>
      </FireworkConfetti>
    </div>
  );
}
