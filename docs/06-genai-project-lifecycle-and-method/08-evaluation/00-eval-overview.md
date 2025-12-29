---
title: "Evaluation Overview"
archetype: "evaluation"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "evaluation", "quality", "metrics", "testing"]
last_reviewed: "2025-12-28"
---

# Evaluation Overview

:::info[Value Proposition]
Evaluation shifts "looks good" to "is good," providing objective evidence that AI-assisted work meets quality and performance criteria.
:::

## Overview

In AI-assisted development, evaluation is not an afterthought; it's a continuous, integral part of the workflow. The goal is to move beyond subjective "vibes" and establish objective, measurable criteria for assessing the quality, safety, and effectiveness of both the AI's outputs and the overall GenAI & LLM Documentation process.

**Goal**: Systematically measure and improve the reliability and value of AI-generated artifacts.
**Anti-pattern**: Relying on manual spot-checks or purely anecdotal evidence for quality assurance.

---

## When to Use

| ✅ Use This Pattern When...           | 🚫 Do Not Use When...                     |
| :------------------------------------ | :---------------------------------------- |
| Accepting any AI-generated artifact | The output is purely for personal learning and has no downstream impact |
| Integrating AI-generated code into a production system | The "quality" is entirely subjective (e.g., artistic expression without objective criteria) |
| Demonstrating compliance or safety for AI-driven processes | You lack a clear definition of "good" or "correct" for the output |

---

## Prerequisites

:::warning[Before you start]
You must have clearly defined **Intent Specs** and **Acceptance Criteria**. Without them, evaluation lacks a benchmark.
:::

- **Artifacts**: AI-generated outputs (code, docs, designs). Intent Specs and Acceptance Criteria.
- **Context**: Understanding of the project's quality standards, testing frameworks, and desired metrics.

---

## The Three Altitudes of Evaluation

We evaluate GenAI & LLM Documentation artifacts at three altitudes:

1.  **Artifact-Level Evaluation**: Does the specific output meet its technical and functional requirements?
    -   **Tools**: Unit tests, integration tests, linting, type checks.
    -   **Method**: `docs/08-evaluation/01-quality-rubric.md`

2.  **Process-Level Evaluation**: Is the GenAI & LLM Documentation workflow (the Loop) being followed effectively? Are human steps performed correctly?
    -   **Tools**: Checklists, review protocols.
    -   **Method**: `docs/08-evaluation/03-human-review-protocols.md`

3.  **Outcome-Level Evaluation**: Is the AI-assisted work achieving its business objectives? Is it safe, valuable, and efficient?
    -   **Tools**: KPIs, metrics, scenario scorecards.
    -   **Method**: `docs/08-evaluation/04-metrics-and-kpis.md`, `docs/08-evaluation/05-scenario-scorecards.md`

---

## Key Principles of Evaluation

-   **Objective Criteria**: Use measurable facts over subjective opinions.
-   **Evidence-Based**: Every evaluation must be supported by verifiable data.
-   **Continuous Feedback**: Integrate evaluation insights back into the GenAI & LLM Documentation Loop for improvement.
-   **Right Tool for the Job**: Apply appropriate evaluation methods at each altitude.

GenAI & LLM Documentation replaces vibes with **Rubrics** and **Scorecards**.

---

## Practical Example: Evaluating a New API Endpoint

**Objective**: Ensure an AI-generated API endpoint for user registration is functional and secure.

**Evaluation Steps:**

1.  **Artifact-Level**:
    -   **Unit Tests**: Run generated unit tests for the controller and service. All pass.
    -   **Integration Tests**: Run integration tests for the `/register` endpoint. Confirm it creates a user, returns a JWT, and handles invalid input.
    -   **Security Scan**: Run a SAST tool on the generated code. No high-severity vulnerabilities found.
    -   **Quality Rubric**: Score the generated code against a code quality rubric for readability and maintainability.

2.  **Process-Level**:
    -   **Review Protocol**: Did the human reviewer follow the Review and Interrogation steps? Were all constraints validated? Was the Intent met?
    -   **Constraint Adherence**: Was the generated code compliant with the `Constraint Spec` (e.g., used bcrypt, jsonwebtoken, correct HTTP status codes)?

3.  **Outcome-Level**:
    -   **KPIs**: After deployment, monitor API response times for `/register` and error rates.
    -   **Scenario Scorecard**: Evaluate the entire "new user registration" scenario, covering discovery to deployment.

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Subjective Evaluation** | Inconsistent quality, "bugs" based on opinion. | Develop clear, objective rubrics and checklists. |
| **Late Evaluation**       | Costly fixes, wasted AI generation cycles. | Integrate evaluation early and continuously into the GenAI & LLM Documentation Loop. |
| **Ignoring Human Factors** | Blaming AI for human specification errors. | Evaluate the entire human-AI process, not just the AI's output. |

:::danger[Critical Risk]
Evaluation is only as good as your specifications. If Intent and Constraints are vague, even rigorous evaluation will be meaningless.
:::

---

## Next Document

Proceed to:
**`docs/08-evaluation/01-quality-rubric.md`**

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0