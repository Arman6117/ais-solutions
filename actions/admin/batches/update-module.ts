"use server";

import { ModuleEditData } from "@/components/modules-card";
import { connectToDB } from "@/lib/db";
import { Batch } from "@/models/batch.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
export const updateModuleForBatch = async (
  batchId: string,
  moduleId: string,
  updateData: ModuleEditData
): Promise<{ success: boolean; message: string }> => {
  if (!batchId && !moduleId) {
    return { message: "Module id or batch id missing", success: false };
  }
  if (!isValidObjectId(batchId) && !isValidObjectId(moduleId)) {
    return { success: false, message: "Invalid batch id or module id" };
  }

  try {
    await connectToDB();
    await Batch.findByIdAndUpdate(
      new ObjectId(batchId),
      {
        $set: {
          "modules.$[module].startDate": updateData.startDate,
          "modules.$[module].endDate": updateData.endDate,
          "modules.$[module].instructor": updateData.instructor,
          "modules.$[module].status": updateData.status,
        },
      },
      {
        arrayFilters: [{ "module.id": new ObjectId(moduleId) }],
        new: true,
        runValidators: true,
      }
    );
    return { success: true, message: "Module updated successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};
