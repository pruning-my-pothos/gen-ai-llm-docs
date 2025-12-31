---
title: "Git Hygiene for Experiments"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["git", "experiments", "workflow", "hygiene", "rebase"]
last_reviewed: "2025-12-31"
---

# Git Hygiene for Experimental Work

Experimental work is common in GenAI projects, but it can lead to a messy repository filled with dead-end branches and meaningless commits. This guide provides best practices for keeping your repository clean while you explore new ideas.

:::info[The Goal: Explore Without the Mess]
The aim is to allow for rapid experimentation without cluttering the project's history. A clean history is easier to navigate, review, and understand.
:::

---

## Tip 1: Use a Branching Convention

Prefix your experimental branches to make them easy to identify and manage. This signals to your team that the branch is temporary and may not be merge-worthy.

**Common Prefixes:**
- `exp/`: For general experiments.
- `spike/`: For time-boxed investigations.
- `sandbox/`: For free-form testing.

```bash
# Example of creating an experimental branch
git checkout -b exp/test-new-prompt-template
```

This makes it easy to list all experiments: `git branch --list 'exp/*'`

---

## Tip 2: Commit with Intent

Avoid generic commit messages like "wip" or "test". Instead, treat each commit as a snapshot of a hypothesis. This preserves your thought process.

**Bad Commit Message:**
```
git commit -m "another test"
```

**Good Commit Message:**
```
git commit -m "exp: Test shorter system prompt to reduce latency"
```

This message explains *why* the change was made, which is invaluable context, even if the experiment is later discarded.

---

## Tip 3: Clean Up with Interactive Rebase

Before sharing your work or opening a pull request, clean up your commit history using an interactive rebase (`git rebase -i`). You can squash multiple small, messy commits into a single, well-defined commit.

1.  Start an interactive rebase on top of the `main` branch.
    ```bash
    # Rebase the last 3 commits
    git rebase -i HEAD~3
    ```
2.  Your editor will open with a list of commits. Mark commits with `s` (or `squash`) to meld them into the commit above them.

    ```
    pick 1a2b3c exp: Initial prompt idea
    s 4d5e6f exp: tweak wording
    s 7g8h9i exp: fix typo
    ```
3.  Save and close the file. Git will then ask you to write a new, single commit message for the combined commits.

---

## Tip 4: Don't Merge Dead Ends

Not all experiments succeed. If an experiment fails or leads to a dead end, the best practice is to **not merge it**. Simply delete the branch.

```bash
# Switch back to the main branch
git checkout main

# Delete the local experimental branch (-D for force delete)
git branch -D exp/test-new-prompt-template

# If you pushed it, delete the remote branch too
git push origin --delete exp/test-new-prompt-template
```

There is no value in merging a failed experiment into your main codebase.

---

## Tip 5: Ignore Data, Models, and Outputs

:::danger[Never Commit Large Files]
Your repository should contain **code**, not data. Committing large files like datasets (`.csv`, `.jsonl`), model weights (`.gguf`, `.safetensors`), or environment files (`.env`) will bloat your repository, making it slow and difficult to work with.

Use a `.gitignore` file to explicitly ignore these files and directories.
:::

**Example `.gitignore` for a GenAI project:**
```gitignore
# Python
.venv/
__pycache__/
*.pyc

# Data
*.csv
*.json
*.jsonl
*.parquet

# Models
*.gguf
*.safetensors
*.onnx
*.pt

# Environment
.env
```
Refer to the [.gitignore Templates](/docs/08-code-and-snippets/02-git-basics/gitignore-templates) for more examples.
