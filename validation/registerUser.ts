import { z } from "zod";

export const passwordValidation = z.string().refine(
  (value) => {
    const regex = /\d{6,}/;
    return regex.test(value);
  },
  {
    message: "Паролата трябва да съдържа поне 6 цифри",
  }
);

export const addPasswordMatchValidation = <T extends z.ZodTypeAny>(schema: T) =>
  schema.superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        message: "Паролите не съвпадат",
        path: ["passwordConfirm"],
      });
    }
  });

export const registerUserBaseSchema = z.object({
  email: z.string().email("Невалиден Имейл"),
  name: z.string().min(2, "Името трябва да съдържа поне 2 символа"),
  password: z.string().refine((val) => /\d{6,}/.test(val), {
    message: "Паролата трябва да съдържа поне 6 цифри",
  }),
  phone: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      "Телефонът трябва да започва с '+' и да съдържа само цифри"
    ),
  passwordConfirm: z.string(),
});

export const registerUserSchema = addPasswordMatchValidation(
  registerUserBaseSchema
);
