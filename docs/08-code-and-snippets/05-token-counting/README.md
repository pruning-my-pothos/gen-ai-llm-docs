---
title: "Token Counting"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["tokens", "counting", "budgeting", "index"]
last_reviewed: "2025-12-31"
---

# Token Counting

This section provides the "how" and "why" of token counting. Mastering this skill is essential for managing context windows, controlling API costs, and ensuring a responsive user experience.

:::info[Goal: From Counting to Control]
The goal is to provide you with the tools to accurately count tokens and the mental models to effectively budget them, giving you control over your application's cost and performance.
:::

## Guides and Snippets

-   [**Token Counting in Python with `tiktoken`**](./token-count-python.md): A guide to using the industry-standard `tiktoken` library in Python, including a crucial function for accurately counting tokens in chat completion requests.

-   [**Token Counting in Node.js / TypeScript**](./token-count-node.md): The equivalent guide for the Node.js ecosystem, using a high-performance WASM-powered `tiktoken` library.

-   [**Prompt Size Budgeting**](./prompt-size-budgeting.md): Learn the art of budgeting your context window. This guide provides a step-by-step process and a sample budget for balancing your system prompt, RAG context, and chat history.

-   [**Cost & Latency Trade-offs**](./cost-latency-tradeoffs.md): Understand the direct business impact of token count. This guide explains how input and output tokens affect API costs and the two key types of user-facing latency.

:::tip[Recommended Learning Path]
1.  First, pick your language and learn the practical skill of counting:
    -   [**Token Counting in Python**](./token-count-python.md) OR
    -   [**Token Counting in Node.js**](./token-count-node.md)
2.  Next, learn the strategy behind managing your context window:
    -   [**Prompt Size Budgeting**](./prompt-size-budgeting.md)
3.  Finally, understand the real-world impact of your choices:
    -   [**Cost & Latency Trade-offs**](./cost-latency-tradeoffs.md)
:::
