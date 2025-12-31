---
title: "Secrets and Environment Variable Hygiene"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["security", "secrets", "environment-variables", "hygiene", "python"]
last_reviewed: "2025-12-31"
---

# Secrets and Environment Variable Hygiene

In LLM applications, you frequently interact with external APIs (OpenAI, Hugging Face, Google) or databases, which require API keys, tokens, or credentials (collectively, "secrets"). Hardcoding these secrets directly into your code or committing them to version control is a critical security vulnerability. This guide explains how to manage them safely using environment variables.

:::info[The Goal: Secure Credential Management]
The objective is to keep sensitive information out of your codebase and version control, ensuring that your application can access necessary credentials without exposing them to unauthorized parties.
:::

---

## The Problem: Hardcoded Secrets

Hardcoding secrets leads to:
-   **Security Breaches**: Anyone with access to your codebase (e.g., in a public GitHub repo) can use your keys.
-   **Configuration Drifts**: Changing environments (dev, staging, production) requires code changes.
-   **Auditing Issues**: Difficult to track who used which key when.

---

## The Solution: Environment Variables

Environment variables provide a secure way to store and retrieve configuration information that varies between environments and should not be committed to source control.

### 1. Using `.env` Files (Local Development)

For local development, `.env` files are a common and convenient way to manage environment variables. They are typically placed in the root of your project and are *not* committed to Git.

#### Create a `.env` file

```ini
# .env file (DO NOT COMMIT THIS TO GIT!)

OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
MY_DATABASE_URL="postgresql://user:password@host:port/database"
```

#### Install `python-dotenv`

The `python-dotenv` library helps load these variables into your Python environment.

```bash
pip install python-dotenv
```

#### Load Variables in Python

```python
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Access your API key
openai_api_key = os.getenv("OPENAI_API_KEY")

if openai_api_key:
    print(f"OpenAI API Key loaded (first 5 chars): {openai_api_key[:5]}*****")
else:
    print("OPENAI_API_KEY not found in environment variables.")

# Example of using the loaded key (conceptual)
# import openai
# openai.api_key = openai_api_key
# response = openai.chat.completions.create(...)
```

---

### 2. `.gitignore` Your `.env` Files

It is absolutely critical to add `.env` to your project's `.gitignore` file to prevent accidentally committing sensitive information.

```gitignore
# .gitignore

.env # Ignore all .env files
```
Refer to the [.gitignore Templates](../02-git-basics/gitignore-templates.md) for more comprehensive examples.

---

### 3. Production Environments

For production deployments, `python-dotenv` is generally not used. Instead, environment variables are managed directly by your deployment platform:

-   **Cloud Providers**: AWS (Secrets Manager, Parameter Store), GCP (Secret Manager), Azure (Key Vault).
-   **Container Orchestration**: Kubernetes secrets.
-   **CI/CD Systems**: GitHub Actions secrets, GitLab CI/CD variables.

---

:::tip[Best Practice: `.env.example`]
Create a `.env.example` file (which *is* committed to Git) with placeholder values. This tells other developers what environment variables your project expects without revealing the actual secrets.

```ini
# .env.example

OPENAI_API_KEY="" # Your OpenAI API Key
MY_DATABASE_URL="" # Your database connection string
```
:::

:::warning[Never Hardcode or Commit Secrets]
Treat all API keys and credentials as highly sensitive. Never hardcode them directly into your source code, and ensure they are always excluded from version control. A single leaked key can lead to significant financial and security damage.
:::
