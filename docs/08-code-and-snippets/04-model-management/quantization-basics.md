---
title: "Quantization Basics"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["models", "quantization", "gguf", "performance"]
last_reviewed: "2025-12-31"
---

# Quantization Basics

This guide explains what model quantization is, why it's essential for running large models on consumer hardware, and how to choose the right version for your needs.

:::info[What is Quantization?]
Quantization is the process of reducing the precision of a model's weights. In simple terms, it's like taking a very specific number (e.g., `3.14159265`) and rounding it to a less specific one (e.g., `3.14`). This makes the model file smaller and faster to run, but can lead to a slight decrease in the quality of its responses.
:::

---

## Why Quantize? The Size vs. Quality Trade-off

A large language model's "knowledge" is stored in its weights, which are just a massive collection of numbers. Typically, these are 16-bit floating-point numbers (`FP16`).

-   **A 7-billion parameter model using `FP16` requires `7B * 2 bytes/parameter = 14 GB` of VRAM/RAM.**

This is too large for many consumer-grade GPUs and laptops. Quantization converts these `FP16` weights into smaller, lower-precision integers, such as 8-bit (`INT8`) or 4-bit (`INT4`).

-   **The same 7B model quantized to 4-bits requires roughly `7B * 0.5 bytes/parameter = 3.5 GB` of VRAM.**

This massive reduction in size is what makes it possible to run powerful LLMs on a local machine. The trade-off is a potential loss in "perplexity" (a measure of the model's confusion), which might manifest as slightly less nuanced or accurate responses.

---

## Demystifying GGUF Quantization Names

When you browse models on the Hugging Face Hub, especially those in the GGUF format for `llama.cpp`, you'll see various quantization types. Here are the most common ones, from lowest quality/size to highest:

| Quantization Type | Bits/Weight (avg) | VRAM for 7B Model (approx) | Description & Use Case |
| :--- | :--- | :--- | :--- |
| `Q2_K` | ~2.5 | ~2.5 GB | **Extreme Quantization**: Fastest, smallest. Quality loss is very noticeable. Use only if memory is extremely limited. |
| `Q3_K_M` | ~3.4 | ~3.2 GB | **High Quantization**: Significant quality loss, but usable. A last resort for low-resource systems. |
| `Q4_0` | 4.0 | ~3.8 GB | **Legacy 4-bit**: An older 4-bit format. Prefer `_K_M` or `_K_S` variants if available. |
| `Q4_K_M` | ~4.1 | ~4.0 GB | **Recommended Baseline**: Excellent balance of small size, good speed, and acceptable quality. The "M" stands for "Medium". **Start here.** |
| `Q5_K_M` | ~5.1 | ~5.0 GB | **Higher Quality**: Noticeably better quality than Q4 for a moderate increase in size. A great choice if you have enough VRAM. |
| `Q6_K` | ~6.2 | ~6.0 GB | **High Quality 6-bit**: Approaching lossless. Use if you have plenty of VRAM and want to maximize quality. |
| `Q8_0` | 8.0 | ~7.5 GB | **Effectively Lossless**: Very close to the original FP16 model in quality, but requires significantly more resources. |
| `F16` | 16.0 | ~14.0 GB | **Full Precision**: The original, un-quantized model. Not practical for most local use cases. |

*The `_K` indicates an improved quantization method, while `_S`, `_M`, and `_L` refer to Small, Medium, and Large variations of the quantization recipe.*

---

## Which Quantization Should I Use?

Your choice depends almost entirely on your available RAM or VRAM.

:::tip[A Practical Guide to Choosing]
- **8 GB RAM/VRAM**: You are limited to 3B models. For a 3B model, a `Q6_K` or `Q8_0` quant is feasible.
- **16 GB RAM/VRAM**:
    - For **7B models**, start with **`Q4_K_M`**. This is often the sweet spot.
    - If you have headroom, try **`Q5_K_M`** for better quality.
- **32 GB RAM/VRAM**:
    - You can comfortably run **7B models at `Q8_0`** for near-lossless quality.
    - You can also run **13B models at `Q4_K_M` or `Q5_K_M`**.
- **64GB+ RAM/VRAM**:
    - You can run very large models (34B+) at reasonable quantization levels.
:::

**General Strategy**: Always start with the lowest recommended quantization for your target model size (`Q4_K_M`). Test its performance and output quality. If it's sufficient, you've saved resources. If not, move up to the next level (`Q5_K_M`, etc.) until you find the right balance for your hardware and application.
