import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";

dotenv.config();

const updateAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    const admin = await User.findOne({ email: "admin@jobportal.com", role: "admin" });
    
    if (!admin) {
      console.log("❌ Admin not found! Run 'node createAdmin.js' first.");
      process.exit(1);
    }

    const newPassword = "AdminHet@2211";
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;
    await admin.save();

    console.log("✅ Admin password updated successfully!");
    console.log("Email:    admin@jobportal.com");
    console.log("Password: AdminHet@2211");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

updateAdminPassword();
