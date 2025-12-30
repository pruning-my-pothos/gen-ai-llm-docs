# Clone / Branch / Commit / Push (quick flow)

## Clone
```bash
git clone <repo-url>
cd <repo-name>
```

## New branch
```bash
git checkout -b feature/my-change
```

## Status & diff
```bash
git status -sb
git diff          # view changes
```

## Stage & commit
```bash
git add .
git commit -m "Describe the change"
```

## Push
```bash
git push origin feature/my-change
```

Use `git status -sb` often to avoid surprises. In VSCode, the Source Control panel surfaces the same steps.***
