---
title: "Python Setup with uv"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["setup", "python", "uv", "venv", "pip"]
last_reviewed: "2025-12-31"
---

# Python Setup with `uv`

This guide explains how to use `uv`, an extremely fast Python package installer and resolver, to manage your project's virtual environments and dependencies.

:::info[What is `uv`?]
`uv` is a next-generation Python packaging tool developed by Astral, the creators of `ruff`. It's written in Rust and is designed to be a drop-in replacement for `pip` and `venv`, but significantly faster. It can speed up your development workflow by orders of magnitude, especially for projects with many dependencies.
:::

---

## 1. Installation

You can install `uv` on macOS, Linux, and Windows using various methods.

```bash
# Using curl (macOS, Linux):
curl -LsSf https://astral.sh/uv/install.sh | sh

# Using pip (all platforms):
pip install uv
```
After installation, add `uv` to your `PATH` if it's not already available. The installer script usually handles this. Verify the installation by checking the version.

```bash
uv --version
```

---

## 2. Creating and Managing Environments

`uv` simplifies the process of creating and activating virtual environments.

### Create a Virtual Environment

Use the `uv venv` command to create a new virtual environment. This is equivalent to `python -m venv`.

```bash
# Create a venv named .venv using python3.11
uv venv -p 3.11

# Or create it with any available python3
uv venv
```

### Activate the Environment

Activate the environment using the `source` command.

```bash
# macOS / Linux
source .venv/bin/activate

# Windows (CMD)
.venv\Scripts\activate.bat

# Windows (PowerShell)
.venv\Scripts\Activate.ps1
```

Once activated, your terminal prompt will change, and `uv` will automatically use this environment.

---

## 3. Installing Packages

`uv`'s `pip` command suite is designed to be a faster version of `pip`.

### Install a Package

Use `uv pip install` to add packages to your active environment.

```bash
# Install a single package
uv pip install requests

# Install multiple packages
uv pip install "fastapi[all]" langchain ollama
```

### Install from a Requirements File

`uv` can install dependencies from `requirements.txt` files, often much faster than `pip`.

```bash
# Create a requirements.txt file
echo "requests==2.31.0" > requirements.txt
echo "fastapi" >> requirements.txt

# Install all packages from the file
uv pip install -r requirements.txt
```

---

## 4. Managing Dependencies

### Freezing Dependencies

Create a `requirements.txt` file from the packages in your current environment.

```bash
uv pip freeze > requirements.txt
```

### Syncing an Environment

The `uv pip sync` command is a powerful feature. It ensures your environment has *exactly* the packages listed in `requirements.txt`, removing any that don't belong and installing any that are missing. This creates perfectly reproducible environments.

```bash
# Sync the environment with requirements.txt
uv pip sync requirements.txt
```

:::tip[Use `sync` for Reproducibility]
Prefer `uv pip sync` over `uv pip install -r` in your CI/CD pipelines and automated scripts to guarantee a clean, consistent environment every time.
:::