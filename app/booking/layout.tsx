import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Форма за резервация",
  description: "Изберете услуга и дата",
};

import ClientFormWrapper from "./form/client-form-wrapper";
import Background from "./background";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientFormWrapper>
      <div className="relative w-full">
        <Background>{children}</Background>
      </div>
    </ClientFormWrapper>
  );
}
