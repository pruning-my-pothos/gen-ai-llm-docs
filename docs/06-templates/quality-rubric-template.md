---
title: "Template: Quality Rubric"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "template", "rubric", "grading"]
last_reviewed: "2025-12-20"
---

## Quality Rubric Template

:::info[Value Proposition]
Grade the artifact (code file, doc, etc.) on a scale of 1-3 for each dimension.
**3 = Strong, 2 = Weak (Needs Edit), 1 = Fail (Regenerate)**
:::

---

## 1. Correctness (Logic)

**Does it do the right thing?**

- [ ] Meets Intent Spec objectives.
- [ ] Handles edge cases and failure modes.
- [ ] No logical hallucinations.

> **Score**: [1 / 2 / 3]

---

## 2. Safety (Systems)

**Does it respect boundaries?**

- [ ] No forbidden dependencies.
- [ ] No PII / Secret leaks.
- [ ] Respects architectural patterns.

> **Score**: [1 / 2 / 3]

---

## 3. Clarity (Language)

**Is it unambiguous?**

- [ ] Naming is descriptive and precise.
- [ ] Comments explain "why", not "what".
- [ ] No obfuscated logic.

> **Score**: [1 / 2 / 3]

---

## 4. Maintainability (Style)

**Is it professional?**

- [ ] Matches project idioms.
- [ ] Includes tests (if code).
- [ ] No dead code or debug artifacts.

> **Score**: [1 / 2 / 3]

---

## Final Decision

- **Total Score**: [/12]
- **Action**: [Merge / Edit / Regenerate]

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Vague Scoring Criteria**| Inconsistent evaluation, subjective.     | Ensure each dimension has clear, objective definitions for scores. |
| **Ignoring Context**      | Grading an artifact without its Intent/Constraint Specs. | Always review artifacts with their full context. |
| **Over-focus on one area**| Neglecting other crucial quality dimensions. | Use the rubric to ensure balanced evaluation across all critical areas. |

---

## Quick Links

- Handbook Method: [Overview](/docs/01-handbook-method/01-overview)
- Evaluation: [Handbook Method](/docs/01-handbook-method/evaluation)
- Review & Interrogation Template: [Template](/docs/06-templates/review-and-interrogation-template)

## Next Step

Explore the [Review & Interrogation Template](/docs/06-templates/review-and-interrogation-template) for detailed feedback.
