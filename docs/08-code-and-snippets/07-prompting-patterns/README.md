---
title: "Prompting Patterns"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["prompt-engineering", "patterns", "index"]
last_reviewed: "2025-12-31"
---

# Prompting Patterns

Prompt engineering is the art and science of crafting effective prompts to guide Large Language Models (LLMs) toward desired outputs. This section provides a collection of proven prompting patterns, from fundamental techniques to advanced strategies for self-correction and external tool use.

:::info[Goal: Master the Art of Conversation with LLMs]
The objective is to equip you with a toolkit of prompting patterns that you can apply to various tasks, leading to more accurate, consistent, and reliable LLM responses.
:::

## Guides and Snippets

-   [**Few-shot Prompting (Minimal)**](./few-shot-minimal.md): Learn how to provide a few examples directly in your prompt to teach the model a desired pattern or task, significantly improving its performance.

-   [**Critique and Revise Loop**](./critique-and-revise-loop.md): An advanced pattern where the LLM evaluates its own output against criteria and iteratively refines its response, leading to higher quality results for complex tasks.

-   [**Refusal and Scope Control**](./refusal-and-scope-control.md): Crucial for building safe applications. This guide shows how to define the model's boundaries and instruct it to politely refuse out-of-scope or inappropriate questions.

-   [**Structured Task Specification Template**](./task-spec-template.md): Discover how to use a clear, templated approach for system prompts to ensure the model understands its role, task, constraints, and required output format, leading to greater consistency.

-   [**Tool Use Instructions**](./tool-use-instructions.md): Unlock the full potential of LLMs by enabling them to interact with external tools and APIs. This guide explains how to describe tools to the model and parse its tool calls.

:::tip[Building a Prompt Engineering Toolkit]
Start with the foundational few-shot prompting, then explore how to make your prompts more robust with structured templates and scope control. For complex problems, leverage self-correction and tool use to expand your LLM's capabilities.
:::