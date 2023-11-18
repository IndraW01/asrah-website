import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { publicApi } from "../routes/public.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { privateApi } from "../routes/private.js";

dotenv.config();

export const web = express();

// Built in middleware trhird party
web.use(fileUpload());

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

// Page not found
web.use((req, res, next) => {
  res.status(404).json({
    code: 404,
    message: 'Not found'
  });
})

// Register error middleware
web.use(errorMiddleware);