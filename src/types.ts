import type { Logger } from "./logger.ts";

type Level = "info" | "debug" | "warn" | "error";

export type Formatter = (logEnt: LogEnt) => string;

export type LevelConfig = {
  info: boolean;
  debug: boolean;
  warn: boolean;
  error: boolean;
};

export type Props = Record<string, any>;

export type LogEntInit = {
  level: Level;
  message: any;

  // logger: Logger;
  props: Props;
  prefix: string;
};

// type LogEntError = {
//   level: "error";
//   message: any;

//   logger: Logger;
//   error?: Error;
// };

// type LogEntErrorError = {
//   level: "errorError";
//   error: Error;

//   logger: Logger;
// };

export type LogEnt = LogEntInit;

export type Provider = {
  writer: WritableStream<LogEnt>;
  // formatter: Formatter;
};
