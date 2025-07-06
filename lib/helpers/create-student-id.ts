// lib/helpers/create-student-id.ts
import { Counter } from "@/models/counter.schema";
import { connectToDB } from "@/lib/db"; // Make sure this connects to MongoDB

export async function getNextStudentId(): Promise<string> {
  await connectToDB(); // 💡 Always ensure DB is connected

  const counter = await Counter.findByIdAndUpdate(
    { _id: "student" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return `AIS${counter.seq}`;
}
