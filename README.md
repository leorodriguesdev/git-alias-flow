# git-alias-flow

Automatic installer for Git aliases to boost your terminal productivity.

## Installation

```bash
npm install -g git-alias-flow
```

## Usage

After installation, run:

```bash
git-alias-flow
```

The command will automatically install all Git aliases configured in the `aliases/aliases.yml` file using `git config --global`.

## How to edit aliases

Aliases are defined in the `aliases/aliases.yml` file in the format:

```
alias: command
```

For simple commands, use just the command:

```
st: status
```

For compound commands or those that need shell, use `!` followed by the complete command in quotes:

```
up: "!git fetch && git rebase"
```

After editing the file, you can reinstall the aliases by running `git-alias-flow` again.

## Included aliases

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

## Usage examples

```bash
git st              # git status
git cm "message"    # git commit -m "message"
git ck main         # git checkout main
git bc              # git branch
git bcm old-name new-name  # git branch -m old-name new-name
git ad              # git add .
git pl-bc           # git pull origin (current branch)
git ps-bc           # git push origin (current branch)
git h               # shows help with all aliases
```

## Uninstallation

To remove a specific alias:

```bash
git config --global --unset alias.<alias-name>
```

To list all installed aliases:

```bash
git config --global --get-regexp alias
```

## Other languages

- [Português (Brasil)](README.pt-BR.md)

## License

MIT
