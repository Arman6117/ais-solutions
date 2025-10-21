"use server";

import { connectToDB } from "@/lib/db";
import { StudentData } from "@/lib/types/student";
import { Student } from "@/models/student.model";
import "@/models/batch.model";
import "@/models/course.model";
import "@/models/invoice.model";

export const getStudentProfile = async (
  studentId: string
): Promise<{ data: StudentData | null; message: string }> => {
  if (!studentId) {
    return { data: null, message: "No student id is provided" };
  }
  try {
    await connectToDB();
    const student = (await Student.findById(studentId)
      .populate([
        {
          path: "courses.courseId",
          select: "courseName studentsEnrolled courseLevel courseMode courseStartDate courseEndDate courseThumbnail",
        },
        {
          path: "batches.batchId",
          select: "name status modules.name ",
        },
        {
          path: "invoices",
          select: "courseDetails totalFees remainingFees amountPaid ",
        },
      ])
      .exec()) as StudentData;
      
    if (!student) {
      return { data: null, message: "No student found" };
    }

    
    return {
      data: JSON.parse(JSON.stringify(student)),
      message: "Student profile fetched successfully",
    };
  } catch (error) {
    console.log(error);
    return { data: null, message: "Something went wrong" };
  }
};


