"use server";

import { connectToDB } from "@/lib/db";
import { Student } from "@/models/student.model";
import "@/models/module.model";

export const getStudentModules = async (
  studentId: string
): Promise<{ data: string[]; message: string; success: boolean }> => {
  if (!studentId) {
    return { 
      data: [], 
      message: "StudentId is required", 
      success: false 
    };
  }

  try {
    await connectToDB();
    
    const student = await Student.findById(studentId)
      .select("courses.moduleId")
      .populate({ 
        path: "courses.moduleId", 
        select: "name" 
      })
      .exec();

    if (!student) {
      return {
        data: [],
        message: "Student not found",
        success: false
      };
    }

    // Extract module names from the nested structure
    const moduleNames: string[] = [];
    
    interface Module {
      name: string;
    }

    interface Course {
      moduleId: Module[];
    }

    interface StudentWithCourses {
      courses: Course[];
    }

        student.courses?.forEach((course: Course) => {
          if (course.moduleId && Array.isArray(course.moduleId)) {
            course.moduleId.forEach((module: Module) => {
              if (module && typeof module === 'object' && 'name' in module && module.name) {
                if (!moduleNames.includes(module.name as string)) {
                  moduleNames.push(module.name as string);
                }
              }
            });
          }
        });

    return {
      data: moduleNames,
      message: "Module names fetched successfully",
      success: true
    };

  } catch (error) {
    console.error("Error fetching student modules:", error);
    return {
      data: [],
      message: "Something went wrong while fetching modules",
      success: false
    };
  }
};