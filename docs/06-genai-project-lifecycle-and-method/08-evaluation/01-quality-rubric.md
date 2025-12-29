---
title: "Quality Rubric"
archetype: "method"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "evaluation", "rubric", "quality", "metrics"]
last_reviewed: "2025-12-20"
---

# Quality Rubric

:::info[Purpose]
This rubric converts "it looks good" into a measurable score. Use it to grade AI outputs objectively before acceptance.
:::

## Overview

AI outputs are often "plausible but wrong." A binary Pass/Fail is sometimes insufficient for tracking progress or comparing models.

The **GenAI & LLM Documentation Quality Rubric** evaluates artifacts across four dimensions:

1. **Correctness**: Does it do the right thing?
2. **Safety**: Does it respect boundaries?
3. **Clarity**: Is it understandable?
4. **Maintainability**: Is it professional?

---

## The Scoring Standard

We use a simple 3-point scale to keep evaluation fast.

| Score | Label      | Definition                                                             |
| :---- | :--------- | :--------------------------------------------------------------------- |
| **3** | **Strong** | Ready for production with no changes.                                  |
| **2** | **Weak**   | Functionally correct but requires minor human edits (style, comments). |
| **1** | **Fail**   | Hallucinated, dangerous, or functionally wrong. Requires regeneration. |

---

## Dimension 1: Correctness (Logic)

**Focus**: Does the code solve the problem defined in the Intent Spec?

| Score | Criteria                                                                |
| :---- | :---------------------------------------------------------------------- |
| **3** | Meets all functional requirements. Handles edge cases defined in specs. |
| **2** | Meets happy-path requirements. Misses some edge cases.                  |
| **1** | Fails to compile/run or solves the wrong problem.                       |

:::warning[Zero Tolerance]
If Logic is a **1**, the entire artifact is a Fail. Do not fix it manually; regenerate.
:::

---

## Dimension 2: Safety (Systems)

**Focus**: Does the code respect the Constraint Spec and Delegation Contract?

| Score | Criteria                                                                |
| :---- | :---------------------------------------------------------------------- |
| **3** | No new dependencies. No PII leaks. Respects architectural boundaries.   |
| **2** | Minor style violations. Safe but messy imports.                         |
| **1** | Introduces security risks (SQLi, secrets). Modifies out-of-scope files. |

---

## Dimension 3: Clarity (Language)

**Focus**: Is the code and documentation unambiguous?

| Score | Criteria                                                            |
| :---- | :------------------------------------------------------------------ |
| **3** | Variable names are descriptive. Comments explain "why", not "what". |
| **2** | Generic naming (`data`, `item`). Sparse comments.                   |
| **1** | Obfuscated logic. Misleading comments. Hallucinated explanations.   |

---

## Dimension 4: Maintainability (Sentences/Style)

**Focus**: Does it look like it belongs in this codebase?

| Score | Criteria                                                         |
| :---- | :--------------------------------------------------------------- |
| **3** | Matches project idioms. No dead code. Tests included.            |
| **2** | Working code but uses foreign idioms (e.g., `var` in modern JS). |
| **1** | Spaghetti code. massive functions. No tests.                     |

---

## Visual: The Grading Flow

```mermaid
flowchart TD
    Output[AI Output] --> Logic{Logic Pass?}
    Logic -->|No| Reject[🔴 Reject (1)]
    Logic -->|Yes| Safety{Safety Pass?}
    Safety -->|No| Reject
    Safety -->|Yes| Style{Style/Clarity Pass?}
    Style -->|No| Edit[🟡 Edit (2)]
    Style -->|Yes| Accept[🟢 Accept (3)]

    classDef stop fill:#FFE6E6,stroke:#D32F2F,color:#0F1F2E;
    classDef warn fill:#FFF4E5,stroke:#E6A23C,color:#2D1B0E;
    classDef pass fill:#E6F7FF,stroke:#1B75BB,color:#0F1F2E;
    class Reject stop;
    class Edit warn;
    class Accept pass;
```

---

## How to Use This Rubric

1. **Self-Correction**: Use it to grade your own AI sessions.
2. **Model Comparison**: Use it to benchmark Claude vs. GPT-4 on the same task.
3. **Team Review**: Use it to settle disputes about whether a PR is "good enough."

---

## Next Step

Use the template to grade an artifact:
**`docs/09-templates/quality-rubric-template.md`**

Or apply it to a full scenario:
**`docs/08-evaluation/05-scenario-scorecards.md`**

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-20
- Version: 0.1.0
