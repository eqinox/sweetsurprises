"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/auth";
import { bookingSchema } from "@/validation/bookingSchema";
import { z } from "zod";
import { useMultiStepForm } from "./form-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookingSteps from "../booking-steps";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowBigLeft } from "lucide-react";

const step2Schema = bookingSchema.pick({
  email: true,
  name: true,
  phone: true,
});

type Step2Data = z.infer<typeof step2Schema>;

const Step2 = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const { formData, setFormData } = useMultiStepForm();
  const auth = useAuth();

  const form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
    },
  });

  const isAuthenticated = !!auth?.currentUser;

  // Set values from auth if user is authenticated
  useEffect(() => {
    if (isAuthenticated && auth.currentUser) {
      form.reset({
        email: auth.currentUser.email || "",
        name: auth.currentUser.displayName || "",
        phone: auth.currentUser.phoneNumber || "",
      });
    }
  }, [isAuthenticated, auth?.currentUser, formData.phone, form, auth]);

  const onSubmit = (values: Step2Data) => {
    setFormData(values);
    onNext();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-pink-200/80 p-4 border-pink-200 border-2 rounded max-w-96"
      >
        <BookingSteps currentStep={2} />

        <Button
          variant="ghost"
          size="sm"
          className="p-0 m-0 mb-4 mt-2 flex items-center justify-center !pl-0 hover:cursor-pointer"
          onClick={() => onBack()}
        >
          <ArrowBigLeft /> Предишна стъпка
        </Button>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Име</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имейл</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          Следваща стъпка
        </Button>

        {!isAuthenticated && (
          <div>
            Нямаш профил?{" "}
            <Link href={"/sign-up"} className="hover:underline">
              Регистрирай се
            </Link>
          </div>
        )}
      </form>
    </Form>
  );
};

export default Step2;
