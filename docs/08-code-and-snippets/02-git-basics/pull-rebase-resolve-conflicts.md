# Pull, Rebase, Resolve Conflicts (safe sync)

## Update your branch
```bash
git pull --rebase origin main
```

## If conflicts appear
1) Open conflicted files and remove `<<<<<<<`, `=======`, `>>>>>>>` markers, keeping the correct code.
2) Stage fixed files:
```bash
git add <file> ...
```
3) Continue rebase:
```bash
git rebase --continue
```
If you need to abort:
```bash
git rebase --abort
```

## Push after rebase
If you already pushed before rebasing, you may need:
```bash
git push origin <branch> --force-with-lease
```
Use `--force-with-lease` (safer) only when necessary.
