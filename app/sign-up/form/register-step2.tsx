"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useRegisterMultiStepForm } from "./register-context";
import {
  registerUserBaseSchema,
  registerUserSchema,
} from "@/validation/registerUser";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRef } from "react";
import { ArrowBigLeft } from "lucide-react";

const step1Schema = registerUserBaseSchema.pick({
  name: true,
  phone: true,
});
type Step1Data = z.infer<typeof step1Schema>;

export default function RegisterStep2({
  onSubmit,
  onBack,
}: {
  onSubmit: (data: z.infer<typeof registerUserSchema>) => void;
  onBack: () => void;
}) {
  const { formData, setFormData } = useRegisterMultiStepForm();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: formData.name,
      phone: formData.phone,
    },
  });

  const handleSubmit = async (values: Step1Data) => {
    const object: z.infer<typeof registerUserSchema> = {
      name: values.name,
      phone: values.phone,
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
    };
    setFormData(values); // update context
    await onSubmit(object); // wait for the parent onSubmit to finish
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Телефон</FormLabel>
                <FormControl>
                  <div className="flex">
                    <span className="bg-gray-300 border border-r-0 border-input px-2 pt-2 rounded-l-md text-muted-foreground text-sm select-none">
                      +359
                    </span>
                    <Input
                      {...field}
                      ref={inputRef}
                      type="tel"
                      className="rounded-l-none"
                      value={(field.value || "").replace(/^\+?3590?/, "")} // Strip +359 and leading 0 from value
                      onChange={(e) => {
                        let raw = e.target.value;

                        // Remove non-digit characters
                        raw = raw.replace(/\D/g, "");

                        // Remove leading zero if present
                        if (raw.startsWith("0")) {
                          raw = raw.slice(1);
                        }

                        // Final value stored in form: +359 + user input
                        field.onChange(`+359${raw}`);
                      }}
                      onKeyDown={(e) => {
                        // Prevent backspacing into the +359 prefix
                        if (
                          e.key === "Backspace" &&
                          inputRef.current?.selectionStart === 0
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="submit" className="w-full cursor-pointer">
          {form.formState.isSubmitting ? "Регистриране..." : "Регистрация"}{" "}
        </Button>
        <div className="text-center">
          Вече имате профил? <Link href="/sign-in">Вход</Link>
        </div>
      </form>
    </Form>
  );
}
