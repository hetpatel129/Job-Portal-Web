import { User } from "../models/user.model.js";
import sendResponse from "../utils/response.util.js";
import { Company } from "../models/company.model.js";

export const editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullname, email, phoneNumber, bio, skills, role } = req.body;

    const user = await User.findById(userId);

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
    if (role) user.role = role;
    await user.save();
    return sendResponse(res, 200, user, "User Updated Successfully");
  } catch (error) {
    console.error("User Delte Error:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

export const changeCompanyStatus = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { status } = req.body;

    // Find the company
    const company = await Company.findById(companyId);
    if (!company) {
      return sendResponse(res, 404, null, "Company Not Found");
    }

    // Update the status
    company.status = status;
    await company.save();

    return sendResponse(
      res,
      200,
      company,
      "Company Status Updated Successfully"
    );
  } catch (error) {
    console.error("Change Company Status Error:", error);
    return sendResponse(res, 500, null, "Internal Server Error");
  }
};

