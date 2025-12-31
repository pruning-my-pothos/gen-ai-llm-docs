---
title: "Model Management"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["models", "management", "index", "workflow"]
last_reviewed: "2025-12-31"
---

# Model Management

This section provides guides on the key concepts and practices for finding, choosing, customizing, and running local Large Language Models effectively.

:::info[Goal: From Selection to Customization]
The goal is to help you choose the smallest, most effective model for your needs, run it efficiently on your local hardware, and build robust applications on top of it.
:::

## Core Concepts and Guides

-   [**Quantization Basics**](./quantization-basics.md): Learn how models are compressed to run on consumer hardware and what the different quantization levels (`Q4_K_M`, `Q8_0`, etc.) mean.

-   [**Model Selection Cheat Sheet**](./model-selection-cheatsheet.md): A practical guide to choosing the right model based on your available RAM, hardware, and primary use case (e.g., coding, chat).

-   [**Context Window Basics**](./context-window-basics.md): Understand what a model's "short-term memory" is, how it's measured in tokens, and why it's a critical factor in application design.

-   [**Ollama CLI Cheat Sheet**](./ollama-pull-run-list.md): A quick reference for the most common Ollama commands for downloading, running, and managing models.

-   [**Ollama Modelfile Basics**](./modelfile-basics-ollama.md): Go beyond the defaults by learning how to create your own custom models with predefined system prompts and parameters using a `Modelfile`.

-   [**Switching Models Without Breaking Your App**](./switching-models-without-breaking-apps.md): Learn key architectural patterns (like Adapters and unifying libraries) to build applications that aren't tied to a single model or API.

:::tip[Recommended Learning Path]
For those new to local LLMs, we recommend reading these guides in the following order to build a strong foundational understanding:
1.  **[Quantization Basics](./quantization-basics.md)**: Understand the core trade-off.
2.  **[Model Selection Cheat Sheet](./model-selection-cheatsheet.md)**: Pick a model that fits your hardware.
3.  **[Context Window Basics](./context-window-basics.md)**: Learn the limits of your model's attention.
4.  **[Ollama CLI Cheat Sheet](./ollama-pull-run-list.md)**: Practice managing your chosen model.
5.  **[Ollama Modelfile Basics](./modelfile-basics-ollama.md)**: Customize your model for a specific task.
6.  **[Switching Models Safely](./switching-models-without-breaking-apps.md)**: Learn how to build for the future.
:::
