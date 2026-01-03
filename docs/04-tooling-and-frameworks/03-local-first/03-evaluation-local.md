---
title: "Local-First Models: Evaluation of Local Models"
archetype: "tooling"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "tooling", "local-llm", "evaluation", "metrics", "quality"]
last_reviewed: "2025-12-28"
---

:::info[Value Proposition]
Systematically evaluate the performance, quality, and cost-effectiveness of local Large Language Models (LLMs) to ensure they meet your specific project requirements. This enables informed model selection, continuous improvement, and verifiable adherence to the output standards defined by your GenAI & LLM Handbook.
:::

## Overview

Choosing and utilizing local LLMs effectively requires a robust evaluation strategy. Unlike cloud LLMs, where performance metrics are often provided, local models demand that you establish your own benchmarks and evaluation pipelines. This process is crucial for understanding a model's strengths and weaknesses, identifying optimal prompting strategies, and ensuring that the model's outputs align with your Intent Specs and Acceptance Criteria. This guide outlines how to approach evaluating local LLMs within your GenAI & LLM Handbook workflow.

**Goal**: Select and optimize local LLMs that deliver high-quality, reliable outputs for specific tasks, balancing performance with local hardware constraints.
**Anti-pattern**: Relying on anecdotal evidence or generic benchmarks for local model selection, leading to suboptimal performance, increased iteration cycles, and frustration.

---

## When to Use

| Good fit (use when...)                                 | Avoid (not a fit when...)                                  |
| :--------------------------------------------------------- | :----------------------------------------------------- |
| Selecting the best local LLM for a new project or specific task | The task is a simple, non-critical internal prompt where raw model output is acceptable |
| Optimizing prompting strategies for a chosen local LLM     | You solely rely on cloud LLMs and their provided evaluation metrics suffice |
| Continuously monitoring the performance of deployed local LLMs | The evaluation requires human-level subjective judgment for every single output (AI can assist, not replace) |
| Comparing different local models or different quantization levels of the same model | Your hardware severely limits the ability to run models for extensive evaluation |

---

## Key Concepts and Metrics

### 1. Qualitative Evaluation

-   **Human-in-the-Loop**: Manual review of LLM outputs against Acceptance Criteria.
-   **Rubrics**: Using structured rubrics (like the Quality Rubric Template) to grade outputs on correctness, clarity, safety, etc.

### 2. Quantitative Evaluation

-   **Benchmark Datasets**: Using standard or custom datasets with ground truth answers to automatically score model outputs.
-   **Metrics**:
    -   **Accuracy**: For classification or factual recall tasks.
    -   **ROUGE/BLEU**: For summarization or translation tasks (comparing generated text to reference).
    -   **Faithfulness**: How well the output is supported by the provided source context (especially for RAG).
    -   **Relevance**: How relevant the output is to the query.
    -   **Toxicity/Bias**: Measuring unwanted or harmful outputs.
    -   **Latency/Throughput**: Performance metrics on your hardware.
    -   **Token Usage**: Cost efficiency (even for local models, resource usage).

### 3. Evaluation Frameworks

Tools that help automate the evaluation process (e.g., `lm-eval-harness`, LangChain Evaluation, custom Python scripts).

---

## GenAI & LLM Handbook Workflow for Local Model Evaluation

### 1. Define Evaluation Criteria (Acceptance Criteria)

Translate your project's Intent Specs and Acceptance Criteria into specific, measurable evaluation metrics.

### 2. Prepare Evaluation Datasets

Create or curate a dataset of prompts (inputs) and expected outputs (ground truth) relevant to your task.

### 3. Choose Evaluation Method

Decide on a combination of qualitative (human review) and quantitative (automated metrics) evaluation.

### 4. Run Model and Collect Outputs

Generate outputs from your local LLM for each prompt in your evaluation dataset.

### 5. Analyze and Score Outputs

-   **Automated Scoring**: Use evaluation frameworks to calculate quantitative metrics.
-   **Human Scoring**: Use a Quality Rubric Template for qualitative assessment.

### 6. Iterate and Optimize

Based on evaluation results, refine your model selection, prompting strategy, or fine-tuning, and repeat the evaluation loop.

```mermaid
graph LR
    A[Intent & Acceptance Criteria] --> B[Prepare Dataset]
    B --> C[Choose Model & Run]
    C --> D[Collect Outputs]
    D --> E[Analyze & Score (Automated/Human)]
    E -- Refine --> F[Optimize Prompt/Model]
    F --> A
    E -- Results --> G[Deployment Decision]

    classDef step fill:#E6F7FF,stroke:#1B75BB,color:#0F1F2E;
    class A,B,C,D,E,F,G step;
```

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Using Irrelevant Benchmarks** | Model performs well on benchmarks but poorly on your specific task. | Create custom evaluation datasets that closely match your production use cases. |
| **Over-reliance on Automated Metrics** | Automated metrics might not capture subtle quality issues or nuances. | Always include a human review component (qualitative evaluation) for critical tasks. |
| **Ignoring Performance Metrics for Local Models** | Model consumes too many resources or is too slow for practical use. | Track latency, throughput, and resource usage (CPU/GPU/RAM) alongside quality metrics. |
| **Lack of Clear Acceptance Criteria** | Subjective evaluation, difficult to make objective decisions about model quality. | Define precise, measurable Acceptance Criteria upfront, as per GenAI & LLM Handbook principles. |

---

## Quick Links

- Local-First Models Overview: [Index](/docs/04-tooling-and-frameworks/03-local-first/00-local-first-overview)
- Evaluation: [Handbook Method](/docs/01-handbook-method/evaluation)
- Quality Rubric Template: [Template](/docs/06-templates/quality-rubric-template)
- Acceptance Criteria Template: [Template](/docs/06-templates/acceptance-criteria-template)

## Next Step

Consider [Deployment Considerations for Local-First LLMs](./04-deployment-considerations.md) for scaling your local solutions.