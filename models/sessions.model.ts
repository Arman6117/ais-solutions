import { Schema, model, models } from "mongoose";

const sessionsSchema = new Schema(
  {
    studentId: [{ type: String, required: true, ref: "Student" }],
    meetingName: { type: String, required: true },
    meetingLink: { type: String, required: true },
    module: { type: String, required: true },
    chapters: [{ type: String, required: true }],
    instructor: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: [{ type: Schema.Types.ObjectId, ref: "Notes", default: [] }],
    videoLink: { type: String },
    batchId: { type: Schema.Types.ObjectId, ref: "Batch" },

    // New fields for tracking changes
    status: {
      type: String,
      enum: ["scheduled", "rescheduled", "cancelled"],
      default: "scheduled",
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    originalDate: { type: String },
    originalTime: { type: String },
    rescheduledAt: { type: Date },
    cancelledAt: { type: Date },
  },
  { timestamps: true }
);

sessionsSchema.index({ batchId: 1 });

sessionsSchema.pre("save", function (next) {
  // Check if date or time is modified
  if (this.isModified("date") || this.isModified("time")) {
    if (!this.isNew) {
      // Store original values if not already stored
      if (!this.originalDate) {
        this.originalDate = this.originalDate || this.date;
      }
      if (!this.originalTime) {
        this.originalTime = this.originalTime || this.time;
      }

      this.status = "rescheduled";
      this.rescheduledAt = new Date();
    }
  }
  next();
});

// Post-init hook to track original state
sessionsSchema.post("init", function () {
  this.$locals.previousDate = this.date;
  this.$locals.previousTime = this.time;
});

export const Sessions = models.Sessions || model("Sessions", sessionsSchema);
