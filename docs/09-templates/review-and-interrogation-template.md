---
title: "Template: Review & Interrogation"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "template", "review", "audit"]
last_reviewed: "2025-12-20"
---

# Review & Interrogation Checklist

:::info[Instructions]
Do not merge AI code without this review. Check the boxes based on evidence, not "it looks good."
:::

## 1. Intent Alignment (The "What")

**Does the output match the Intent Spec?**

- [ ] **Goal Met**: The primary objective is achieved.
- [ ] **Scope Respected**: No changes to files listed in "Exclusions".
- [ ] **Behavior**: The "Expected Behavior" scenarios pass.

:::danger[Stop if]
The code solves a _different_ problem than the one requested.
:::

---

## 2. Constraint Compliance (The "Box")

**Does the output fit the Constraint Spec?**

- [ ] **Tech Stack**: No forbidden libraries or wrong versions.
- [ ] **Architecture**: Code lives in the correct directories/layers.
- [ ] **Security**: No hardcoded secrets or raw queries.
- [ ] **Performance**: No obvious N+1 queries or blocking loops.

---

## 3. Logic & Systems (The "How")

**Does the logic hold up?**

- [ ] **Preconditions**: The code handles missing or invalid inputs.
- [ ] **Edge Cases**: Failure modes (e.g., network down) are handled.
- [ ] **Dependencies**: No circular dependencies introduced.
- [ ] **Side Effects**: No unintended state changes (DB, Cache).

:::warning[Interrogation Question]
"If the database is down, what does this code do?" (If the answer is "crash," reject it.)
:::

---

## 4. Code Quality (The "Cleanliness")

**Is it maintainable?**

- [ ] **Readability**: Variable names are descriptive.
- [ ] **Simplicity**: No over-engineered abstractions.
- [ ] **Tests**: Unit tests exist and pass.

---

## 5. Decision

**Outcome**:

- [ ] **Approve**: Ready to merge.
- [ ] **Request Changes**: Update the [Constraint Spec] and regenerate.
- [ ] **Reject**: The approach is fundamentally flawed. Go back to Discovery.

---

## Last Reviewed / Last Updated

- Date: YYYY-MM-DD
