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
import { registerUserBaseSchema } from "@/validation/registerUser";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const step1Schema = registerUserBaseSchema.pick({
  email: true,
  password: true,
  passwordConfirm: true,
});
type Step1Data = z.infer<typeof step1Schema>;

export default function RegisterStep1({ onNext }: { onNext: () => void }) {
  const { formData, setFormData } = useRegisterMultiStepForm();

  const form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
    },
  });

  const onSubmit = (values: Step1Data) => {
    setFormData(values); // update context
    onNext(); // move to next step
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Парола</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Потвърди парола</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
