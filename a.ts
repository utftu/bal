import { createLogger } from "./src/cssq.ts";

const logger = createLogger({ prefix: "jopa:: " });
// logger.prefix = "/hello:: ";
// logger.core.providers[1].oneline = false;

logger.error("error text");
