"use server";

import { connectToDB } from "@/lib/db";
import SalesPerson from "@/models/sales-person.model";
import { Student } from "@/models/student.model"; // Need student model to get dates

export async function getSalesEnrollmentsGraph() {
  try {
    await connectToDB();

    // Aggregate to get sales person name and their enrolled students' details
    const data = await SalesPerson.find({})
      .populate({
        path: "enrolledStudents",
        select: "createdAt courses batches", // Select fields to determine date
        model: Student,
      })
      .lean();

    const enrollments: any[] = [];

    data.forEach((person: any) => {
      if (person.enrolledStudents && Array.isArray(person.enrolledStudents)) {
        person.enrolledStudents.forEach((student: any) => {
          // Determine enrollment date:
          // 1. Try finding the earliest batch enrollment date
          // 2. Fallback to first approved course date
          // 3. Fallback to student creation date
          
          let date = student.createdAt; 
          
          if (student.batches && student.batches.length > 0) {
             // Sort batches by date and pick first
             const sorted = student.batches.sort((a: any, b: any) => new Date(a.enrolledAt).getTime() - new Date(b.enrolledAt).getTime());
             if (sorted[0]?.enrolledAt) date = sorted[0].enrolledAt;
          } 
          else if (student.courses && student.courses.length > 0) {
             const approved = student.courses.find((c:any) => c.isApproved && c.approvedAt);
             if (approved) date = approved.approvedAt;
          }

          enrollments.push({
            id: student._id.toString(),
            salesPerson: person.name,
            enrolledOn: new Date(date).toISOString(), // ISO format for frontend parsing
          });
        });
      }
    });

    return { success: true, data: enrollments };
  } catch (error) {
    console.error("Graph Data Error:", error);
    return { success: false, data: [] };
  }
}
