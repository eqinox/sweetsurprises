"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerUser } from "@/actions/user-actions";
import { registerUserSchema } from "@/validation/registerUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const CredentialsSignUpForm = () => {
  type FormValues = z.infer<typeof registerUserSchema>;
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      name: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof registerUserSchema>) => {
    const response = await registerUser(data);

    if (!!response?.error) {
      toast.error("Неуспешна регистрация", {
        description: response.message,
      });
      return;
    }

    toast.success("Успешна регистрация", {
      description: "Моля влезте в своя профил",
    });
    router.push("/sign-in");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
};

export default CredentialsSignUpForm;
