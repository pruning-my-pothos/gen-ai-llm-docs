---
title: "Metrics and KPIs"
archetype: "foundation"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["nnlp", "metrics", "kpis", "measurement", "roi"]
last_reviewed: "2025-12-20"
---

# Metrics and KPIs

:::info[Purpose]
How do you know if NNLP is working? These metrics help you measure the _quality_ and _efficiency_ of your AI adoption, moving beyond "it feels faster."
:::

## Overview

Measuring developer productivity is notoriously difficult. Measuring AI productivity is even harder because it's easy to generate _more_ code without generating _value_.

We focus on three categories of metrics:

1. **Efficiency** (Speed)
2. **Quality** (Correctness)
3. **Adoption** (Maturity)

---

## 1. Efficiency Metrics

| Metric               | Definition                                      | Good Signal | Bad Signal                  |
| :------------------- | :---------------------------------------------- | :---------- | :-------------------------- |
| **Acceptance Rate**  | % of AI suggestions accepted by the human.      | > 30%       | < 10% (Noise)               |
| **Correction Loops** | Number of prompts required to get working code. | < 3         | > 5 (Bad Specs)             |
| **Time-to-Merge**    | Time from "Intent" to "PR Merged".              | Decreasing  | Increasing (Review fatigue) |

---

## 2. Quality Metrics

| Metric            | Definition                                  | Good Signal    | Bad Signal           |
| :---------------- | :------------------------------------------ | :------------- | :------------------- |
| **Revert Rate**   | % of AI code reverted within 2 weeks.       | < 5%           | > 10% (Brittle code) |
| **Bug Density**   | Bugs per 1k lines of AI code vs Human code. | Equal or Lower | Higher               |
| **Test Coverage** | % of AI code covered by tests.              | 100%           | < 80%                |

:::warning[The Trap]
Do not measure "Lines of Code Generated." This incentivizes bloat. AI is great at writing verbose, useless code.
:::

---

## 3. Adoption Metrics (NNLP Maturity)

Use these to track if your team is actually using the method.

- **Artifact Presence**: % of AI-assisted PRs that include an Intent/Constraint spec.
- **Review Depth**: Average number of comments on AI PRs (should not be zero).
- **Pattern Usage**: Frequency of standard patterns (e.g., "Clean Slate", "Strangler") vs ad-hoc prompting.

---

## Visual: The ROI Dashboard

```mermaid
flowchart TD
    Input[AI Usage] --> Output{Outcome}

    Output -->|High Revert Rate| Negative[Negative ROI (Tech Debt)]
    Output -->|High Acceptance| Positive[Positive ROI (Velocity)]

    Positive -->|Low Bug Density| Sustainable[✅ Sustainable Acceleration]
    Positive -->|High Bug Density| Dangerous[⚠️ Dangerous Velocity]

    classDef good fill:#E6F7FF,stroke:#1B75BB,color:#0F1F2E;
    classDef bad fill:#FFE6E6,stroke:#D32F2F,color:#0F1F2E;
    class Sustainable good;
    class Negative,Dangerous bad;
```

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-20
- Version: 0.1.0
