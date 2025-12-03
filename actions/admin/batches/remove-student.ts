"use server";

import { connectToDB } from "@/lib/db";
import { Student } from "@/models/student.model";
import { Batch } from "@/models/batch.model";
import { Course } from "@/models/course.model";
import { Module } from "@/models/module.model";

export async function removeStudentFromBatch(studentId: string, batchId: string) {
  try {
    await connectToDB();

    // 1. Remove Batch from Student's batches array
    await Student.findByIdAndUpdate(studentId, {
      $pull: { batches: batchId }
    });

    // 2. Remove Student from Batch's students array
    const batch = await Batch.findByIdAndUpdate(batchId, {
      $pull: { students: studentId }
    }, { new: true }); 

    if (batch) {
       const courseId = batch.courseId;

       // 3. Remove Course from Student's courses array (if stored there)
       if (courseId) {
         await Student.findByIdAndUpdate(studentId, {
            $pull: { courses: courseId }
         });

         // 4. Remove Student from Course's students array
         await Course.findByIdAndUpdate(courseId, {
            $pull: { students: studentId }
         });
       }

       // 5. Remove Student from Modules associated with this batch
       if (batch.modules && batch.modules.length > 0) {
          
          const moduleIds = batch.modules.map((m: any) => m.id || m._id);

          await Module.updateMany(
             { _id: { $in: moduleIds } },
             { $pull: { students: studentId } }
          );
       }
    }

    return { success: true, message: "Student removed from batch successfully" };
  } catch (error) {
    console.error("Error removing student:", error);
    return { success: false, message: "Failed to remove student" };
  }
}
