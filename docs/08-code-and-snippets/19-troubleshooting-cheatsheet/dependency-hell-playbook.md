---
title: "Dependency Hell Playbook for Python"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["troubleshooting", "python", "dependencies", "virtualenv"]
last_reviewed: "2025-12-31"
---

# Dependency Hell Playbook for Python

"Dependency hell" is a common affliction for Python developers, especially when managing multiple projects with conflicting package requirements. This typically manifests as errors during installation, runtime crashes due to incompatible versions, or unexpected behavior. This playbook provides a structured approach to diagnose and resolve these frustrating issues.

:::info[The Goal: Stable and Isolated Environments]
The objective is to ensure your Python projects have stable, isolated, and reproducible environments where all dependencies are correctly installed and compatible.
:::

---

## The Problem: Conflicting Requirements

-   **Version Conflicts**: Package A requires `requests==2.20`, but Package B requires `requests>=2.25`.
-   **Transitive Dependencies**: Conflicts arise from packages that your direct dependencies rely on.
-   **Global vs. Virtual**: Using the system's global Python environment, leading to clashes between project needs.

---

## The Playbook: Diagnosing and Fixing

### Step 1: Always Use Virtual Environments

This is the golden rule. Virtual environments isolate your project's dependencies from other projects and the system Python.

-   **Check if active**:
    ```bash
    which python # Should point to a path within your .venv/
    echo $VIRTUAL_ENV # Should display your .venv path
    ```
-   **Fix**: If not active, activate it:
    ```bash
    source .venv/bin/activate # macOS/Linux
    .venv\Scripts\activate    # Windows (Command Prompt)
    ```
-   *Related Guide: [Python Setup with uv](./../01-setup-and-installs/python-uv-venv.md)*

### Step 2: Inspect Installed Packages

Understand what's currently in your environment.

-   **List all packages and versions**:
    ```bash
    pip freeze > installed_packages.txt
    cat installed_packages.txt
    ```
-   **Check for broken dependencies**: `pip check` inspects your installed packages for dependencies that are unmet or have incorrect versions.
    ```bash
    pip check
    # Expected: No broken requirements found.
    ```

### Step 3: Use a Strict `requirements.txt`

A `requirements.txt` file should precisely define your project's direct dependencies. Use `uv` for robust installation.

-   **Install from requirements**:
    ```bash
    uv pip install -r requirements.txt
    ```
-   **Generate precise requirements**: After you get a working environment, save its exact state:
    ```bash
    uv pip freeze > requirements.lock # Use .lock for reproducible installs
    ```
-   *Related Guide: [Python Setup with uv](./../01-setup-and-installs/python-uv-venv.md)*

### Step 4: Visualize Dependency Tree (Optional)

For complex conflicts, seeing the dependency graph can help pinpoint the root cause.

-   **Install**: `pip install pipdeptree`
-   **Run**: `pipdeptree`

### Step 5: Clean Reinstallation (The Most Reliable Fix)

If you're deeply in dependency hell, the fastest solution is often to start fresh.

-   **Deactivate**: `deactivate` (if active)
-   **Remove old environment**:
    ```bash
    rm -rf .venv # macOS/Linux
    rmdir /s /q .venv # Windows (Command Prompt)
    ```
-   **Recreate and reinstall**:
    ```bash
    uv venv           # Create new venv
    source .venv/bin/activate # Activate
    uv pip install -r requirements.txt # Install from your known good list
    ```

---

:::tip[Pin Your Versions]
Always pin your direct dependencies to exact versions in `requirements.txt` (`package==1.2.3`). For development, `uv pip compile` can help generate a fully pinned `requirements.lock` file including transitive dependencies for perfect reproducibility.
:::

:::warning[Avoid Global Installs]
Never use `sudo pip install` or install packages directly into your system's Python. This can break system tools that rely on specific Python versions and packages. Always use virtual environments.
:::