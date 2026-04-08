import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("🔍 Testing MongoDB Connection...");
console.log("Connection String:", process.env.MONGODB_URL);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Connection Failed:", error.message);
    console.error("\n💡 Troubleshooting:");
    console.error("1. Verify password in .env file");
    console.error("2. Check Network Access in MongoDB Atlas (allow 0.0.0.0/0)");
    console.error("3. Ensure database user exists in Database Access");
    console.error("4. Check cluster is running (green status in MongoDB Atlas)");
    process.exit(1);
  });
