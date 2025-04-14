import { Form } from "@/components/ui/form";
import { bookingSchema } from "@/validation/bookingSchema";
import { z } from "zod";
import { useMultiStepForm } from "./form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BookingSteps from "../booking-steps";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Check } from "lucide-react";
import { createReservationAndSendMail } from "@/actions/reservation-actions";
import { useRouter } from "next/navigation";

type Step3Data = z.infer<typeof bookingSchema>;

const Step3 = ({ onBack }: { onBack: () => void }) => {
  const { formData, setFormData } = useMultiStepForm();
  const router = useRouter();

  const form = useForm<Step3Data>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      date: formData.date,
      service: formData.service,
      time: formData.time,
    },
  });

  const onSubmit = async (values: Step3Data) => {
    const response = await createReservationAndSendMail(values);
    console.log("resp", response);
    if (!response.error) {
      router.push(`/booking/success?reservationId=${response.reservation.id}`);
    }

    setFormData(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-pink-200/80 p-4 border-pink-200 border-2 rounded max-w-96"
      >
        <BookingSteps currentStep={3} />

        <Button
          variant="ghost"
          size="sm"
          className="p-0 m-0 mb-4 mt-2 flex items-center justify-center !pl-0 hover:cursor-pointer"
          onClick={() => onBack()}
        >
          <ArrowBigLeft /> Предишна стъпка
        </Button>
        <div className="bg-inherit rounded-xl p-4 shadow-md text-sm space-y-2 text-gray-800">
          <ul className="space-y-3 text-sm text-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-pink-600">
              Потвърди информацията си
            </h3>
            <li className="flex items-center gap-2">
              <Check className="bg-green-500 rounded" color="white" size={14} />
              <span>
                <strong>Име:</strong> {form.watch("name")}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="bg-green-500 rounded" color="white" size={14} />
              <span>
                <strong>Телефон:</strong> {form.watch("phone")}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="bg-green-500 rounded" color="white" size={14} />
              <span>
                <strong>Имейл:</strong> {form.watch("email")}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="bg-green-500 rounded" color="white" size={14} />
              <span>
                <strong>Услуга:</strong> {form.watch("service")}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="bg-green-500 rounded" color="white" size={14} />
              <span>
                <strong>Дата:</strong>{" "}
                {form.watch("date")?.toLocaleDateString()}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="bg-green-500 rounded" color="white" size={14} />
              <span>
                <strong>Час:</strong> {form.watch("time")}
              </span>
            </li>
          </ul>
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          Резервирай
        </Button>
      </form>
    </Form>
  );
};

export default Step3;
