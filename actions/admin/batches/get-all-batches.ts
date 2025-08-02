"use server";

import { connectToDB } from "@/lib/db";
import { BatchType } from "@/lib/types/types";
import { Batch } from "@/models/batch.model";
import { Course } from "@/models/course.model";

export const getAllBatches = async () => {
  try {
    await connectToDB();
    const courseIdName = await Course.find({}, "_id courseName");
    const formattedCourse = courseIdName.map((course) => {
      return {
        id: `${course._id}`,
        courseName: course.courseName as string,
      };
    });

    console.log(formattedCourse);
    const batches = await Batch.find({});
    //TODO:Fetch instructors and return them in data
    const coursesWithBatches = formattedCourse.map((course) => {
      const batch = batches
        .filter((batch) => `${batch.courseId}` === course.id)
        .map((batch) => {
          return {
            _id: `${batch._id}`,
            name: batch.name as string,
            startDate: batch.startDate as string,
            endDate: batch.endDate as string,
            status: batch.status as 'Upcoming' | 'Ongoing' | "Completed",
            type: batch.type as BatchType,
            instructor:"John Doe"
          };
        });

      return {
        id: course.id,
        courseName: course.courseName as string,
        batches: batch,
      };
    });

    return { success: true, data: coursesWithBatches };
  } catch (error) {
    console.log(error);
    return { success: false, data: [] };
  }
};
