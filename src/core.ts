import { getConsoleProvider } from "./console-provider.ts";
import type { LogEnt, Provider } from "./types.ts";

const defaultProviders = [getConsoleProvider()];

export class LoggerCore {
  loggerStreams: TransformStream<LogEnt, LogEnt> = new TransformStream();
  private providers: Provider[];

  constructor(providers: Provider[] = defaultProviders) {
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
