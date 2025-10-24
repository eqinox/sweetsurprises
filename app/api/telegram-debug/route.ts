import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("=== TELEGRAM WEBHOOK DEBUG ===");
    const body = await request.json();
    console.log("Full request body:", JSON.stringify(body, null, 2));
    
    if (body.message) {
      const message = body.message;
      const chatId = message.chat.id;
      const user = message.from;
      
      console.log("=== CHAT ID FOUND ===");
      console.log("Chat ID:", chatId);
      console.log("Username:", user.username);
      console.log("First Name:", user.first_name);
      console.log("Last Name:", user.last_name);
      console.log("Full Name:", `${user.first_name} ${user.last_name}`.trim());
      console.log("=============================");
      
      // Send the chat ID back to the user
      await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `Your Chat ID is: ${chatId}\n\nCopy this number and send it to the admin to receive notifications.`
          })
        }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
