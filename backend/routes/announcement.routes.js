import express from "express";
import { createAnnouncement, deleteAnnouncement, getAnnouncements } from "../controller/announcement.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const announcementRouter = express.Router();

announcementRouter.post("/create", auth, createAnnouncement);
announcementRouter.get("/", auth, getAnnouncements);
announcementRouter.delete("/:id", auth, deleteAnnouncement);

export default announcementRouter;
