import type { LogEnt, Props, Provider } from "./types.ts";
import { formatToJson } from "./utils.ts";

const formatMessage = (logEnt: LogEnt) => {
  if (logEnt.prefix === "") {
    return logEnt.message;
  }
  return `${logEnt.prefix}: ${logEnt.message}`;
};

const checkObjEmpty = (obj: Props) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

export class ConsoleProviderDev implements Provider {
  writer = new WritableStream<LogEnt>({
    write(logEnt) {
      const formattedMessage = formatMessage(logEnt);
      const props = { ...logEnt.props };
      if (logEnt.level === "info") {
        console.log(formattedMessage);
      } else if (logEnt.level === "debug") {
        console.debug(formattedMessage);
      } else if (logEnt.level === "warn") {
        console.warn(formattedMessage);
      } else if (logEnt.level === "error") {
        console.error(formattedMessage);
        if ("error" in props) {
          console.error(logEnt.props.error);
          delete props.error;
        }
      }

      if (!checkObjEmpty(props)) {
        console.dir(logEnt.props);
      }
    },
  });
}

export class ConsoleProviderProd implements Provider {
  writer = new WritableStream<LogEnt>({
    write(logEnt) {
      const json = formatToJson(logEnt);
      if (logEnt.level === "info") {
        console.log(json);
      } else if (logEnt.level === "debug") {
        console.debug(json);
      } else if (logEnt.level === "warn") {
        console.warn(json);
      } else if (logEnt.level === "error") {
        console.error(json);
      }
    },
  });
}

const NODE_ENV = process.env.NODE_ENV;
export const getConsoleProvider = () => {
  if (NODE_ENV === "production") {
    return new ConsoleProviderProd();
  }
  return new ConsoleProviderDev();
};
