import { Announcement } from "../models/announcement.model.js";
import { User } from "../models/user.model.js";
import sendResponse from "../utils/response.util.js";
import nodemailer from "nodemailer";

export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, targetRole } = req.body;
    const adminId = req.userId;

    if (!title || !message) {
      return sendResponse(res, 400, null, "Title and message are required");
    }

    const announcement = await Announcement.create({
      title,
      message,
      createdBy: adminId,
      targetRole: targetRole || "all",
    });

    // Send email to targeted users
    const query = targetRole && targetRole !== "all" ? { role: targetRole } : {};
    const users = await User.find(query).select("email fullname");

    if (users.length > 0 && process.env.EMAIL_USER) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      const emails = users.map((u) => u.email).join(",");
      await transporter.sendMail({
        from: `"Job Portal Admin" <${process.env.EMAIL_USER}>`,
        to: emails,
        subject: `📢 ${title}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#333;">
            <h2 style="color:#2563eb;">📢 ${title}</h2>
            <p>${message}</p>
            <hr/>
            <p style="font-size:12px;color:#888;">This is an announcement from Job Portal Admin.</p>
          </div>
        `,
      });
    }

    return sendResponse(res, 201, announcement, "Announcement sent successfully");
  } catch (error) {
    console.error("Announcement error:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "fullname");
    return sendResponse(res, 200, announcements, "Announcements fetched");
  } catch (error) {
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    return sendResponse(res, 200, null, "Announcement deleted");
  } catch (error) {
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};
