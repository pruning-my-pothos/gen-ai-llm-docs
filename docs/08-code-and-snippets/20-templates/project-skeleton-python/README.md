---
title: "Python LLM Project Skeleton"
archetype: "template"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["project-skeleton", "python", "llm"]
last_reviewed: "2025-12-31"
---

# Python LLM Project Skeleton

This project skeleton provides a ready-to-use Python environment for quickly getting started with Large Language Models (LLMs), particularly those that support the OpenAI API specification (including local servers like Ollama or LM Studio). It includes essential configurations for development, building, and running your LLM applications.

:::info[The Goal: Rapid LLM Development Startup]
The objective is to provide a minimal, yet fully functional, boilerplate that streamlines the setup process, allowing you to focus immediately on your LLM application logic.
:::

---

## Included Files and Their Purpose

-   `main.py`: The main Python entry point, demonstrating a basic LLM chat completion call.
-   `requirements.txt`: Defines project dependencies (`openai`, `python-dotenv`, `tiktoken`, `httpx`).
-   `.env.example`: An example file for managing environment variables (API keys, LLM endpoints) securely.
-   `.gitignore`: Standard exclusions for Python projects (e.g., `__pycache__`, `venv`, `.env`).

---

## Getting Started

Follow these steps to set up and run your Python LLM project:

### 1. Prerequisites

-   **Python**: Version 3.9 or higher.
-   **Local LLM Server (Optional but Recommended)**:
    -   Install [Ollama](https://ollama.com/) and pull a model (e.g., `ollama pull llama3`).
    -   Or, install [LM Studio](https://lmstudio.ai/) and start a local server.
    -   *Related Guide: [OpenAI-Compatible Local LLM Servers](../../16-local-api-patterns/openai-compatible-servers.md)*

### 2. Clone or Copy the Skeleton

Copy the contents of this `project-skeleton-python` directory into your new project folder.

### 3. Set Up Virtual Environment and Install Dependencies

Navigate to your project folder in the terminal and install the required Python packages:

```bash
# Create a virtual environment (if you don't use uv)
python3 -m venv .venv
source .venv/bin/activate # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```
*Related Guide: [Python Setup with uv](../../01-setup-and-installs/python-uv-venv.md) for a faster setup.*

### 4. Configure Environment Variables

Create a `.env` file in the root of your project based on the `.env.example` file.

```ini
# .env (DO NOT COMMIT THIS TO GIT!)
# Replace with your actual API key if using OpenAI directly.
# For local servers, a dummy value like 'ollama' is often sufficient.
OPENAI_API_KEY="ollama" 

# Set this to your local LLM server endpoint.
# Ollama: http://localhost:11434/v1
# LM Studio: http://localhost:1234/v1
LOCAL_LLM_ENDPOINT="http://localhost:11434/v1" 
```
*Related Guide: [Secrets and Environment Variable Hygiene](../../15-safety-and-privacy/secrets-and-env-hygiene.md)*

### 5. Run the Application

```bash
python main.py
```

---

:::tip[Adapt to Your Needs]
This skeleton provides a basic chat completion example. Extend `main.py` to implement more complex LLM interactions, integrate with RAG, or build agents. Remember to adapt the `LOCAL_LLM_ENDPOINT` and model names in `.env` and `main.py` as needed.
:::

:::warning[Security Considerations]
Always ensure that sensitive information like API keys is managed securely via environment variables and never committed to version control. If deploying to production, follow best practices for secret management.
:::
