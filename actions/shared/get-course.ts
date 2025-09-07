import { connectToDB } from "@/lib/db";
import { Courses } from "@/lib/types/course.type";
import { Course } from "@/models/course.model";

export const getCourses = async () => {
  try {
    await connectToDB();
    const coursesData = await Course.find({})
      .select("_id courseName")
      .exec();
    
    // Wrap in nested structure to match interface
    const courses = coursesData.map(course => ({
      courses: [{
        _id: `${course._id}`,
        courseName: course.courseName as string,
      }]
    }));
    console.log(JSON.parse(JSON.stringify(courses)));
    return JSON.parse(JSON.stringify(courses)) || [];
  } catch (err) {
    console.error("Failed to fetch courses", err);
    return [];
  }
};