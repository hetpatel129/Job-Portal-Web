import { FeedBack } from "../models/feedBack.model.js";
import sendResponse from "../utils/response.util.js";

export const createFeedBack = async (req, res) => {
  try {
    const { name, feedback } = req.body;
    console.log(req.body);

    const user = req.userId;

    const feedBack = new FeedBack({
      user,
      name,
      feedback,
    });
    await feedBack.save();
    return sendResponse(res, 201, feedBack, "Feedback Created Successfully");
  } catch (error) {
    console.error("Feedback Create Error:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const getAllFeedBack = async (req, res) => {
  try {
    const feedBacks = await FeedBack.find().populate("user");
    return sendResponse(res, 200, feedBacks, "All Feedbacks");
  } catch (error) {
    console.error("getAllFeedBack Error:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedBack = await FeedBack.findByIdAndDelete(id);
    if (!feedBack) {
      return sendResponse(res, 404, null, "Feedback Not Found");
    }
    return sendResponse(res, 200, feedBack, "Feedback Deleted Successfully");
  } catch (error) {
    console.error("deleteFeedback Error:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};
