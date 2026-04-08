import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import sendResponse from "../utils/response.util.js";
import jwt from "jsonwebtoken";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { Company } from "../models/company.model.js";
import { sendResetOtp, sendEmailChangeOtp, sendSignupOtp, sendWelcomeEmail } from "../utils/mailSend.js";

// In-memory OTP store: { email: { otp, expiresAt } }
const otpStore = {};
// In-memory verified tokens: { token: email }
const verifiedTokens = {};

// In-memory pending signup store: { email: { otp, expiresAt, userData } }
const signupOtpStore = {};

export const sendSignupOtpHandler = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return sendResponse(res, 400, null, "All fields are required");
    }

    const existing = await User.findOne({ email });
    if (existing) return sendResponse(res, 400, null, "User already exists with this email");

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    signupOtpStore[email] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
      userData: { fullname, email, phoneNumber, password: hashedPassword, role },
    };

    const result = await sendSignupOtp(otp, email, fullname);
    if (!result.success) return sendResponse(res, 500, null, "Failed to send OTP. Please try again.");

    return sendResponse(res, 200, null, "OTP sent to your email");
  } catch (error) {
    console.error("sendSignupOtpHandler error:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const verifySignupOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return sendResponse(res, 400, null, "Email and OTP are required");

    const entry = signupOtpStore[email];
    if (!entry) return sendResponse(res, 400, null, "No pending signup for this email. Please sign up again.");
    if (Date.now() > entry.expiresAt) {
      delete signupOtpStore[email];
      return sendResponse(res, 400, null, "OTP expired. Please sign up again.");
    }
    if (entry.otp !== otp) return sendResponse(res, 400, null, "Invalid OTP");

    // Double-check email not taken during OTP window
    const existing = await User.findOne({ email });
    if (existing) {
      delete signupOtpStore[email];
      return sendResponse(res, 400, null, "User already exists with this email");
    }

    const { userData } = entry;
    delete signupOtpStore[email];

    const user = await User.create({
      fullname: userData.fullname,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
      role: userData.role,
      profile: { bio: "", skills: [], resume: null, resumeOrignalName: "", profilePhoto: null },
    });

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.email, user.fullname, user.role).catch(() => {});

    return sendResponse(res, 201, null, `Welcome, ${user.fullname}! Your account has been verified.`);
  } catch (error) {
    console.error("verifySignupOtp error:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    const file = req.file;

    // Validate required fields
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return sendResponse(res, 400, null, "Something is Missing");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 400, null, "User Already Exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Initialize profile photo URL
    let profilePhotoUrl = null;

    if (file) {
      // Upload the file to Cloudinary
      const uploadResult = await uploadOnCloudinary(file.path, "ProfilePhoto");
      if (uploadResult) {
        profilePhotoUrl = uploadResult.secure_url;
      }
      // If upload fails, continue registration without a profile photo
    }

    // Create new user
    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        bio: "",
        skills: [],
        resume: null,
        resumeOrignalName: "",
        profilePhoto: profilePhotoUrl,
      },
    });

    return sendResponse(
      res,
      201,
      user,
      `Welcome, ${user.fullname}! Your account has been successfully created.`
    );
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate request body
    if (!email || !password || !role) {
      return sendResponse(res, 400, null, "Required fields are missing");
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 401, null, "Invalid email or password");
    }

    // Check if the provided role matches the user's role
    if (role !== user.role) {
      return sendResponse(res, 403, null, "Access denied: incorrect role");
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return sendResponse(res, 401, null, "Invalid email or password");
    }

    // Create JWT token
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_KEY, { expiresIn: "1d" });

    // Prepare user response data
    const userResponse = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      token: token,
    };
    // res.cookie("token", token, {
    //   // httpOnly: true, // Prevents JavaScript access
    //   sameSite: "Strict", // Helps prevent CSRF
    //   expires: new Date(Date.now() + 86400000),
    // });

    // Send response with token as a cookie
    return res.status(200).json({
      message: `Welcome back, ${user.fullname}`,
      success: true,
      user: userResponse,
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return sendResponse(res, 500, null, "Internal server error");
  }
};

export const logOut = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.userId;
    const resumeFile = req.files["file"];
    const profilePhoto = req.files["profilePhoto"];

    let user = await User.findById(userId);

    if (!user) {
      return sendResponse(res, 404, null, "User Not Found");
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (bio) user.profile.bio = bio;
    if (skills) {
      user.profile.skills = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);
    }

    if (resumeFile) {
      console.log("Resume file received:", resumeFile[0]);
      const uploadResult = await uploadOnCloudinary(
        resumeFile[0].path,
        "Resume"
      );
      if (uploadResult) {
        user.profile.resume = uploadResult.secure_url;
        user.profile.resumeOrignalName = resumeFile[0].originalname;
        console.log("Resume uploaded:", uploadResult.secure_url);
      } else {
        console.log("Resume upload failed");
        return sendResponse(res, 500, null, "Failed to upload resume. Check Cloudinary credentials.");
      }
    }

    if (profilePhoto) {
      const uploadResult = await uploadOnCloudinary(
        profilePhoto[0].path,
        "ProfilePhoto"
      ); // Upload profile photo
      if (uploadResult) {
        user.profile.profilePhoto = uploadResult.secure_url; // Save photo URL
      }
    }

    await user.save();

    const userResponse = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return sendResponse(res, 200, userResponse, "Profile Updated Successfully");
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const retriveUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).send("User not found.");
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return sendResponse(res, 500, null, "Internaal server error");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return sendResponse(res, 200, users, "Users fetched successfully");
  } catch (error) {
    console.error("Error fetching users:", error);
    return sendResponse(res, 500, null, "Internal server error");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found.");

    // Delete all jobs created by the user
    await Job.deleteMany({ createdBy: userId });

    // Delete all applications submitted by the user
    await Application.deleteMany({ applicant: userId });

    // If the user is a recruiter, delete their company and associated jobs
    if (user.role === "recruiter" && user.profile.company) {
      await Job.deleteMany({ company: user.profile.company });
      await Company.findByIdAndDelete(user.profile.company);
    }

    // Finally, delete the user
    await User.findByIdAndDelete(userId);

    return res.status(200).send("User and related data deleted successfully.");
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send("Internal Server Error.");
  }
};

export const forgotPass = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return sendResponse(res, 400, null, "Email is required");

    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, 404, null, "No account found with this email");

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Store with 5-minute expiry
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    const result = await sendResetOtp(otp, email);
    if (!result.success) {
      return sendResponse(res, 500, null, "Failed to send OTP email. Please try again.");
    }

    // Return a temporary token so frontend can identify the session
    const passToken = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: "10m" });

    return sendResponse(res, 200, passToken, "OTP sent to your email");
  } catch (error) {
    console.error("forgotPass error:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { sotp } = req.body;
    if (!sotp) return sendResponse(res, 400, null, "OTP is required");

    // Find which email this OTP belongs to
    const entry = Object.entries(otpStore).find(([, v]) => v.otp === sotp);
    if (!entry) return sendResponse(res, 400, null, "Invalid OTP");

    const [email, { expiresAt }] = entry;
    if (Date.now() > expiresAt) {
      delete otpStore[email];
      return sendResponse(res, 400, null, "OTP has expired. Please request a new one.");
    }

    // OTP valid — clean up and issue a reset token
    delete otpStore[email];
    const resetToken = jwt.sign({ email, purpose: "reset" }, process.env.JWT_KEY, { expiresIn: "10m" });
    verifiedTokens[resetToken] = email;

    return sendResponse(res, 200, resetToken, "OTP verified successfully");
  } catch (error) {
    console.error("verifyOtp error:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (!password || !confirmPassword || !token) {
      return sendResponse(res, 400, null, "All fields are required");
    }
    if (password !== confirmPassword) {
      return sendResponse(res, 400, null, "Passwords do not match");
    }
    if (password.length < 6) {
      return sendResponse(res, 400, null, "Password must be at least 6 characters");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch {
      return sendResponse(res, 400, null, "Reset link has expired. Please start over.");
    }

    if (decoded.purpose !== "reset") {
      return sendResponse(res, 400, null, "Invalid reset token");
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) return sendResponse(res, 404, null, "User not found");

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    // Clean up
    delete verifiedTokens[token];

    return sendResponse(res, 200, null, "Password updated successfully");
  } catch (error) {
    console.error("resetPassword error:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

// In-memory store for email change OTPs: { userId: { otp, newEmail, expiresAt } }
const emailChangeOtpStore = {};

export const sendEmailChangeOtpHandler = async (req, res) => {
  try {
    const { newEmail } = req.body;
    const userId = req.userId;

    if (!newEmail) return sendResponse(res, 400, null, "New email is required");

    // Check email not already taken by a DIFFERENT user
    const existing = await User.findOne({ email: newEmail });
    if (existing && existing._id.toString() !== userId.toString()) {
      return sendResponse(res, 400, null, "Email already in use by another account");
    }
    // If same user is trying to set the same email, just return success without sending OTP
    if (existing && existing._id.toString() === userId.toString()) {
      return sendResponse(res, 400, null, "This is already your current email");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    emailChangeOtpStore[userId] = { otp, newEmail, expiresAt: Date.now() + 5 * 60 * 1000 };

    const result = await sendEmailChangeOtp(otp, newEmail);
    if (!result.success) return sendResponse(res, 500, null, "Failed to send OTP. Try again.");

    return sendResponse(res, 200, null, "OTP sent to new email");
  } catch (error) {
    console.error("sendEmailChangeOtp error:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const verifyEmailChangeOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.userId;

    if (!otp) return sendResponse(res, 400, null, "OTP is required");

    const entry = emailChangeOtpStore[userId];
    if (!entry) return sendResponse(res, 400, null, "No pending email change. Request a new OTP.");
    if (Date.now() > entry.expiresAt) {
      delete emailChangeOtpStore[userId];
      return sendResponse(res, 400, null, "OTP expired. Please request a new one.");
    }
    if (entry.otp !== otp) return sendResponse(res, 400, null, "Invalid OTP");

    // Update email
    const user = await User.findByIdAndUpdate(userId, { email: entry.newEmail }, { new: true }).select("-password");
    delete emailChangeOtpStore[userId];

    return sendResponse(res, 200, user, "Email updated successfully");
  } catch (error) {
    console.error("verifyEmailChangeOtp error:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};
