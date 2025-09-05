"use server";

import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course.model"; // You'll need to have a Course model
import { Module } from "@/models/module.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { CourseModule } from "@/lib/types/course.type";

// Define a type for the populated module data for better type safety
type PopulatedModule = {
  _id: string;
  name: string;
  // ... other module properties
};

/**
 * Adds a list of modules to a specific course by reference.
 * @param moduleIds - An array of module IDs to add.
 * @param courseId - The ID of the course to update.
 * @returns An object with success status, a message, and the updated list of populated modules.
 */
export const addModulesToCourse = async (
  moduleIds: string[],
  courseId: string
): Promise<{
  success: boolean;
  message: string;
  data?: CourseModule[];
}> => {
  // 1. Validate Inputs
  if (!moduleIds || moduleIds.length === 0 || !courseId) {
    return {
      success: false,
      message: "Module IDs or Course ID are missing.",
    };
  }

  if (!isValidObjectId(courseId)) {
    return { success: false, message: "Invalid Course ID." };
  }
  if (moduleIds.some((id) => !isValidObjectId(id))) {
    return { success: false, message: "One or more Module IDs are invalid." };
  }

  try {
    await connectToDB();

    // 2. Verify that the course and modules exist
    const course = await Course.findById(courseId);
    if (!course) {
      return { success: false, message: "Course not found." };
    }

    const modulesExist = await Module.countDocuments({
      _id: { $in: moduleIds },
    });
    if (modulesExist !== moduleIds.length) {
      return {
        success: false,
        message: "Some modules could not be found.",
      };
    }

    const moduleObjectIds = moduleIds.map((id) => new ObjectId(id));

    // 3. Update the Course Document
    // Using $addToSet to add only unique module references to the array
    await Course.findByIdAndUpdate(
      courseId,
      {
        $addToSet: { modules: { $each: moduleObjectIds } },
      },
      { new: true } // `new: true` is not strictly needed here but is good practice
    );

    // 4. Fetch the updated course with populated modules to return to the client
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "modules",
        model: Module, // Explicitly specify the model for population
      })
      .lean(); // Use lean for a plain JS object, which is faster

    if (!updatedCourse) {
      throw new Error("Failed to fetch updated course data.");
    }

    // Optional: Revalidate the cache for pages that display this course
    revalidatePath(`/admin/courses/${courseId}`);
    revalidatePath("/admin/courses");


    return {
      success: true,
      message: "Modules added successfully!",
    //   data: updatedCourse.modules, // Return the populated modules array
    };
  } catch (error) {
    console.error("Error in addModulesToCourse:", error);
    return {
      success: false,
      message: `An unexpected error occurred: `,
    };
  }
};