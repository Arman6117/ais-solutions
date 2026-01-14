"use server";

import * as bcrypt from "bcryptjs";

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!;

export const verifyAdminPasswordForDeletion = async (password: string) => {
  try {
    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isPasswordValid) {
      return { success: false, message: "Invalid password" };
    }

    return { success: true, message: "Password verified" };
  } catch (err: any) {
    console.error("Verification error:", err);
    return { success: false, message: "An error occurred during verification" };
  }
};
