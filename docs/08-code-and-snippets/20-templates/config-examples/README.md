---
title: "Config Examples"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["configuration", "templates", "index", "code-snippets"]
last_reviewed: "2025-12-31"
---

# Config Examples

This directory provides example configuration file templates for various aspects of building LLM applications. Using external configuration files helps separate environmental details and dynamic settings from your core application logic, making your projects more flexible, portable, and easier to manage across different environments.

:::info[Goal: Declarative Application Setup]
The objective is to define the behavior and parameters of your LLM components (e.g., API endpoints, RAG pipelines, agent settings, batch jobs) using clear, declarative configuration files that can be easily updated without code changes.
:::

## Configuration Templates

-   [**LLM API Configuration Example (`llm-api-config.yaml`)**](./llm-api-config.yaml): A YAML template for defining and managing various LLM API endpoints, including local servers (Ollama, LM Studio), cloud providers (OpenAI), and custom models.

-   [**RAG Pipeline Configuration Example (`rag-pipeline-config.json`)**](./rag-pipeline-config.json): A JSON template to declaratively set up a Retrieval-Augmented Generation (RAG) pipeline, covering data sources, chunking strategies, embedding models, vector stores, and generation LLM parameters.

-   [**LLM Agent Configuration Example (`agent-config.yaml`)**](./agent-config.yaml): A YAML template for defining the behavior, available tools, stop conditions, and safety guards for an LLM agent, allowing for flexible agent deployment.

-   [**Batch Data Processing Configuration Example (`data-processing-config.json`)**](./data-processing-config.json): A JSON template for configuring automated batch processing tasks with LLMs, including input/output specifications, LLM task prompts, and parallelism settings.

:::tip[Configuration as Code]
Treat your configuration files as code. Store them in version control, and consider having different configuration sets for development, staging, and production environments to maintain flexibility and ensure proper environment-specific settings.
:::