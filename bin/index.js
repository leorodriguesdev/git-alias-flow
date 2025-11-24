#!/usr/bin/env node
import { execSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const aliasesFile = path.join(__dirname, "../aliases/aliases.yml");

// Check if help is requested
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`
git-alias-flow - Automatic Git aliases installer

USAGE:
  git-alias-flow              Installs all configured Git aliases
  git-alias-flow --help, -h   Shows this help message

DESCRIPTION:
  Automatically installs all Git aliases defined in the
  aliases/aliases.yml file using git config --global.

  After installation, you can use the 'h' alias to see the list
  of all available aliases:
  
    git h

EXAMPLES:
  git-alias-flow               Installs aliases
  git h                       Shows help for installed Git aliases

For more information, visit:
  https://www.npmjs.com/package/git-alias-flow
`);
  process.exit(0);
}

if (!fs.existsSync(aliasesFile)) {
  console.error("Aliases file not found.");
  process.exit(1);
}

const content = fs.readFileSync(aliasesFile, "utf-8");
const lines = content.split("\n").filter(l => l.trim().length > 0 && !l.trim().startsWith("#"));

console.log("Installing Git aliases...");

let successCount = 0;
let errorCount = 0;

for (const line of lines) {
  const trimmedLine = line.trim();
  if (!trimmedLine || trimmedLine.startsWith("#")) {
    continue;
  }

  const colonIndex = trimmedLine.indexOf(": ");
  if (colonIndex === -1) {
    continue;
  }

  const alias = trimmedLine.substring(0, colonIndex).trim();
  let command = trimmedLine.substring(colonIndex + 2).trim();

  if (!alias || !command) {
    continue;
  }

  // Remove quotes from start and end if they exist
  if ((command.startsWith('"') && command.endsWith('"')) || 
      (command.startsWith("'") && command.endsWith("'"))) {
    command = command.slice(1, -1);
  }

  try {
    // Use spawnSync to avoid shell escape issues
    const result = spawnSync("git", ["config", "--global", `alias.${alias}`, command], {
      stdio: "pipe"
    });
    
    if (result.error || result.status !== 0) {
      throw new Error(result.stderr?.toString() || "Unknown error");
    }
    
    console.log(`Alias '${alias}' installed`);
    successCount++;
  } catch (e) {
    console.error(`Error installing '${alias}'`);
    errorCount++;
  }
}

console.log(`\nDone! ${successCount} aliases installed${errorCount > 0 ? `, ${errorCount} failed` : ""}.`);
