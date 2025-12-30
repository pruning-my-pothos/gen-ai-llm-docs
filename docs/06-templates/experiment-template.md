---
title: "Experiment: [Experiment Name]"
archetype: "experiment"
status: "draft"
owner: "[Name] ([Handle])"
maintainer: "[Name] ([Handle])"
version: "0.1.0"
tags: ["genai-llm", "experiment", "lab", "[topic]"]
last_reviewed: "YYYY-MM-DD"
---

## Experiment Template

:::info[Hypothesis]
We believe that [doing X] with [Model Y] will result in [Outcome Z].
:::

---

## Context

- **Goal**: [What are we trying to prove or solve?]
- **Tools**: [e.g., Cursor, Copilot, Local Llama 3]
- **Constraints**: [e.g., No internet access, strict time limit]

---

## The Setup

Briefly describe the environment and inputs.

- **Input Artifacts**: [e.g., Intent Spec v0.1]
- **Prompt Strategy**: [e.g., Chain of thought, direct delegation]

---

---

## Execution Log

### Attempt 1

**Prompt**:

```text
[Insert prompt here]
```

**Outcome**:

- [ ] Success
- [x] Failure

**Observation**:
The model failed to respect the [specific constraint]. It hallucinated [X].

### Attempt 2 (Correction)

**Adjustment**:
We updated the [Constraint Spec] to explicitly forbid [X].

**Outcome**:

- [x] Success
- [ ] Failure

---

---

## Results Analysis

| Metric          | Expected | Actual |
| :-------------- | :------- | :----- |
| **Correctness** | 100%     | 90%    |
| **Speed**       | Fast     | Slow   |
| **Safety**      | High     | Medium |

---

---

## Key Learnings

### What Worked

- [Insight 1]
- [Insight 2]

### What Failed

- [Failure 1]

:::tip[Takeaway]
The core lesson from this experiment is...
:::

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Vague Hypothesis**      | Inconclusive experiment results.         | Ensure hypothesis is specific, measurable, actionable, relevant, and time-bound (SMART). |
| **Lack of Clear Metrics** | Unable to objectively evaluate outcome.  | Define success/failure metrics upfront.       |
| **Ignoring Constraints**  | AI operates outside defined boundaries.  | Explicitly define constraints in the setup.    |
| **Insufficient Iteration**| Stuck on initial failed attempts.        | Embrace iterative approach; learn from failures, adjust. |

---

## Quick Links

- Handbook Method: [Overview](/docs/01-handbook-method/01-overview)
- Experiment Template: [Template](/docs/06-templates/experiment-template)
- Iteration & Release: [Handbook Method](/docs/01-handbook-method/iteration-and-release)

## Next Step

Explore the [Generation Request Template](/docs/06-templates/generation-request-template) for structuring prompts.
