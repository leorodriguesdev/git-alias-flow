# git-alias-flow

[![npm version](https://img.shields.io/npm/v/git-alias-flow.svg)](https://www.npmjs.com/package/git-alias-flow)
[![npm downloads](https://img.shields.io/npm/dm/git-alias-flow.svg)](https://www.npmjs.com/package/git-alias-flow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)

> Automatic installer for Git aliases to boost your terminal productivity. Install 27+ productivity Git aliases with a single command.

## 🚀 Quick Start

```bash
npm install -g git-alias-flow
gaf
```

That's it! All aliases are now installed and ready to use.

## ✨ Features

- **One-command installation** - Install 27+ Git aliases instantly
- **Cross-platform** - Works on Mac, Windows, and Linux
- **Zero configuration** - No setup required, just install and run
- **Customizable** - Easy to edit aliases to match your workflow
- **Productivity focused** - Short, memorable aliases for daily Git operations
- **Built-in help** - Use `gaf h` to see all available aliases

## 📦 Installation

```bash
npm install -g git-alias-flow
```

## 🎯 Usage

After installation, run:

```bash
gaf
```

The command will automatically install all Git aliases configured in the `aliases/aliases.yml` file using `git config --global`.

### View Help

To see all installed aliases:

```bash
gaf h
```

Or use the Git alias directly:

```bash
git h
```

## 💡 Why Use This?

Tired of typing long Git commands? `git-alias-flow` provides a curated set of productivity aliases that:

- **Save time** - Type `git st` instead of `git status`
- **Reduce typos** - Short aliases are easier to remember and type
- **Boost productivity** - Focus on coding, not typing commands
- **Standardize workflow** - Consistent aliases across all your machines

## 📋 Included Aliases

### Status

- `st` - git status
- `ss` - git status -s

### Pull/Push

- `pl` - git pull
- `ps` - git push
- `up` - git fetch && git rebase
- `pl-bc` - git pull origin (current branch)
- `ps-bc` - git push origin (current branch)
- `pnp` - git pull origin (current branch) && git push origin (current branch)

### Commit

- `c` - git commit -v
- `ca` - git commit -v -a
- `cm` - git commit -m "message"

### Checkout

- `ck` - git checkout
- `ckm` - git checkout master

### Branch

- `bc` - git branch
- `bca` - git branch -a
- `bcm` - git branch -m (rename branch)

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

### Help

- `h` - lists all installed aliases

## 📖 Usage Examples

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
git bcm old new     # git branch -m old new

# Add files
git ad              # git add .
git a file.js       # git add file.js

# Pull/Push
git pl-bc           # git pull origin (current branch)
git ps-bc           # git push origin (current branch)
git pnp             # pull + push (current branch)

# Help
gaf h               # shows help with all aliases
```

## 🔧 How to Edit Aliases

Aliases are defined in the `aliases/aliases.yml` file in the format:

```yaml
alias: command
```

For simple commands, use just the command:

```yaml
st: status
```

For compound commands or those that need shell, use `!` followed by the complete command in quotes:

```yaml
up: "!git fetch && git rebase"
```

After editing the file, you can reinstall the aliases by running `gaf` again.

### Finding the aliases.yml file

If you installed globally via npm, the file is located at:

```bash
# macOS/Linux
/usr/local/lib/node_modules/git-alias-flow/aliases/aliases.yml

# Or find it with:
npm list -g git-alias-flow
```

## 🗑️ Uninstallation

To remove a specific alias:

```bash
git config --global --unset alias.<alias-name>
```

To list all installed aliases:

```bash
git config --global --get-regexp alias
```

To uninstall the package:

```bash
npm uninstall -g git-alias-flow
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new aliases
- Improve documentation
- Submit pull requests

## 📝 License

MIT

## 🔗 Links

- [npm package](https://www.npmjs.com/package/git-alias-flow)
- [GitHub repository](https://github.com/leorodriguesdev/git-alias-flow)
- [Report an issue](https://github.com/leorodriguesdev/git-alias-flow/issues)

## 🌍 Other Languages

- [Português (Brasil)](README.pt-BR.md)

---

**Made with ❤️ for developers who love productivity**
