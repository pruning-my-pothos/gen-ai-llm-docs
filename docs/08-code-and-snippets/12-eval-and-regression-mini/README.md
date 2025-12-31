---
title: "Evaluation & Regression Mini"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["evaluation", "regression", "testing", "index"]
last_reviewed: "2025-12-31"
---

# Evaluation & Regression Mini

Objectively measuring the performance of LLM and RAG applications is crucial for iterative development and ensuring quality. This section provides practical, "mini" approaches to evaluating your application's outputs and detecting regressions.

:::info[Goal: Measure, Improve, and Maintain Quality]
The objective is to move beyond subjective judgment by implementing consistent evaluation methods, allowing you to confidently iterate on prompts, models, and RAG pipelines while preventing unintended performance drops.
:::

## Guides and Snippets

-   [**Building a Golden Prompts Set**](./golden-prompts-set.md): The foundation for any evaluation. Learn how to create a small, representative collection of test cases with expected outputs that serve as your ground truth.

-   [**Pass/Fail Scoring for LLM Outputs**](./pass-fail-scoring.md): A simple, human-centric method for assessing LLM quality. This guide demonstrates how to gather manual "pass" or "fail" scores on your golden set, especially useful for nuanced tasks.

-   [**Minimal Retrieval Evaluation**](./retrieval-eval-mini.md): Automate basic checks for your RAG system. Learn to calculate metrics like Hit Rate and Mean Reciprocal Rank (MRR) to quantify how well your retriever is finding relevant documents.

-   [**Hallucination Detection**](./hallucination-checks.md): Address a critical LLM failure mode. This guide explores methods, including using an LLM-as-a-judge, to detect when your model is generating factually incorrect information not supported by its context.

-   [**Comparing Evaluation Runs and Reporting Regressions**](./diff-runs-and-report.md): Systematically track progress and prevent performance degradation. Learn how to compare evaluation results across different versions of your application to highlight improvements and, crucially, regressions.

:::tip[A Practical Evaluation Workflow]
1.  Start by creating a **[Golden Prompts Set]** that represents your key use cases.
2.  Perform **[Pass/Fail Scoring]** for initial human insights, and if using RAG, implement **[Minimal Retrieval Evaluation]**.
3.  Add **[Hallucination Checks]** for critical applications.
4.  Finally, use **[Comparing Evaluation Runs]** to track performance over time as you make changes.
:::