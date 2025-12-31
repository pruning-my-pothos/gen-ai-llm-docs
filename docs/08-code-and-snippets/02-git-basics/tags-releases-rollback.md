---
title: "Tags, Releases, and Rollbacks"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["git", "tag", "release", "rollback", "revert", "reset"]
last_reviewed: "2025-12-31"
---

# Tags, Releases, and Rollbacks

This guide covers how to mark specific points in your repository's history using tags (ideal for releases) and how to safely undo changes when things go wrong.

:::info[What are Tags?]
A Git tag is a permanent, named pointer to a specific commit. Tags are typically used to mark release points in your project, such as `v1.0.0` or `v2.1-beta`. This makes it easy to check out the exact state of your code for a given release.
:::

---

## Creating and Pushing Tags for Releases

It's best practice to use "annotated" tags for releases because they are stored as full objects in the Git database and can include a message, author, and date.

### 1. Create an Annotated Tag

First, ensure you are on the branch and commit you want to tag (e.g., your `main` branch after merging a feature).

```bash
# The -a flag creates an annotated tag
# The -m flag provides a message for the tag
git tag -a v1.0.0 -m "Initial stable release"
```

### 2. Push Tags to the Remote

By default, `git push` does not send tags to the remote repository. You must push them explicitly.

```bash
# Push all of your local tags to the 'origin' remote
git push origin --tags
```

---

## Rollback Strategy 1: `git revert` (The Safe Method)

`git revert` is the safest way to undo changes, especially on a shared branch, because it **does not rewrite history**. Instead, it creates a new commit that applies the inverse of the changes from a specified commit.

Use this method to undo a commit that has already been pushed and shared with others.

### How to Use `git revert`

1.  Find the hash of the commit you want to undo using `git log`.
2.  Use `git revert` with the commit hash.

```bash
# This will create a NEW commit that undoes the changes from the specified commit
git revert <commit-hash-to-undo>

# Example:
# git revert a1b2c3d4

# After reverting, push the new commit
git push origin main
```

The problematic commit (`a1b2c3d4`) remains in the project history, but a new commit (`e5f6g7h8`) is created that reverses its effects. This maintains a clear and honest history of what happened.

---

## Rollback Strategy 2: `git reset` (For Local Changes)

`git reset` is a more powerful and dangerous command that **rewrites commit history**. It should be used with caution and typically **only on local branches that you have not yet shared**.

:::danger[Use `reset` with Extreme Caution]
Never use `git reset` on a branch that other people are working on (like `main`). Rewriting shared history will cause major problems for your collaborators.
:::

The most common use case is to "undo" commits you just made on your local feature branch before pushing.

### How to Use `git reset`

Imagine you made two commits on your feature branch, but you realize they are wrong and you want to discard them completely.

```bash
# This will permanently delete the last two commits from your branch history
# Your local files will be reset to match the state of 'origin/main'
git reset --hard HEAD~2
```

-   `--hard`: This flag means your local files will be changed to reflect the state of the commit you are resetting to. Any uncommitted work will be lost.
-   `HEAD~2`: This points to the commit two steps before the current one.

---

:::tip[When to Use `revert` vs. `reset`]
-   **Use `git revert`** when you need to undo changes on a **public or shared** branch. It's safe and preserves history.
-   **Use `git reset`** when you need to clean up your **private, local** branch history before sharing it with others.
:::