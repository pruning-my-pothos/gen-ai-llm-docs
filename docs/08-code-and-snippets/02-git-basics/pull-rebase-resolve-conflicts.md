---
title: "Syncing Your Branch: Rebase and Resolve Conflicts"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["git", "rebase", "conflict", "synchronize", "workflow"]
last_reviewed: "2025-12-31"
---

# Syncing Your Branch: Rebase and Resolve Conflicts

This guide explains how to keep your feature branch up-to-date with the `main` branch, how to handle merge conflicts when they arise, and the importance of using `rebase` for a clean project history.

:::info[Why Keep Your Branch Updated?]
Syncing your branch frequently with the `main` branch integrates the latest changes from your team into your work. This practice helps you discover and resolve conflicts early, making the final merge of your feature much smoother and less complex.
:::

---

## The Rebase Workflow

Rebasing is the process of moving the entire history of your feature branch to start on top of the latest commit from the `main` branch. This creates a clean, linear history.

### Step 1: Fetch Latest Changes

First, fetch the latest changes from the remote repository. This downloads all the new commits from `origin` but does not yet integrate them into your local branches.

```bash
# Fetches all remote branches and their latest commits
git fetch origin
```

### Step 2: Rebase Your Branch

With the latest changes fetched, you can now rebase your current feature branch on top of the `main` branch from the remote (`origin/main`).

```bash
# Assuming you are on your feature branch (e.g., 'feature/my-cool-feature')
git rebase origin/main
```

**What is happening?** Git rewinds the commits you made on your branch, fast-forwards your branch to match `origin/main`, and then replays your unique commits one-by-one on top of the new starting point.

:::tip[`git pull --rebase`]
A common shortcut that combines `git fetch` and `git rebase` is `git pull --rebase origin main`. This performs both steps in a single command.
:::

---

## Handling Merge Conflicts

If you and another person changed the same part of the same file, Git will pause the rebase and ask you to resolve the conflict.

### Step 1: Identify the Conflict

Git will clearly tell you which file has a conflict. When you open the file, you will see conflict markers:

```
Here is some code that has no conflict.
<<<<<<< HEAD
This is your change.
=======
This is the conflicting change from the main branch.
>>>>>>> <commit-hash-from-main>
More code without conflict.
```

### Step 2: Resolve the Conflict

Your task is to edit the file to remove the markers and leave only the correct, final code. You might keep your change, the other change, or a combination of both.

**Resolved Code:**
```
Here is some code that has no conflict.
This is the final, correct version of the code that combines both changes.
More code without conflict.
```

### Step 3: Stage the Change and Continue

After you've saved the file with the resolved conflict, you must stage it to tell Git you're done. Then, continue the rebase.

```bash
# Stage the file(s) you just fixed
git add path/to/conflicted/file.js

# Continue the rebase process
git rebase --continue
```

:::danger[The Escape Hatch]
If you get overwhelmed or make a mistake, you can always safely abort the entire rebase and return to your original state before you started.

```bash
git rebase --abort
```
:::

---

## Pushing After a Rebase

Because rebasing rewrites the commit history of your branch, a standard `git push` will be rejected. You must "force push".

:::warning[Use `--force-with-lease`]
A standard `git push --force` is dangerous because it can overwrite remote work. The safer alternative is `git push --force-with-lease`. This command will fail if someone else has pushed new commits to the remote branch while you were rebasing, preventing you from accidentally deleting their work.

```bash
# ONLY use this on your own feature branch after a rebase
git push --force-with-lease origin feature/my-cool-feature
```

**Never force push to a shared branch like `main` or `develop`.**
:::
