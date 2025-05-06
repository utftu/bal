// build.ts
const entries = [
  { input: "./src/pinod.ts", output: "./dist" },
  { input: "./src/file-provider.ts", output: "./dist" },
];

for (const entry of entries) {
  console.log(`📦 Building ${entry.input}...`);
  const result = await Bun.build({
    entrypoints: [entry.input],
    outdir: entry.output,
    target: "node",
    format: "esm",
    minify: false,
    env: "disable",
  });

  if (!result.success) {
    console.error("❌ Build failed", result.logs);
    process.exit(1);
  }
}

console.log("📄 Generating .d.ts files...");
const { spawn } = Bun;
const proc = spawn(["tsc", "--emitDeclarationOnly"]);
const code = await proc.exited;

if (code !== 0) {
  console.error("❌ Type generation failed");
  process.exit(1);
}

console.log("✅ Build complete!");
