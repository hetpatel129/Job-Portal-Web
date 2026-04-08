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

const corsOptions = {
  origin: [process.env.ORIGIN, "http://localhost:5174", "http://localhost:5173"],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

// Use CORS with the defined options
app.use(cors(corsOptions));

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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Connect to the database
dbConnect();
