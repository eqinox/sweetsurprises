import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface Props {
  currentStep: number;
}

const BookingSteps: React.FC<Props> = ({ currentStep }) => {
  const steps = [
    { value: 1, label: "Дата и час" },
    { value: 2, label: "Потребител" },
    { value: 3, label: "Финал" },
  ];

  return (
    <Breadcrumb className="mb-0">
      <BreadcrumbList>
        {steps.map((step, index) => (
          <React.Fragment key={step.value}>
            <BreadcrumbItem>
              {currentStep === step.value ? (
                <BreadcrumbPage>{step.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink className="hover:text-inherit">
                  {step.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== steps.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BookingSteps;
