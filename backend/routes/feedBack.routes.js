import express from "express";
import {
  deleteFeedback,
  createFeedBack,
  getAllFeedBack,
} from "../controller/feedBack.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const feedBackRoute = express.Router();

feedBackRoute.post("/createFeedBack", auth, createFeedBack);
feedBackRoute.get("/getAllFeedBack", auth, getAllFeedBack);
feedBackRoute.delete("/deleteFeedback/:id", auth, deleteFeedback);
export default feedBackRoute;
