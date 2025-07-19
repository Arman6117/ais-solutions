"use server";

import { connectToDB } from "@/lib/db";
import { parseZodError } from "@/lib/helpers/parse-zod-errors";
import { uploadToCloudinary } from "@/lib/helpers/upload-to-cloudinary";
import { Mode, prCourse } from "@/lib/types";
import { courseSchema } from "@/lib/validations/course-schema";
import { Course } from "@/models/course.model";
import { ZodError } from "zod";

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
      rating:0,
      // comments: [], // Initialize with an empty array
      numberOfStudents:0,
      courseStartDate: new Date(validated.courseStartDate),
      courseEndDate: new Date(validated.courseEndDate),
    };
    await Course.create(courseDoc);

    return { success: true, message: "Course created" };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, errors: parseZodError(error) };
    }

    console.error("Course creation failed:", error);
    return { success: false, message: "Something went wrong" };
  }
};
