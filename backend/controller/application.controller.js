import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import sendResponse from "../utils/response.util.js";
import { sendStatusEmail, sendInterviewEmail } from "../utils/mailSend.js";
import { User } from "../models/user.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.id;

    if (!jobId) {
      return sendResponse(res, 400, null, "Job Id is Required");
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return sendResponse(res, 400, null, "You Have Already Applied");
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return sendResponse(res, 400, null, "Job Not Found");
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.application.push(newApplication._id);
    await job.save();

    return sendResponse(res, 201, newApplication, "Job Applied Successfully");
  } catch (error) {
    console.error("Error applying for job:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const getAppliedJob = async (req, res) => {
  try {
    const applicantId = req.userId;

    const applications = await Application.find({ applicant: applicantId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!applications) {
      return sendResponse(res, 400, null, "No Applications Found");
    }

    return sendResponse(res, 200, applications, "Applications Found");
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return sendResponse(res, 404, null, "Jobs Not Found");
    }

    return sendResponse(res, 201, job, "Applicant Found");
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return sendResponse(res, 400, null, "Status Missing");
    }
    const application = await Application.findById(applicationId)
      .populate({ path: "applicant", select: "fullname email" })
      .populate({ path: "job", select: "title", populate: { path: "company", select: "name" } });

    if (!application) {
      return sendResponse(res, 404, null, "Application Not Found");
    }

    application.status = status.toLowerCase();
    await application.save();

    // Send email notification
    if (application.applicant?.email) {
      sendStatusEmail(
        application.applicant.email,
        application.applicant.fullname,
        application.job?.title || "the job",
        application.job?.company?.name || "the company",
        status.toLowerCase()
      );
    }

    return sendResponse(res, 200, application, "Status Updated");
  } catch (error) {
    console.error("Error updating status:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const scheduleInterview = async (req, res) => {
  try {
    const { interviewDate, interviewNote, interviewPlace } = req.body;
    const applicationId = req.params.id;

    const application = await Application.findById(applicationId)
      .populate({ path: "applicant", select: "fullname email" })
      .populate({ path: "job", select: "title", populate: { path: "company", select: "name" } });

    if (!application) {
      return sendResponse(res, 404, null, "Application Not Found");
    }

    application.interviewDate = interviewDate;
    application.interviewNote = interviewNote || "";
    application.interviewPlace = interviewPlace || "";
    application.status = "interview";
    await application.save();

    // Send detailed interview email
    if (application.applicant?.email) {
      sendInterviewEmail(
        application.applicant.email,
        application.applicant.fullname,
        application.job?.title || "the job",
        application.job?.company?.name || "the company",
        interviewDate,
        interviewPlace,
        interviewNote
      );
    }

    return sendResponse(res, 200, application, "Interview Scheduled");
  } catch (error) {
    console.error("Error scheduling interview:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const deleteApplicant = async (req, res) => {
  try {
    const { id: applicantId } = req.params;
    const applicant = await Application.findById(applicantId);

    if (!applicant) {
      return sendResponse(res, 404, null, "No applicant found");
    }

    await Application.findByIdAndDelete(applicantId);
    return sendResponse(res, 200, null, "Applicant deleted successfully");
  } catch (error) {
    console.error(error); // Better error logging
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find({})
      .sort({ createdAt: -1 })
      .populate("applicant")
      .populate({ path: "job", populate: { path: "company" } });

    return sendResponse(res, 200, applications, "Applications Found");
  } catch (error) {
    console.error("Error fetching applications:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
}