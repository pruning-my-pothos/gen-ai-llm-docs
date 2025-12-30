---
title: "Generation Requests"
archetype: "method"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "generation", "prompting", "method"]
last_reviewed: "2025-12-28"
---



:::info[Value Proposition]
Formulate precise and structured prompts to AI, combining Intent, Constraints, and Delegation Contract into an executable instruction. This maximizes the relevance and quality of AI-generated outputs, reducing iteration cycles.
:::

## Overview

The Generation Request is the direct instruction given to an AI model to produce an artifact. It is the culmination of the prior steps in the GenAI & LLM Handbook Loop, explicitly referencing the Intent Spec, Constraint Spec, and Delegation Contract. A well-crafted Generation Request leaves minimal room for AI interpretation or hallucination, guiding the AI toward a specific, desired output.

**Goal**: Transform human intent and constraints into an unambiguous, actionable prompt for AI.
**Anti-pattern**: Vague, conversational prompts like "Write a function for X," which force the AI to make assumptions.

---

## When to Use

| ✅ Use This Pattern When...           | 🚫 Do Not Use When...                     |
| :------------------------------------ | :---------------------------------------- |
| Creating any AI-generated artifact    | You are brainstorming or exploring concepts with AI |
| Delegating a specific coding task     | The task is purely human-driven (e.g., strategic planning) |
| Generating documentation or tests     | The output is a draft for internal discussion, not external release |

---

## Prerequisites

:::warning[Before you start]
You **MUST** have a well-defined **Intent Spec**, **Constraint Spec**, and **Delegation Contract**.
:::

-   **Artifacts**: Intent Spec, Constraint Spec, Delegation Contract.
-   **Context**: Understanding of the AI tool's capabilities and limitations (e.g., context window size, supported output formats).

---

---

## The Pattern (Step-by-Step)

### Step 1: State the Goal (from Intent Spec)

Begin with a clear, concise statement of what you want the AI to achieve, directly referencing the Intent Spec.

> **Practical Insight**: Frame the goal in terms of the desired output artifact. "Generate the TypeScript code for the `UserService` as described in the attached Intent Spec."

### Step 2: Inject Constraints (from Constraint Spec)

Provide all relevant technical, stylistic, and non-functional requirements.

> "Adhere strictly to the attached Constraint Spec, which includes using TypeScript 5.x, ESLint Airbnb rules, and handling errors via custom exceptions."

### Step 3: Specify Delegation Rules (from Delegation Contract)

Explicitly state what the AI is allowed to do, what it must avoid, and what resources it can access.

> "You are permitted to create new files in `src/services/` and `src/interfaces/`. You are prohibited from introducing new npm dependencies without explicit approval. You must use the `UserRepository` interface provided in the existing codebase."

### Step 4: Define Output Format

Be highly prescriptive about the exact format, structure, and content of the desired output.

> "Output should be a single Markdown code block for `src/services/UserService.ts`. Include JSDoc comments for all exported functions."

### Step 5: Provide Context (Code, Examples, References)

Attach any necessary code snippets, existing files, or relevant documentation that the AI needs to understand the context.

> "Here is the existing `src/interfaces/IUserService.ts` file you should implement."

```mermaid
flowchart LR
    A[Intent Spec] --> Request[Generation Request]
    B[Constraint Spec] --> Request
    C[Delegation Contract] --> Request
    Context[Context (Code, Examples)] --> Request
    Request --> AI(AI Tool)

    classDef step fill:#E6F7FF,stroke:#1B75BB,color:#0F1F2E;
    class A,B,C,Context,Request,AI step;
```

---

---

## Practical Example: Generating a React Component

**Objective**: Generate a new React `Button` component adhering to a design system.

**Generation Request:**

```markdown
**Intent Spec (recap)**: "Create a reusable `Button` component for our design system. It should support different visual variants (primary, secondary, danger, ghost) and sizes (small, medium, large). It needs to be clickable and display text or an icon."

**Constraint Spec (recap)**: "React with TypeScript, Tailwind CSS, `clsx` for conditional classes, `react-aria` for accessibility. Styling via design system utility classes. Fully keyboard navigable, `aria-label` support. No new dependencies."

**Delegation Contract (recap)**: "Permitted to create `Button.tsx` and `Button.test.tsx` in `src/components/Button/`. Prohibited from modifying global CSS. Must use existing icons from `src/components/Icons` if required."

**Generation Request:**

"Generate the React TypeScript component for `src/components/Button/Button.tsx` based on the attached Intent Spec, Constraint Spec, and Delegation Contract.

The component should:
1.  Be a functional React component.
2.  Be written in TypeScript.
3.  Use Tailwind CSS for all styling.
4.  Support `variant` (primary, secondary, danger, ghost), `size` (small, medium, large), `onClick`, `children`, `disabled`, and `isLoading` props.
5.  When `isLoading` is true, render a simple spinner (SVG inline if possible, or assume `<Spinner />` component exists) and disable the button.
6.  Ensure full accessibility, including appropriate `role` and `aria-*` attributes.
7.  Use `clsx` for conditional class joining.

Output only the content of `Button.tsx` as a single TypeScript code block.
"
```

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Ambiguous Language**    | AI makes assumptions, leading to undesired outputs. | Be explicit. Use deterministic vocabulary from the Style Guide. |
| **Missing Context**       | AI generates irrelevant or incompatible code. | Provide all necessary code, interfaces, or examples as part of the prompt. |
| **Over-Delegation**       | AI attempts tasks beyond its capability or your intent. | Ensure the Delegation Contract is strictly adhered to. |

---

## Quick Links

- Handbook Method: [Overview](/docs/01-handbook-method/01-overview)
- Intent Spec: [Handbook Method](/docs/01-handbook-method/intent-spec)
- Constraint Spec: [Handbook Method](/docs/01-handbook-method/constraint-spec)
- Delegation Contract: [Handbook Method](/docs/01-handbook-method/delegation-contract)

## Next Step

Proceed to [Review and Interrogation](/docs/01-handbook-method/review-and-interrogation) to verify AI outputs.
