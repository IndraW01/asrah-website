import { logger } from "./application/logger.js";
import { web } from "./application/web.js";

const PORT = process.env.APP_PORT || 5000;
const HOST = process.env.APP_HOST || "localhost";

web.listen(PORT, HOST, () => {
  logger.info(`Server is running in host: ${HOST} dan port: ${PORT}`)
});
