"use client";

import { FormProvider } from "./form-context";

export default function ClientFormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormProvider>{children}</FormProvider>;
}
