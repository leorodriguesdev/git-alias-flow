# git-alias-flow

[![npm version](https://img.shields.io/npm/v/git-alias-flow.svg)](https://www.npmjs.com/package/git-alias-flow)
[![npm downloads](https://img.shields.io/npm/dm/git-alias-flow.svg)](https://www.npmjs.com/package/git-alias-flow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)

> Instalador automático de aliases Git para aumentar sua produtividade no terminal. Instale 27+ aliases Git produtivos com um único comando.

## 🚀 Início Rápido

```bash
npm install -g git-alias-flow
gaf
```

Pronto! Todos os aliases estão instalados e prontos para uso.

## ✨ Funcionalidades

- **Instalação com um comando** - Instale 27+ aliases Git instantaneamente
- **Multiplataforma** - Funciona no Mac, Windows e Linux
- **Zero configuração** - Sem necessidade de configuração, apenas instale e execute
- **Personalizável** - Fácil de editar aliases para corresponder ao seu fluxo de trabalho
- **Focado em produtividade** - Aliases curtos e memoráveis para operações Git diárias
- **Ajuda integrada** - Use `gaf h` para ver todos os aliases disponíveis

## 📦 Instalação

```bash
npm install -g git-alias-flow
```

## 🎯 Uso

Após a instalação, execute:

```bash
gaf
```

O comando irá instalar automaticamente todos os aliases Git configurados no arquivo `aliases/aliases.yml` usando `git config --global`.

### Ver Ajuda

Para ver todos os aliases instalados:

```bash
gaf h
```

Ou use o alias Git diretamente:

```bash
git h
```

## 💡 Por Que Usar?

Cansado de digitar comandos Git longos? `git-alias-flow` fornece um conjunto curado de aliases de produtividade que:

- **Economizam tempo** - Digite `git st` em vez de `git status`
- **Reduzem erros de digitação** - Aliases curtos são mais fáceis de lembrar e digitar
- **Aumentam a produtividade** - Foque em codificar, não em digitar comandos
- **Padronizam o fluxo de trabalho** - Aliases consistentes em todas as suas máquinas

## 📋 Aliases Incluídos

### Status

- `st` - git status
- `ss` - git status -s

### Pull/Push

- `pl` - git pull
- `ps` - git push
- `up` - git fetch && git rebase
- `pl-bc` - git pull origin (branch atual)
- `ps-bc` - git push origin (branch atual)
- `pnp` - git pull origin (branch atual) && git push origin (branch atual)

### Commit

- `c` - git commit -v
- `ca` - git commit -v -a
- `cm` - git commit -m "mensagem"

### Checkout

- `ck` - git checkout
- `ckm` - git checkout master

### Branch

- `bc` - git branch
- `bca` - git branch -a
- `bcm` - git branch -m (renomear branch)

### Log

- `lg` - git log --stat --max-count=5
- `lgg` - git log --graph --max-count=5
- `count` - git shortlog -sn

### Add/Merge

- `a` - git add
- `ad` - git add .
- `m` - git merge

### Reset

- `rh` - git reset HEAD
- `rhh` - git reset HEAD --hard

### Cherry-pick

- `cp` - git cherry-pick

### Diff

- `dv` - git diff -w

### Ajuda

- `h` - lista todos os aliases instalados

## 📖 Exemplos de Uso

```bash
# Status
git st              # git status
git ss              # git status -s

# Commits
git cm "fix: bug"   # git commit -m "fix: bug"
git ca              # git commit -v -a

# Branches
git ck main         # git checkout main
git bc              # git branch
git bcm antigo novo # git branch -m antigo novo

# Adicionar arquivos
git ad              # git add .
git a arquivo.js    # git add arquivo.js

# Pull/Push
git pl-bc           # git pull origin (branch atual)
git ps-bc           # git push origin (branch atual)
git pnp             # pull + push (branch atual)

# Ajuda
gaf h               # mostra ajuda com todos os aliases
```

## 🔧 Como Editar os Aliases

Os aliases estão definidos no arquivo `aliases/aliases.yml` no formato:

```yaml
alias: comando
```

Para comandos simples, use apenas o comando:

```yaml
st: status
```

Para comandos compostos ou que precisam de shell, use `!` seguido do comando completo entre aspas:

```yaml
up: "!git fetch && git rebase"
```

Após editar o arquivo, você pode reinstalar os aliases executando `gaf` novamente.

### Encontrando o arquivo aliases.yml

Se você instalou globalmente via npm, o arquivo está localizado em:

```bash
# macOS/Linux
/usr/local/lib/node_modules/git-alias-flow/aliases/aliases.yml

# Ou encontre com:
npm list -g git-alias-flow
```

## 🗑️ Desinstalação

Para remover um alias específico:

```bash
git config --global --unset alias.<nome-do-alias>
```

Para listar todos os aliases instalados:

```bash
git config --global --get-regexp alias
```

Para desinstalar o pacote:

```bash
npm uninstall -g git-alias-flow
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novos aliases
- Melhorar a documentação
- Enviar pull requests

## 📝 Licença

MIT

## 🔗 Links

- [Pacote npm](https://www.npmjs.com/package/git-alias-flow)
- [Repositório GitHub](https://github.com/leorodriguesdev/git-alias-flow)
- [Reportar um problema](https://github.com/leorodriguesdev/git-alias-flow/issues)

## 🌍 Outros Idiomas

- [English](README.md)

---

**Feito com ❤️ para desenvolvedores que amam produtividade**
