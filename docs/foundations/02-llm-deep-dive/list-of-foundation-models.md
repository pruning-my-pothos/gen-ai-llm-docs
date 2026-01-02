---
title: "List of Foundation Models"
archetype: "standard"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm"]
last_reviewed: "2025-12-20"
---
# List of Foundation Models

:::info[Value Proposition]
A quick mental map of popular foundation models and when to reach for them. Always check licensing and hosting constraints.
:::

## Current Landscape (high-level)

- **OpenAI**: GPT-4o / GPT-4o-mini (strong general + reasoning), GPT-3.5 (budget-friendly).
- **Anthropic**: Claude 3.x (Opus/Sonnet/Haiku) — safety-forward, strong long-context.
- **Meta**: Llama 3.x (community + enterprise licenses) — good local/hosted options.
- **Mistral**: Mistral/Mixtral family — efficient, strong local choices.
- **Google**: Gemini family — multimodal and long-context.
- **Cohere**: Command family — enterprise, retrieval-friendly.
- **Local-first** (examples): `qwen2`, `phi-3`, `nous-hermes`, `deepseek-coder` (check licenses).

## Choosing Factors

- **License**: Commercial use allowed? Weight redistribution allowed?
- **Context window**: Needed input size?
- **Latency/cost**: Hosted vs local hardware budgets.
- **Modality**: Text-only vs image/audio/code emphasis.

## Practical Starting Points

- Hosted API, balanced: `gpt-4o-mini`, `claude-3.5-sonnet`.
- Budget: `gpt-4o-mini` with tighter `max_tokens` or `gpt-3.5`.
- Local laptop-class: `phi-3-mini`, `qwen2.5-7b`, `llama-3-8b` (quantized).

## Next Step

See `model-architectures.md` for decoder/encoder details and `quantization-basics` in Code & Snippets for local deployment considerations.
