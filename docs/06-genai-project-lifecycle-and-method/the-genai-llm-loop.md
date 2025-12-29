---
title: "The GenAI & LLM Documentation Loop"
archetype: "method"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "method", "execution", "workflow", "genai"]
last_reviewed: "2025-12-28"
---

# The GenAI & LLM Documentation Loop

:::info[Value Proposition]
The GenAI & LLM Documentation Loop is the engine of the framework. It turns abstract intent into concrete, reviewable artifacts through a repeatable 8-step process.
:::

## Overview

The GenAI & LLM Documentation Loop defines **how work actually flows** when you use natural language to build software, documentation, or systems with AI. It is a systematic, iterative process designed to ensure clarity, correctness, and accountability. Each step produces a tangible artifact that acts as both input for the next stage and evidence for review.

**Goal**: Provide a reliable, repeatable, and auditable workflow for AI-assisted development.
**Anti-pattern**: Ad-hoc "prompt engineering" with unpredictable results and unmanageable risk.

---

## When to Use

| ✅ Use This Pattern When...           | 🚫 Do Not Use When...                     |
| :------------------------------------ | :---------------------------------------- |
| Building any AI-assisted feature      | You are exploring ideas with no clear outcome |
| Fixing bugs with AI assistance        | The task is trivial and has no impact     |
| Generating documentation or tests     | You are debugging a simple syntax error   |

---

## Prerequisites

:::warning[Before you start]
A basic understanding of the Core Skills (Logic, Language, Systems, Sentences) is crucial.
:::

- **Artifacts**: Understanding of the purpose of each artifact (Intent Spec, Constraint Spec, etc.).
- **Context**: A commitment to evidence-based review and human accountability.

GenAI & LLM Documentation assumes:

-   AI is an execution tool, not a decision-maker.
-   Human intent must be explicitly defined.
-   Outputs must be verified before acceptance.

---

## The GenAI & LLM Documentation Loop (At a Glance)

| Step                      | Focus                                 | Key Output                           | Risks if Skipped              |
| :------------------------ | :------------------------------------ | :----------------------------------- | :---------------------------- |
| **1. Discovery Brief**    | Problem Clarification                 | Problem Statement                    | Solving the wrong problem     |
| **2. Intent Spec**        | Desired Outcome & Success Criteria    | Measurable Goals                     | Ambiguity, Scope Creep        |
| **3. Constraint Spec**    | Boundaries & Non-Negotiables          | Guardrails, Technical Requirements   | Overreach, Unsafe Changes     |
| **4. Delegation Contract**| AI Permissions & Prohibitions         | Scoped AI Authority                  | Delegating Judgment, Not Task |
| **5. Generation Request** | Structured Prompt to AI               | AI Draft Artifact                    | Plausible but Incorrect Output |
| **6. Review & Interrogation** | Evidence-Based Verification         | Review Findings, Actionable Feedback | Silent Failures, Hidden Bugs  |
| **7. Acceptance Criteria**| Definition of Done                    | Objective Checklist                  | Premature Shipping            |
| **8. Iteration & Release**| Feedback Loop & Deployment            | Refined Artifact, Learnings          | Repeating Failures            |

---

## Visual Summary

### GenAI & LLM Documentation Loop Diagram (System View)

```mermaid
flowchart TD
    Discovery(1. Discovery Brief) --> Intent(2. Intent Spec)
    Intent --> Constraints(3. Constraint Spec)
    Constraints --> Delegation(4. Delegation Contract)
    Delegation --> Generation(5. Generation Request)
    Generation --> Review(6. Review & Interrogation)
    Review --> Acceptance(7. Acceptance Criteria)
    Acceptance --> Iteration(8. Iteration & Release)
    Iteration --> Discovery

    classDef step fill:#E6F7FF,stroke:#1B75BB,color:#0F1F2E;
    class Discovery,Intent,Constraints,Delegation,Generation,Review,Acceptance,Iteration step;
```

<div aria-hidden="true" class="sr-only">System view diagram of the GenAI & LLM Documentation loop: Discovery, Intent, Constraints, Delegation, Generation, Review, Acceptance, then Release/Decision, with a return to Discovery.</div>

### GenAI & LLM Documentation Loop (Mind Map View)

```mermaid
mindmap
  root((GenAI & LLM Documentation Loop))
    1. Discovery Brief
      Problem Clarification
      Output: Problem Statement
      Risk: Solving the wrong problem
    2. Intent Spec
      Desired Outcome & Success Criteria
      Output: Measurable Goals
      Risk: Ambiguity, Scope Creep
    3. Constraint Spec
      Boundaries & Non-Negotiables
      Output: Guardrails, Technical Requirements
      Risk: Overreach, Unsafe Changes
    4. Delegation Contract
      AI Permissions & Prohibitions
      Output: Scoped AI Authority
      Risk: Delegating Judgment, Not Task
    5. Generation Request
      Structured Prompt to AI
      Output: AI Draft Artifact
      Risk: Plausible but Incorrect Output
    6. Review & Interrogation
      Evidence-Based Verification
      Output: Review Findings, Actionable Feedback
      Risk: Silent Failures, Hidden Bugs
    7. Acceptance Criteria
      Definition of Done
      Output: Objective Checklist
      Risk: Premature Shipping
    8. Iteration & Release
      Feedback Loop & Deployment
      Output: Refined Artifact, Learnings
      Risk: Repeating Failures
```

<div aria-hidden="true" class="sr-only">Mind map view of the GenAI & LLM Documentation loop showing the eight stages branching into their key elements.</div>

---

## How the GenAI & LLM Documentation Loop Prevents Failure

Traditional development often moves from problem to solution directly, then tries to fix issues during testing or deployment. When using AI, this approach is disastrous because AI can generate plausible but deeply flawed solutions very quickly.

GenAI & LLM Documentation inverts that order deliberately. It front-loads clarity and constraints, and back-loads verification and accountability:

-   **Explicit Specification**: Before AI generates anything, you define what success looks like (Intent) and what boundaries cannot be crossed (Constraints).
-   **Controlled Execution**: AI operates within the confines of the Delegation Contract and Generation Request.
-   **Rigorous Verification**: AI outputs are not accepted until they pass Review and meet Acceptance Criteria.

---

## GenAI & LLM Documentation is Tool-Agnostic

The GenAI & LLM Documentation Loop applies regardless of the specific AI tool you are using (e.g., GitHub Copilot, ChatGPT, Claude, Aider, Cursor). The principles remain constant: define, constrain, delegate, verify, accept.

---

## Navigating the Method

Each step of the GenAI & LLM Documentation Loop has a corresponding detailed document:

-   Method backbone: `docs/03-method/`

1.  `docs/03-method/01-discovery-brief.md`
2.  `docs/03-method/02-intent-spec.md`
3.  `docs/03-method/03-constraint-spec.md`
4.  `docs/03-method/04-delegation-contract.md`
5.  `docs/03-method/05-generation-requests.md`
6.  `docs/03-method/06-review-and-interrogation.md`
7.  `docs/03-method/07-acceptance-criteria.md`
8.  `docs/03-method/08-iteration-and-release.md`
9.  `docs/03-method/09-working-agreements-for-teams.md`

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0