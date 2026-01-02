---
title: "LLM Characteristics"
archetype: "standard"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm"]
last_reviewed: "2025-12-20"
---
# LLM Characteristics

:::info[Value Proposition]
Know the core traits of LLMs to predict where they excel and where they fail, so you can design guardrails and workflows accordingly.
:::

## Core Traits

- **Probabilistic**: Outputs are samples, not facts; small prompt changes can flip answers.
- **Context-dependent**: Quality depends on prompt clarity, order, and recency of information.
- **Training cutoff**: World knowledge freezes at training time; fill gaps with retrieval.
- **Length sensitivity**: Long prompts can dilute signal; manage with summaries and highlights.
- **Hallucination risk**: Models will produce plausible but wrong statements confidently.
- **Multimodality (some models)**: Inputs/outputs may include text+image+audio.

## Practical Implications

- Add **grounding** (RAG) for facts.
- Use **schemas** and **validators** for structured output.
- Set **temperature/top_p** conservatively for code/specs.
- **Test** prompts like code (unit tests for model calls).

## Quick Checklist

- Are constraints explicit? (security, scope, formatting)
- Is retrieval in place for facts?
- Are outputs validated (JSON Schema, regex, type checks)?
- Are you logging prompts/outputs for review?

## Next Step

See `hallucinations-and-failure-modes.md` and `05-structured-output-and-tool-use.md` to mitigate risks; pair with `guardrails-index.md` for policy controls.
