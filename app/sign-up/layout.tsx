import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Форма за регистрация",
};

import RegisterClientFormWrapper from "./form/client-form-wrapper";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RegisterClientFormWrapper>
      <div className="relative w-full">{children}</div>
    </RegisterClientFormWrapper>
  );
}
