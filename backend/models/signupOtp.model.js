import mongoose from "mongoose";

/**
 * Stores pending signup OTPs in MongoDB so they persist across
 * serverless function invocations (Vercel / cold starts).
 * The TTL index automatically deletes documents 10 minutes after creation.
 */
const signupOtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  otp: { type: String, required: true },
  userData: {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true }, // pre-hashed
    role: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // TTL: 10 minutes
});

export const SignupOtp = mongoose.model("SignupOtp", signupOtpSchema);
