---
title: "OOM Debug Playbook for LLMs"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["performance", "memory", "debugging", "oom", "troubleshooting"]
last_reviewed: "2025-12-31"
---

# OOM Debug Playbook for LLMs

Out-Of-Memory (OOM) errors are a common and often frustrating challenge when working with Large Language Models, particularly on consumer-grade hardware. An OOM error occurs when a program tries to allocate more memory (RAM or VRAM) than is physically available, leading to application crashes, system instability, or severe performance degradation.

:::info[The Goal: Resolve Memory Exhaustion]
The objective is to systematically diagnose and resolve memory-related issues that prevent LLMs from loading or running efficiently on your system.
:::

---

## Symptoms of an OOM Error

-   **Application Crash**: Your Python script or LLM tool (Ollama, LM Studio) unexpectedly exits.
-   **Error Messages**: Specific messages like "CUDA out of memory", `torch.cuda.OutOfMemoryError`, or `MemoryError`.
-   **System Freeze/Sluggishness**: Your entire system becomes unresponsive, indicating heavy use of swap memory.
-   **Failed Model Load**: The LLM fails to load, often with a message about insufficient memory.

---

## The OOM Debugging Playbook (Step-by-Step)

### Step 1: Check Available Resources

Confirm how much physical memory (RAM/VRAM) you actually have and how much is currently free.

-   **GPU VRAM**: Use `nvidia-smi` (NVIDIA) or Activity Monitor (macOS Apple Silicon) to check dedicated GPU memory.
-   **System RAM**: Use `free -h` (Linux) or Activity Monitor (macOS) / Task Manager (Windows) to check system RAM.
-   Refer to [Memory, CPU, and Disk Checks](./memory-cpu-disk-checks.md) for detailed commands.

### Step 2: Verify Model Size and Quantization

Compare the memory footprint of your chosen model against your available VRAM/RAM.

-   **Model Footprint**: A good rule of thumb for GGUF models (common for local LLMs): `Model_Parameters (B) * Quantization_Bits / 8`.
    -   Example: A 7B parameter model, Q4_K_M (approx. 4.5 bits/param) needs `7 * 4.5 / 8 = ~3.9 GB`.
-   **Action**: Try a smaller model or a more aggressive quantization level. A 7B model at Q4_K_M might fit, but a 13B model at Q8_0 likely won't on 8GB VRAM.
-   Refer to [Quantization Basics](./../04-model-management/quantization-basics.md) for more details.

### Step 3: Reduce Context Window / Prompt Size

While the model itself is the largest memory consumer, the input prompt (context window) also temporarily consumes memory during processing.

-   **Action**: Try sending a shorter prompt. Reduce the length of your chat history or RAG context.
-   Refer to [Prompt Size Budgeting](./../05-token-counting/prompt-size-budgeting.md) for strategies.

### Step 4: Reduce Batch Size (if applicable)

For some inference servers or frameworks, you can process multiple prompts simultaneously (batching). While this can improve throughput, it significantly increases memory usage.

-   **Action**: Ensure your batch size is 1 for initial debugging of OOM. If your application attempts to batch, disable it.

### Step 5: Free Up System Memory

Ensure no other applications are hogging your resources.

-   **Action**: Close all unnecessary applications, web browser tabs, development environments (IDEs). Restart your LLM server/application.

### Step 6: Update Drivers and Software

Outdated GPU drivers or LLM framework versions can sometimes have memory leaks or inefficient memory management.

-   **Action**: Update your GPU drivers to the latest stable version. Update your LLM tools (Ollama, LM Studio) and Python libraries.

---

:::tip[Monitor in Real-time]
When attempting to load and run an LLM, use monitoring tools like `nvidia-smi -l 1` (for NVIDIA), `htop` (Linux), or Activity Monitor (macOS) to watch your memory usage in real-time. This can pinpoint exactly when memory spikes and leads to an OOM.
:::

:::warning[Hardware Limits]
Ultimately, there's a limit to what your hardware can do. If consistently facing OOM errors after trying all steps, you may need to:
-   Upgrade your RAM/VRAM.
-   Use smaller models.
-   Switch to cloud-based LLM APIs.
:::