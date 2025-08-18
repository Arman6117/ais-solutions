"use server";

import { connectToDB } from "@/lib/db";
import { Session } from "@/lib/types/types";
import { Sessions } from "@/models/sessions.model";

export const getAllSessions = async (): Promise<Session[]> => {
  try {
    await connectToDB();
    const sessions = (await Sessions.find({})
      .sort({ date: -1 })
      .exec()) as Session[];

    return JSON.parse(JSON.stringify(sessions));
  } catch (error) {
    console.log("Error fetching sessions:", error);
    return [];
  }
};
