import express from "express";
import {
  changeCompanyStatus,
  editUser,
} from "../controller/admin.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const adminRouter = express.Router();

adminRouter.put("/editUser/:userId", auth, editUser);
adminRouter.put("/changeCompanyStatus/:companyId",auth, changeCompanyStatus);

export default adminRouter;
