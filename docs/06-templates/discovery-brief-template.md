---
title: "Template: Discovery Brief"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "template", "discovery"]
last_reviewed: "2025-12-20"
---

## Discovery Brief Template

:::info[Value Proposition]
Fill this out _before_ writing any prompts or code. Keep it short. If you can't fill a section, pause and investigate.
:::

---

## 1. Problem Statement

**What is the specific gap, pain point, or opportunity?**
_(Avoid prescribing solutions here. Focus on the "what" and "why".)_

> [Write 1-2 sentences describing the problem.]

---

## 2. Context & Background

**What does the AI (or a human) need to know to understand this?**
_(Mention relevant systems, recent changes, or business logic.)_

- **System**: [e.g., Payment Service, Legacy Monolith]
- **Trigger**: [e.g., New compliance requirement, User report #123]
- **Constraints**: [e.g., Must run on edge devices]

---

## 3. Success Signals

**How will we know we are done?**
_(List observable outcomes.)_

- [ ] Signal 1: [e.g., User can reset password without support ticket]
- [ ] Signal 2: [e.g., API response time < 200ms]

---

## 4. Non-Goals (Out of Scope)

**What are we explicitly NOT doing?**
_(Crucial for preventing AI scope creep.)_

- [ ] We are NOT [e.g., refactoring the user model]
- [ ] We are NOT [e.g., fixing unrelated lint errors]

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Vague Problem**         | AI attempts to solve an ill-defined issue. | Be specific, focus on observable symptoms/data. |
| **Premature Solutioning** | AI generates a solution that might not fit the real problem. | Focus solely on defining the "what" and "why" in the problem statement. |
| **Ignoring Non-Goals**    | AI attempts to address out-of-scope items. | Clearly list exclusions to guide AI's scope. |

---

## Quick Links

- Handbook Method: [Overview](/docs/01-handbook-method/01-overview)
- Discovery Brief: [Handbook Method](/docs/01-handbook-method/discovery-brief)
- Intent Spec Template: [Template](/docs/06-templates/intent-spec-template)

## Next Step

Proceed to the [Intent Spec Template](/docs/06-templates/intent-spec-template) to define the desired outcome.
