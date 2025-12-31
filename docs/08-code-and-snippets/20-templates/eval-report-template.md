---
title: "LLM Evaluation Report Template"
archetype: "template"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["evaluation", "report", "template", "metrics"]
last_reviewed: "2025-12-31"
---

# LLM Evaluation Report Template

This template provides a structured format for documenting the results of an LLM or RAG evaluation run. A comprehensive report is essential for communicating performance, identifying trends, and making data-driven decisions about model, prompt, or pipeline improvements.

:::info[The Goal: Clear Communication of Performance]
The objective is to systematically summarize the outcomes of your LLM evaluations, providing stakeholders with a clear understanding of quality, identifying regressions, and guiding future development efforts.
:::

---

## 1. Experiment / Run Details

-   **Report Date**: YYYY-MM-DD
-   **Evaluator**: [Your Name/Team]
-   **Evaluation Goal**: [e.g., Assess impact of new prompt template; Benchmark Llama3 vs. Mistral]
-   **Model(s) Tested**: [e.g., Llama3-8B-Instruct (Q4_K_M) on Ollama; gpt-4-turbo-preview via OpenAI API]
-   **LLM Parameters**: [e.g., temperature=0.7, top_p=0.9, max_tokens=250]
-   **Prompt Version / Git Commit**: [e.g., `prompts/v2.1`, `git_hash_abc123`]
-   **RAG Pipeline Version (if applicable)**: [e.g., `rag_pipeline_v1.5`]
-   **Golden Prompts Set Used**: [Link to `golden_prompts_set.jsonl` or similar]
-   **Comparison Baseline (if applicable)**: [Reference to previous report or metrics, e.g., `Baseline Report V1.0`]

---

## 2. Key Quantitative Metrics

Summarize the most important metrics from your evaluation.

| Metric                        | Baseline Value | Current Value | Change (%) | Notes |
| :---------------------------- | :------------- | :------------ | :--------- | :---- |
| **Overall Pass Rate** (Pass/Fail) | 85%            | 90%           | +5%        | From [Pass/Fail Scoring](./../12-eval-and-regression-mini/pass-fail-scoring.md) |
| **RAG Hit Rate@3** (Retrieval) | 0.88           | 0.92          | +4.5%      | From [Minimal Retrieval Evaluation](./../12-eval-and-regression-mini/retrieval-eval-mini.md) |
| **MRR** (Retrieval)           | 0.75           | 0.80          | +6.7%      | |
| **Hallucination Rate**        | 10%            | 5%            | -50%       | From [Hallucination Checks](./../12-eval-and-regression-mini/hallucination-checks.md) |
| **Avg TTFT** (Latency)        | 1.2s           | 0.8s          | -33%       | From [Latency Profiling](./../13-resource-and-performance/latency-profiling-mini.md) |
| **Avg TPS** (Throughput)      | 25 t/s         | 30 t/s        | +20%       | From [Tokens-per-Second Benchmark](./../13-resource-and-performance/tokens-per-second-benchmark.md) |
| **Avg Cost per Query**        | $0.0015        | $0.0012       | -20%       | From [Cost & Latency Trade-offs](./../05-token-counting/cost-latency-tradeoffs.md) |

---

## 3. Regressions Detected

List specific prompts or scenarios where performance *decreased*.

-   **Prompt ID**: `q_007_edge_case`
    -   **Description**: Model now fails to handle numerical input correctly.
    -   **Baseline Result**: PASS
    -   **Current Result**: FAIL
    -   **LLM Output Diff**: [Link to diff or paste relevant sections]
    -   *Related Guide: [Comparing Evaluation Runs](./../12-eval-and-regression-mini/diff-runs-and-report.md)*

---

## 4. Improvements Noted

List specific prompts or scenarios where performance *increased*.

-   **Prompt ID**: `q_015_long_context`
    -   **Description**: Model is now more concise with long RAG contexts.
    -   **Baseline Result**: FAIL
    -   **Current Result**: PASS
    -   **LLM Output Diff**: [Link to diff or paste relevant sections]

---

## 5. Qualitative Observations

Summarize any insights from manual review that quantitative metrics might not capture.

-   Model's tone has become more friendly.
-   Still struggles with ambiguous questions; often asks for clarification.
-   RAG system occasionally retrieves too many irrelevant documents for complex queries.

---

## 6. Recommendations / Next Steps

Based on this evaluation, what are the actionable next steps?

-   Investigate `q_007_edge_case` regression: review prompt/model changes.
-   Experiment with different RAG rerankers to improve precision for complex queries.
-   Refine prompt engineering for handling ambiguity.
-   Consider fine-tuning a small model for specific categories.

---

:::tip[Automate Reporting]
Integrate this report generation into your CI/CD pipeline. Automatically run evaluations on every significant change and generate a report, pushing it to a central dashboard or notification system.
:::

:::warning[Context is Key]
Always ensure your report provides enough context for others to understand the results. Link to the specific golden set, prompt versions, and model configurations used for the evaluation.
:::