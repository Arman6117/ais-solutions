// actions/admin/batches/get-batches-by-course.ts
"use server";

import { connectToDB } from "@/lib/db";
import { Batch } from "@/models/batch.model";

export const getBatchesByCourse = async (courseId: string) => {
  try {
    await connectToDB();
    const batches = await Batch.find({ courseId: courseId })
      .select("_id name")
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(batches)),
    };
  } catch (error) {
    console.error("Error fetching batches:", error);
    return { success: false, message: "Failed to fetch batches", data: [] };
  }
};
