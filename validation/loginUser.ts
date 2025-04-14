import { z } from "zod";
import { passwordValidation } from "./registerUser";

export const loginUserSchema = z.object({
  email: z.string().email("Невалиден Имейл"),
  password: passwordValidation,
});
