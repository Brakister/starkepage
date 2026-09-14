import { spawn } from "node:child_process";
import { resolve } from "node:path";

const child = spawn(process.execPath, [resolve("node_modules/eslint/bin/eslint.js"), ".", "--ignore-pattern", "dist", "--ignore-pattern", ".next"], { stdio: "inherit" });

child.on("error", error => {
  console.error(`Could not start ESLint: ${error.message}`);
  process.exitCode = 1;
});

child.on("exit", code => {
  process.exitCode = code ?? 1;
});
