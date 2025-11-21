# git-alias-flow

Instalador automático de aliases Git para aumentar sua produtividade no terminal.

## Instalação

```bash
npm install -g git-alias-flow
```

## Uso

Após a instalação, execute:

```bash
git-alias-flow
```

O comando irá instalar automaticamente todos os aliases Git configurados no arquivo `aliases/aliases.yml` usando `git config --global`.

## Como editar os aliases

Os aliases estão definidos no arquivo `aliases/aliases.yml` no formato:

```
alias: comando
```

Para comandos simples, use apenas o comando:

```
gst: status
```

Para comandos compostos ou que precisam de shell, use `!` seguido do comando completo entre aspas:

```
gup: "!git fetch && git rebase"
```

Após editar o arquivo, você pode reinstalar os aliases executando `git-alias-flow` novamente.

## Aliases incluídos

### Status
- `gst` - git status
- `gss` - git status -s

### Pull/Push
- `gl` - git pull
- `gp` - git push
- `gup` - git fetch && git rebase
- `ggpull` - git pull origin (branch atual)
- `ggpush` - git push origin (branch atual)
- `ggpnp` - git pull origin (branch atual) && git push origin (branch atual)

### Commit
- `gc` - git commit -v
- `gca` - git commit -v -a

### Checkout
- `gco` - git checkout
- `gcm` - git checkout master

### Branch
- `gb` - git branch
- `gba` - git branch -a

### Log
- `glg` - git log --stat --max-count=5
- `glgg` - git log --graph --max-count=5
- `gcount` - git shortlog -sn

### Add/Merge
- `ga` - git add
- `gm` - git merge

### Reset
- `grh` - git reset HEAD
- `grhh` - git reset HEAD --hard

### Cherry-pick
- `gcp` - git cherry-pick

### Diff
- `gdv` - git diff -w | view

### Git SVN
- `gsr` - git svn rebase
- `gsd` - git svn dcommit
- `git-svn-dcommit-push` - git svn dcommit && git push github master:svntrunk

## Desinstalação

Para remover um alias específico:

```bash
git config --global --unset alias.<nome-do-alias>
```

Para listar todos os aliases instalados:

```bash
git config --global --get-regexp alias
```

## Licença

MIT
