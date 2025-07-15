'use server';

import { connectToDB } from "@/lib/db";
import { Module } from "@/models/module.model";

import { isValidObjectId, Types } from "mongoose";
import { revalidatePath } from "next/cache";

export const deleteModules = async (moduleIds: string | string[]) => {
  try {
    await connectToDB();


    const idsArray = Array.isArray(moduleIds) ? moduleIds : [moduleIds];

    const validIds = idsArray.filter((id) => isValidObjectId(id));
    if (validIds.length === 0) {
      return {
        success: false,
        message: "No valid module IDs provided",
      };
    }

    const objectIds = validIds.map((id) => new Types.ObjectId(id));

    const result = await Module.deleteMany({ _id: { $in: objectIds } });

    revalidatePath("/admin/modules");

    return {
      success: true,
      deletedCount: result.deletedCount,
      message: `${result.deletedCount} module(s) deleted successfully`,
    };
  } catch (error) {
    console.error("Error deleting module(s):", error);
    return {
      success: false,
      message: "Something went wrong while deleting module(s)",
    };
  }
};
