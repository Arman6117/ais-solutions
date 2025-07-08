"use server";

import { connectToDB } from "@/lib/db";
import { Student } from "@/models/student.schema";

export const getAdminDashboardStats = async () => {
    await connectToDB()
  const totalStudents = await Student.countDocuments({});
 
  //TODO:Count batches modules activeBatches revenue pendingFees
  return { totalStudents };
};
