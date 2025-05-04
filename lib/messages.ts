import { Reservation } from "@/types/reservation";

// lib/send-telegram.ts
export const sendTelegramMessageViaApi = async (reservation: Reservation) => {
  try {
    const formattedDate = reservation.date.toLocaleDateString("bg-BG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const message = `📅 Нова резервация от ${reservation.name}\n📱 Телефон: ${reservation.phone}\n💅 Услуга: ${reservation.service}\n🕒 Час: ${reservation.time} на ${formattedDate}`;
    const res = await fetch(
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

    const body = await res.text();
    console.log("Telegram API response:", res.status, body);
  } catch (err) {
    console.error("Telegram send error:", err);
  }
};
