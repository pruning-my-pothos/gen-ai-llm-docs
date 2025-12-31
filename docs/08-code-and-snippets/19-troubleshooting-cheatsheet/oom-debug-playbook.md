---
title: "OOM Debug Playbook (Local LLMs)"
---

# OOM Debug Playbook (Local LLMs)

:::warning[Symptoms]
Process killed, GPU/CPU memory spikes, or server restarts when loading/generating.
:::

- Try smaller quant (`q4/q5`), or smaller model (7B vs 13B).
- Reduce context length (`max_tokens` / `n_predict`), drop history.
- Lower batch/parallelism; set `num_ctx` conservatively.
- Close other GPU/CPU-heavy apps; ensure swap/virtual memory available.
- If serving, restart with lower thread count and monitored memory.
