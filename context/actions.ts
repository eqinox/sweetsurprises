"use server";

import { cookies } from "next/headers";

import { auth } from "@/firebase/server";

export const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("firebaseAuthToken");
  cookieStore.delete("firebaseAuthRefreshToken");
};

export const setToken = async ({
  token,
  // eslint-disable-next-line
  refreshToken,
}: {
  token: string;
  refreshToken: string;
}) => {
  try {
    const verifiedToken = await auth.verifyIdToken(token);
    if (!verifiedToken) {
      return;
    }

    const userRecord = await auth.getUser(verifiedToken.uid);
    const adminMails = process.env.ADMIN_EMAIL?.split(",");

    if (
      adminMails?.includes(userRecord.email!) &&
      !userRecord.customClaims?.admin
    ) {
      auth.setCustomUserClaims(verifiedToken.uid, {
        admin: true,
      });
    }

    const cookieStore = await cookies();
    cookieStore.set("firebaseAuthToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    cookieStore.set("firebaseAuthRefreshToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    console.log("error", error);
  }
};
