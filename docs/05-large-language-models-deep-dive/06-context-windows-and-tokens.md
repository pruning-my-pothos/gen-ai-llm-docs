---
title: "Context Windows and Tokens"
archetype: "foundation"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["context-window", "tokens", "cost", "latency"]
last_reviewed: "2025-12-20"
---

# Context Windows and Token Economics

:::info[Purpose]
Help practitioners budget context, avoid truncation, and manage cost/latency trade-offs.
:::

## Key Points

- **Context is finite**: prompts + history + retrieved text must fit; older tokens may be dropped or summarized.
- **Tokens drive cost and latency**: input/output tokens both bill; longer outputs are slower and costlier.
- **Position effects**: important instructions should be early and near the model’s attention focus.
- **Compression vs recall**: summarization saves tokens but risks losing detail; use retrieval for specificity.

## Practical Guidance

- Set **budgets**: max input tokens, max output tokens; enforce truncation rules.
- Use **structured context**: headers, bulleting, and schemas to make key facts salient.
- Keep **system/intent/constraints** short and stable; avoid duplicating boilerplate in every turn when possible.
- Consider **streaming** and **short outputs** when latency matters.

## Anti-Patterns

- Pasting entire documents; “hope” the model will pick what matters.
- Ignoring growth of conversation history leading to silent truncation.
- Letting output length drift without limits or evaluation.
