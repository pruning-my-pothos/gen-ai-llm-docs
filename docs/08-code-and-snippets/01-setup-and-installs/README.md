---
title: "Setup & Installs"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["setup", "installation", "environment", "index"]
last_reviewed: "2025-12-31"
---

# Setup & Installs

This section provides a series of actionable guides for setting up a robust and efficient local development environment for Generative AI engineering. These snippets cover everything from running local models to managing your Python and Node.js dependencies.

:::info[Goal: A Reproducible Local Environment]
The goal is to enable you to run, test, and develop GenAI applications entirely on your local machine. This is crucial for rapid iteration, offline development, and cost management.
:::

---

## Local Language Model Runtimes

You need a tool to run local LLMs. We cover the two most popular options. You can install both, but you'll typically only run one at a time.

-   [**LM Studio Setup](./lm-studio-setup.md)**: Recommended for beginners or those who prefer a graphical user interface (GUI). It makes it easy to browse, download, and manage models, and includes a point-and-click interface for spinning up an OpenAI-compatible server.
-   [**Ollama Setup](./ollama-setup.md)**: Recommended for developers comfortable with the command line or those looking to automate their workflow. Ollama is lightweight, fast, and exposes a local API server by default, making it ideal for integration into scripts and applications.
-   [**llama.cpp Setup](./llama-cpp-setup.md)**: For advanced users who want to build and run the core inference engine from source. This provides maximum control and performance but requires compilation and manual model management.
-   [**MLX Setup](./mlx-setup.md)**: For users on Apple Silicon (M-series chips) who want to leverage Apple's native MLX framework for optimized performance.

## Programming Environment Setup

Reliable dependency management is critical for reproducibility.

-   [**Python Setup with uv](./python-uv-venv.md)**: The **recommended** approach for Python projects. `uv` is an extremely fast, next-generation packaging tool that replaces `pip` and `venv` with a single, high-performance binary.
-   [**Python Setup with venv and pip](./python-venv-pip.md)**: The traditional, built-in method for managing Python virtual environments. Use this if you don't want to install third-party tooling.
-   [**Node.js with nvm and pnpm](./node-nvm-pnpm.md)**: The recommended setup for Node.js projects. `nvm` allows you to manage multiple Node.js versions, and `pnpm` is a fast and disk-space-efficient package manager.

## Sanity Checks

-   [**Sanity Checks](./sanity-checks.md)**: After setting up your environment, run these simple checks to ensure all tools are installed correctly and can communicate with each other.

:::tip[Recommended Path for Beginners]
1.  Start with [**LM Studio**](./lm-studio-setup.md) to visually explore and download a model.
2.  Set up your Python environment using [**`uv`**](./python-uv-venv.md) for its speed and simplicity.
3.  Run the [**Sanity Checks**](./sanity-checks.md) to confirm everything works.
4.  Once you're comfortable, explore [**Ollama**](./ollama-setup.md) for a more streamlined, command-line-driven workflow.
:::