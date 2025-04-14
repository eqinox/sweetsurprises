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

// Regex for E.164 phone number (e.g., +359888123456)
const phoneRegex = /^\+[1-9]\d{1,14}$/;

export const registerUserSchema = z
  .object({
    email: z.string().email("Невалиден Имейл"),
    name: z.string().min(2, "Името трябва да съдържа поне 2 символа"),
    password: passwordValidation,
    phone: z
      .string()
      .regex(
        phoneRegex,
        "Телефонът трябва да започва с '+' и да съдържа само цифри (напр. +359888123456)"
      ),
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        message: "Паролите не съвпадат",
        path: ["passwordConfirm"],
        code: "custom",
      });
    }
  });
