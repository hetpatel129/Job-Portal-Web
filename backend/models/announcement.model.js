import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    targetRole: {
      type: String,
      enum: ["all", "student", "recruiter"],
      default: "all",
    },
  },
  { timestamps: true }
);

export const Announcement = mongoose.model("Announcement", announcementSchema);
