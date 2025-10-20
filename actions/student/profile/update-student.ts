"use server";

import { Student } from "@/models/student.model";
import { revalidatePath } from "next/cache";
import { connectToDB } from "@/lib/db";

interface UpdateStudentParams {
  studentId: string;
  name: string;
  phone: string;
  profilePic?: string;
}

interface UpdateStudentResponse {
  success: boolean;
  message: string;
}

export async function updateStudent(
  params: UpdateStudentParams
): Promise<UpdateStudentResponse> {
  try {
    const { studentId, name, phone, profilePic } = params;

    // Validate required fields
    if (!studentId || !name || !phone) {
      return {
        success: false,
        message: "Missing required fields",
      };
    }

    // Connect to database
    await connectToDB();

    // Build update object
    const updateData: Record<string, string> = {
      name,
      phone,
    };

    // Only update profilePic if provided
    if (profilePic) {
      updateData.profilePic = profilePic;
    }

    // Update student in MongoDB
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedStudent) {
      return {
        success: false,
        message: "Student not found",
      };
    }

    // Revalidate the student profile page
    revalidatePath(`/student/${studentId}`);
    revalidatePath("/students");

    return {
      success: true,
      message: "Student updated successfully",
    };
  } catch (error) {
    console.error("Failed to update student:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update student",
    };
  }
}