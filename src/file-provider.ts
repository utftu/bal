import { appendFileWrppaer } from "./append.ts";
import type { LogEnt, Provider } from "./types.ts";

const defaultFormat = (logEnt: LogEnt) => {
  const objToJson: Record<string, any> = {
    level: logEnt.level,
    prefix: logEnt.prefix,
    time: new Date().toISOString(),
    msg: logEnt.message,
    ...logEnt.props,
  };

  if ("error" in logEnt.props) {
    objToJson.error = {
      messgae: logEnt.props.error.message,
      stack: logEnt.props.error.stack,
    };
  }

  if (objToJson.msg === "") {
    delete objToJson.msg;
  }

  if (objToJson.prefix === "") {
    delete objToJson.prefix;
  }

  const json = JSON.stringify(objToJson);

  return json;
};

export type FileProviderOptions = {
  errorPath?: string;
  infoPath: string;
  warnPath?: string;
  debugPath?: string;
};

export class FileProvider implements Provider {
  formatter = defaultFormat;
  private pathsToFiles: {
    errorPath: string;
    debugPath: string;
    warnPath: string;
    infoPath: string;
  };

  constructor({
    errorPath,
    debugPath,
    warnPath,
    infoPath,
  }: FileProviderOptions) {
    this.pathsToFiles = {
      infoPath,
      errorPath: errorPath ?? infoPath,
      warnPath: warnPath ?? infoPath,
      debugPath: debugPath ?? infoPath,
    };

    const self = this;

    this.writer = new WritableStream<LogEnt>({
      async write(logEnt) {
        if (logEnt.level === "info") {
          await self.appendFile(
            self.formatter(logEnt),
            self.pathsToFiles.infoPath
          );
        } else if (logEnt.level === "debug") {
          await self.appendFile(
            self.formatter(logEnt),
            self.pathsToFiles.debugPath
          );
        } else if (logEnt.level === "error") {
          await self.appendFile(
            self.formatter(logEnt),
            self.pathsToFiles.errorPath
          );
        } else if (logEnt.level === "warn") {
          await self.appendFile(
            self.formatter(logEnt),
            self.pathsToFiles.warnPath
          );
        }
      },
    });
  }
  writer: WritableStream<LogEnt>;
  async appendFile(str: string, pathToFile: string) {
    await appendFileWrppaer(pathToFile, str + "\n");
  }
}
