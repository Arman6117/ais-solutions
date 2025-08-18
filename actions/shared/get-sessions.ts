"use server";

import { connectToDB } from "@/lib/db";
import { Session } from "@/lib/types/sessions.type";

import { Sessions } from "@/models/sessions.model";

export const getAllSessions = async (): Promise<{data:Session[] , message:string}> => {
  try {
    await connectToDB();
    const sessions = (await Sessions.find({})
      .sort({ date: -1 })
      .exec()) as Session[];

      if(!sessions || sessions.length === 0) {
        return {data:[] , message:"No sessions available"}
      }
    return{data: JSON.parse(JSON.stringify(sessions)), message:"Fetched successfully"}
  } catch (error) {
    console.log("Error fetching sessions:", error);
    return {data:[], message:"Failed to get sessions"};
  }
};
