"use client";

import { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  return (
    <div className="space-y-6">
      {step === 1 && <Step1 onNext={next} />}
      {step === 2 && <Step2 onNext={next} onBack={back} />}
      {step === 3 && <Step3 onBack={back} />}
    </div>
  );
}
