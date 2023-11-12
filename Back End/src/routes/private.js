import express from "express";
import userController from "../controller/user-controller.js";
import authController from "../controller/auth-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

export const privateApi = express.Router();

privateApi.use(authMiddleware);

// Route Users
privateApi.get("/api/users/current", userController.current)

// Route auth
privateApi.delete("/auth/logout", authController.logout)
