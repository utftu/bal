type Level = "info" | "debug" | "warn" | "error";

export type LevelConfig = {
  info: boolean;
  debug: boolean;
  warn: boolean;
  error: boolean;
};

export type LogEntInit = {
  level: Level;
  message: string;
};

type LogEntError = LogEntInit & {
  error?: Error;
};

export type LogEnt = LogEntInit | LogEntError;

export type Provider = {
  writer: WritableStream<LogEnt>;
};
