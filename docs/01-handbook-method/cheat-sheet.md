---
title: "Lifecycle Cheat Sheet"
archetype: "standard"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm"]
last_reviewed: "2025-12-20"
---



:::info[Value Proposition]
Keep the key Handbook Loop steps, artifacts, and checks in one place for rapid reference during execution.
:::

---

## The Core Loop Artifacts

Use this as a fast map while running the Handbook Loop. It lists each step, the artifact to produce, and the “verify” action.

| Step                   | Produce                                   | Verify                                                          |
| :--------------------- | :---------------------------------------- | :-------------------------------------------------------------- |
| Discovery Brief        | Problem statement, stakeholders, context  | Aligned understanding; no solutions yet                         |
| Intent Spec            | Desired outcome & success metrics         | Specific, measurable, no implementation baked in                |
| Constraint Spec        | Non-negotiables, policies, tech bounds    | Clear limits; references to security/arch standards             |
| Delegation Contract    | Permissions/prohibitions for AI           | Scope tight; risks called out                                   |
| Generation Request     | Structured prompt + references            | Cites intent/constraints; max_tokens/temp set appropriately     |
| Review & Interrogation | Evidence-based check vs. specs            | Findings captured; issues tracked                               |
| Acceptance Criteria    | Definition of done                        | Binary, testable checks                                         |
| Iteration & Release    | Changes + learnings recorded              | Specs updated; tests/verification passed                        |

Quick prompts/checks:
- Intent: “In one sentence, what outcome do we need and how do we measure it?”
- Constraints: “What must never happen? What standards/policies apply?”
- Generation: “Include references to intent/constraints; cap tokens; set temp.”
- Review: “Show evidence (tests, diffs, metrics) against each acceptance item.”

---

## Quick Links

- Handbook Method: [Overview](/docs/01-handbook-method/01-overview)
- Templates Index: [Templates](/docs/06-templates/00-templates-index)

## Next Step

Proceed to **[Discovery Brief](/docs/01-handbook-method/discovery-brief)**.
