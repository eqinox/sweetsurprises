import { Reservation } from "@/types/reservation";

export const sendTelegramNotification = async (reservation: Reservation) => {
  const formattedDate = reservation.date.toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const message = `📅 Нова резервация от ${reservation.name}\n📱 Телефон: ${reservation.phone}\n💅 Услуга: ${reservation.service}\n🕒 Час: ${reservation.time} на ${formattedDate}`;

  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }),
    }
  );
};
