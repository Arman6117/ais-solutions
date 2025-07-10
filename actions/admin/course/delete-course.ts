'use server';

import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course.model";
import { isValidObjectId, Types } from "mongoose";
import { revalidatePath } from "next/cache";

export const deleteCourses = async (courseIds: string | string[]) => {
  try {
    await connectToDB();


    const idsArray = Array.isArray(courseIds) ? courseIds : [courseIds];

    const validIds = idsArray.filter((id) => isValidObjectId(id));
    if (validIds.length === 0) {
      return {
        success: false,
        message: "No valid course IDs provided",
      };
    }

    const objectIds = validIds.map((id) => new Types.ObjectId(id));

    const result = await Course.deleteMany({ _id: { $in: objectIds } });

    revalidatePath("/admin/courses");

    return {
      success: true,
      deletedCount: result.deletedCount,
      message: `${result.deletedCount} course(s) deleted successfully`,
    };
  } catch (error) {
    console.error("Error deleting course(s):", error);
    return {
      success: false,
      message: "Something went wrong while deleting course(s)",
    };
  }
};
