"use client";

import { RegisterFormProvider } from "./register-context";

export default function RegisterClientFormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RegisterFormProvider>{children}</RegisterFormProvider>;
}
