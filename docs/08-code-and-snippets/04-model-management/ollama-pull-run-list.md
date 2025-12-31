---
title: "Ollama CLI Cheat Sheet"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["models", "ollama", "cli", "cheatsheet"]
last_reviewed: "2025-12-31"
---

# Ollama CLI Cheat Sheet

This is a quick reference for the most common Ollama commands for managing local models. For a full explanation of installation, API usage, and more, please see the complete [Ollama Setup Guide](../01-setup-and-installs/ollama-setup.md).

:::info[A Quick Reference Guide]
This page serves as a compact cheat sheet for users who are already familiar with Ollama's workflow.
:::

---

## Common Model Operations

| Command | Description | Example |
| :--- | :--- | :--- |
| **`ollama pull`** | Download a model from the Ollama library. | `ollama pull llama3` |
| **`ollama list`** | List all models you have downloaded locally. | `ollama list` |
| **`ollama run`** | Start an interactive chat session with a model. | `ollama run llama3` |
| | Run a model with a non-interactive prompt. | `ollama run llama3 "What is 1+1?"` |
| **`ollama rm`** | Remove a local model to free up disk space. | `ollama rm llama3` |
| **`ollama ps`** | Show currently running models. | `ollama ps` |
| **`ollama cp`** | Copy a model to create a new one (e.g., with a new system prompt). | `ollama cp llama3 custom-llama3` |
| **`ollama show`** | Show the details of a model, including its Modelfile. | `ollama show llama3` |
| **`ollama --version`**| Check your Ollama version. | `ollama --version` |

---

:::tip[Next Steps]
To learn how to customize a model's prompt, parameters, and more, check out the guide on [Modelfile Basics](./modelfile-basics-ollama.md).
:::
