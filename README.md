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
st: status
```

Para comandos compostos ou que precisam de shell, use `!` seguido do comando completo entre aspas:

```
up: "!git fetch && git rebase"
```

Após editar o arquivo, você pode reinstalar os aliases executando `git-alias-flow` novamente.

## Aliases incluídos

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

### Help

- `h` - lista todos os aliases instalados

## Exemplos de uso

```bash
git st              # git status
git cm "mensagem"   # git commit -m "mensagem"
git ck main         # git checkout main
git bc              # git branch
git bcm nome-antigo nome-novo  # git branch -m nome-antigo nome-novo
git ad              # git add .
git pl-bc           # git pull origin (branch atual)
git ps-bc           # git push origin (branch atual)
git h               # mostra ajuda com todos os aliases
```

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
