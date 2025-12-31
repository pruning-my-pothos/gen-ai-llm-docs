---
title: "Git Basics"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["git", "workflow", "index", "basics"]
last_reviewed: "2025-12-31"
---

# Git Basics

This section provides a collection of actionable guides and snippets for essential Git workflows. Mastering these practices is key to maintaining a clean, professional, and navigable repository, which is especially important in the fast-paced, iterative world of GenAI development.

:::info[Goal: Professional and Clean Version Control]
The goal of these guides is to move beyond just knowing the commands and toward understanding the workflows that lead to a healthy and maintainable codebase.
:::

---

## Core Workflows and Guides

-   [**The Core Git Workflow**](./clone-branch-commit-push.md): A step-by-step guide to the essential, day-to-day cycle of cloning, branching, committing, and pushing changes. This is the foundation for all other Git work.

-   [**Syncing Your Branch: Rebase and Resolve Conflicts**](./pull-rebase-resolve-conflicts.md): Learn how to keep your feature branch up-to-date with the `main` branch using `git rebase`. This guide also provides a clear walkthrough for handling the inevitable merge conflicts.

-   [**Tags, Releases, and Rollbacks**](./tags-releases-rollback.md): Covers how to create version tags to mark official releases and, critically, how to safely undo changes using `git revert` (for shared history) and `git reset` (for local history).

-   [**Git Hygiene for Experimental Work**](./repo-hygiene-for-experiments.md): Experimental work can quickly clutter a repository. This guide offers best practices for using branches, commits, and interactive rebase to explore ideas without making a mess.

-   [**`.gitignore` Templates**](/docs/08-code-and-snippets/02-git-basics/gitignore-templates): A crucial component of any project. This file provides ready-to-use `.gitignore` templates for Python, Node.js, and specific GenAI/ML file types to prevent repository bloat.

:::tip[Clean History is a Team Effort]
A repository with a clean, linear, and well-documented history is a pleasure to work with. It makes finding bugs, understanding features, and collaborating significantly easier. The workflows described here, especially `rebase` and good commit hygiene, are key to achieving that.
:::
