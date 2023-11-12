import jwt from "jsonwebtoken";
import { logger } from "../application/logger.js";

export const authMiddleware = (req, res, next) => {
  const token = req.get('Authorization') && req.get('Authorization').split(' ')[1];

  // Cek apakah tokennya ada
  if (!token) {
    return res.status(401).json({
      code: 401,
      errors: 'Unauthorized'
    });
  }

  // Decode jwt
  try {
    const decode = jwt.verify(token, process.env.JWT_SCREET_KEY);

    req.user = decode;

    next();
  } catch (e) {
    logger.error(e);

    return res.status(401).json({
      code: 401,
      errors: 'Unauthorized'
    });
  }
}