---
title: "Structured Output"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["structured-output", "json", "function-calling", "index"]
last_reviewed: "2025-12-31"
---

# Structured Output

LLMs are excellent at generating free-form text, but integrating them into applications often requires predictable, structured data (e.g., JSON, XML). This section provides strategies and code examples for reliably extracting structured outputs from Large Language Models.

:::info[Goal: From Free-form Text to Machine-Readable Data]
The objective is to bridge the gap between human-like LLM responses and the rigid data requirements of software applications, enabling seamless integration and automation.
:::

## Guides and Snippets

-   [**JSON Mode vs. JSON Schema**](./json-mode-vs-json-schema.md): Understand the fundamental differences between simply forcing JSON output (JSON Mode) and enforcing a strict structure using JSON Schema (often via function calling APIs).

-   [**Schema-First Structured Output Examples**](./schema-first-examples.md): Dive into practical examples of defining JSON Schemas for various data extraction tasks, from simple contact information to complex nested objects.

-   [**Enums and Constraints in JSON Schema**](./enums-and-constraints.md): Learn how to use advanced JSON Schema features like `enum`, `minimum`, `maxLength`, and `pattern` to ensure highly specific and validated output from your LLMs.

-   [**Minimal Function Calling Example**](./function-calling-minimal.md): See a step-by-step guide on how to leverage native function calling APIs (like OpenAI's) to get structured data, simplifying parsing and increasing reliability.

-   [**Partial Output Repair**](./partial-output-repair.md): LLMs can sometimes generate malformed or incomplete JSON. This guide provides strategies and code for robustly handling and repairing such outputs through simple heuristics, fault-tolerant parsers, and LLM self-correction.

:::tip[Building for Reliability]
For production-grade LLM applications, obtaining structured output is non-negotiable. Begin with clear schema definitions and integrate robust parsing and validation steps.
:::