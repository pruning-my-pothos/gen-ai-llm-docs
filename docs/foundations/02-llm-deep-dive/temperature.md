---
title: "Temperature"
archetype: "standard"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm"]
last_reviewed: "2025-12-20"
---
# Temperature

:::info[Value Proposition]
Temperature controls how deterministic or exploratory a model is. Use it deliberately to balance creativity against reliability and cost.
:::

## Overview

Temperature scales the logits before sampling tokens. Lower values sharpen the distribution (more repeatable), higher values flatten it (more diverse). It is usually combined with nucleus/top-k sampling.

## Practical Settings

- **Deterministic-ish output**: `temperature: 0.0–0.3` (good for specs, code, formatting-sensitive responses).
- **Balanced**: `temperature: 0.4–0.7` (default for most assistants).
- **Creative**: `temperature: 0.8–1.0` (brainstorming, alternative phrasings).

```json
{
  "model": "gpt-4o-mini",
  "temperature": 0.2,
  "top_p": 0.9,
  "max_tokens": 400,
  "messages": [{"role": "user", "content": "Summarize the API spec as bullet points."}]
}
```

## When to Lower It

- Structured output (JSON, YAML, code)
- Evaluation or grading tasks
- Retrieval-augmented answers you need to be consistent

## When to Raise It

- Brainstorming options or headlines
- Generating variants of copy
- Avoiding repetition in long-form generation

## Pitfalls

- High temperature without constraints can drift off-topic.
- Very low temperature can get “stuck” or repeat phrasing.

## Next Step

See `parameter-top-k-vs-top-p-sampling.md` for how sampling parameters interact, and `parameters.md` for the other knobs that affect output stability.
