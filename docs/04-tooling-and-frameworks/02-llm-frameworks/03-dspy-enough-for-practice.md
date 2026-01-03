---
title: "LLM Frameworks: DSPy (Enough for Practice)"
archetype: "tooling"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "tooling", "llm-frameworks", "dspy", "optimization", "prompt-engineering"]
last_reviewed: "2025-12-28"
---

:::info[Value Proposition]
DSPy is a programming model for LLMs that enables the programmatic composition and optimization of prompts and LLM calls. It shifts the focus from manual prompt engineering to defining a pipeline's logic, letting DSPy compile the best prompts for your specific task and dataset. This allows for rapid iteration, improved performance, and more robust LLM applications, aligning perfectly with the structured and verifiable goals of GenAI & LLM Handbook.
:::

## Overview

Traditional LLM development often involves extensive manual prompt engineering, which is brittle and hard to optimize. DSPy (Declarative Self-improving Language Programs) addresses this by treating LLM calls as modules within a larger program, allowing you to define the *flow* and *logic* of your application declaratively. DSPy then automatically optimizes the prompts, model parameters, and even multi-stage reasoning steps using a small amount of training data, transforming complex prompt chains into efficient, high-performance pipelines.

**Goal**: Build more robust, performant, and maintainable LLM applications by programmatically defining and optimizing prompt pipelines, reducing reliance on manual prompt engineering.
**Anti-pattern**: Relying on trial-and-error prompt engineering for complex, multi-stage LLM tasks, leading to fragile systems that are difficult to optimize or adapt.

---

## When to Use

| Good fit (use when...)                                 | Avoid (not a fit when...)                                  |
| :--------------------------------------------------------- | :----------------------------------------------------- |
| Building multi-stage LLM applications where individual prompts need to be optimized | The task is a simple, single-turn prompt where complex orchestration is unnecessary |
| You have a small dataset for "demonstration" or "feedback" to optimize prompt components | You primarily need to manage data ingestion and indexing for RAG (LlamaIndex might be a better fit) |
| Needing to systematically improve the performance of an LLM pipeline | You are building complex agents that dynamically use external tools (LangChain might be a better fit for initial exploration) |
| Wanting to experiment with different LLM components (e.g., different prompts for different stages) and automatically evaluate them | Your LLM application is static and does not require any form of programmatic optimization or learning |

---

## Key Concepts in DSPy

### 1. Primitives (Modules)

-   **`dspy.Predict`**: The most basic primitive, analogous to a single LLM call. You define input and output fields.
-   **`dspy.ChainOfThought`**: Inherits from `Predict`, automatically instructs the LLM to perform step-by-step reasoning.
-   **`dspy.Retrieve`**: Integrates a retriever (e.g., from a RAG system) into the pipeline.

### 2. Signatures

A declarative way to define the inputs and outputs of an LLM call. This is DSPy's equivalent of an Intent Spec for a single module.

```python
# Example DSPy Signature
class AnswerWithContext(dspy.Signature):
    """Answer questions with a focus on specific provided context."""
    context = dspy.InputField(desc="relevant facts from the knowledge base")
    question = dspy.InputField()
    answer = dspy.OutputField(desc="a concise answer that uses the context")
```

### 3. Programs

Compositions of DSPy primitives, forming the overall LLM application logic. This is where you define your pipeline.

### 4. Compilers (Optimizers)

DSPy's core innovation. Compilers automatically "teach" your DSPy program to get better at its task by optimizing the prompts and module parameters based on a small dataset of examples.

### 5. Teleprompters

Different strategies for optimization (e.g., `BootstrapFewShot`, `BayesianSignatureOptimizer`).

---

## GenAI & LLM Handbook Workflow with DSPy

### 1. Define Specs (Intent, Constraint)

Your GenAI & LLM Handbook Intent Spec defines the overall goal. Your Constraint Spec (especially regarding output format, safety) translates well into DSPy's `signatures` and program structure.

### 2. Program the Pipeline (Declarative Logic)

Instead of just writing a single prompt, you write a Python program that defines the flow of information and LLM calls.

```python
import dspy

class SimpleRAG(dspy.Module):
    def __init__(self, num_passages=3):
        super().__init__()
        self.retrieve = dspy.Retrieve(k=num_passages)
        self.generate_answer = dspy.ChainOfThought(AnswerWithContext)

    def forward(self, question):
        context = self.retrieve(question).passages
        prediction = self.generate_answer(context=context, question=question)
        return dspy.Prediction(answer=prediction.answer)
```

### 3. Define a Metric (Acceptance Criteria)

Translate your GenAI & LLM Handbook Acceptance Criteria into an executable metric function that can evaluate your DSPy program.

### 4. Compile (Optimize Prompts)

Use a DSPy compiler (e.g., `BootstrapFewShot`) with a small training dataset to automatically optimize your program's internal prompts and parameters.

```python
# Example: Compile the RAG program
from dspy.teleprompters import BootstrapFewShot

llm = dspy.OpenAI(model="gpt-3.5-turbo")
retriever_model = dspy.ColBERTv2() # Example retriever

dspy.settings.configure(lm=llm, rm=retriever_model)

# Define a simple evaluation metric (e.g., check if answer contains certain keywords)
def my_metric(prediction, question, answer):
    # This would be more complex in real-world scenarios
    return answer in prediction.answer

# Compile!
tp = BootstrapFewShot(metric=my_metric)
compiled_rag = tp.compile(SimpleRAG(), trainset=my_training_data)

# Now use compiled_rag for better performance!
```

### 5. Evaluate and Iterate

Test your compiled program rigorously. If it doesn't meet Acceptance Criteria, refine your program structure, training data, or metric, and re-compile.

```mermaid
graph LR
    A[Intent & Constraint Specs] --> B[Define DSPy Signature]
    B --> C[Program DSPy Pipeline]
    C --> D[Define Metric (Acceptance Criteria)]
    D --> E[Compile (Optimize Prompts)]
    E --> F[Evaluate]
    F -- Fail --> C
    F -- Pass --> G[Deploy]

    classDef step fill:#E6F7FF,stroke:#1B75BB,color:#0F1F2E;
    class A,B,C,D,E,F,G step;
```

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Poorly Defined Signatures** | LLM struggles to understand input/output expectations. | Clearly define input/output fields and their descriptions in DSPy Signatures. |
| **Insufficient Training Data** | Compiler cannot effectively optimize prompts, leading to suboptimal performance. | Even a small, high-quality training set (10-20 examples) can make a big difference. |
| **Complex Program Logic** | Debugging becomes difficult; compiler struggles to optimize. | Break down complex tasks into smaller, modular DSPy programs; use `dspy.ChainOfThought` for explicit reasoning. |
| **Ignoring Cost of Compilation** | Compiling can involve many LLM calls, leading to high costs. | Start with smaller models for compilation; monitor token usage during compilation. |

---

## Quick Links

- LLM Frameworks Overview: [Index](/docs/04-tooling-and-frameworks/02-llm-frameworks/00-frameworks-overview)
- Prompt Engineering: [Handbook Method](/docs/01-handbook-method/prompt-engineering)
- RAG: [Handbook Method](/docs/01-handbook-method/05-rag)
- Evaluation: [Handbook Method](/docs/01-handbook-method/evaluation)

## Next Step

Explore [Flowise & Low-code Orchestration](./04-flowise-and-lowcode-orchestration.md) for visual LLM application building.