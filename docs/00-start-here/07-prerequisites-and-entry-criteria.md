---
title: "NNLP Prerequisites and Entry Criteria"
archetype: "foundation"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["nnlp", "standard", "prerequisites", "entry-criteria", "skills"]
last_reviewed: "2025-12-20"
---

# NNLP Prerequisites and Entry Criteria

:::info[Purpose]
Formalize the skill gate to prevent Level 0 usage from declaring NNLP “broken.” Establish minimum and recommended prerequisites before applying NNLP.
:::

## Minimum Prerequisites (Must-Have)

- **Intent clarity**: can state outcomes and success criteria unambiguously.
- **Constraint thinking**: can express boundaries (security, safety, compliance, cost, scope).
- **Review discipline**: treats AI outputs as drafts; can perform evidence-based checks.
- **Basic GenAI literacy**: understands that models are probabilistic, context-bound, and require verification (no belief in deterministic outputs).
- **Traceability habit**: can keep links between prompts, context, decisions, and outputs.

## Recommended Prerequisites (Should-Have)

- **Core skills**: logic, systems thinking, language discipline, sentence precision (see Core Skills).
- **Light tooling familiarity**: prompts as specs, few-shot vs. constraints, basic sampling params.
- **Team patterns**: knows how to record assumptions, decisions, and acceptance gates.

## Self-Check: Can You Apply NNLP Safely?

- Can you write a one-paragraph intent with measurable success?
- Can you list non-goals and constraints before prompting?
- Can you outline a review plan (what to check, how to check, evidence to keep)?
- Can you refuse to ship when evidence is missing?

If any answer is “no,” fix that first.

## If You Fail the Gate (Routing)

- Start with **Core Skills**: `docs/01-core-skills/00-core-skills-overview.md`
- Use **Templates** to scaffold intent/constraints/review: `docs/09-templates/00-templates-index.md`
- Re-enter NNLP after you can produce: intent, constraints, review plan, and evidence.

## Typical Failure Modes When Prerequisites Are Missing

- Ambiguous intent → scope creep, regressions.
- No constraints → overreach, unsafe changes.
- No review discipline → plausible but wrong outputs shipped.
- No GenAI literacy → treating outputs as ground truth.
- No traceability → cannot audit or rollback decisions.

## Key Decision

Prerequisites include **both cognitive/process skills and minimum GenAI literacy**. NNLP assumes you understand probabilistic behavior, context limits, and the necessity of verification before shipping.
