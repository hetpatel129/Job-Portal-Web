import mongoose from "mongoose";
import { User } from "./user.model.js";

const feedBackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },  
  { timestamps: true }
);

export const FeedBack = mongoose.model("FeedBack", feedBackSchema);
