import { logger } from "../src/application/logger.js";

describe('Logger', () => {

  it('should can test', () => {
    logger.info("Logger Info");
    logger.error("Logger Error");
  });

});