import { Schema, model, models } from "mongoose";

const videoLinkAndFileSchema = new Schema(
  {
    label: { type: String, required: true },
    link: { type: String, required: true },
  },
  { _id: false }
);
const noteSchema = new Schema(
  {
    module: { type: String, required: true },
    chapter: { type: String, required: true },
    session: { type: Schema.Types.ObjectId, ref: "Session" },
    videoLinks: { type: [videoLinkAndFileSchema], required: true, default: [] },
    files: { type: [videoLinkAndFileSchema], required: true, default: [] },
    batchId: { type: Schema.Types.ObjectId, ref: "Batch", required: true },
  },
  { timestamps: true }
);

noteSchema.index({ session: 1 });
noteSchema.index({ batchId: 1 });
export const Notes = models.Notes || model("Notes", noteSchema);
