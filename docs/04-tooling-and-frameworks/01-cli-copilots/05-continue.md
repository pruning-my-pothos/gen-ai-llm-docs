---
title: "CLI Copilots: Continue"
archetype: "tooling"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "tooling", "cli", "copilot", "continue", "ide-integration"]
last_reviewed: "2025-12-28"
---

:::info[Value Proposition]
Continue is a powerful open-source AI coding assistant that integrates deeply with your IDE and offers a versatile CLI. It provides a flexible "context window" where you can add files, documentation, or chat history, making it an excellent tool for applying the GenAI & LLM Documentation workflow, especially for tasks requiring extensive context injection and multi-tool orchestration.
:::

## Overview

Continue acts as an intelligent layer between your IDE (VS Code, JetBrains) and various LLMs (local or cloud). It allows you to select code, chat with the AI about it, and execute tasks like code generation, refactoring, and debugging. Its key strength lies in its ability to manage a persistent context window, allowing you to build up a complex understanding of your project over multiple interactions. This makes it highly suitable for applying GenAI & LLM Documentation principles by providing the AI with rich, structured context (your specs).

**Goal**: Automate complex code tasks by leveraging Continue's persistent context management and multi-LLM support within your IDE or via its CLI.
**Anti-pattern**: Using Continue for trivial, single-turn prompts; failing to leverage its context window and continuous interaction for more complex, iterative tasks.

---

## When to Use

| ✅ Use This Pattern When...                                 | 🚫 Do Not Use When...                                  |
| :--------------------------------------------------------- | :----------------------------------------------------- |
| You need a persistent chat history with the AI across multiple files or sessions | You prefer a simpler, less integrated AI coding assistant |
| Working on tasks requiring the AI to understand a broad context (multiple files, docs) | The task is a one-off, atomic change that can be done quickly manually |
| Integrating local LLMs or custom LLM proxies with your IDE for sensitive tasks | You require extremely low-latency code suggestions (IDE's native LSP often faster) |
| Automating complex refactorings or feature implementations involving several code areas | You are debugging a live production issue and need immediate, autonomous action from the AI |

---

## Setup and Configuration

### 1. Installation

Install Continue as a VS Code or JetBrains extension, or use its CLI (`continue-cli`).

### 2. LLM Configuration

Configure Continue to use your preferred LLM(s). It supports a wide range of models, including local LLMs (e.g., Ollama) and cloud providers (OpenAI, Anthropic, Google).

### 3. Contextual Awareness

Continue's context window (often a sidebar in the IDE) is where you explicitly add files, code selections, or other information for the AI to consider.

---

## GenAI & LLM Documentation Workflow with Continue

### 1. Define Specs (Intent, Constraint, Delegation)

Create your Intent Spec, Constraint Spec, and Delegation Contract. These will be crucial inputs for Continue's context window.

### 2. Prepare the Context Window

Drag and drop relevant files into Continue's context window. This includes:
-   Your Intent Spec (`.md`)
-   Your Constraint Spec (`.md`)
-   Relevant code files (`.ts`, `.py`, `.js`, etc.)
-   Any relevant documentation (`README.md`, API specs)

### 3. Formulate the Generation Request

Type your Generation Request in Continue's chat. Refer to the context window and the content of your specs.

```text
# Example Prompt for Continue
> Implement the `ShoppingCart` module as described in the `Intent Spec` and `Constraint Spec` files that are currently in the context window. Ensure the module handles adding, removing, and updating items, and calculates the total price with taxes. All data storage should use the `ProductService` interface defined in `productService.ts` also in the context.
```

### 4. Interactive Refinement and Execution

Continue will respond directly in the chat, often proposing changes or asking for clarification.

-   **Accept/Reject**: Use Continue's inline diffs to accept or reject proposed changes.
-   **Chat-based Iteration**: Provide continuous feedback and refined instructions within the same chat thread. Continue remembers the conversation and context.
-   **Multi-Step Tasks**: Break down complex tasks into smaller prompts, using the chat history to guide the AI through a multi-step process.

### 5. Verification and Git Integration

Review Continue's output thoroughly. Integrate it with your git workflow.

```mermaid
graph LR
    A[Specs (Intent, Constraint, Delegation)] --> B{Continue (IDE/CLI)}
    B -- Add Files to Context --> C[Persistent Context Window]
    C -- Generation Request --> D[AI Proposes Changes]
    D -- Interactive Refinement --> D
    D -- Accept --> E[Verify & Commit]

    classDef step fill:#E6F7FF,stroke:#1B75BB,color:#0F1F2E;
    class A,B,C,D,E step;
```

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Overwhelming the Context Window** | AI performance degradation, increased cost, irrelevant responses. | Actively manage context; remove irrelevant files or chat history using Continue's tools. |
| **Vague Initial Context** | AI generates code that doesn't align with project needs. | Always start with clear Intent and Constraint Specs in the context window. |
| **Ignoring Human Review** | Uncontrolled changes, introducing bugs or security issues. | Critically review all AI-generated code, leverage Continue's diff view and human judgment. |
| **Not Leveraging Multi-LLM Support** | Limited by a single model's strengths/weaknesses. | Experiment with different LLMs for different tasks (e.g., fast model for brainstorming, powerful model for complex generation). |

---

## Quick Links

- Tooling Index: [Index](/docs/04-tooling-and-frameworks/00-tooling-index)
- CLI Agnostic Workflow: [CLI Copilots](/docs/04-tooling-and-frameworks/01-cli-copilots/00-cli-agnostic-workflow)
- Delegation Contract Template: [Template](/docs/06-templates/delegation-contract-template)
- Local Inference: [Tooling Guide](/docs/04-tooling-and-frameworks/03-local-inference)

## Next Step

Explore [Git Discipline](/docs/04-tooling-and-frameworks/01-cli-copilots/06-git-discipline) to manage AI-generated code responsibly.