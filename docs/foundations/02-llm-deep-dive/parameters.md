---
title: "Parameters"
archetype: "standard"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm"]
last_reviewed: "2025-12-20"
---
# Parameters

:::info[Value Proposition]
Knowing the core generation parameters lets you steer outputs toward stability, safety, and cost control without changing prompts.
:::

## Overview

Common knobs exposed by chat/completions APIs:

- **temperature**: randomness (see `temperature.md`).
- **top_p / top_k**: sampling truncation (see `parameter-top-k-vs-top-p-sampling.md`).
- **max_tokens**: output length cap; also drives cost/time.
- **presence_penalty / frequency_penalty** (OpenAI) or **repetition_penalty** (others): discourage repetition.
- **stop sequences**: hard-stop tokens or strings.
- **seed**: enables reproducibility (when supported).

## Recommended Defaults

```json
{
  "model": "gpt-4o-mini",
  "temperature": 0.2,
  "top_p": 0.9,
  "max_tokens": 300,
  "presence_penalty": 0.0,
  "frequency_penalty": 0.0,
  "stop": ["```", "<END>"]
}
```

## Safe Guards

- Set `max_tokens` to prevent runaway outputs.
- Use `stop` tokens when generating structured snippets (e.g., stop at `</spec>`).
- Pair low temperature with schema validation for JSON outputs.

## Reproducibility

If the provider supports `seed`, fix it for tests/demos. Without seeds, keep temperature low and prompts stable to approximate reproducibility.

## Next Step

Read `parameter-top-k-vs-top-p-sampling.md` for sampling strategies and `05-structured-output-and-tool-use.md` for schema-first generation.
