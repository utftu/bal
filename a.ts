import { FileProvider } from "pinod/file-provider";
import { createLogger } from "./dist/pinod.ts";

const logger = createLogger();
logger.core.addProvider(new FileProvider({ infoPath: "./hello.txt" }));

// const child = logger.child({ prefix: "/child1", props: { a: "b" } });

// import { FileProvider } from "./dist/types/file-provider.d.ts";

// const a: FileProvider = new FileProvider({ infoPath: "12" });
