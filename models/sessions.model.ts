import { Schema, model, models } from "mongoose";

const sessionsSchema = new Schema({
  studentId: [{ type: String, required: true, ref: "Student" }],
  courseName: { type: String, required: true },
  modules: [{ type: String, required: true }],
  chapters: [{ type: String, required: true }],
  instructor: { type: String },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  notes: { type: String, required: true },
  videoLink: { type: String, required: true },
});

export const Sessions = models.Sessions || model("Sessions", sessionsSchema);
