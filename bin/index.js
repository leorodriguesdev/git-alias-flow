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
gaf - Automatic Git aliases installer

USAGE:
  gaf                    Installs all configured Git aliases
  gaf --help, -h         Shows this help message
  gaf h                  Shows help for installed Git aliases

DESCRIPTION:
  Automatically installs all Git aliases defined in the
  aliases/aliases.yml file using git config --global.

  After installation, you can use the 'h' alias to see the list
  of all available aliases:
  
    gaf h

EXAMPLES:
  gaf                    Installs aliases
  gaf h                  Shows help for installed Git aliases

For more information, visit:
  https://www.npmjs.com/package/git-alias-flow
`);
  process.exit(0);
}

// Check if user wants to show Git aliases help
if (process.argv[2] === "h") {
  if (!fs.existsSync(aliasesFile)) {
    console.error("Aliases file not found.");
    process.exit(1);
  }

  const content = fs.readFileSync(aliasesFile, "utf-8");
  const lines = content
    .split("\n")
    .filter((l) => l.trim().length > 0 && !l.trim().startsWith("#"));

  console.log();
  console.log("==============================================");
  console.log("           G I T   H E L P - ALIASES        ");
  console.log("==============================================");
  console.log();

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

    // Skip alias 'h' from the list
    if (alias === "h") {
      continue;
    }

    // Format command for display
    let displayCommand = command;
    if (
      (displayCommand.startsWith('"') && displayCommand.endsWith('"')) ||
      (displayCommand.startsWith("'") && displayCommand.endsWith("'"))
    ) {
      displayCommand = displayCommand.slice(1, -1);
    }

    if (!displayCommand.startsWith("!")) {
      displayCommand = `git ${displayCommand}`;
    } else {
      let cleanCommand = displayCommand.replace(/^!\s*/, "");
      const gitMatches = cleanCommand.match(/git\s+([a-z-]+(?:\s+[a-z-]+)*)/gi);
      if (gitMatches && gitMatches.length > 0) {
        const firstGitCmd = gitMatches[0]
          .replace(/^git\s+/, "")
          .split(/\s+/)
          .slice(0, 3)
          .join(" ");
        displayCommand = `git ${firstGitCmd}`;
      } else if (
        cleanCommand.includes("fetch") &&
        cleanCommand.includes("rebase")
      ) {
        displayCommand = "git fetch && git rebase";
      } else if (cleanCommand.includes("pull origin")) {
        displayCommand = "git pull origin (current branch)";
      } else if (cleanCommand.includes("push origin")) {
        displayCommand = "git push origin (current branch)";
      } else if (cleanCommand.includes("&& git push origin")) {
        displayCommand =
          "git pull origin (current branch) && git push origin (current branch)";
      } else {
        displayCommand = "git <command>";
      }
    }

    console.log(`  ${alias.padEnd(12)} -> ${displayCommand}`);
  }

  console.log();
  console.log("==============================================");
  console.log("      Use gaf h whenever you need help!       ");
  console.log("==============================================");
  console.log();

  process.exit(0);
}

if (!fs.existsSync(aliasesFile)) {
  console.error("Aliases file not found.");
  process.exit(1);
}

const content = fs.readFileSync(aliasesFile, "utf-8");
const lines = content
  .split("\n")
  .filter((l) => l.trim().length > 0 && !l.trim().startsWith("#"));

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

  // Store original command for display (before removing quotes)
  const originalCommand = command;

  // Remove quotes from start and end if they exist (for installation)
  let cleanCommandForInstall = command;
  if (
    (command.startsWith('"') && command.endsWith('"')) ||
    (command.startsWith("'") && command.endsWith("'"))
  ) {
    cleanCommandForInstall = command.slice(1, -1);
  }

  // Skip alias 'h' from installation log (it's the help command)
  const shouldShowInLog = alias !== "h";

  // Format command for display
  let displayCommand = originalCommand;

  // Remove quotes for processing display
  if (
    (displayCommand.startsWith('"') && displayCommand.endsWith('"')) ||
    (displayCommand.startsWith("'") && displayCommand.endsWith("'"))
  ) {
    displayCommand = displayCommand.slice(1, -1);
  }

  if (!displayCommand.startsWith("!")) {
    // Simple git command - add "git " prefix
    displayCommand = `git ${displayCommand}`;
  } else {
    // Shell command - extract the main git command
    // Remove the ! prefix
    let cleanCommand = displayCommand.replace(/^!\s*/, "");

    // Extract git commands
    const gitMatches = cleanCommand.match(/git\s+([a-z-]+(?:\s+[a-z-]+)*)/gi);
    if (gitMatches && gitMatches.length > 0) {
      // Use the first git command found
      const firstGitCmd = gitMatches[0]
        .replace(/^git\s+/, "")
        .split(/\s+/)
        .slice(0, 3)
        .join(" ");
      displayCommand = `git ${firstGitCmd}`;
    } else if (
      cleanCommand.includes("fetch") &&
      cleanCommand.includes("rebase")
    ) {
      displayCommand = "git fetch && git rebase";
    } else if (cleanCommand.includes("pull origin")) {
      displayCommand = "git pull origin (current branch)";
    } else if (cleanCommand.includes("push origin")) {
      displayCommand = "git push origin (current branch)";
    } else {
      displayCommand = "git <command>";
    }
  }

  try {
    // Use spawnSync to avoid shell escape issues
    const result = spawnSync(
      "git",
      ["config", "--global", `alias.${alias}`, cleanCommandForInstall],
      {
        stdio: "pipe",
      }
    );

    if (result.error || result.status !== 0) {
      throw new Error(result.stderr?.toString() || "Unknown error");
    }

    if (shouldShowInLog) {
      console.log(`Alias '${alias}' as '${displayCommand}' installed`);
    } else {
      console.log(`Alias '${alias}' installed`);
    }
    successCount++;
  } catch (e) {
    console.error(`Error installing '${alias}'`);
    errorCount++;
  }
}

console.log(
  `\nDone! ${successCount} aliases installed${
    errorCount > 0 ? `, ${errorCount} failed` : ""
  }.`
);
console.log(`For help use 'gaf h'`);
