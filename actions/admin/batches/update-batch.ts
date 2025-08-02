"use server";

import { connectToDB } from "@/lib/db";
import { BatchType, Mode } from "@/lib/types/types";
import { Batch } from "@/models/batch.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";

type UpdateBatchPayload = {
  batchId: string;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  groupLink?: string;
  status?: "Upcoming" | "Ongoing" | "Completed";
  mode?: Mode;
  type?: BatchType;
  instructor?: string;
};

export const updateBatchById = async (data: UpdateBatchPayload) => {
  try {
    await connectToDB();
    const {
      batchId,
      description,
      endDate,
      groupLink,
      instructor,
      mode,
      name,
      startDate,
      status,
      type,
    } = data;

    if (!batchId) {
      return { success: false, message: "No batch ID provided." };
    }

    if (!isValidObjectId(batchId)) {
      return { success: false, message: "Invalid batch ID." };
    }

    const batch = await Batch.findById(new ObjectId(batchId));
    if (!batch) {
      return { success: false, message: "Batch not found." };
    }

    // Only update the fields that are provided
    if (name !== undefined) batch.name = name;
    if (description !== undefined) batch.description = description;
    if (startDate !== undefined) batch.startDate = new Date(startDate);
    if (endDate !== undefined) batch.endDate = new Date(endDate);
    if (groupLink !== undefined) batch.groupLink = groupLink;
    if (status !== undefined) batch.status = status;
    if (mode !== undefined) batch.mode = mode;
    if (type !== undefined) batch.type = type;
    if (instructor !== undefined) batch.instructor = instructor;

    await batch.save();

    return { success: true, message: "Batch updated successfully." };
  } catch (error) {
    console.error("Error updating batch:", error);
    return { success: false, message: "Something went wrong." };
  }
};

