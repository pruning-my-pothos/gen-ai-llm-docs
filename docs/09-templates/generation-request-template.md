---
title: "Generation Request Template"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "generation", "prompting", "template"]
last_reviewed: "2025-12-28"
---

# Generation Request Template

:::info[Value Proposition]
Formulate precise and structured prompts to AI, combining Intent and Constraints into an executable instruction. This maximizes the relevance and quality of AI-generated outputs, reducing iteration cycles.
:::

## Overview

The Generation Request is the direct instruction given to an AI model to produce an artifact. It is the culmination of the prior steps in the GenAI Project Lifecycle, explicitly referencing the Intent Spec and Constraint Spec. A well-crafted Generation Request leaves minimal room for AI interpretation or hallucination, guiding the AI toward a specific, desired output.

**Goal**: Transform human intent and constraints into an unambiguous, actionable prompt for AI.
**Anti-pattern**: Vague, conversational prompts like "Write a function for X," which force the AI to make assumptions.

---

## Template

```markdown
# Generation Request: [Name of Artifact to Generate]

**Intent Spec (Recap):** 
(A brief summary of the Intent Spec, or a link to the full artifact.)

**Constraint Spec (Recap):**
(A brief summary of the Constraint Spec, or a link to the full artifact.)

**Generation Request:**

"Generate the [type of artifact] for `[file path]` based on the attached Intent Spec and Constraint Spec.

The artifact should:
1.  [Requirement 1]
2.  [Requirement 2]
3.  [Requirement 3]
4.  ...

Output only the content of `[file path]` as a single `[language]` code block.
"
```

---
## Practical Example: Generating a React Component

**Objective**: Generate a new React `Button` component adhering to a design system.

**Generation Request:**

```markdown
**Intent Spec (recap)**: "Create a reusable `Button` component for our design system. It should support different visual variants (primary, secondary, danger, ghost) and sizes (small, medium, large). It needs to be clickable and display text or an icon."

**Constraint Spec (recap)**: "React with TypeScript, Tailwind CSS, `clsx` for conditional classes, `react-aria` for accessibility. Styling via design system utility classes. Fully keyboard navigable, `aria-label` support. No new dependencies."

**Generation Request:**

"Generate the React TypeScript component for `src/components/Button/Button.tsx` based on the attached Intent Spec and Constraint Spec.

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
| **Ambiguous Language**    | AI makes assumptions, leading to undesired outputs. | Be explicit. Use deterministic vocabulary. |
| **Missing Context**       | AI generates irrelevant or incompatible code. | Provide all necessary code, interfaces, or examples as part of the prompt. |
| **Over-Delegation**       | AI attempts tasks beyond its capability or your intent. | Ensure the constraints are clear and specific. |

---

## Next Step

Proceed to **Review & Interrogation**.

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0