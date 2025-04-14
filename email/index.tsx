import { Resend } from "resend";
import { SENDER_EMAIL, APP_NAME } from "@/lib/constants";
import ReservationConfirmationEmail from "./booking-receipt";
import { Reservation } from "@/types/reservation";

console.log("RESEND_API_KEY", process.env.RESEND_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendBookingReceipt = async ({
  reservation,
}: {
  reservation: Reservation;
}) => {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: reservation.email,
    subject: `Потвърждение на резервацията`,
    react: <ReservationConfirmationEmail reservation={reservation} />,
  });
};
