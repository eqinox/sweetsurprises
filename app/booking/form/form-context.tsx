import { bookingSchema } from "@/validation/bookingSchema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

export type FormData = z.infer<typeof bookingSchema>;

type FormContextType = {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useMultiStepForm = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useMultiStepForm must be used in provider");
  return context;
};

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormDataState] = useState<FormData>({
    name: "",
    email: "",
    service: "",
    date: new Date(),
    time: "",
    phone: "",
  });

  const setFormData = (data: Partial<FormData>) => {
    setFormDataState((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormDataState({
      name: "",
      email: "",
      service: "",
      date: new Date(),
      time: "",
      phone: "",
    });
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};
