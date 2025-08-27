"use server";

import { connectToDB } from "@/lib/db";
import { Batch } from "@/models/batch.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { Module } from "@/models/module.model";
export const addModules = async (
  ids: string[],
  batchId: string
): Promise<{ success: boolean; message: string }> => {
  if (!ids || ids.length === 0 || !batchId) {
    return { success: false, message: "Module ids or Batch id are missing" };
  }

  // validate ids
  if (!isValidObjectId(batchId)) {
    return { success: false, message: "Invalid batch id" };
  }
  if (ids.some((id) => !isValidObjectId(id))) {
    return { success: false, message: "Invalid module id(s)" };
  }
  try {
    await connectToDB();
    const modulesToAdd = await Module.find({
      _id: { $in: ids.map((id) => new ObjectId(id)) },
    }).lean();
    if (!modulesToAdd.length) {
      return { success: false, message: "No valid modules found" };
    }
    const formattedModules = modulesToAdd.map((mod) => ({
      id: mod._id as string,
      name: mod.name as string,
      startDate: "",
      endDate: "",
      instructor: [] as string[],
      status: "Upcoming",
      numberOfStudent: 0,
    }));
    await Batch.findByIdAndUpdate(
      new ObjectId(batchId),
      {
        $addToSet: { modules: { $each: formattedModules } },
      },
      { new: true }
    );

    return { success: true, message: "Modules added successfully" };
  } catch (error: any) {
    console.error("Error in addModules:", error);
    return { success: false, message: "Failed to add modules" };
  }
};
