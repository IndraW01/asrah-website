import { logger } from "../application/logger.js";
import { ResponseError } from "../error/response-error.js";
import { ValidationError } from "../error/validation-error.js";

export const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    next()
    return;
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({
      code: err.status,
      errors: err.message
    });
  } else if (err instanceof ValidationError) {
    err.message = err.message.replace('ValidationError: ', '').trim();
    err.message = err.message.replace(/"/g, '');

    res.status(400).json({
      code: 400,
      errors: err.message
    });
  } else {
    logger.error(err.stack);

    res.status(500).json({
      code: 500,
      errors: err.message
    });
  }
}