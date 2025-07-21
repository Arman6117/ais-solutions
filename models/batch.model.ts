import mongoose, { Schema, model, models } from "mongoose";

const moduleSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, required: true, ref: "Module" },
    name: { type: String, required: true },
    startDate: { type: String},
    endDate: { type: String },
    instructor: { type: String},
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      required: true,
    },
    numberOfStudent: { type: Number, required: true },
  },
  { _id: false }
);

const batchSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    groupLink: { type: String, required: true },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      required: true,
    },
    mode: {
      type: String,
      enum: ["offline", "hybrid", "online"],
      required: true,
    },
    type: {
      type: String,
      enum: ["weekdays", "weekend"],
      required: true,
    },
    instructors: [{ type: Schema.Types.ObjectId, ref: "Instructors" }],
    meetings: [{ type: Schema.Types.ObjectId, ref: "Meetings" }],
    modules: { type: [moduleSchema] },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true, index: true },

    notes: [{ type: Schema.Types.ObjectId, ref: "Notes" }],
    students: [{ type: Schema.Types.ObjectId, ref: "Students" }],
  },
  {
    timestamps: true,
  }
);


batchSchema.index({ students: 1 });
batchSchema.index({ instructors: 1 });
batchSchema.index({ meetings: 1 });
batchSchema.index({ notes: 1 });
// batchSchema.index({ courseId: 1 });

export const Batch = models.Batch || model("Batch", batchSchema);
