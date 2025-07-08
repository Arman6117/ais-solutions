"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL!;

export const verifyAdminOtp = async (otpInput: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_otp_token")?.value;

  if (!token) {
    return { success: false, message: "OTP expired or not found" };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { otp: string; email: string };

    if (decoded.email !== ADMIN_EMAIL) {
      return { success: false, message: "Invalid email" };
    }

    if (decoded.otp !== otpInput) {
      return { success: false, message: "Incorrect OTP" };
    }

    // ✅ Set a session cookie
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    // Clear the OTP token
    cookieStore.set("admin_otp_token", "", {
      maxAge: 0,
      path: "/",
    });

    return { success: true, message: "OTP verified successfully" };
  } catch (err: any) {
    return { success: false, message: "Invalid or expired OTP" };
  }
};
