import sendResponse from "../utils/response.util.js";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import mongoose from "mongoose";
import { Application } from "../models/application.model.js";
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      company,
      experience,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !company ||
      !experience
    ) {
      return sendResponse(res, 400, null, "All fields are required.");
    }

    // Create the job
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(",").map((req) => req.trim()),
      salary: Number(salary),
      location,
      jobType,
      position,
      company,
      experience,
      createdBy: req.userId,
    });

    // Add the job to the company's jobs array
    await Company.findByIdAndUpdate(
      company,
      { $push: { jobs: job._id } },
      { new: true }
    );

    return sendResponse(res, 201, job, "New Job Created Successfully");
  } catch (error) {
    console.error("Error creating job:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query).populate("company");

    return sendResponse(res, 200, jobs.length ? jobs : null, "Jobs Found");
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return sendResponse(res, 400, null, "Job ID is required.");
    }

    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant" },
    });

    return job
      ? sendResponse(res, 200, job, "Job Found")
      : sendResponse(res, 404, null, "Job Not Found");
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const adminPostedJob = async (req, res) => {
  try {
    const adminId = req.userId;
    if (!adminId) {
      return sendResponse(res, 400, null, "Admin ID is required.");
    }

    const jobs = await Job.find({ createdBy: adminId }).populate("company");

    return jobs.length
      ? sendResponse(res, 200, jobs, "Jobs Found")
      : sendResponse(res, 404, null, "No Jobs Found for this Admin");
  } catch (error) {
    console.error("Error fetching jobs posted by admin:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const updateJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return sendResponse(res, 400, null, "Job ID is required.");
    }

    // Find the job by ID
    const job = await Job.findById(jobId).populate("company");
    if (!job) {
      return sendResponse(res, 404, null, "Job Not Found");
    }

    // Update the fields of the job
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      experience,
    } = req.body;
    console.log(title);

    if (title) job.title = title.trim();
    if (description) job.description = description.trim();
    if (requirements) {
      const reqArray = requirements
        .split(",")
        .map((req) => req.trim())
        .filter(Boolean);
      job.requirements = reqArray.length ? reqArray : [];
    }
    if (salary !== undefined && salary >= 0) job.salary = Number(salary);
    if (location) job.location = location.trim();
    if (jobType) job.jobType = jobType.trim();
    if (position !== undefined) job.position = position;
    if (experience !== undefined && experience >= 0)
      job.experience = Number(experience);

    // Save the updated job
    const updatedJob = await job.save();

    return sendResponse(res, 200, updatedJob, "Job Updated Successfully");
  } catch (error) {
    console.error("Error updating job by ID:", error.message || error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const deleteJob = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id: jobId } = req.params;

    // Find the job
    const job = await Job.findById(jobId).session(session);
    if (!job) {
      await session.abortTransaction();
      session.endSession();
      return sendResponse(res, 404, null, "Job not found");
    }

    // Delete related applications using the session
    await Application.deleteMany(
      { _id: { $in: job.application } },
      { session }
    );

    // Delete the job using the session
    await Job.findByIdAndDelete(jobId, { session });

    // Commit the transaction if successful
    await session.commitTransaction();
    session.endSession();

    // Send a success response
    return sendResponse(
      res,
      200,
      null,
      "Job and related applications deleted successfully"
    );
  } catch (error) {
    console.log(error);
    // Abort the transaction if an error occurs
    await session.abortTransaction();
    session.endSession();
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

