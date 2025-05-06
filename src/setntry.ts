// import type { LogEnt, Provider } from "./types.ts";

// const timeout = 5 * 1000;

// export class SetnryProvider implements Provider {
//   address: string;
//   messages: { level: string; message: string }[] = [];
//   writer: WritableStream<LogEnt>;

//   write(logEnt: LogEnt) {
//     const initLength = this.messages.length;
//     this.messages.push(logEnt);

//     if (initLength > 0) {
//       return;
//     }

//     setTimeout(async () => {
//       await fetch(this.address, {
//         method: "POST",
//       });
//     });
//   }

//   constructor() {
//     const self = this;
//     this.writer = new WritableStream<LogEnt>({
//       write(logEnt) {
//         if (logEnt.level === "info") {
//           console.log(logEnt.message);
//         } else if (logEnt.level === "debug") {
//           console.debug(logEnt.message);
//         } else if (logEnt.level === "warn") {
//           console.warn(logEnt.message);
//         } else if (logEnt.level === "error") {
//           console.error(logEnt.message);
//         } else if (logEnt.level === "errorError") {
//           console.log(logEnt.error);
//         }
//       },
//     });
//   }
// }
