---
title: "Template: Iteration Log"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "template", "iteration", "debugging"]
last_reviewed: "2025-12-20"
---

# Iteration Log: [Feature Name]

:::info[Instructions]
Use this log when the first attempt fails. Do not just "regenerate." Document what you changed in the specs to fix the error.
:::

## 1. The Trigger

**Why are we iterating?**

- [ ] **Review Failure**: The code didn't match the specs.
- [ ] **Acceptance Failure**: The code matched specs but failed tests.
- [ ] **Scope Change**: We realized we needed something else.

> **Observation**: [e.g., The model used `axios` despite the constraint to use `fetch`.]

---

## 2. Artifact Adjustments

**What did we change in the source of truth?**
_(Never fix code without fixing the spec first.)_

### Constraint Spec Updates

- **Added**: [e.g., "Must use native `fetch` API."]
- **Removed**: [e.g., Ambiguous performance requirement.]

### Intent Spec Updates

- **Clarified**: [e.g., Explicitly stated that 404s should return null, not throw.]

---

## 3. The New Request

**How did we re-prompt?**

> "I have updated the Constraint Spec to forbid external HTTP libraries. Please regenerate the service layer."

---

## 4. Outcome

**Did it work?**

- [ ] **Pass**: Ready for Acceptance.
- [ ] **Fail**: Needs another iteration.

:::tip[Learning]
If you have to iterate more than 3 times, your Discovery Brief might be wrong. Pause and go back to Step 1.
:::

---

## Last Reviewed / Last Updated

- Date: YYYY-MM-DD
