import { createLogger } from "./src/pinod.ts";

const logger = createLogger();
// logger.prefix = "/hello";
// logger.core.providers[1].oneline = false;

logger.error("not error' \" text", new Error("errot text"));
const child = logger.child({ prefix: "/child1", props: { a: "b" } });
child.log("");

// const error = new Error("hello");

// const json = JSON.stringify(
//   {
//     message: error.message,
//     stack: error.stack,
//   },
//   null,
//   2
// );

// console.log("-----", "json", json);

// console.error("");
// console.error(new Error("hello"));
// console.log("-----", "1");
// console.log(error);
// console.log("-----", "2");
// console.log(error.stack + "");
