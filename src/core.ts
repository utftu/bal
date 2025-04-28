import { ConsoleProvider } from "./console-provider.ts";
import { FileProvider } from "./file-provider.ts";
import type { LogEnt, Provider } from "./types.ts";

export class LoggerCore {
  loggerStreams: TransformStream<LogEnt, LogEnt> = new TransformStream();
  private providers: Provider[] = [
    new ConsoleProvider(),
    new FileProvider("./a/hello.txt"),
  ];

  constructor(providers: Provider[] = []) {
    this.providers = providers;
  }

  addProvider(provider: Provider) {
    this.providers.push(provider);
  }

  write(logEnt: LogEnt) {
    for (const provider of this.providers) {
      const writer = provider.writer.getWriter();
      writer.write(logEnt);
      writer.releaseLock();
    }
  }
}
