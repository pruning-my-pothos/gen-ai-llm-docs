---
title: "Resource & Performance"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["performance", "resources", "benchmarking", "index"]
last_reviewed: "2025-12-31"
---

# Resource & Performance

Understanding and optimizing the resource consumption and performance of your LLM applications is critical for efficiency, cost-effectiveness, and a good user experience. This section provides practical guides for monitoring your hardware, benchmarking LLM inference speed, and troubleshooting common performance bottlenecks.

:::info[Goal: Optimize for Speed and Stability]
The objective is to ensure your LLM applications run as efficiently as possible, leveraging available hardware and providing a responsive experience, while avoiding common pitfalls like Out-Of-Memory errors.
:::

## Guides and Snippets

-   [**GPU and Metal Hardware Checks**](./gpu-metal-checks.md): Verify that your system's hardware accelerators (NVIDIA GPUs or Apple Silicon's Metal) are detected and being utilized by your LLM tools for optimal inference speed.

-   [**Memory, CPU, and Disk Checks for LLMs**](./memory-cpu-disk-checks.md): Commands and tools for monitoring your system's RAM, CPU usage, and disk space, and understanding their direct impact on LLM operation.

-   [**Tokens-per-Second (t/s) Benchmark**](./tokens-per-second-benchmark.md): Learn how to objectively measure the raw generation speed of your LLMs using tools like Ollama and custom Python scripts.

-   [**Latency Profiling for LLM Applications**](./latency-profiling-mini.md): Go beyond raw throughput by measuring user-perceived latency metrics like Time to First Token (TTFT) and Time to Last Token (TLFT) in Python.

-   [**OOM Debug Playbook for LLMs**](./oom-debug-playbook.md): A step-by-step guide for diagnosing and resolving frustrating Out-Of-Memory errors, a common issue when running large LLMs locally.

:::tip[Proactive Performance Management]
Regularly checking your hardware, benchmarking your models, and understanding resource consumption will help you proactively identify and address performance bottlenecks, ensuring a smooth and efficient LLM development workflow.
:::