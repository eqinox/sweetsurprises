import { Reservation } from "@/types/reservation";

export const sendTelegramNotification = async (reservation: Reservation) => {
  try {
    const formattedDate = reservation.date.toLocaleDateString("bg-BG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const message = `📅 Нова резервация от ${reservation.name}\n📱 Телефон: ${reservation.phone}\n💅 Услуга: ${reservation.service}\n🕒 Час: ${reservation.time} на ${formattedDate}`;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log("💬 Token:", token);
    console.log("💬 Chat ID:", chatId);

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const responseBody = await response.text();
    console.log("🛠 Telegram status:", response.status);
    console.log("🛠 Telegram response:", responseBody);

    if (!response.ok) {
      throw new Error(`Telegram API returned status ${response.status}`);
    }

    console.log("✅ Telegram message sent successfully");
  } catch (error) {
    console.error("❌ Failed to send Telegram notification:", error);
  }
};
