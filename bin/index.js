#!/usr/bin/env node
import { execSync, spawnSync } from "node:child_process";
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
  let command = trimmedLine.substring(colonIndex + 2).trim();

  if (!alias || !command) {
    continue;
  }

  // Remove aspas do início e fim se existirem
  if ((command.startsWith('"') && command.endsWith('"')) || 
      (command.startsWith("'") && command.endsWith("'"))) {
    command = command.slice(1, -1);
  }

  try {
    // Usa spawnSync para evitar problemas com escape de shell
    const result = spawnSync("git", ["config", "--global", `alias.${alias}`, command], {
      stdio: "pipe"
    });
    
    if (result.error || result.status !== 0) {
      throw new Error(result.stderr?.toString() || "Erro desconhecido");
    }
    
    console.log(`Alias '${alias}' instalado`);
    successCount++;
  } catch (e) {
    console.error(`Erro ao instalar '${alias}'`);
    errorCount++;
  }
}

console.log(`\nPronto! ${successCount} aliases instalados${errorCount > 0 ? `, ${errorCount} falharam` : ""}.`);
