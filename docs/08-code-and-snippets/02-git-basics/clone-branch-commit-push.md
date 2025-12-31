---
title: "The Core Git Workflow: Clone, Branch, Commit, Push"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["git", "workflow", "commit", "push", "branch"]
last_reviewed: "2025-12-31"
---

# The Core Git Workflow

This guide covers the fundamental, day-to-day Git workflow: cloning a repository, creating a branch to work on a change, committing your work, and pushing it to a remote repository.

:::info[The Daily Driver Workflow]
This sequence of commands is the most common and essential workflow you will use when contributing to any Git project. Mastering this loop is the first step to effective version control.
:::

---

## The Workflow Step-by-Step

### 1. Clone the Repository

First, create a local copy of the remote repository on your machine. You only need to do this once per project.

```bash
# Replace <repo-url> with the actual URL (e.g., from GitHub)
git clone <repo-url>

# Navigate into your newly created project directory
cd <repo-name>
```

### 2. Create a New Branch

Before making changes, create a new branch. This isolates your work from the main codebase (`main` or `master`) and is standard practice.

-   **Branch Naming**: A good convention is `type/short-description`, e.g., `feature/add-login-button` or `fix/handle-null-users`.

```bash
# The -b flag creates a new branch and checks it out in one step
git checkout -b feature/my-new-feature
```

### 3. Make and Review Your Changes

Now, you can open the project in your code editor and make your changes. As you work, you can check the status of your files.

```bash
# See a summary of which files have been modified
git status -sb

# View the specific line-by-line changes you have made
git diff
```

:::tip[Use `git status` Often]
Run `git status -sb` frequently. It's a quick and easy way to ensure you know the state of your working directory and avoid committing unintended files.
:::

### 4. Stage and Commit Your Changes

Once you're happy with your changes, you need to "stage" them and then "commit" them. Staging lets you choose which changes to include in the next commit.

```bash
# Stage all modified files in the current directory for the next commit
git add .

# Commit the staged files with a descriptive message
git commit -m "feat: Add new feature for user authentication"
git commit -m "fix: Correct calculation in the billing module"
```

:::warning[Writing Good Commit Messages]
-   The first line should be a short summary (about 50 characters or fewer).
-   Use prefixes like `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.
-   This creates a clean, readable history that is easy for others (and you!) to understand.
:::

### 5. Push Your Branch to the Remote

Finally, push your committed changes from your local branch to the remote repository. This makes your branch available to others for review or integration.

```bash
# Push the 'feature/my-new-feature' branch to the 'origin' remote
git push origin feature/my-new-feature
```
The first time you push a new branch, you may need to set the upstream link: `git push --set-upstream origin feature/my-new-feature`. Git usually provides this command for you.

---

## Full Example Sequence

Here is the entire workflow in a single block for quick reference.

```bash
# 1. Get the code
git clone https://github.com/example/my-project.git
cd my-project

# 2. Create your branch
git checkout -b feature/add-user-profile

# ... make your code changes ...

# 3. Check your work
git status -sb
git diff

# 4. Commit your changes
git add .
git commit -m "feat: Add user profile page with avatar and bio"

# 5. Send it for review
git push origin feature/add-user-profile
```
