import { LoggerCore } from "./core.ts";
import type { LevelConfig, Provider } from "./types.ts";

export type LoggerProps = {
  providers?: Provider[];
  prefix?: string;
  core?: LoggerCore;
};

export class Logger {
  core: LoggerCore;
  prefix: string;

  levelConfig: LevelConfig = {
    info: true,
    debug: true,
    warn: true,
    error: true,
  };

  constructor({ prefix = "", core }: LoggerProps) {
    this.core = core ?? new LoggerCore();
    this.prefix = prefix;
  }

  log(text: string) {
    if (this.levelConfig.info === false) {
      return;
    }
    this.core.write({ level: "info", message: this.prefix + text });
  }
  debug(text: string) {
    if (this.levelConfig.debug === false) {
      return;
    }
    this.core.write({ level: "debug", message: this.prefix + text });
  }
  warn(text: string) {
    if (this.levelConfig.warn === false) {
      return;
    }
    this.core.write({ level: "warn", message: this.prefix + text });
  }

  error(text: string): void;
  error(error: Error): void;
  error(text: string, error: Error): void;
  error(textOrError: string | Error, maybeError?: Error): void {
    if (this.levelConfig.error === false) {
      return;
    }

    if (textOrError instanceof Error) {
      // Если первый аргумент — ошибка
      this.core.write({
        level: "error",
        message: this.prefix + textOrError.message,
        error: textOrError,
      });
    } else {
      // Первый аргумент — текст
      if (maybeError instanceof Error) {
        this.core.write({
          level: "error",
          message: this.prefix + textOrError,
          error: maybeError,
        });
      } else {
        this.core.write({ level: "error", message: this.prefix + textOrError });
      }
    }
  }
}

export const copyLogger = (logger: Logger) => {
  const newLogger = new Logger({
    prefix: logger.prefix,
    core: logger.core,
  });
  newLogger.levelConfig = logger.levelConfig;
  return newLogger;
};
