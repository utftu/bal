import { stat } from "node:fs/promises";

async function getFileSize(path: string): Promise<string> {
  const { size } = await stat(path);
  return formatSize(size);
}

function formatSize(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

// build.ts
const entries = [
  { input: "./src/pinod.ts", output: "./dist" },
  { input: "./src/file-provider.ts", output: "./dist" },
];

for (const entry of entries) {
  const result = await Bun.build({
    entrypoints: [entry.input],
    outdir: entry.output,
    target: "node",
    format: "esm",
    env: "disable",
  });

  const path = result.outputs[0]!.path;
  console.log("Output", result.outputs[0]?.path, await getFileSize(path));

  if (!result.success) {
    console.error("❌ Build failed", result.logs);
    process.exit(1);
  }
}
