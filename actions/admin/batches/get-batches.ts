"use server";

import { connectToDB } from "@/lib/db";
import { Batch } from "@/models/batch.model";

export const getBatchesForSelect = async () => {
  try {
    await connectToDB();

    // Fetch only _id and name, sorted by name
    const batches = await Batch.find({}, { _id: 1, name: 1 })
      .sort({ name: 1 })
      .lean<{_id:string,name:string}[]>();

    // Convert _id to string to pass to client components safely
    const formattedBatches = batches.map((batch) => ({
      id: batch._id.toString(),
      name: batch.name,
    }));

    return { success: true, data: formattedBatches };
  } catch (error) {
    console.error("Error fetching batches:", error);
    return { success: false, data: [] };
  }
};
