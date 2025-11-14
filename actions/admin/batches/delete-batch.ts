"use server"
import { connectToDB } from "@/lib/db";
import { Batch } from "@/models/batch.model";
import { Course } from "@/models/course.model";
import { Module } from "@/models/module.model";
import { Student } from "@/models/student.model";
import { Notes } from "@/models/notes.model";
import { Sessions } from "@/models/sessions.model";
import { isValidObjectId } from "mongoose";

export const deleteBatch = async (batchId: string) => {
  try {
    await connectToDB();
    if (!batchId) {
      return { success: false, message: "No id is provided" };
    }
    if (!isValidObjectId(batchId)) {
      return { success: false, message: "Not valid batch id" };
    }

   
    await Course.updateMany(
      { batches: batchId },
      { $pull: { batches: batchId } }
    );

    await Module.updateMany(
      { batchId: batchId },
      { $pull: { batchId: batchId } }
    );

 
    await Notes.deleteMany({ batchId });


    await Sessions.deleteMany({ batchId });

    
    await Student.updateMany(
      { "batches.batchId": batchId },
      { $pull: { batches: { batchId: batchId } } }
    );

 
    const deletedBatch = await Batch.findByIdAndDelete(batchId);

    if (!deletedBatch) {
      return { success: false, message: "No batch found to delete" };
    }

    return { success: true, message: "Batch and all references deleted successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};
