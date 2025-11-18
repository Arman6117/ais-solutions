"use server";

import { connectToDB } from "@/lib/db";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { PasswordResetToken } from "@/models/reset-password-model";
import { Student } from "@/models/student.model";

export const resetPassword = async (token: string, newPassword: string) => {
  if (!token || !newPassword) {
    return { success: false, message: "Token and password are required" };
  }

  if (newPassword.length < 8) {
    return { success: false, message: "Password must be at least 8 characters" };
  }

  try {
    await connectToDB();


    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");


    const resetToken = await PasswordResetToken.findOne({
      token: hashedToken,
      expiresAt: { $gt: new Date() },
      used: false,
    });

    if (!resetToken) {
      return { success: false, message: "Invalid or expired reset token" };
    }

    // Find user
    const user = await Student.findOne({ email: resetToken.email });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    resetToken.used = true;
    await resetToken.save();

    return { success: true, message: "Password reset successful" };
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return { success: false, message: "Something went wrong" };
  }
};
