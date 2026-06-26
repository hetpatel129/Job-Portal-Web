import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./utils/db.js";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicationRoute from "./routes/application.routes.js";
import feedBackRoute from "./routes/feedBack.routes.js";
import adminRouter from "./routes/admin.routes.js";
import announcementRouter from "./routes/announcement.routes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  process.env.ORIGIN,
  "https://job-portal-web-six.vercel.app",  // production frontend
  "http://localhost:5174",
  "http://localhost:5173",
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    }
  },
  methods: "GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
  optionsSuccessStatus: 200,
};

// Use CORS with the defined options
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // pre-flight for all routes

// Connect to the database on every request (serverless-safe)
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (err) {
    console.error("DB connection failed:", err.message);
    res.status(503).json({ success: false, message: "Database unavailable. Please try again." });
  }
});

// Define routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/feedback", feedBackRoute);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/announcement", announcementRouter);

// Define a basic route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the BACKEND!");
});

// Health check — used by frontend to wake up the server on cold start
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Start the server (only in local dev — Vercel handles this via export)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;
