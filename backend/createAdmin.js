import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    const existing = await User.findOne({ email: "admin@jobportal.com" });
    if (existing) {
      console.log("Admin already exists!");
      console.log("Email:    admin@jobportal.com");
      console.log("Password: Admin@123");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      fullname: "Super Admin",
      email: "admin@jobportal.com",
      phoneNumber: 9000000000,
      password: hashedPassword,
      role: "admin",
      profile: { bio: "", skills: [], profilePhoto: "" },
    });

    console.log("✅ Admin created successfully!");
    console.log("Email:    admin@jobportal.com");
    console.log("Password: Admin@123");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};

createAdmin();
