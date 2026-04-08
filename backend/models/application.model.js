import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "interview", "offer", "accepted", "rejected"],
      default: "pending",
    },
    interviewDate: {
      type: Date,
      default: null,
    },
    interviewNote: {
      type: String,
      default: "",
    },
    interviewPlace: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", applicationSchema);
