import { registerUserSchema } from "@/validation/registerUser";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

export type FormData = z.infer<typeof registerUserSchema>;

type FormContextType = {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useRegisterMultiStepForm = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useMultiStepForm must be used in provider");
  return context;
};

export const RegisterFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormDataState] = useState<FormData>({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phone: "",
  });

  const setFormData = (data: Partial<FormData>) => {
    setFormDataState((prev: Partial<FormData>) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormDataState({
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phone: "",
    });
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};
