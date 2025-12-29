---
title: "Hallucinations and Failure Modes"
archetype: "fundamentals"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "hallucination", "failure-modes", "risk", "responsible-ai"]
last_reviewed: "2025-12-28"
---

# Hallucinations and Failure Modes

:::info[Value Proposition]
Identify common failures, why they occur, and how the methods in this documentation help mitigate them. Understanding these modes is crucial for building reliable AI-assisted workflows and prevents over-reliance on AI.
:::

## Overview

Large Language Models (LLMs) are powerful but not infallible. They are probabilistic engines designed to generate plausible sequences of tokens, not necessarily truthful or correct ones. This leads to characteristic failure modes, most notably "hallucinations"—confidently presented falsehoods. This document categorizes common LLM failure modes and outlines how the principles and practices in this documentation are specifically designed to anticipate, detect, and mitigate these risks.

**Goal**: Educate practitioners on inherent LLM limitations and provide strategies to manage associated risks.
**Anti-pattern**: Blindly trusting LLM outputs, or attempting to fix LLM failures solely by regenerating prompts without understanding the root cause.

---

## When to Use

| ✅ Use This Pattern When...           | 🚫 Do Not Use When...                     |
| :------------------------------------ | :---------------------------------------- |
| Designing critical AI-assisted workflows | You assume LLMs are infallible and always correct |
| Debugging unexpected AI behavior      | You are only concerned with the speed of generation |
| Training teams on responsible AI usage | You believe all failures are due to poor prompt engineering |

---

## Prerequisites

:::warning[Before you start]
A basic understanding of how LLMs work (e.g., token prediction, probabilistic nature) is helpful.
:::

-   **Artifacts**: None specific.
-   **Context**: Awareness of the domain in which the LLM is operating and the potential impact of incorrect outputs.

---

---

## Common LLM Failure Modes

### 1. Hallucinations

**Description**: The LLM generates information that is plausible but factually incorrect, often presented with high confidence. This can include non-existent citations, fake API calls, or incorrect code logic.
**Why it happens**: LLMs learn patterns from vast datasets. When asked questions outside their training data or given ambiguous prompts, they extrapolate to generate the most probable, but not necessarily truthful, response.
**Mitigation**:
-   **Constraint Spec**: Explicitly define factual constraints (e.g., "only use official API documentation").
-   **Review & Interrogation**: Rigorously verify all factual claims, code logic, and references.
-   **Evidence-Based Verification**: Require AI to show its work, cite sources, or provide executable tests.
-   **Retrieval Augmented Generation (RAG)**: Ground the LLM with relevant, authoritative context.

### 2. Context Window Limitations

**Description**: The LLM "forgets" earlier parts of the conversation or misinterprets instructions because the total input/output exceeds its context window.
**Why it happens**: LLMs have a finite amount of information they can process simultaneously. Longer conversations or large codebases can exceed this limit.
**Mitigation**:
-   **Scoping**: Break down complex tasks into smaller, manageable chunks that fit within the context window.
-   **Summarization**: Use AI to summarize previous turns or large code sections before re-feeding them.

### 3. Ignoring Constraints

**Description**: The LLM produces output that violates explicit instructions or non-negotiable requirements.
**Why it happens**: Constraints might be buried in verbose prompts, contradict other instructions, or be deemed less "probable" by the model than other patterns.
**Mitigation**:
-   **Constraint Spec**: Make constraints explicit, prioritized, and easy for AI to parse (e.g., bullet points, clear keywords like "MUST", "MUST NOT").
-   **Review & Interrogation**: Specifically check for constraint violations as a primary review step.

### 4. Code Generation Biases / Unidiomatic Code

**Description**: The LLM generates code that works but is unidiomatic, uses outdated patterns, or introduces subtle bugs reflecting patterns seen in its training data (e.g., Python code with Java-like structure).
**Why it happens**: Training data can be vast but not always reflect current best practices or project-specific idioms.
**Mitigation**:
-   **Constraint Spec**: Define coding standards, preferred libraries, and architectural patterns (e.g., "Use functional components in React", "Adhere to ESLint Airbnb config").
-   **Style Guide**: Provide examples of desired code style.

### 5. Over-generalization / Under-specialization

**Description**: The LLM provides generic answers when specific ones are needed, or specializes too much when a broader perspective is required.
**Why it happens**: The prompt lacks sufficient detail to guide the LLM to the correct level of abstraction or specificity.
**Mitigation**:
-   **Intent Spec**: Clearly define the desired level of detail and scope.
-   **Prompt Engineering**: Use examples, few-shot learning, or chain-of-thought prompting to guide the LLM.
-   **Iterative Refinement**: Start broad, then iteratively narrow the focus with subsequent prompts.

---

## Managing Failure Modes

-   **Proactive Prevention**: Design your Intent and Constraints to minimize the likelihood of failures.
-   **Early Detection**: Integrate rigorous Review & Interrogation, and Automated Evaluation throughout the workflow.
-   **Systematic Mitigation**: Treat failures as learning opportunities, refining your specifications and processes, not just the AI's output.

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0