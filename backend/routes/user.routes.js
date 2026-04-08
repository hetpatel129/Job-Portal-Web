import express from "express";
import {
  deleteUser,
  getAllUsers,
  login,
  logOut,
  register,
  retriveUser,
  updateProfile,
  forgotPass,
  verifyOtp,
  resetPassword,
  sendEmailChangeOtpHandler,
  verifyEmailChangeOtp,
  sendSignupOtpHandler,
  verifySignupOtp,
} from "../controller/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";
import https from "https";
import { v2 as cloudinary } from "cloudinary";

const userRouter = express.Router();

userRouter.post("/register", upload.single("file"), register);
userRouter.post("/signup/sendOtp", sendSignupOtpHandler);
userRouter.post("/signup/verifyOtp", verifySignupOtp);
userRouter.post("/login", login);
userRouter.get("/logOut", logOut);
userRouter.post("/forgotPass", forgotPass);
userRouter.post("/verifyOtp", verifyOtp);
userRouter.post("/resetPassword", resetPassword);
userRouter.post("/email/sendOtp", auth, sendEmailChangeOtpHandler);
userRouter.post("/email/verifyOtp", auth, verifyEmailChangeOtp);
userRouter.put(
  "/profile/update",
  auth,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
  ]),
  updateProfile
);
userRouter.get("/me", auth, retriveUser);
userRouter.get("/getAllUsers", auth, getAllUsers);
userRouter.delete("/deleteUser/:userId", deleteUser);

// PDF proxy — generates signed URL and streams PDF to browser
userRouter.get("/resume/view", (req, res) => {
  let { url } = req.query;
  if (!url || !url.startsWith("https://res.cloudinary.com")) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  try {
    // Extract public_id from URL
    // URL format: https://res.cloudinary.com/<cloud>/image/upload/v<ver>/<folder>/<id>.pdf
    const match = url.match(/\/(?:image|raw|video)\/upload\/(?:v\d+\/)?(.+)$/);
    if (!match) return res.status(400).send("Invalid Cloudinary URL");

    const publicId = match[1].replace(/\.[^/.]+$/, ""); // remove extension
    const resourceType = url.includes("/image/upload/") ? "image" : "raw";

    const signedUrl = cloudinary.url(publicId, {
      resource_type: resourceType,
      sign_url: true,
      secure: true,
      format: "pdf",
      expires_at: Math.floor(Date.now() / 1000) + 3600,
    });

    console.log("Signed URL:", signedUrl);

    https.get(signedUrl, (stream) => {
      console.log("Status:", stream.statusCode);
      if (stream.statusCode !== 200) {
        return res.status(500).send("Failed to fetch PDF: " + stream.statusCode);
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=resume.pdf");
      stream.pipe(res);
    }).on("error", (err) => {
      console.error("Proxy error:", err.message);
      res.status(500).send("Failed to fetch PDF");
    });
  } catch (err) {
    console.error("Signing error:", err.message);
    res.status(500).send("Error generating signed URL");
  }
});

export default userRouter;
