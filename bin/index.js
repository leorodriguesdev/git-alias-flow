#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const aliasesFile = path.join(__dirname, "../aliases/aliases.yml");

if (!fs.existsSync(aliasesFile)) {
  console.error("Arquivo de aliases não encontrado.");
  process.exit(1);
}

const content = fs.readFileSync(aliasesFile, "utf-8");
const lines = content.split("\n").filter(l => l.trim().length > 0 && !l.trim().startsWith("#"));

console.log("Instalando aliases Git...");

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
  const command = trimmedLine.substring(colonIndex + 2).trim();

  if (!alias || !command) {
    continue;
  }

  try {
    execSync(`git config --global alias.${alias} "${command}"`, { stdio: "pipe" });
    console.log(`Alias '${alias}' instalado`);
    successCount++;
  } catch (e) {
    console.error(`Erro ao instalar '${alias}'`);
    errorCount++;
  }
}

console.log(`\nPronto! ${successCount} aliases instalados${errorCount > 0 ? `, ${errorCount} falharam` : ""}.`);
