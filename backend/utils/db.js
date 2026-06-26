import mongoose from "mongoose";

// Cache the connection across serverless invocations (Vercel cold starts)
let isConnected = false;

export const dbConnect = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log("Reusing existing DATABASE connection");
    return;
  }

  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL environment variable is not defined");
    }

    await mongoose.connect(process.env.MONGODB_URL, {
      tls: true,
      tlsAllowInvalidCertificates: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log("Connected to DATABASE");
  } catch (error) {
    isConnected = false;
    console.error("Error connecting to the database:", error.message);
    throw error; // re-throw so callers know the DB is down
  }
};
