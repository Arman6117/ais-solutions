"use server";

import * as bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL!;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!;

export const verifyAdminPassword = async (email: string, password: string) => {

  if (email !== ADMIN_EMAIL) {
    return { success: false, message: "Invalid email or password" };
  }

  try {

    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password" };
    }

    
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, 
      path: "/",
    });

    return { success: true, message: "Login successful" };
  } catch (err: any) {
    console.error("Admin login error:", err);
    return { success: false, message: "An error occurred during login" };
  }
};