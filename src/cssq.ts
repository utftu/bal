import { Logger, type LoggerProps } from "./logger.ts";

export const createLogger = (props: LoggerProps = {}) => {
  return new Logger(props);
};
