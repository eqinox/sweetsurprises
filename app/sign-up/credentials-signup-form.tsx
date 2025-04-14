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

const CredentialsSignUpForm = () => {
  type FormValues = z.infer<typeof registerUserSchema>;
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
