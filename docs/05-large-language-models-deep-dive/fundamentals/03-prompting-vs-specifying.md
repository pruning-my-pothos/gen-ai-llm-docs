---
title: "Prompting vs. Specifying"
archetype: "fundamentals"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "prompting", "specification", "constraints"]
last_reviewed: "2025-12-28"
---

# Prompting vs. Specifying

:::info[Value Proposition]
Contrast ad-hoc prompting with disciplined specification so GenAI & LLM Documentation stays predictable. This distinction is fundamental for moving from experimental AI use to reliable, production-ready AI-assisted development.
:::

## Overview

The terms "prompting" and "specifying" are often used interchangeably in the context of interacting with LLMs, but in GenAI & LLM Documentation, they represent fundamentally different approaches. Prompting is typically an exploratory, conversational interaction. Specifying is a deliberate, structured, and formal act of defining intent and constraints. Understanding this difference is crucial for achieving predictable, high-quality outputs from AI.

**Goal**: Elevate interactions with LLMs from informal "prompting" to rigorous "specifying" for professional outcomes.
**Anti-pattern**: Treating an LLM chat interface as a magic genie, expecting it to infer complex requirements from simple, conversational input.

---

## When to Use

| ✅ Use This Pattern When...           | 🚫 Do Not Use When...                     |
| :------------------------------------ | :---------------------------------------- |
| Delegating production-impacting tasks to AI | You are purely exploring an LLM's capabilities for fun |
| Requiring consistent and verifiable AI outputs | The task is a creative brainstorming session with no objective criteria |
| Ensuring AI outputs adhere to strict technical/business rules | You are using the LLM for casual conversation or learning |

---

## Prerequisites

:::warning[Before you start]
A clear understanding of the AI tool's capabilities and limitations, and a commitment to structured communication.
:::

-   **Artifacts**: Basic understanding of the GenAI & LLM Documentation Loop.
-   **Context**: Awareness of the specific task and its requirements.

---

## The Difference: Prompting vs. Specifying

### Prompting

-   **Nature**: Conversational, exploratory, iterative.
-   **Goal**: Brainstorm, generate ideas, quick drafts, ask questions.
-   **Characteristics**:
    -   Often short, informal, and open-ended.
    -   Relies heavily on the LLM's implicit knowledge and general capabilities.
    -   Results are often varied and may require significant human refinement.
-   **Typical Use Cases**: Content generation for marketing, creative writing, initial code snippets for experimentation.

### Specifying

-   **Nature**: Structured, deliberate, formal, precise.
-   **Goal**: Generate exact artifacts that meet predefined criteria.
-   **Characteristics**:
    -   Utilizes Intent Specs, Constraint Specs, and Delegation Contracts.
    -   Explicitly defines desired outcomes, non-negotiable rules, and boundaries.
    -   Results are expected to be highly predictable and directly verifiable.
-   **Typical Use Cases**: Code generation (functions, components, APIs), documentation, test creation, configuration files.

---

## Why Specifying is Critical for Professional GenAI & LLM Documentation

-   **Reduces Hallucinations**: By being explicit, you leave less room for the AI to invent facts or logic.
-   **Ensures Correctness**: Constraints prevent the AI from generating code that violates architectural, security, or quality standards.
-   **Enables Verifiability**: A precise spec allows you to objectively compare AI output against expected behavior.
-   **Manages Scope**: Explicit boundaries prevent the AI from over-generating or drifting from the task.
-   **Fosters Accountability**: When the spec is clear, any deviation by the AI (or a human misinterpretation of the spec) can be identified and corrected.

---

## Specify with GenAI & LLM Documentation

The GenAI & LLM Documentation Loop is fundamentally a specifying process. Each stage builds a richer, more precise specification for the AI.

```mermaid
flowchart LR
    A[Vague Idea] --> B{Discovery Brief}
    B --> C{Intent Spec}
    C --> D{Constraint Spec}
    D --> E{Delegation Contract}
    E --> F[Generation Request (Precise Prompt)]
    F --> G[AI Output]
    G --> H{Review & Interrogation}
    H --> I{Acceptance Criteria}
    I --> J[Accepted Artifact]

    classDef step fill:#E6F7FF,stroke:#1B75BB,color:#0F1F2E;
    class A,B,C,D,E,F,G,H,I,J step;
```

---

## Practical Example: Specifying a Function for AI

**Objective**: Get AI to generate a TypeScript function to sanitize user input.

**Prompting (Ineffective):**
> "Write a function to sanitize user input for a web app."
> *Issue*: Too vague. What kind of sanitization? For what purpose? What framework?

**Specifying (Effective - GenAI & LLM Documentation approach):**

1.  **Intent Spec**: "The function's purpose is to prevent XSS attacks by sanitizing user-provided string inputs before rendering them in HTML. It should remove potentially malicious script tags and HTML entities."
2.  **Constraint Spec**: "Use TypeScript. The function should accept a `string` and return a `string`. It must use a well-established sanitization library or method (e.g., DOMPurify or custom regex if well-justified). It must not rely on client-side JavaScript for primary sanitization if used server-side."
3.  **Delegation Contract**: "AI is permitted to generate code in `src/utils/sanitization.ts`. Prohibited from introducing new npm dependencies beyond `dompurify` if used. Prohibited from generating logic that relies on `eval()`."
4.  **Generation Request (Precise Prompt):**

    ```markdown
    "Generate a TypeScript function `sanitizeHtmlInput(input: string): string` in `src/utils/sanitization.ts`.
    Adhere to the attached Intent Spec, Constraint Spec, and Delegation Contract.
    The function should escape HTML entities to prevent XSS. Prioritize using `dompurify` if available and applicable, otherwise use a safe method.
    Include JSDoc comments."
    ```
---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **"Chatting" with AI**    | Inconsistent, unreliable outputs.        | Treat AI interaction as a structured request, not a conversation. |
| **Omitting Constraints**  | AI generates code that doesn't fit the project or is insecure. | Always provide a comprehensive Constraint Spec. |
| **Lack of Clarity**       | Ambiguous instructions lead to guessing by AI. | Be explicit. Use deterministic language and clear structures. |

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0