---
title: "IDE Setup: Cursor"
archetype: "tooling"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "tooling", "cursor", "ide", "setup"]
last_reviewed: "2025-12-28"
---

# IDE Setup: Cursor

:::info[Value Proposition]
Cursor is currently the preferred IDE for GenAI & LLM Documentation because it treats **Context Injection** as a first-class feature. You can explicitly reference your specs using `@Symbols`, making the GenAI & LLM Documentation Loop frictionless.
:::

## Overview

While GenAI & LLM Documentation is tool-agnostic, the choice of development environment can significantly impact workflow efficiency. Cursor, an AI-first IDE, is particularly well-suited for GenAI & LLM Documentation due to its deep integration of AI capabilities, including file-aware chat, code generation, and direct access to specifications. This document guides you through setting up Cursor to optimize your GenAI & LLM Documentation workflow.

**Goal**: Configure Cursor to maximize productivity and adherence to GenAI & LLM Documentation principles.
**Anti-pattern**: Using an IDE without integrating AI capabilities, or using AI tools in a fragmented manner that breaks the GenAI & LLM Documentation Loop.

---

## When to Use

| ✅ Use This Pattern When...           | 🚫 Do Not Use When...                     |
| :------------------------------------ | :---------------------------------------- |
| Developing with GenAI & LLM Documentation                                 | Your team explicitly prohibits the use of AI-integrated IDEs |
| Needing seamless context injection for AI  | Your primary task is purely manual (e.g., hardware setup) |
| Automating boilerplate or refactorings | You are comfortable with context switching between your IDE and a separate AI chat interface |

---

## Prerequisites

:::warning[Before you start]
Ensure you have Cursor installed and a basic understanding of its core AI features.
:::

-   **Artifacts**: Cursor IDE installed and configured with your preferred AI model (e.g., OpenAI, Anthropic, local LLM).
-   **Context**: Your project's GenAI & LLM Documentation specs (Intent, Constraints, etc.) are available in your workspace.

---

## Configuration for GenAI & LLM Documentation

### 1. Model Configuration

Ensure Cursor is connected to the appropriate LLM, ideally one that balances capability with context window size for code tasks.

### 2. Custom Prompts / Persona Setup

Configure Cursor's chat experience with a persona that aligns with GenAI & LLM Documentation principles.

**Example Custom Prompt (in Cursor settings):**
> "You are a Senior Engineer practicing GenAI & LLM Documentation (Generative AI & Large Language Model Documentation). Your primary goal is to assist in generating clear, correct, and maintainable code and documentation. You adhere strictly to provided Intent Specs, Constraint Specs, and Delegation Contracts. You prioritize clarity, safety, and verifiable outcomes. Always ask for clarification if intent or constraints are ambiguous. Do not proceed without clear instructions."

### 3. Keybindings for Efficiency

Customize keyboard shortcuts for frequently used GenAI & LLM Documentation actions (e.g., "Chat with selection," "Generate from scratch," "Ask about current file").

### 4. Integrate Local Models (Optional, for privacy)

If working with sensitive data, configure Cursor to use a local LLM (e.g., via Ollama integration) to keep all processing on your machine.

---

## The GenAI & LLM Documentation Workflow in Cursor

1.  **Context Injection**: Highlight relevant code, open your `Intent Spec.md` and `Constraint Spec.md` files.
2.  **Generate**: Use Cursor's "Generate" feature with a precise Generation Request, referencing your open specs with `@` (e.g., `@Intent Spec.md`, `@Constraint Spec.md`).
3.  **Chat**: Discuss specific sections of code with the AI, asking for explanations, refactorings, or tests, always grounding the conversation in your specs.
4.  **Review Diff**: Cursor's integrated diff viewer makes it easy to review AI-generated changes before accepting them.
5.  **Iterate**: If the output isn't perfect, refine your prompt or specs, and regenerate.

---

## Practical Example: Generating a Feature with Cursor

**Objective**: Generate a new React component `UserProfileCard` with specific styling and accessibility.

**Cursor Workflow:**

1.  **Open Specs**: Open `src/specs/UserProfileCard.IntentSpec.md` and `src/specs/UserProfileCard.ConstraintSpec.md`.
2.  **Highlight Context**: Select the `User` TypeScript interface definition in `src/types/user.ts`.
3.  **Generation Request (in Cursor Chat):**
    ```markdown
    Generate a React TypeScript component for `src/components/UserProfileCard.tsx` based on `@UserProfileCard.IntentSpec.md` and `@UserProfileCard.ConstraintSpec.md`.
    The component should display user's name, email, and avatar.
    It must use Tailwind CSS for styling and adhere to WCAG 2.1 AA accessibility guidelines.
    Refer to `@src/types/user.ts` for the User interface.
    ```
4.  **Review and Accept**: Review the generated `UserProfileCard.tsx` in the integrated diff. If any part doesn't meet the specs, prompt the AI for revisions.

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Over-reliance on IDE Autocompletion** | Missing the bigger picture, generating code not aligned with specs. | Use full Generation Requests, not just inline suggestions, for significant tasks. |
| **Ignoring Spec Context** | AI generates code that violates constraints or intent. | Always explicitly reference your specs when prompting for generation. |
| **Lack of Diff Review**   | Accepting AI changes blindly without verification. | Make reviewing generated diffs a mandatory step before committing. |

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0