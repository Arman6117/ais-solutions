"use server";

import { auth } from "@/lib/auth"; // Use Server Auth
import { connectToDB } from "@/lib/db";
import Instructor from "@/models/instructor.model";
import { headers } from "next/headers"; // Required for server auth
import { ZodError, z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const loginInstructor = async (data: FormData) => {
  try {
    // 1. Connect to DB
    await connectToDB();

    // 2. Validate Input
    const rawData = Object.fromEntries(data.entries());
    const validatedData = loginSchema.parse(rawData);
    const { email, password } = validatedData;

    // 3. Domain Check: Verify they are actually an Instructor
    const existingInstructor = await Instructor.findOne({ email: email.toLowerCase() });
    if (!existingInstructor) {
      return { success: false, message: "Instructor not found. Please register first." };
    }

    // 4. Auth Check: Use Server-Side API
    // 'auth.api.signInEmail' throws an error if credentials are wrong
    await auth.api.signInEmail({
      body: {
        email: email.toLowerCase(),
        password: password,
      },
      headers: await headers(), // IMPORTANT: Passes cookies/headers correctly
    });

    return { success: true, message: "Login successful" };

  } catch (error: any) {
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path[0] as string;
        fieldErrors[path] = err.message;
      });
      return { success: false, error: fieldErrors };
    }

    // Handle Better-Auth Errors
    // If password is wrong, better-auth throws an APIError
    const message = error.body?.message || error.message || "Invalid email or password";
    
    return { success: false, message };
  }
};
