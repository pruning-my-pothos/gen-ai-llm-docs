---
title: "Scenario: Greenfield React Component"
archetype: "scenario"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "scenario", "frontend", "react", "greenfield"]
last_reviewed: "2025-12-28"
---

# Scenario: Greenfield React Component

:::info[Value Proposition]
Demonstrate how to apply these methods to build a reusable, accessible React component from scratch without introducing technical debt or accessibility violations, accelerating development while maintaining quality.
:::

## Overview

Building new UI components often involves repetitive tasks: setting up file structure, writing boilerplate code, ensuring accessibility, and adhering to design systems. This scenario illustrates how to leverage AI, guided by these methods, to generate a high-quality React component. By precisely defining intent and constraints, we can ensure the AI produces code that is clean, testable, and compliant with best practices from its inception.

**Goal**: Generate a production-ready React component (e.g., a custom Button, Modal, or Input) quickly and correctly.
**Anti-pattern**: Asking AI to "create a button" without defining its variants, states, accessibility needs, or stylistic constraints, resulting in a generic and unmaintainable component.

---

## The Problem (Before using these methods)

Frontend developers frequently encounter:

-   **Boilerplate fatigue**: Repetitive setup for new components.
-   **Inconsistent styling**: Deviations from the design system.
-   **Accessibility oversights**: Missing `aria` attributes, keyboard navigation issues.
-   **Technical debt**: Quickly built components becoming hard to maintain.

---

## Approach

| Challenge          | Traditional Risk                    | Mitigation                       |
| :----------------- | :---------------------------------- | :--------------------------------------------------------- |
| Boilerplate code   | Repetitive, error-prone manual work | **Clean Slate Pattern**: Generate from zero with full spec |
| Inconsistent design  | UI drift, bad UX                    | **Constraint Spec**: Define design tokens, Tailwind/CSS-in-JS rules |
| Accessibility      | Exclusion, legal risk               | **Constraint Spec**: Explicitly require `aria` attributes, keyboard navigation |
| Untested components | Silent bugs, regressions            | **Write Tests Pattern**: Generate tests alongside the component |

---

## Step-by-Step Scenario

### 1. Define Intent Spec

Clearly articulate the purpose and core functionality of the component.

**Prompt to AI (Intent Spec):**
> "Create a reusable `Button` component for our design system. It should support different visual variants (primary, secondary, danger, ghost) and sizes (small, medium, large). It needs to be clickable and display text or an icon. The component's primary purpose is to trigger user actions."

### 2. Craft a Detailed Constraint Spec

This is where you inject all design system rules, accessibility requirements, and technical stack preferences.

**Prompt to AI (Constraint Spec):**
> "Given the Intent Spec for the `Button` component, develop a Constraint Spec.
> -   **Technology Stack**: React with TypeScript, Tailwind CSS for styling, `clsx` for conditional class joining, `react-aria` for accessibility primitives.
> -   **Styling**: Follow the design system's utility classes (e.g., `btn-primary`, `btn-sm`), apply hover/focus states, ensure consistent padding and typography.
> -   **Accessibility**: Must be fully keyboard navigable, support `aria-label`, correctly use HTML `<button>` element.
> -   **Props**: Define types for `variant`, `size`, `onClick`, `children` (ReactNode), `disabled`, `isLoading` (boolean for spinner).
> -   **Folder Structure**: Component in `src/components/Button/Button.tsx`, styles handled via Tailwind.
> -   **No new dependencies**."

### 3. Generate Component (Clean Slate Pattern)

Use the "Clean Slate" pattern to generate the component's interface and then its implementation.

**Prompt to AI (Generation Request - Interface):**
> "Based on the Intent Spec and Constraint Spec, generate the TypeScript interface and prop types for the `Button` component. Do not generate the implementation yet."

**(AI generates interfaces.)**

**Prompt to AI (Generation Request - Implementation):**
> "Now, implement the `Button.tsx` component using React, TypeScript, and Tailwind CSS, adhering strictly to the Constraint Spec. Include all specified variants, sizes, and accessibility attributes. Ensure `isLoading` prop correctly renders a spinner and disables the button. Make sure `clsx` is used for conditional class joining."

**(AI generates `Button.tsx`.)**

### 4. Generate Unit and Accessibility Tests (Write Tests Pattern)

Ensure the component is robust and accessible.

**Prompt to AI (Generation Request - Tests):**
> "Generate React Testing Library unit tests for the `Button` component (from `Button.tsx`). Cover:
> -   Rendering all variants and sizes.
> -   Clicking the button.
> -   Disabled state.
> -   Loading state (spinner rendering).
> -   Basic accessibility checks (e.g., `role`, `aria-label`)."

**(AI generates `Button.test.tsx`.)**

### 5. Review and Interrogate

Critically review the generated component and tests.

**Prompt to AI (Review):**
> "Review the `Button.tsx` component and its tests. Are there any missing accessibility features? Does the Tailwind CSS correctly apply all design system rules (e.g., proper spacing, font sizes)? Are there any edge cases not covered by tests (e.g., very long text content)?"

---

## Outcomes and Learnings

-   **High-quality component**: Meets design system, accessibility, and functional requirements from inception.
-   **Accelerated development**: Reduces manual boilerplate and styling.
-   **Reduced technical debt**: Explicit constraints prevent common mistakes.
-   **Improved consistency**: Standardized components across the application.

| Metric        | Traditional (Manual) | AI-Assisted        |
| :------------ | :------------------- | :-------------------------- |
| **Dev Time**  | _4 Hours (Manual)_   | 45 Minutes (AI-Assisted)        |
| **Bugs/Refactors** | 3-5 (post-initial)   | 0-1 (post-initial)          |
| **Accessibility Audit Findings** | 1-2 (minor)          | 0-1 (minor)                 |

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Vague Constraints**     | AI generates a generic, unstyled component. | Be extremely detailed in the Constraint Spec about styling, props, and behavior. |
| **Ignoring Accessibility** | Component is unusable for many users.    | Explicitly list accessibility requirements (e.g., `aria-live`, keyboard focus) in the Constraint Spec. |
| **Trusting AI for Design System** | AI might miss nuanced design rules or existing utility classes. | Provide specific examples of design tokens or existing CSS utility classes. |

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0