---
title: "NNLP Scope and Applicability"
archetype: "foundation"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["nnlp", "standard", "scope", "applicability", "governance"]
last_reviewed: "2025-12-20"
---

# NNLP Scope and Applicability

:::info[Purpose]
Draw a clear boundary for when NNLP applies, what it governs, and when it may be skipped. Define “professional environment” in impact terms, not job titles.
:::

## Professional Environment (Impact-Based)

NNLP applies when AI-assisted work can meaningfully affect users, systems, finances, safety, compliance, or reputation. Titles do not matter; **impact does**.

## In Scope

- AI-assisted work that ships to users or impacts business outcomes.
- Code, docs, runbooks, specs, system designs, policies, governance, and evaluation artifacts.
- Use of AI tools that generate, transform, or approve production-relevant artifacts.

## Out of Scope

- Toy prompts, hobby experiments, or learning exercises with no user/system impact.
- Marketing/demo content detached from production paths.
- Vendor/model training guides or architecture design of models themselves.

## Applicability Triggers (NNLP MUST apply when any are true)

- Work will be consumed by end users, customers, or internal staff at scale.
- Outputs affect security, privacy, compliance, safety, or financial exposure.
- Artifacts enter source control, docs portals, or operational runbooks.
- AI outputs bypass human gatekeeping or will be reused downstream.

## Exemptions (NNLP MAY be skipped when all are true)

- No external users, no system impact, and no compliance/reputational exposure.
- Output stays local, is disposable, and will not be reused or shared.
- A human reviewer owns the outcome and will fully re-author before use.

## Common Misapplications (Anti-Patterns)

- Treating NNLP as optional for “small” production changes.
- Skipping constraints and review because a senior engineer is “fast.”
- Delegating judgment (not execution) to the model.
- Accepting AI outputs without evidence or traceability.

## References

- Process: `docs/03-nnlp-method/00-the-nnlp-loop.md`
- Conformance: `docs/07-guardrails-and-governance/guardrails-index.md`
- Templates: `docs/09-templates/00-templates-index.md`
