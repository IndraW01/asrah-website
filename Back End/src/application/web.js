import express from "express";
import { publicApi } from "../routes/public.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { privateApi } from "../routes/private.js";

dotenv.config();

export const web = express();

// Parse request user ke json
web.use(express.json());

// Parse request user ke urlencoded
web.use(express.urlencoded({ extended: false }));

// Tambah kan middleware cookie
web.use(cookieParser());

// Register route public
web.use(publicApi);

// Register route private
web.use(privateApi);

// Register error middleware
web.use(errorMiddleware);