"use server";

import { auth } from "@/firebase/server";
import { registerUserSchema } from "@/validation/registerUser";

export const registerUser = async (data: {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
}) => {
  const validation = registerUserSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error occured",
    };
  }

  try {
    await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phone,
    });
  } catch (
    // eslint-disable-next-line
    e: any
  ) {
    return {
      error: true,
      message: e.message ?? "Could not register user",
    };
  }
};
