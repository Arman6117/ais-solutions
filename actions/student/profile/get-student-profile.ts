"use server";

import { connectToDB } from "@/lib/db";
import { StudentData } from "@/lib/types/student-profile.type";
import { Invoice } from "@/models/invoice.model";
import { Student } from "@/models/student.model";
import "@/models/batch.model";
import "@/models/course.model";
import "@/models/invoice.model";

type FeeInfo = {
  totalFees: number;
  remainingFees: number;
  amountPaid: number;
};
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
          select: "courseName courseStartDate courseEndDate courseThumbnail",
        },
        {
          path: "batches.batchId",
          select: "name status",
        },
        {
          path: "invoices",
          select: "courseDetails  ",
        },
      ])
      .exec()) as StudentData;
      console.log(JSON.parse(JSON.stringify(student)))
    if (!student) {
      return { data: null, message: "No student found" };
    }
    const studentInvoice = (await Invoice.findOne({ studentId: studentId })
      .select("totalFees remainingFees amountPaid")
      .exec()) as FeeInfo;
    console.log(studentInvoice);
    return {
      data: JSON.parse(JSON.stringify(student)),
      message: "Student profile fetched successfully",
    };
  } catch (error) {
    console.log(error);
    return { data: null, message: "Something went wrong" };
  }
};
