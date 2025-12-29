---
title: "Scenario: Writing a PRD"
archetype: "scenario"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "scenario", "product", "prd", "requirements"]
last_reviewed: "2025-12-28"
---

# Scenario: Writing a PRD

:::info[Value Proposition]
Demonstrate how to use GenAI & LLM Documentation to turn vague stakeholder requests into a rigorous Product Requirement Document (PRD) that engineers can actually build, minimizing ambiguity and maximizing clarity.
:::

## Overview

Product Requirement Documents (PRDs) are foundational for any product development. They bridge the gap between business needs and technical implementation. Leveraging AI for PRD creation can accelerate the process, but only if guided by a structured approach. This scenario illustrates how to apply GenAI & LLM Documentation principles to draft, refine, and validate a PRD, ensuring it meets both business intent and technical feasibility.

**Goal**: Generate a clear, actionable, and testable PRD using GenAI.
**Anti-pattern**: Asking AI to "write a PRD for X" without defining the core problem, user, or success metrics, leading to a generic, unusable document.

---

## The Problem (Before GenAI & LLM Documentation)

Product managers often struggle with:

-   **Vague stakeholder input**: "Make the app more engaging."
-   **Scope creep**: Requirements expanding during development.
-   **Ambiguity**: Engineers spending time clarifying, not building.
-   **Missing details**: Edge cases or non-functional requirements overlooked.

---

## GenAI & LLM Documentation Approach

| Challenge             | Traditional Risk          | GenAI & LLM Documentation Mitigation                   |
| :-------------------- | :------------------------ | :--------------------------------- |
| Vague inputs          | Misinterpretation         | **Discovery Brief**: Clarify problem, not solution     |
| Feature bloat         | Scope creep               | **Intent Spec**: Define success metrics and exclusions |
| Technical ambiguity   | Developer guesswork       | **Constraint Spec**: Outline technical non-negotiables |
| Unclear user stories  | Untestable requirements   | **Acceptance Criteria**: Concrete definition of "done" |

---

## Step-by-Step Scenario

### 1. Start with a Discovery Brief

Before asking AI for a PRD, define the problem.

**Prompt to AI (Discovery):**
> "I need help defining a new feature. Users are leaving our e-commerce checkout flow at the payment step. Our hypothesis is that they feel insecure about payment options. We want to increase conversion rate at the payment step by 15%. What information do I need to gather before I can define a solution?"

**(AI might suggest user research, competitor analysis, existing analytics.)**

### 2. Craft an Intent Spec

Once the problem is clear, define the desired outcome.

**Prompt to AI (Intent Spec):**
> "Based on the Discovery Brief, I've identified the core problem: Users distrust our current payment options. The intent of the new feature is to increase user confidence in the payment process, leading to a 15% improvement in checkout conversion rate. The feature should clearly communicate security measures and provide diverse payment options.
>
> Generate an Intent Spec for this feature. Focus on user outcomes and measurable success, not implementation details."

**(AI generates an Intent Spec.)**

### 3. Develop a Constraint Spec (Technical and Business)

Define the boundaries within which the solution must operate.

**Prompt to AI (Constraint Spec):**
> "Given the Intent Spec for increasing payment confidence, generate a Constraint Spec. Consider:
> -   **Technical**: Must integrate with existing `PaymentService` API, use PCI-compliant solutions, support Stripe and PayPal, mobile-first design.
> -   **Business**: Must not introduce new ongoing operational costs exceeding $X per month, must launch within 2 months.
> -   **Security**: Must adhere to OWASP Top 10 guidelines, no sensitive data stored on client side."

**(AI generates a Constraint Spec.)**

### 4. Generate the PRD Draft

Now, combine the Specs to generate the PRD.

**Prompt to AI (PRD Generation):**
> "Using the attached Intent Spec and Constraint Spec, draft a Product Requirement Document for a feature to improve payment confidence. The PRD should include:
> -   Introduction/Goal
> -   User Stories (at least 3)
> -   Functional Requirements
> -   Non-Functional Requirements (Performance, Security, Usability)
> -   Acceptance Criteria for each user story
> -   Success Metrics
> -   Out-of-Scope items

> Ensure the tone is clear and concise, suitable for both business and technical audiences.
"

**(AI generates a PRD draft.)**

### 5. Review and Interrogate

Critically review the AI-generated PRD.

**Prompt to AI (Review):**
> "Review the drafted PRD. Are there any ambiguities in the user stories? Do the acceptance criteria directly map to the functional requirements? Are there any potential conflicts between the Intent Spec and Constraint Spec that made it into the PRD? Suggest improvements for clarity and testability."

---

## Outcomes and Learnings

-   **Clearer requirements**: AI-assisted drafting forces early clarification.
-   **Reduced ambiguity**: Constraints and intent are explicitly defined.
-   **Faster iteration**: Focus on refining specs, not guessing.
-   **Testable outputs**: PRD includes acceptance criteria directly.

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Over-reliance on AI for product strategy** | Generic PRDs lacking true user/business insight. | Humans define intent and high-level strategy; AI assists with structure and detail. |
| **Ignoring business constraints** | AI proposes solutions that are too expensive or technically infeasible. | Comprehensive Constraint Specs are non-negotiable inputs. |
| **"Write me a PRD" syndrome** | AI generates a broad, unspecific document. | Break down PRD generation into smaller, spec-driven steps. |

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0