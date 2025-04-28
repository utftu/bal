import { appendFileWrppaer } from "./append.ts";
import type { LogEnt, Provider } from "./types.ts";

export class FileProvider implements Provider {
  private pathToFile: string;
  private oneline: boolean;
  constructor(pathToFile: string, oneline = true) {
    this.pathToFile = pathToFile;
    this.oneline = oneline;
    const self = this;

    this.writer = new WritableStream<LogEnt>({
      async write(logEnt) {
        let dataToStringify: any;

        if (logEnt.level === "error" && "error" in logEnt) {
          dataToStringify = {
            level: logEnt.level,
            message: logEnt.message,
            error: {
              message: logEnt.error?.message,
              stare: logEnt.error?.stack,
            },
          };
        } else {
          dataToStringify = logEnt;
        }

        const json = JSON.stringify(
          dataToStringify,
          null,
          self.oneline ? 0 : 2
        );

        await appendFileWrppaer(self.pathToFile, json + "\n");
      },
    });
  }
  writer: WritableStream<LogEnt>;
}
