"use server";
import { connectToDB } from "@/lib/db";
import { parseZodError } from "@/lib/helpers/parse-zod-errors";
import { uploadToCloudinary } from "@/lib/helpers/upload-to-cloudinary";
import { Mode } from "@/lib/types/types";
import { courseSchema } from "@/lib/validations/course-schema";
import { Course } from "@/models/course.model";
import { Module } from "@/models/module.model";
import { ZodError } from "zod";
import mongoose from "mongoose";

type createCourseProps = {
  courseName: string;
  courseDescription: string;
  syllabusLink?: string;
  coursePrice: number;
  courseDiscount: number;
  courseOfferPrice: number;
  courseMode: Mode;
  courseThumbnail: File | null;
  courseStartDate: string | undefined;
  courseEndDate: string | undefined;
  modules?: string[];
};

export const createCourse = async (data: createCourseProps) => {
  try {
    await connectToDB();
    
    const uploadResult = await uploadToCloudinary(
      data.courseThumbnail as File,
      "course"
    );
    const uploadedThumbnailUrl = uploadResult?.url || "";
    
    const courseData = {
      ...data,
      courseThumbnail: uploadedThumbnailUrl,
    };
    
    const validated = courseSchema.parse(courseData);
    
    const courseDoc = {
      ...validated,
      batches: [],
      rating: 0,
      numberOfStudents: 0,
      courseStartDate: new Date(validated.courseStartDate),
      courseEndDate: new Date(validated.courseEndDate),
    };
    
    // Create the course first
    const createdCourse = await Course.create(courseDoc);
    console.log("Course created with modules:", validated.modules);
    
    // Handle multiple modules if provided
    if (validated.modules && validated.modules.length > 0) {
      // Validate that all module IDs are valid ObjectIds
      const validModuleIds = validated.modules.filter(moduleId => 
        mongoose.Types.ObjectId.isValid(moduleId)
      );
      
      if (validModuleIds.length !== validated.modules.length) {
        console.warn("Some module IDs are invalid:", {
          provided: validated.modules,
          valid: validModuleIds
        });
      }
      
      if (validModuleIds.length > 0) {
        // Check if modules exist before updating them
        const existingModules = await Module.find({ 
          _id: { $in: validModuleIds } 
        }).select('_id');
        
        const existingModuleIds = existingModules.map(module => module._id.toString());
        const nonExistentModules = validModuleIds.filter(id => 
          !existingModuleIds.includes(id)
        );
        
        if (nonExistentModules.length > 0) {
          console.warn("Some modules don't exist:", nonExistentModules);
        }
        
        if (existingModuleIds.length > 0) {
          // Update all existing modules to reference this course
          const updateResult = await Module.updateMany(
            { _id: { $in: existingModuleIds } },
            { 
              $addToSet: { 
                courseId: createdCourse._id
                // OR if your schema uses a single course field:
                // course: createdCourse._id
              } 
            }
          );
          
          console.log(`Updated ${updateResult.modifiedCount} modules with course ID`);
        }
      }
    }
    
    return { 
      success: true, 
      message: `Course created successfully${validated.modules?.length ? ` with ${validated.modules.length} modules` : ''}`,
    
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, errors: parseZodError(error) };
    }
    
    console.error("Course creation failed:", error);
    return { success: false, message: "Something went wrong" };
  }
};