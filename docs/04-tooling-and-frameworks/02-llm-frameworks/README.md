---
title: "LLM Frameworks: Overview"
archetype: "tooling"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "tooling", "llm-frameworks", "orchestration", "rag"]
last_reviewed: "2025-12-28"
id: 00-frameworks-overview
slug: /04-tooling-and-frameworks/02-llm-frameworks/00-frameworks-overview
---

:::info[Value Proposition]
Understand the landscape of LLM frameworks and how they enable the construction of sophisticated AI applications that adhere to GenAI & LLM Documentation principles. This guide helps in selecting the right tools for orchestrating complex LLM interactions, integrating external data, and building robust, scalable AI systems.
:::

## Overview

While direct prompting with LLMs is powerful, building complex AI applications often requires more than single-turn interactions. LLM frameworks (or orchestration frameworks) provide the tools and abstractions to chain LLM calls, integrate with external data sources (e.g., Retrieval Augmented Generation - RAG), manage conversation history, and enable tool use. This section offers an overview of these frameworks and how they fit into a structured, documentation-driven approach to AI development.

**Goal**: Guide the selection and application of LLM frameworks to build reliable, maintainable, and verifiable AI systems.
**Anti-pattern**: Building complex AI logic with raw API calls, leading to boilerplate, unmanageable state, and difficulty in debugging or extending the application.

---

## When to Use

| ✅ Use This Pattern When...                                 | 🚫 Do Not Use When...                                  |
| :--------------------------------------------------------- | :----------------------------------------------------- |
| Building multi-step AI agents or conversational interfaces | The task involves a simple, single-turn LLM interaction |
| Integrating LLMs with proprietary data sources (RAG)       | You are solely using an IDE copilot for code generation |
| Automating complex workflows involving multiple LLM calls and external tools | The development team has limited Python/TypeScript expertise or prefers low-code solutions for simple tasks |
| Developing scalable and maintainable AI applications       | You need to run LLMs locally without external dependencies (see Local Inference) |

---

## Key Concepts in LLM Frameworks

### 1. Chains & Agents

-   **Chains**: Predefined sequences of LLM calls or other components to achieve a specific task (e.g., summarize document -> extract entities).
-   **Agents**: LLMs that use tools to achieve a goal. The LLM decides which tools to use and in what order.

### 2. Retrieval Augmented Generation (RAG)

A critical pattern where an LLM retrieves relevant information from a knowledge base (e.g., vector database) before generating a response, grounding its output in facts and reducing hallucinations.

### 3. Tool Use (Function Calling)

Enabling LLMs to interact with external tools or APIs (e.g., search engines, calculators, internal services) to extend their capabilities beyond pure text generation.

### 4. Memory Management

Handling conversational history to maintain context over multi-turn interactions, crucial for chatbots and interactive agents.

### 5. Prompt Engineering & Templates

Formalizing prompt structures within the framework, allowing for reusable and version-controlled prompting strategies.

### 6. Observability & Tracing

Tools within frameworks to track the execution of LLM calls, monitor token usage, latency, and debug complex AI application flows.

---

## LLM Frameworks & Tools

This section provides an overview of common LLM frameworks and related tools:

-   **LangChain**: A popular framework for developing applications powered by LLMs, known for its chains, agents, and integrations.
    -   See: [LangChain: Enough for Practice](./01-langchain-enough-for-practice.md)
-   **LlamaIndex**: Focuses on data framework for LLM applications, especially strong in RAG, connecting LLMs to custom data sources.
    -   See: [LlamaIndex: Enough for Practice](./02-llamaindex-enough-for-practice.md)
-   **DSPy**: A programming model for composing prompts and LLM calls into declarative pipelines, emphasizing programmatic optimization and performance.
    -   See: [DSPy: Enough for Practice](./03-dspy-enough-for-practice.md)
-   **Flowise & Low-code Orchestration**: Tools that provide visual interfaces for building LLM applications, abstracting away complex coding.
    -   See: [Flowise & Low-code Orchestration](./04-flowise-and-lowcode-orchestration.md)
-   **Vector Databases & Embeddings**: Essential components for RAG, storing and retrieving contextual information.
    -   See: [Vector Databases & Embeddings](./05-vector-databases-and-embeddings.md)
-   **Observability & Tracing**: Tools for monitoring, debugging, and understanding the behavior of LLM applications.
    -   See: [Observability & Tracing](./06-observability-and-tracing.md)

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Over-engineering Simple Tasks** | Unnecessary complexity, slower development. | Use frameworks for complex tasks; simple scripts for simple interactions. |
| **Ignoring Cost Management** | High token usage, unexpected cloud bills. | Implement token limits, caching, and careful prompt engineering. |
| **Black Box Debugging**   | Difficulty in understanding why an AI application behaves a certain way. | Embrace observability tools; log LLM inputs/outputs; use tracing. |
| **RAG Without Quality Data** | Hallucinations persist due to irrelevant or poor-quality retrieved information. | Ensure data sources for RAG are clean, relevant, and well-indexed. |

---

## Quick Links

- Tooling Index: [Index](/docs/04-tooling-and-frameworks/00-tooling-index)
- Prompt Engineering: [Handbook Method](/docs/01-handbook-method/prompt-engineering)
- The GenAI-LLM Loop: [Handbook Method](/docs/01-handbook-method/the-genai-llm-loop)

## Next Step

Dive into [LangChain: Enough for Practice](./01-langchain-enough-for-practice.md) to start building your first LLM applications.
