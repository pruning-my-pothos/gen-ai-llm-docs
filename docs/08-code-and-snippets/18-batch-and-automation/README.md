---
title: "Batch & Automation"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["batch-processing", "automation", "scheduling", "parallelism", "index"]
last_reviewed: "2025-12-31"
---

# Batch & Automation

Moving beyond single, interactive LLM calls, this section focuses on scaling your LLM applications to process large volumes of data, automate repetitive tasks, and manage workflows efficiently. It covers techniques for parallel execution, batch processing, caching, and job scheduling.

:::info[Goal: Efficient and Scalable LLM Workflows]
The objective is to equip you with the knowledge and code examples to build LLM-powered systems that can handle many requests, process large datasets, and operate autonomously on a predefined schedule.
:::

## Guides and Snippets

-   [**Parallelism Basics for LLM Calls**](./parallelism-basics.md): Learn how to significantly speed up batch processing by making multiple LLM API calls concurrently using Python's `threading` and `asyncio`.

-   [**CSV Batch Processing with LLMs**](./csv-batch-processing.md): Automate tasks like data enrichment, summarization, or categorization by processing data from CSV files row-by-row with an LLM and writing results to a new CSV.

-   [**LLM Processing Over a Folder of Files**](./run-over-folder.md): Implement workflows to iterate through a directory, read each text file, process its content with an LLM, and save the generated insights to output files.

-   [**Caching LLM Results**](./caching-results.md): Drastically reduce API costs and improve latency by storing and reusing previously generated LLM responses for identical requests using in-memory or persistent caches.

-   [**Cron and Scheduled LLM Jobs**](./cron-and-scheduled-jobs.md): Orchestrate your LLM batch processing tasks to run automatically at specific intervals using `cron` (for Unix-like systems) or by understanding the principles of job scheduling.

:::tip[Scaling Your LLM Applications]
Start by implementing **[Parallelism]** to maximize throughput. Use **[CSV Batch Processing]** or **[Folder Processing]** for data transformation. Employ **[Caching]** to save costs on repeated calls, and finally, use **[Cron and Scheduled Jobs]** to automate your entire workflow.
:::