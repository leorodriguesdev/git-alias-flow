#!/usr/bin/env node
import { execSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const aliasesFile = path.join(__dirname, "../aliases/aliases.yml");

// Verifica se é pedido help
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`
git-alias-flow - Instalador automático de aliases Git

USO:
  git-alias-flow              Instala todos os aliases Git configurados
  git-alias-flow --help, -h    Mostra esta mensagem de ajuda

DESCRIÇÃO:
  Instala automaticamente todos os aliases Git definidos no arquivo
  aliases/aliases.yml usando git config --global.

  Após a instalação, você pode usar o alias 'gh' para ver a lista
  de todos os aliases disponíveis:
  
    git gh

EXEMPLOS:
  git-alias-flow               Instala os aliases
  git gh                       Mostra ajuda dos aliases Git instalados

Para mais informações, visite:
  https://www.npmjs.com/package/git-alias-flow
`);
  process.exit(0);
}

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
