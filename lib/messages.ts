// lib/messages.ts
import { Reservation } from "@/types/reservation";

export const sendTelegramMessageViaApi = async (reservation: Reservation) => {
  try {
    const formattedDate = reservation.date.toLocaleDateString("bg-BG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const message = `📅 Нова резервация от ${reservation.name}\n📱 Телефон: ${reservation.phone}\n💅 Услуга: ${reservation.service}\n🕒 Час: ${reservation.time} на ${formattedDate}`;
    
    // Get all chat IDs from environment variable (comma-separated)
    const chatIds = process.env.TELEGRAM_CHAT_IDS?.split(',') || [];
    
    if (chatIds.length === 0) {
      console.log("No chat IDs found in TELEGRAM_CHAT_IDS environment variable");
      return;
    }

    console.log(`Sending message to ${chatIds.length} chat IDs:`, chatIds);

    // Send message to all chat IDs
    const sendPromises = chatIds.map(chatId => 
      fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId.trim(), // trim to remove any spaces
            text: message,
          }),
        }
      )
    );

    const responses = await Promise.all(sendPromises);
    
    responses.forEach((res, index) => {
      if (res.ok) {
        console.log(`✅ Message sent to chat ${chatIds[index].trim()}`);
      } else {
        console.log(`❌ Failed to send to chat ${chatIds[index].trim()}`);
      }
    });
    
  } catch (err) {
    console.error("Telegram send error:", err);
  }
};