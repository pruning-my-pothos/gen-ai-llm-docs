---
title: "Parameter: Top-k vs Top-p Sampling"
archetype: "standard"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm"]
last_reviewed: "2025-12-20"
---
# Parameter: Top-k vs Top-p Sampling

:::info[Value Proposition]
Top-k and top-p shape how diverse the token choices are. Use them to reduce nonsense while keeping variation where it matters.
:::

## Quick Definitions

- **Top-k**: keep only the k most likely tokens, re-normalize, then sample.
- **Top-p (nucleus)**: keep the smallest set of tokens whose cumulative probability ≥ p, re-normalize, then sample.

## Practical Guidance

- Start with **top_p ~0.9** and leave top-k unset (many APIs default this way).
- For very tight control, set **top_k 20–50** with **temperature ≤0.3**.
- Avoid setting both aggressively (e.g., very low top_p and low top_k) or you may over-constrain and get repetitive outputs.

```json
{
  "model": "gpt-4o-mini",
  "temperature": 0.25,
  "top_p": 0.9,
  "max_tokens": 400,
  "messages": [{"role": "user", "content": "Give me 3 alternative release-note summaries."}]
}
```

## When to Favor Top-k

- You want predictability for code, SQL, JSON.
- You are mitigating rare-token hallucinations in niche vocabularies.

## When to Favor Top-p

- You want fluent text with controlled diversity.
- You are generating creative copy or multiple phrasings.

## Pitfalls

- Very low top_k (e.g., 1–5) can collapse diversity and repeat phrases.
- Very high temperature with high top_p can increase off-topic drift.

## Next Step

Pair these settings with `temperature.md` and use schema validation where structure matters.
