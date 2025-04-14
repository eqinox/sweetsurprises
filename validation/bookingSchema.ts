import { z } from "zod";

export const bookingSchema = z.object({
  email: z.string().email("Невалиден Имейл"),
  name: z.string().min(2, "Името трябва да съдържа поне 2 символа"),
  service: z.string().nonempty("Моля изберете услуга"),
  date: z.date(),
  time: z.string().nonempty("Моля изберете час"),
  phone: z.string().nonempty("Моля въведете телефон"),
});
