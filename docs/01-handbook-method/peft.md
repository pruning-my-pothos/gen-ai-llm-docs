---
title: "Parameter-Efficient Fine-tuning (PEFT)"
archetype: "fundamentals"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "peft", "fine-tuning", "llm-training", "optimization", "lora"]
last_reviewed: "2025-12-28"
---

:::info[Value Proposition]
Leverage Parameter-Efficient Fine-tuning (PEFT) techniques (like LoRA) to adapt large language models (LLMs) to specific tasks with significantly fewer computational resources and storage requirements compared to full fine-tuning. This democratizes LLM customization, enabling smaller teams to achieve high performance while maintaining cost and operational efficiency.
:::

## Overview

Fine-tuning large language models can be computationally expensive and memory-intensive, requiring vast amounts of GPU resources and storage to update all the model's parameters. PEFT methods address this challenge by only fine-tuning a small subset of the model's parameters (or adding a small number of new parameters) while keeping most of the original model frozen. This dramatically reduces the computational overhead, making fine-tuning more accessible, faster, and less prone to catastrophic forgetting.

**Goal**: Adapt LLMs to specialized tasks with optimal performance and minimal resource expenditure, making fine-tuning a practical strategy for a wider range of projects.
**Anti-pattern**: Avoiding fine-tuning due to perceived cost or complexity, or attempting full fine-tuning when PEFT methods would achieve similar results with fewer resources.

---

## When to Use

| ✅ Use This Pattern When...                                 | 🚫 Do Not Use When...                                  |
| :--------------------------------------------------------- | :----------------------------------------------------- |
| You need to adapt a large LLM to a specific task or domain | You are performing full pre-training of a foundational model from scratch |
| You have limited GPU resources or budget for fine-tuning   | Your task requires fundamental changes to the model's core capabilities beyond what adaptation can provide |
| Rapidly iterating on model customization for different tasks | Your dataset is extremely small and unrepresentative, which would lead to poor fine-tuning results even with PEFT |
| Seeking to improve model performance without incurring the full cost of fine-tuning | You have access to ample computational resources and want to explore the absolute maximum performance possible (full fine-tuning) |

---

## Prerequisites

:::warning[Before you start]
A high-quality, task-specific dataset is still essential. PEFT makes fine-tuning easier, but not effective with poor data.
:::

-   **Artifacts**: A clean, task-specific dataset (same as for full fine-tuning).
-   **Context**: Access to a pre-trained LLM that supports integration with PEFT libraries (e.g., via Hugging Face Transformers).

---

## Key Concepts and How It Works

### 1. Low-Rank Adaptation (LoRA)

-   **Principle**: Instead of fine-tuning the entire weight matrices of a pre-trained LLM, LoRA introduces small, low-rank matrices alongside the original large matrices. Only these small matrices are trained, while the original, massive LLM weights remain frozen.
-   **Benefits**:
    -   **Fewer trainable parameters**: Drastically reduces memory and compute requirements.
    -   **Faster training**: Less to train means quicker convergence.
    -   **Smaller checkpoints**: Fine-tuned LoRA weights are tiny (e.g., MBs vs. GBs), making them easy to store and share.
    -   **No catastrophic forgetting**: Since original weights are frozen, the base model's general knowledge is preserved.

### 2. Quantization

-   **Principle**: Reducing the precision of model weights (e.g., from 16-bit floating point to 8-bit or 4-bit integers).
-   **Benefits**: Reduces memory footprint and can accelerate inference, making larger models runnable on less powerful hardware. Often combined with LoRA (e.g., QLoRA).

### 3. Adapters

-   **Principle**: General concept where small, trainable neural network modules (adapters) are inserted into various layers of a pre-trained model. Only the adapters are trained.
-   **Benefits**: Similar to LoRA, allows for efficient task adaptation.

```mermaid
graph TD
    PretrainedLLM[Pre-trained LLM (Frozen)] --> LoRAMatrixA[LoRA Matrix A]
    PretrainedLLM --> LoRAMatrixB[LoRA Matrix B]
    LoRAMatrixA --> Adapt[Adaptation]
    LoRAMatrixB --> Adapt
    Adapt --> TaskSpecificOutput[Task-Specific Output]

    classDef step fill:#E6F7FF,stroke:#1B75BB,color:#0F1F2E;
    class PretrainedLLM,LoRAMatrixA,LoRAMatrixB,Adapt,TaskSpecificOutput step;
```

---

## GenAI & LLM Documentation Workflow with PEFT

### 1. Define Task & Prepare Dataset

Define your specific task and prepare a high-quality dataset, formatted for supervised fine-tuning.

### 2. Choose Base Model & PEFT Method

Select an LLM that is suitable for PEFT and decide on a specific PEFT technique (e.g., LoRA, QLoRA).

### 3. Configure Training Parameters

Set parameters like learning rate, number of epochs, batch size, and the rank of the LoRA adapters.

### 4. Run PEFT Training

Execute the PEFT training script using libraries like Hugging Face `peft` and `transformers`.

### 5. Evaluate Adapted Model

Rigorously evaluate the PEFT-adapted model against your specific task metrics and Acceptance Criteria. Compare its performance and resource usage to the base model and full fine-tuning if applicable.

### 6. Deploy & Monitor

Deploy the adapted model. Due to smaller checkpoint sizes, PEFT models are easier to share and deploy. Monitor its performance for task-specific accuracy and resource consumption.

---

## Practical Example: Using LoRA to Adapt an LLM for Summarization

**Objective**: Adapt a base LLM to produce concise, technical summaries of documentation, adhering to an internal style.

**PEFT Process:**

1.  **Define Task & Prepare Dataset**:
    -   Task: Summarize technical articles into 3-5 bullet points.
    -   Data: 200 pairs of (`full technical article`, `ideal bullet-point summary`) reflecting internal style.

2.  **Choose Base Model & PEFT Method**: `Mistral-7B-base` with LoRA.

3.  **Configure Training**:
    -   LoRA Rank (`r`): 8
    -   LoRA Alpha (`lora_alpha`): 16
    -   Learning Rate: `2e-4`
    -   Epochs: 3

4.  **Run PEFT Training**: Use `transformers.Trainer` with `peft` library.

5.  **Evaluate**:
    -   Metrics: ROUGE-1, ROUGE-2, ROUGE-L (for summary quality). Human review for conciseness and style adherence.
    -   Dataset: 50 new technical articles.

6.  **Deploy & Monitor**: Deploy the LoRA adapters alongside the frozen `Mistral-7B-base` model.

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Low-Quality Data**      | PEFT-adapted model performs poorly or learns incorrect patterns. | Data quality is paramount. Invest in careful data curation and cleaning. |
| **Incorrect Hyperparameters** | Suboptimal model performance or slow training. | Experiment with learning rates, LoRA ranks, and batch sizes; leverage community advice. |
| **Ignoring Base Model Limitations** | PEFT cannot fundamentally change a base model's inherent weaknesses. | Choose a base model with strong general capabilities relevant to your task. |
| **Over-optimization**     | Adapters become too large, losing efficiency benefits, or overfitting. | Monitor validation loss; choose appropriate LoRA rank (e.g., 4, 8, 16); stop training early. |

---

## Quick Links

- Handbook Method: [Overview](/docs/01-handbook-method/01-overview)
- Fine-tuning: [Handbook Method](/docs/01-handbook-method/fine-tuning)
- Instruction Tuning: [Handbook Method](/docs/01-handbook-method/instruction-tuning)
- Model Selection: [Handbook Method](/docs/01-handbook-method/03-model-selection)

## Next Step

Explore [Prompt Engineering](/docs/01-handbook-method/prompt-engineering) as a complementary technique for guiding LLMs.
