import type { LogEnt, Provider } from "./types.ts";

export class ConsoleProvider implements Provider {
  writer = new WritableStream<LogEnt>({
    write(logEnt) {
      if (logEnt.level === "info") {
        console.log(logEnt.message);
      } else if (logEnt.level === "debug") {
        console.debug(logEnt.message);
      } else if (logEnt.level === "warn") {
        console.warn(logEnt.message);
      } else if (logEnt.level === "error") {
        console.error(logEnt.message);
        if ("error" in logEnt) {
          console.error(logEnt.error);
        }
      }
    },
  });
}
