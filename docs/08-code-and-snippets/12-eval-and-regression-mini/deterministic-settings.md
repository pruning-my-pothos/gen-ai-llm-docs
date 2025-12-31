---
title: "Deterministic-ish Settings"
---

# Deterministic-ish Settings

:::info[Why]
Lower randomness for regression tests and reproducible outputs.
:::

- Set low `temperature` (0–0.2) and low `top_p` (0.7–0.9).
- Fix `seed` where supported (OpenAI-compatible servers often expose it).
- Keep prompts stable: identical instructions + ordering.
- Limit context churn: trim chat history; pin retrieved chunks (same order).

Use these settings when creating baselines for evals; relax them for creative tasks.
