"use client";
import { z } from "zod";
import { toast } from "sonner";
import { registerUser } from "@/actions/user-actions";
import { registerUserSchema } from "@/validation/registerUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RegisterStep1 from "./form/register-step1";
import RegisterStep2 from "./form/register-step2";
import { useRegisterMultiStepForm } from "./form/register-context";

const CredentialsSignUpForm = () => {
  const { resetForm } = useRegisterMultiStepForm();
  const [step, setStep] = useState(1);

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof registerUserSchema>) => {
    const response = await registerUser(data);

    if (!!response?.error) {
      toast.error("Неуспешна регистрация", {
        description: response.message,
      });
      setStep(1);
      resetForm();
      return;
    } else {
      toast.success("Успешна регистрация", {
        description: "Моля влезте в своя профил",
      });
      router.push("/sign-in");
      resetForm();
    }
  };

  return (
    <div>
      {step === 1 && <RegisterStep1 onNext={next} />}
      {step === 2 && <RegisterStep2 onSubmit={handleSubmit} onBack={back} />}
    </div>
  );
};

export default CredentialsSignUpForm;
