"use server";

import { connectToDB } from "@/lib/db";
import { Batch } from "@/models/batch.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
export const deleteBatchModule = async (batchId: string, moduleId: string) => {
  if (!batchId || !moduleId) {
    return { success: false, message: "Batch ID and Module ID are required" };
  }
  if (!isValidObjectId(batchId) && !isValidObjectId(moduleId)) {
    return { success: false, message: "Invalid Batch ID or Module ID" };
  }
  try {
    await connectToDB();
    await Batch.findByIdAndUpdate(new ObjectId(batchId), {
      $pull: { modules: { id: new ObjectId(moduleId) } },
    });
    return { success: true, message: "Module deleted successfully" };
  } catch (error) {
    console.error("Error deleting module:", error);
    return { success: false, message: "Failed to delete module" };
  }
};
