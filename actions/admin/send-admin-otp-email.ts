"use server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

import { cookies } from "next/headers";
import { AdminOTPEmail } from "@/components/email-templates";
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL!;
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;
const resend = new Resend(process.env.RESEND_API_KEY!);
console.group("Resend Config");
console.log(
  "Resend API Key:",
  process.env.RESEND_API_KEY ? "Loaded" : "Not Loaded"
);
console.log("Admin Email:", ADMIN_EMAIL ? ADMIN_EMAIL : "Not Set");
console.groupEnd();

export const sendAdminOTPEmail = async (email: string) => {
  if (email !== ADMIN_EMAIL) {
    return { success: false, message: "Unauthorized Email" };
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const token = jwt.sign({ otp, email }, JWT_SECRET, { expiresIn: "5m" });

  const cookieStore = await cookies();
  cookieStore.set("admin_otp_token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 300, // 5 minutes
    path: "/",
  });

 const mail= await resend.emails.send({
    from: "onboarding@resend.dev",
    to: 'armanp384@gmail.com',
    subject: "Test Email",
    text: "This is a test email",
  });
  
  console.log(mail);
  if (mail.error) {
    return { success: false, message: "Failed to send OTP" };
  }
  return { success: true, message: "OTP sent to email" };
};
