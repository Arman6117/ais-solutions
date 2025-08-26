"use server";

import { connectToDB } from "@/lib/db";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { Batch } from "@/models/batch.model";

export type BatchesIdsNames = {
  _id: string;
  name: string;
};

export const getBatchesIds = async (
  courseId: string
): Promise<{ success: boolean; message: string; data: BatchesIdsNames[] }> => {
  if (!courseId) {
    return { success: false, message: "No course id provided", data: [] };
  }
  if (!isValidObjectId(courseId)) {
    return { success: false, message: "Invalid course id", data: [] };
  }

  try {
    await connectToDB();
    const batches = (await Batch.find({
      courseId: new ObjectId(courseId),
    })
      .select("_id name")
      .exec()) as BatchesIdsNames[];

    return {
      success: true,
      message: "Fetched batches",
      data: JSON.parse(JSON.stringify(batches)),
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      message: "Something went wrong",
      success: false,
    };
  }
};
