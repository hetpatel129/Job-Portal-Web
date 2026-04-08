import express from "express";
import {
  adminPostedJob,
  deleteJob,
  getAllJobs,
  getJobById,
  postJob,
  updateJobById,
} from "../controller/job.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const jobRouter = express.Router();

jobRouter.post("/postjob", auth, postJob);
jobRouter.get("/getAllJob", auth, getAllJobs);
jobRouter.get("/adminPostedJob", auth, adminPostedJob);
jobRouter.get("/getJob/:id", auth, getJobById);
jobRouter.put("/updateJob/:id", auth, updateJobById);
jobRouter.delete("/deleteJob/:id", auth, deleteJob);

export default jobRouter;
