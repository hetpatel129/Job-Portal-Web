import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    // Check if the MONGODB_URL is defined
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL environment variable is not defined");
    }

    await mongoose.connect(process.env.MONGODB_URL, {
      tls: true,
      tlsAllowInvalidCertificates: false,
    });
    console.log("Connected to DATABASE");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};
