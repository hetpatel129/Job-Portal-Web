import mongoose from "mongoose";

/**
 * Stores password reset OTPs in MongoDB so they persist across
 * serverless function invocations (Vercel / cold starts).
 * The TTL index automatically deletes documents 5 minutes after creation.
 */
const resetOtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // TTL: 5 minutes
});

export const ResetOtp = mongoose.model("ResetOtp", resetOtpSchema);
