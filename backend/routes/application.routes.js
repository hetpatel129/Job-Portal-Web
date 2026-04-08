import express from "express";
import {
  applyJob,
  deleteApplicant,
  getAllApplications,
  getApplicant,
  getAppliedJob,
  updateStatus,
  scheduleInterview,
} from "../controller/application.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const applicationRoute = express.Router();

applicationRoute.post("/applyJob/:id", auth, applyJob);
applicationRoute.get("/getAppliedJob", auth, getAppliedJob);
applicationRoute.get("/getApplicant/:id", auth, getApplicant);
applicationRoute.put("/updateStatus/:id", auth, updateStatus);
applicationRoute.put("/scheduleInterview/:id", auth, scheduleInterview);
applicationRoute.delete("/deleteApplicant/:id", auth, deleteApplicant);
applicationRoute.get("/getAllApplications", auth, getAllApplications);

export default applicationRoute;
