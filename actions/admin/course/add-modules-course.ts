"use server";

import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course.model";
import { Module } from "@/models/module.model";
import { isValidObjectId } from "mongoose";
import { revalidatePath } from "next/cache";

export const addModulesToCourse = async (
  moduleIds: string[],
  courseId: string
): Promise<{
  success: boolean;
  message: string;
}> => {
 

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

    // Verify that the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return { success: false, message: "Course not found." };
    }

    // Verify that all modules exist
    const modulesExist = await Module.countDocuments({
      _id: { $in: moduleIds },
    });
    if (modulesExist !== moduleIds.length) {
      return {
        success: false,
        message: "Some modules could not be found.",
      };
    }

    // Check which modules are already associated with this course
    const existingModules = await Module.find({
      _id: { $in: moduleIds },
      courseId: courseId,
    }).select("_id");

    const existingModuleIds = existingModules.map((m) => m._id.toString());
    const newModuleIds = moduleIds.filter(
      (id) => !existingModuleIds.includes(id)
    );

    if (newModuleIds.length === 0) {
      return {
        success: false,
        message: "All selected modules are already added to this course.",
      };
    }

    // Update the Course model - add modules to the course
    await Course.findByIdAndUpdate(
      courseId,
      {
        $addToSet: { modules: { $each: newModuleIds } },
      },
      { new: true }
    );

    // Update the Module model - add courseId to each module
    await Module.updateMany(
      { _id: { $in: newModuleIds } },
      {
        $addToSet: { courseId: courseId },
      }
    );

    // Revalidate cache
    revalidatePath(`/admin/courses/${courseId}`);
    revalidatePath("/admin/courses");

    return {
      success: true,
      message: `Successfully added ${newModuleIds.length} modules to the course!`,
    };
  } catch (error) {
    console.error("Error in addModulesToCourse:", error);
    return {
      success: false,
      message: `An unexpected error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};

// Optional: Helper function to remove modules from course
export const removeModulesFromCourse = async (
  moduleIds: string[],
  courseId: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  if (!moduleIds || moduleIds.length === 0 || !courseId) {
    return {
      success: false,
      message: "Module IDs or Course ID are missing.",
    };
  }

  if (!isValidObjectId(courseId)) {
    return { success: false, message: "Invalid Course ID." };
  }

  try {
    await connectToDB();

    // Remove modules from course
    await Course.findByIdAndUpdate(courseId, {
      $pull: { modules: { $in: moduleIds } },
    });

    // Remove courseId from modules
    await Module.updateMany(
      { _id: { $in: moduleIds } },
      {
        $pull: { courseId: courseId },
      }
    );

    // Revalidate cache
    revalidatePath(`/admin/courses/${courseId}`);
    revalidatePath("/admin/courses");

    return {
      success: true,
      message: "Modules removed successfully from course!",
    };
  } catch (error) {
    console.error("Error in removeModulesFromCourse:", error);
    return {
      success: false,
      message: `An unexpected error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};
