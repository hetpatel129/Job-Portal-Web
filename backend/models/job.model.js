import mongoose from "mongoose";

// Define the job schema
const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    requirements: [{ type: String, trim: true }],
    salary: { type: Number, required: true, min: 0 },
    experience: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    jobType: { type: String, required: true },
    position: { type: Number, required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    application: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  },
  { timestamps: true }
);

// Export the Job model
export const Job = mongoose.model("Job", jobSchema);
