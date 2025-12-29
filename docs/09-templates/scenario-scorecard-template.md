---
title: "Template: Scenario Scorecard"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "template", "scorecard", "evaluation"]
last_reviewed: "2025-12-20"
---

# Scenario Scorecard: [Scenario Name]

:::info[Instructions]
Use this scorecard to grade an end-to-end AI session. Be honest. If you skipped a step, mark it as skipped.
:::

## 1. Scenario Metadata

- **Task**: [e.g., Refactor Auth Service]
- **Tools**: [e.g., Cursor + Claude 3.5 Sonnet]
- **Role**: [e.g., Senior Engineer]
- **Date**: YYYY-MM-DD

---

## 2. Process Hygiene (The "Rules")

**Did we follow the GenAI & LLM Documentation Loop?**

- [ ] **Discovery Brief**: Written before prompting?
- [ ] **Intent Spec**: Defined clear success criteria?
- [ ] **Constraint Spec**: Defined boundaries?
- [ ] **Delegation Contract**: Explicitly set permissions?
- [ ] **Review**: Human verified the output?

> **Process Score**: [e.g., 5/5 or "Skipped Constraints"]

---

## 3. Outcome Quality (The "Result")

**Did it work?**

- [ ] **Functional**: Solved the problem defined in Discovery.
- [ ] **Safety**: No PII leaks or security regressions.
- [ ] **Side Effects**: No unintended changes to other files.
- [ ] **Drift**: Did not hallucinate requirements.

> **Outcome Score**: [Pass / Fail]

---

## 4. Efficiency (The "ROI")

**Was it worth it?**

- **Regeneration Loops**: [Count, e.g., 1] (Target: < 3)
- **Manual Fixes**: [Count lines of code changed manually]
- **Time Saved**: [Estimate vs. Manual execution]

> **Efficiency Verdict**: [High / Neutral / Negative]

---

## 5. Retrospective

### What went well?

- [e.g., The Constraint Spec prevented a bad library import.]

### What failed?

- [e.g., The model struggled with the legacy codebase context.]

### Action Item

- [e.g., Update the "Legacy Patterns" constraint for next time.]

---

## Final Grade

- [ ] **Pass** (Process followed + Outcome achieved + Safe)
- [ ] **Fail** (Safety violation OR Functional failure)
- [ ] **Audit** (Process skipped, outcome lucky)
