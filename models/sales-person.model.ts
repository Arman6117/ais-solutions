import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISalesPerson {
  name: string;
  email: string;
  mobile: string;
  joiningDate: Date;
  // Stores references to students this person enrolled
  enrolledStudents: mongoose.Types.ObjectId[]; 
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISalesPersonDocument extends ISalesPerson, Document {
  _id: mongoose.Types.ObjectId;
}

const SalesPersonSchema = new Schema<ISalesPersonDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    mobile: { type: String, required: true, trim: true },
    joiningDate: { type: Date, required: true, default: Date.now },
    enrolledStudents: [{ type: String, ref: "Student" }], 
  },
  { timestamps: true }
);

const SalesPerson: Model<ISalesPersonDocument> =
  mongoose.models.SalesPerson || mongoose.model<ISalesPersonDocument>("SalesPerson", SalesPersonSchema);

export default SalesPerson;
