  import mongoose from "mongoose";

  const userSchema = new mongoose.Schema(
    {
      fullname: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["student", "recruiter", "admin"],
        required: true,
      },
      profile: {
        bio: { type: String },
        skills: [{ type: String, trim: true, empty: false }],
        resume: { type: String },
        resumeOrignalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        profilePhoto: {
          type: String,
          default: "",
        },
      },
    },
    { timestamps: true }
  );

  export const User = mongoose.model("User", userSchema);
