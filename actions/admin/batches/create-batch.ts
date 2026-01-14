"use server";

import { connectToDB } from "@/lib/db";
import { parseZodError } from "@/lib/helpers/parse-zod-errors";
import { BatchType, Mode, Modules, prBatch } from "@/lib/types/types";
import { batchSchema } from "@/lib/validations/batch.schema";
import { Batch } from "@/models/batch.model";
import { Course } from "@/models/course.model";
import { Module } from "@/models/module.model";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

type CreateBatchProps = {
  name: string;
  description: string;
  courseId: string;
  startDate: string;
  endDate: string;
  groupLink: string;
  mode: Mode;
  type: BatchType;
  status: "Ongoing" | "Upcoming" | "Completed";
  modules: Modules[];
};
export const createBatch = async (data: CreateBatchProps) => {
  try {
    await connectToDB();
    const validatedData = batchSchema.parse(data);

    const batchDoc = {
      ...validatedData,
      courseId: new ObjectId(validatedData.courseId),
      modules: validatedData.modules.map((mod) => ({
        id: new ObjectId(mod._id),
        name: mod.name,
        numberOfStudent: 0,
        startDate: "",
        endDate: "",
        instructor: "",
        status: "Upcoming".trim(),
      })),
      instructors: [],
      meetings: [],
      notes: [],
      students: [],
    };

    const createdBatch = await Batch.create(batchDoc);

    await Promise.all(
      validatedData.modules.map(async (mod) => {
        await Module.findByIdAndUpdate(
          mod._id,
          { $addToSet: { batchId: createdBatch._id } },
          { new: true }
        );
      })
    );
    await Course.findByIdAndUpdate(
      new ObjectId(validatedData.courseId),
      { $addToSet: { batches: createdBatch._id } }, // Prevents duplicates
      { new: true, runValidators: true }
    );
    revalidatePath("/admin/all-batches");
    return { success: true, message: "Batch created successfully" };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, errors: parseZodError(error) };
    }
    console.log(error);
    return {
      success: false,
      message: "Something went wrong while creating batch",
    };
  }
};
