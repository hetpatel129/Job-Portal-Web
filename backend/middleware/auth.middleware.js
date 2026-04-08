import jwt from "jsonwebtoken";
import sendResponse from "../utils/response.util.js";

export const auth = async (req, res, next) => {
  try {
    // Get the token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    // Check if token exists
    if (!token) {
      return sendResponse(res, 401, "", "User not Authenticated");
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY); // Ensure JWT_KEY is set in your environment variables
    if (!decoded) {
      return sendResponse(res, 401, "", "Invalid Token");
    }

    // Attach user ID to the request object
    req.userId = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return sendResponse(res, 500, "", "Internal Server Error"); // Send a generic error response
  }
};
