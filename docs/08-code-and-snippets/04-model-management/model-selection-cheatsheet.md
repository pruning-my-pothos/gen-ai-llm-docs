---
title: "Model Selection Cheat Sheet"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["models", "selection", "hardware", "cheatsheet"]
last_reviewed: "2025-12-31"
---

# Model Selection Cheat Sheet

Choosing the right open-source model is a game of trade-offs. This guide will help you pick a model that fits your hardware, latency needs, and quality requirements.

:::info[The Core Trade-off]
You are balancing three factors: **Model Capability** (reasoning, knowledge), **Hardware Cost** (VRAM/RAM needed), and **Inference Speed** (latency). You can't maximize all three. The goal is to find the best model that runs efficiently on your hardware for your specific task.
:::

---

## Step 1: Assess Your Available VRAM / RAM

Your hardware is the biggest constraint. Before choosing a model, know how much memory you can dedicate to it. Refer to the [Quantization Basics](./quantization-basics.md) guide for a detailed breakdown.

-   **8 GB RAM/VRAM**: Very limited. Stick to 3B models.
-   **16 GB RAM/VRAM**: The sweet spot for 7B models.
-   **32 GB+ RAM/VRAM**: Can handle larger 13B+ models or run 7B models at very high quality.

## Step 2: Define Your Primary Use Case

What is the main task for your model?
-   **General Chat / Instruction Following**: A balanced model that is good at following commands.
-   **Coding Assistant**: A model specifically fine-tuned on code.
-   **Creative Writing / Role-playing**: A model known for creativity and less "robotic" responses.
-   **RAG / Embeddings**: This requires a separate, smaller embedding model.

---

## Step 3: The Cheat Sheet

Use this table to find a good starting point. All recommendations are for GGUF-quantized models.

| Hardware (VRAM/RAM) | Use Case | Recommended Starting Model & Quantization | Notes |
| :--- | :--- | :--- | :--- |
| **~8 GB** | General Chat | **`Phi-3-mini-4k-instruct.Q5_K_M`** | Phi-3 is very capable for its tiny size. |
| | Coding Assistant | **`Phi-3-mini-4k-instruct.Q5_K_M`** | It has solid coding abilities. |
| **~16 GB** | General Chat | **`Llama-3-8B-Instruct.Q4_K_M`** | Excellent all-rounder, great at following instructions. |
| | Coding Assistant | **`CodeLlama-7B-Instruct.Q5_K_M`** | A specialized coding model. |
| | Creative Writing | **`Mistral-7B-Instruct-v0.2.Q5_K_M`** | Known for strong performance and less "censorship". |
| **~24-32 GB** | General Chat | **`Llama-3-8B-Instruct.Q8_0`** | Run the 8B model at near-lossless quality. |
| | Coding Assistant | **`CodeLlama-13B-Instruct.Q4_K_M`** | A larger, more capable coding model. |
| | High Quality Chat | **`Mistral-7B-Instruct-v0.2.Q8_0`** | Max quality for the 7B model. |
| **64 GB+** | High Performance | **`Llama-3-70B-Instruct.Q4_K_M`** | Run a massive, highly capable model locally. |

---

## After You Choose: Final Checks

Once you have a candidate model from the cheat sheet, do these final checks:

-   **Context Window**: Does the model's context window (e.g., 4k, 8k, 128k tokens) fit your application's needs? You can usually find this on the model's Hugging Face page.
-   **License**: Check the model's license to ensure it permits your use case (e.g., commercial vs. non-commercial). Llama 3, for example, has its own license you must adhere to.
-   **Community & Reputation**: Is this an official model from a major lab (Meta, MistralAI, Microsoft) or a reputable community member?

## Where to Find Models

The **Hugging Face Hub** is the central repository for open-source models.
- **URL**: [huggingface.co/models](https://huggingface.co/models)
- **How to Search**: To find quantized models, search for the model name plus `GGUF`. For example: `Llama 3 8B GGUF`.

:::warning[Stick to Reputable Sources]
When starting out, download models from official sources or well-known community members who specialize in quantization, such as **"TheBloke"**. This reduces the risk of downloading a poorly performing or even malicious model file.
:::
