---
title: "Emergent Abilities"
archetype: "standard"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm"]
last_reviewed: "2025-12-20"
---
# Emergent Abilities

:::info[Value Proposition]
Emergent abilities are behaviors that appear at scale (chain-of-thought, multi-step planning). Understand them to set expectations and guardrails.
:::

## What Are Emergent Abilities?

- Capabilities that become reliable only beyond a model size/data threshold (e.g., arithmetic, stepwise reasoning, code synthesis).
- They are statistical, not guaranteed—prompting and context quality still matter.

## Why It Matters

- **Planning**: Larger models handle multi-step tasks better; smaller models need more scaffolding.
- **Cost/latency**: Bigger models are slower; decide when the ability gain is worth it.
- **Safety**: More capable models can also produce more convincing hallucinations.

## Make Them Useful

- Use **chain-of-thought or “think step-by-step”** instructions when allowed.
- Add **intermediate checks** (tests, assertions, schema validation).
- Combine with **retrieval** to ground facts.

## When to Downshift

- For simple classification or extraction, use smaller/cheaper models; emergent abilities are overkill.

## Next Step

Review `model-architectures.md` and `scaling-laws.md` to see how size and training shape capability, and pair with `05-structured-output-and-tool-use.md` for verification.
