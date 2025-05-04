# Next.js App

**Website: [https://www.sweetsurprises.bg/]**

## Tech Stack

- **Framework** [Next.js](https://nextjs.org/)
- **Database**: [Cloud Firestore (Firebase NoSQL Database)](https://console.firebase.google.com/)
- **Authentication**: [Firebase auth]
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)

## Features

- Authentication with email/password
- Booking an appointment and notification for it
- Admin panel with the bookings

### Add environment variables

1. `FIREBASE_PRIVATE_KEY_ID`:
2. `FIREBASE_PRIVATE_KEY`:
3. `FIREBASE_CLIENT_EMAIL`:
4. `FIREBASE_CLIENT_ID`:
5. `ADMIN_EMAIL`: Email for user which will be admin and separete with "," for more admins

6. `RESEND_API_KEY`: Key from resend for connection with resend
7. `SENDER_EMAIL`: our email which will be the sender

8. `TELEGRAM_BOT_TOKEN`: bot token for telegram for sending notifications on every reservation
9. `TELEGRAM_CHAT_ID`: the id for the chat for this bot
