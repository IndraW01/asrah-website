import express from "express";
import authController from "../controller/auth-controller.js";

export const publicApi = express.Router();

// Route auth 
publicApi.post("/auth/register", authController.register);
publicApi.post("/auth/login", authController.login);
publicApi.get("/auth/refresh", authController.refreshToken);
publicApi.post("/auth/verify-email/:userId/:token", authController.verifyEmail);

// Route auth google
publicApi.get('/auth/google', authController.loginGoogle);
publicApi.get('/auth/google/callback', authController.callback);

