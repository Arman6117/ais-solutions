"use server";

import { auth } from "@/lib/auth"; // Import server-side auth instance
import { connectToDB } from "@/lib/db";
import Instructor from "@/models/instructor.model";
import { headers } from "next/headers"; // Required for server-side auth calls
import { ZodError, z } from "zod";

// Zod Schema for Instructor Registration
const instructorSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const registerInstructor = async (formData: FormData) => {
  try {
    // 1. Connect to Mongoose
    await connectToDB();

    // 2. Parse & Validate Form Data
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = instructorSchema.parse(rawData);
    const { email, name, password, phone } = validatedData;

    // 3. Domain Check: Check if Instructor already exists in Mongoose
    const existingInstructor = await Instructor.findOne({ email: email.toLowerCase() });
    if (existingInstructor) {
      return {
        success: false,
        message: "Instructor with this email already exists.",
      };
    }

    // 4. Auth Check: Create User in Better-Auth (Direct Server Call)
    // Using auth.api.signUpEmail bypasses the HTTP loop that causes timeouts
    const authResponse = await auth.api.signUpEmail({
      body: {
        email: email.toLowerCase(),
        password: password,
        name: name,
        // image: "", // Optional: Add profile pic logic later if needed
      },
      headers: await headers(), // Pass request headers context
    });

    // If authResponse is null/undefined, something failed silently or threw error caught below
    if (!authResponse) {
       return { success: false, message: "Failed to create authentication account." };
    }

    // 5. Success: Create Instructor Record in Mongoose
    await Instructor.create({
      email: email.toLowerCase(),
      name,
      phone,
      role: "instructor",
      batchId: [],
      sessionId: [],
    });

    return { success: true, message: "Instructor registered successfully" };

  } catch (error) {
    // Handle Zod Validation Errors
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path[0] as string;
        fieldErrors[path] = err.message;
      });
      return { success: false, error: fieldErrors };
    }

    // Handle Better-Auth API Errors (which are often thrown as APIError)
    if (error instanceof Error) {
       // Check if it's a known error message from Better Auth
       // e.g. "User already exists" (though we checked Mongoose, Prisma might still exist)
       return { success: false, message: error.message };
    }

    console.error("Register Instructor Error:", error);
    return { success: false, message: "Something went wrong." };
  }
};
