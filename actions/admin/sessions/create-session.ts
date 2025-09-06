"use server";
import { connectToDB } from "@/lib/db";
import { parseZodError } from "@/lib/helpers/parse-zod-errors";
import { CreateSessionPayload } from "@/lib/types/sessions.type";
import { sessionSchema } from "@/lib/validations/sesssions.schema";
import { Sessions } from "@/models/sessions.model";
import { ZodError } from "zod";

export const createSession = async (data: CreateSessionPayload) => {
  try {
    await connectToDB();
    const validatedData = sessionSchema.parse(data);
    const sessionDoc = {
      ...validatedData,
      studentId: data.studentId || [],
      notes: [],
      videoLink: "",
    };
    await Sessions.create(sessionDoc);
    return { success: true, message: "Session created successfully" };
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error)
      return { success: false, message: parseZodError(error) };
    }
    console.log(error);
    return { success: false, message: "Error creating session" };
  }
};
