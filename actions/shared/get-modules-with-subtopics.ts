"use server";

import { connectToDB } from "@/lib/db";
import { ModulesForSession } from "@/lib/types/sessions.type";
import { Module } from "@/models/module.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { ModuleFormat } from "module";
export const getModulesWithSubtopics = async (
  batchId: string
): Promise<{
  success: boolean;
  message: string;
  data: ModulesForSession[];
}> => {
  if (!batchId) {
    return { data: [], message: "Please select batch first", success: false };
  }
  if (!isValidObjectId(batchId)) {
    return { data: [], message: "Invalid batch id", success: false };
  }
  try {
    await connectToDB();
    const modules = (await Module.find({ batchId: new ObjectId(batchId) })
      .select("_id name chapters.name")
      .exec()) as ModulesForSession[];
    console.log(JSON.parse(JSON.stringify(modules)))
    return {
      data: JSON.parse(JSON.stringify(modules)),
      message: "Modules fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error)
    return {
        data: [],
        message: "Modules fetched successfully",
        success: true,
      };
  }
};
