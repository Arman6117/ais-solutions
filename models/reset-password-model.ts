
import { Schema, model, models } from "mongoose";

const passwordResetTokenSchema = new Schema({
  email: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

passwordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const PasswordResetToken = 
  models.PasswordResetToken || 
  model("PasswordResetToken", passwordResetTokenSchema);
