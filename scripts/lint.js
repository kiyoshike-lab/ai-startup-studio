import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const files = [
  "index.html",
  "src/llmClient.js",
  "src/main.js",
  "src/styles.css",
  "scripts/build.js",
  "scripts/dev-server.js",
  "scripts/lint.js"
];

const failures = [];

for (const file of files) {
  const source = readFileSync(join(process.cwd(), file), "utf8");

  if (source.includes("\t")) {
    failures.push(`${file}: tabs are not allowed`);
  }

  if (/[ \t]$/m.test(source)) {
    failures.push(`${file}: trailing whitespace found`);
  }

  if (!source.endsWith("\n")) {
    failures.push(`${file}: missing final newline`);
  }

  if (file.endsWith(".js")) {
    const check = spawnSync(process.execPath, ["--check", join(process.cwd(), file)], {
      encoding: "utf8"
    });

    if (check.status !== 0) {
      failures.push(`${file}: ${(check.stderr || check.stdout).trim()}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Lint completed");
