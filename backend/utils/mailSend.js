import nodemailer from "nodemailer";

const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export const sendSignupOtp = async (otp, recipientEmail, fullname) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: "Verify Your Email — Job Portal",
      html: `
        <div style="font-family:Arial,sans-serif;color:#333;max-width:500px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:28px 24px;text-align:center;">
            <h1 style="color:white;margin:0;font-size:22px;">Welcome to Job Portal</h1>
            <p style="color:#c7d2fe;margin:6px 0 0;font-size:14px;">One step away from your dream job</p>
          </div>
          <div style="padding:32px 24px;">
            <p>Hi <strong>${fullname}</strong>,</p>
            <p>Use the OTP below to verify your email. It expires in <strong>10 minutes</strong>.</p>
            <div style="margin:24px 0;padding:20px;border:2px dashed #7c3aed;background:#f5f3ff;text-align:center;border-radius:8px;">
              <h1 style="color:#7c3aed;font-size:3em;letter-spacing:8px;margin:0;">${otp}</h1>
            </div>
            <p style="font-size:13px;color:#6b7280;">If you did not sign up, please ignore this email.</p>
          </div>
        </div>`,
    });
    return { success: true };
  } catch (error) {
    console.error("sendSignupOtp error:", error.message);
    return { success: false };
  }
};

export const sendWelcomeEmail = async (recipientEmail, fullname, role) => {
  try {
    const transporter = createTransporter();
    const roleText = role === "recruiter"
      ? "You can now post jobs and find top talent."
      : "You can now browse thousands of jobs and apply with one click.";
    await transporter.sendMail({
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: `Welcome to Job Portal, ${fullname}!`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#333;max-width:500px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:28px 24px;text-align:center;">
            <h1 style="color:white;margin:0;font-size:24px;">You're In!</h1>
            <p style="color:#c7d2fe;margin:6px 0 0;font-size:14px;">Your account is verified and ready</p>
          </div>
          <div style="padding:32px 24px;">
            <p>Hi <strong>${fullname}</strong>, welcome to <strong>Job Portal</strong>!</p>
            <p>${roleText}</p>
            <div style="margin:24px 0;text-align:center;">
              <a href="${process.env.ORIGIN || "http://localhost:5173"}" style="display:inline-block;padding:12px 32px;background:#7c3aed;color:white;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">Get Started</a>
            </div>
            <p style="font-size:13px;color:#6b7280;">The Job Portal Team</p>
          </div>
        </div>`,
    });
    return { success: true };
  } catch (error) {
    console.error("sendWelcomeEmail error:", error.message);
    return { success: false };
  }
};

export const sendEmailChangeOtp = async (otp, recipientEmail) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Job Portal - Support" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: "Verify Your New Email Address",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 500px; margin: auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 28px 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Email Verification</h1>
            <p style="color: #c7d2fe; margin: 6px 0 0; font-size: 14px;">Confirm your new email address</p>
          </div>
          <div style="padding: 32px 24px;">
            <p>Use the OTP below to verify your new email address. It expires in <strong>5 minutes</strong>.</p>
            <div style="margin: 24px 0; padding: 20px; border: 2px dashed #4f46e5; background: #f5f3ff; text-align: center; border-radius: 8px;">
              <h1 style="color: #4f46e5; font-size: 3em; letter-spacing: 8px; margin: 0;">${otp}</h1>
            </div>
            <p style="font-size: 13px; color: #6b7280;">If you did not request this, please ignore this email.</p>
          </div>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending email change OTP:", error.message);
    return { success: false };
  }
};

export const sendResetOtp = async (otp, recipientEmail) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"JOB PORTAL - Support Team" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h1 style="color: #333; font-size: 2.5em;">Password Reset Request</h1>
          <p>Dear User,</p>
          <p>Use the OTP below to reset your password:</p>
          <div style="margin: 20px 0; padding: 20px; border: 2px dashed #0056b3; background-color: #f9f9f9; text-align: center;">
            <h1 style="color: #0056b3; font-size: 3em; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p><strong>Note:</strong> This OTP will expire in 5 minutes.</p>
          <p>Best regards,<br>The Job Portal Support Team</p>
        </div>
      `,
    });
    console.log("OTP email sent to", recipientEmail);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending OTP email:", error.message);
    return { success: false, message: "Error sending email", error };
  }
};

export const sendStatusEmail = async (recipientEmail, applicantName, jobTitle, companyName, status) => {
  const statusMessages = {
    reviewed: { subject: "Your Application is Being Reviewed", color: "#2563eb", text: "Great news! Your application is currently being reviewed by the hiring team." },
    interview: { subject: "Interview Scheduled!", color: "#7c3aed", text: "Congratulations! You have been shortlisted for an interview. Please check the portal for interview details." },
    offer: { subject: "Job Offer Extended!", color: "#059669", text: "Fantastic news! You have received a job offer. Please log in to the portal to review and respond." },
    accepted: { subject: "Application Accepted!", color: "#16a34a", text: "Congratulations! Your application has been accepted." },
    rejected: { subject: "Application Status Update", color: "#dc2626", text: "Thank you for your interest. After careful consideration, we have decided to move forward with other candidates." },
  };

  const msgInfo = statusMessages[status];
  if (!msgInfo) return;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: msgInfo.subject,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
          <h2 style="color: ${msgInfo.color};">${msgInfo.subject}</h2>
          <p>Dear <strong>${applicantName}</strong>,</p>
          <p>${msgInfo.text}</p>
          <div style="margin: 20px 0; padding: 16px; background: #f3f4f6; border-left: 4px solid ${msgInfo.color}; border-radius: 4px;">
            <p style="margin:0;"><strong>Job:</strong> ${jobTitle}</p>
            <p style="margin:4px 0 0;"><strong>Company:</strong> ${companyName}</p>
            <p style="margin:4px 0 0;"><strong>Status:</strong> <span style="color:${msgInfo.color};text-transform:capitalize;">${status}</span></p>
          </div>
          <p>Log in to <a href="http://localhost:5173">Job Portal</a> to view your application.</p>
          <p>Best regards,<br>The Job Portal Team</p>
        </div>
      `,
    });
    console.log(`Status email sent to ${recipientEmail}`);
  } catch (error) {
    console.error("Error sending status email:", error.message);
  }
};

export const sendInterviewEmail = async (recipientEmail, applicantName, jobTitle, companyName, interviewDate, interviewPlace, interviewNote) => {
  const date = new Date(interviewDate);
  const formattedDate = date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const formattedTime = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: `Interview Scheduled - ${jobTitle} at ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 32px 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Interview Invitation</h1>
            <p style="color: #c7d2fe; margin: 8px 0 0;">You have been shortlisted!</p>
          </div>
          <div style="padding: 32px 24px;">
            <p style="font-size: 16px;">Dear <strong>${applicantName}</strong>,</p>
            <p>Congratulations! You are invited for an interview for <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.</p>
            <div style="background: #f5f3ff; border-left: 4px solid #7c3aed; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <h3 style="margin: 0 0 16px; color: #4f46e5; font-size: 16px;">Interview Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px; width: 120px;">Date</td><td style="padding: 6px 0; font-weight: 600; font-size: 14px;">${formattedDate}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Time</td><td style="padding: 6px 0; font-weight: 600; font-size: 14px;">${formattedTime}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Location</td><td style="padding: 6px 0; font-weight: 600; font-size: 14px;">${interviewPlace || "To be communicated"}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Position</td><td style="padding: 6px 0; font-weight: 600; font-size: 14px;">${jobTitle}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Company</td><td style="padding: 6px 0; font-weight: 600; font-size: 14px;">${companyName}</td></tr>
                ${interviewNote ? `<tr><td style="padding: 6px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Note</td><td style="padding: 6px 0; font-size: 14px;">${interviewNote}</td></tr>` : ""}
              </table>
            </div>
            <p style="font-size: 14px; color: #6b7280;">Please be available at the scheduled time. Best of luck!</p>
          </div>
          <div style="background: #f9fafb; padding: 16px 24px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">Job Portal - This is an automated message.</p>
          </div>
        </div>
      `,
    });
    console.log(`Interview email sent to ${recipientEmail}`);
  } catch (error) {
    console.error("Error sending interview email:", error.message);
  }
};
