import mongoose, { Document, Model, Schema } from "mongoose";

export interface IInstructor {
  name: string;
  email: string;
  phone: string;
  profilePic?: string; // Keeping it optional as per your request
  role: "instructor";
  batchId?: mongoose.Types.ObjectId[]; // Optional fields you asked for
  sessionId?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IInstructorDocument extends IInstructor, Document {
  _id: string; // Using string for compatibility with auth libraries often, or ObjectId
}

const InstructorSchema = new Schema<IInstructorDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    profilePic: { type: String, default: "" },
    role: { type: String, default: "instructor" },
    
    // Optional fields
    batchId: [{ type: Schema.Types.ObjectId, ref: "Batch" }],
    sessionId: [{ type: Schema.Types.ObjectId, ref: "Session" }],
  },
  { timestamps: true }
);

// Prevent recompilation error
const Instructor: Model<IInstructorDocument> =
  mongoose.models.Instructor || mongoose.model<IInstructorDocument>("Instructor", InstructorSchema);

export default Instructor;
