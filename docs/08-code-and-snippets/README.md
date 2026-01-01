---
title: "Code & Snippets"
archetype: "reference"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["code", "snippets", "setup", "git", "genai"]
last_reviewed: "2025-12-28"
slug: /08-code-and-snippets/
---

# Code & Snippets Index

:::info[Purpose]
For beginners and non-devs: short, runnable references to set up local environments, manage git, count tokens, run RAG, and keep outputs safe and structured. Each subfolder is bite-sized—copy/paste commands and minimal code with sanity checks.
:::

## Navigation

- **01-setup-and-installs**: Python/Node envs, local model tools (Ollama, llama.cpp, LM Studio, MLX), quick sanity checks.
- **02-git-basics**: Clone/branch/commit/push, rebase/conflicts, tags/rollback, gitignore hygiene.
- **03-cli-and-shell-essentials**: Paths/env vars, curl/jq/rg, files/search, HTTP basics, Make/Just.
- **04-model-management**: Pick/pull/run models, quantization, context windows, switching safely.
- **05-token-counting**: Python/Node token estimates, budgeting, cost/latency tradeoffs.
- **06-context-hygiene**: Ordering, trimming/summarizing, budget enforcement, dedupe, injection red flags.
- **07-prompting-patterns**: Task specs, few-shot, critique/revise, tool-use instructions, refusal/scope control.
- **08-structured-output**: JSON mode vs schema, function calling, enums/constraints, repairing partial output.
- **09-output-validation-and-guards**: jsonschema, regex guards, retry on invalid, deterministic settings, safe fallbacks.
- **10-rag-mini**: Ingest/chunk/embed, local vector options, retrieve/cite, rerank, failure modes.
- **11-embeddings-and-vector-ops**: Local embeddings, similarity metrics, quick retrieval eval, vector DB cheatsheet.
- **12-eval-and-regression-mini**: Golden prompts, pass/fail scoring, diff runs/reporting, hallucination checks, retrieval eval.

# Code & Snippets

This section is for beginners and non-developers who need to **understand** and occasionally **run** minimal code to make better decisions and debug GenAI/LLM workflows. Everything here is short, annotated, and runnable locally.

## What You'll Find

- Quick setup/install commands (Python/Node, common GenAI libs).
- Git basics for working locally (CLI or VSCode).
- Minimal, copy/paste snippets for tokens, RAG, structured output, safety prompts.
- Troubleshooting tips for common errors.

## How to Use

1. Start with **Setup & Installs** and **Git Basics** to get your environment ready.
2. Use **Token Counting**, **RAG Mini**, and **Structured Output** to understand the core building blocks.
3. Apply **Safety & Prompts** to reduce hallucinations and scope creep.
4. Refer to **Troubleshooting** when something breaks.

## Next Step

Begin with [Setup & Installs](/docs/08-code-and-snippets/01-setup-and-installs/) to prepare your environment.
