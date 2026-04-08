import axios from "axios";
import { setApiLoading } from "../redux/authSlice";

const apiClient = axios.create({
  withCredentials: true,
});

/**
 * Utility function to make API requests.
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE).
 * @param {string} endpoint - The full API endpoint URL.
 * @param {object} data - The request body (for POST and PUT).
 * @param {string} token - The authorization token (optional).
 * @returns {Promise<Object>} - The response data from the API.
 */
const apiRequest = async (
  method,
  endpoint,
  data = {},
  token = "",
  dispatch
) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  // Let axios set Content-Type automatically for FormData
  if (data instanceof FormData) {
    delete headers["Content-Type"];
  }

  try {
    dispatch(setApiLoading(true));
    const response = await apiClient({
      method,
      url: endpoint,
      data,
      headers,
      timeout: 15000,
    });
    return response;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  } finally {
    dispatch(setApiLoading(false));
  }
};

export default apiRequest;
