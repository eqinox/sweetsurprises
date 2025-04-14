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
import { useForm, ControllerRenderProps } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import { loginUserSchema } from "@/validation/loginUser";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

const CredentialsSignInForm = () => {
  type FormValues = z.infer<typeof loginUserSchema>;
  const auth = useAuth();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof loginUserSchema>) => {
    try {
      await auth?.loginWithEmail(data.email, data.password);
      toast.success("Успешен вход");
      router.refresh();
    } catch (
      // eslint-disable-next-line
      e: any
    ) {
      toast.error("Грешка", {
        description:
          e.code === "auth/invalid-credential"
            ? "Incorrect credential"
            : "An error occured",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({
            field,
          }: {
            field: ControllerRenderProps<FormValues, "email">;
          }) => (
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
          render={({
            field,
          }: {
            field: ControllerRenderProps<FormValues, "password">;
          }) => (
            <FormItem>
              <FormLabel>Парола</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          {form.formState.isSubmitting ? "Влизане..." : "Вход"}{" "}
        </Button>
        <div className="text-center">
          Нямате профил? <Link href="/sign-up">Регистрация</Link>
        </div>
      </form>
    </Form>
  );
};

export default CredentialsSignInForm;
