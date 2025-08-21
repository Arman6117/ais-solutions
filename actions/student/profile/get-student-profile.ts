"use server";

import { connectToDB } from "@/lib/db";
import { StudentData } from "@/lib/types/student";
import { Invoice } from "@/models/invoice.model";
import { Student } from "@/models/student.model";

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
    const student = (await Student.findById(studentId).exec()) as StudentData;
    if (!student) {
      return { data: null, message: "No student found" };
    }
    const studentInvoice = (await Invoice.findOne({ studentId:studentId })
      .select("totalFees remainingFees amountPaid")
      .exec()) as FeeInfo;
    if (studentInvoice) {
      student.amountPaid = studentInvoice.amountPaid? studentInvoice.amountPaid : 0;
      student.totalFees = studentInvoice.totalFees? studentInvoice.totalFees : 0;
      student.remainingFee = studentInvoice.remainingFees?studentInvoice.remainingFees  : 0;
    }
    return { data: JSON.parse(JSON.stringify(student)) , message: "Student profile fetched successfully" };
  } catch (error) {
    console.log(error);
    return { data: null, message: "Something went wrong" };
  }
};
