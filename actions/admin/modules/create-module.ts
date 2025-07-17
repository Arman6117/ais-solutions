"use server";

import { connectToDB } from "@/lib/db";
import { parseZodError } from "@/lib/helpers/parse-zod-errors";
import { ChapterInput } from "@/lib/types";
import { CreateModuleSchema } from "@/lib/validations/module.schema";
import { Module } from "@/models/module.model";
import { ZodError } from "zod";

type ModuleData = {
  name: string;
  description: string;
  syllabusLink?: string;
  syllabusLabel?: string;
  price: number;
  discount: number;
  courseId?: string[];
  batchId?: string[];
  chapters: ChapterInput[];
};
export const createModule = async (data: ModuleData) => {
  try {
    
    await connectToDB();
    const validated = CreateModuleSchema.parse(data);

    const moduleDoc = {
      ...validated,
      courseId: [],
      batchId: [],
      rating: 0,
    };

    await Module.create(moduleDoc);
    return { success: true, message: "Module created successfully" };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, errors: parseZodError(error) };
    }

    console.error("Module creation failed:", error);
    return { success: false, message: "Something went wrong" };
  }
};
