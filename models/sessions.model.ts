import { Schema, model, models } from "mongoose";

const sessionsSchema = new Schema({
  studentId: [{ type: String, required: true, ref: "Student" }],
  meetingName: { type: String, required: true },
  meetingLink:{type:String,required:true},
  module: { type: String, required: true },
  chapters: [{ type: String, required: true }],
  instructor: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  notes: { type: String,  },
  videoLink: { type: String, },
  batchId:{type:Schema.Types.ObjectId, ref:"Batch"}
});

sessionsSchema.index({batchId:1})

export const Sessions = models.Sessions || model("Sessions", sessionsSchema);
