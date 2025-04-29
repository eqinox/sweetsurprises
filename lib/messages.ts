import { Reservation } from "@/types/reservation";

export const sendTelegramNotification = async (reservation: Reservation) => {
  try {
    const formattedDate = reservation.date.toLocaleDateString("bg-BG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const message = `📅 Нова резервация от ${reservation.name}\n📱 Телефон: ${reservation.phone}\n💅 Услуга: ${reservation.service}\n🕒 Час: ${reservation.time} на ${formattedDate}`;

    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-telegram`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    }).catch((error) => {
      console.error("Failed to trigger Telegram notification:", error);
    });
  } catch (error) {
    console.error("Unexpected error in sendTelegramNotification:", error);
  }
};
