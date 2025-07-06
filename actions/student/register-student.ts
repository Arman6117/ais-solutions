"use server";

import { authClient } from "@/lib/auth-client";
import { connectToDB } from "@/lib/db";
import { getNextStudentId } from "@/lib/helpers/create-student-id";
import { parseStudentForm } from "@/lib/helpers/parse-student-registration";
import { uploadToCloudinary } from "@/lib/helpers/upload-to-cloudinary";
import { Student } from "@/models/student.schema";
import { ZodError } from "zod";

export const registerStudent = async (formData: FormData) => {
  try {
    const validatedData = await parseStudentForm(formData);
    const { email, gender, name, password, phone, profilePic, referralCode } =
      validatedData;

    const profileUrl =
      profilePic instanceof File && profilePic.size > 0
        ? await uploadToCloudinary(validatedData.profilePic as File)
        : null;

    const auth = await authClient.signUp.email({
      email: email,
      password: password,
      name: name,
      image: profileUrl?.url || "",
    });

    if (auth.error) {
      return { success: false, message: auth.error.message };
    }
    await connectToDB();
    const studentId = await getNextStudentId();
    await Student.create({
      _id: studentId,
      email,
      phone,
      gender,
      profilePic: profileUrl?.url || "",
      name,
      referralCode,
      role: "student",
      course: [],
      batches: [],
      invoices: [],
    });
    return { success: true, message: "Successfully registered" };
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path[0] as string;
        fieldErrors[path] = err.message;
      });

      return { success: false, error: fieldErrors };
    }
    console.log(error);
    return { success: false, message: "Something went wrong." };
  }
};
