"use server";

import { connectToDB } from "@/lib/db";
import { UpdateSessionPayload } from "@/lib/types/sessions.type";
import { Sessions } from "@/models/sessions.model";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { updateSessionSchema } from "@/lib/validations/sesssions.schema";
import { parseZodError } from "@/lib/helpers/parse-zod-errors";
import { ZodError } from "zod";
export const updateSession = async (
  sessionId: string,
  data: UpdateSessionPayload
) => {
  if (!sessionId) {
    return { success: false, message: "Session ID is required" };
  }
  if (!isValidObjectId(sessionId)) {
    return { success: false, message: "Invalid session ID" };
  }

  try {
    await connectToDB();
    const validatedData = updateSessionSchema.parse(data);
    const updateData = Object.fromEntries(
      Object.entries(validatedData).filter(([_, v]) => v != undefined)
    );

    await Sessions.findByIdAndUpdate(
      new ObjectId(sessionId),
      { $set: updateData },
      { new: true }
    );
    return { success: true, message: "Session updated successfully" };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, message: parseZodError(error) };
    }
    console.error("updateSession error:", error);
    return { success: false, message: "Something went wrong" };
  }
};
