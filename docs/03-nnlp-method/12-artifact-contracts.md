---
title: "NNLP Artifact Contracts (Normative)"
archetype: "foundation"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["nnlp", "artifacts", "contracts", "standard", "review", "verification"]
last_reviewed: "2025-12-20"
---

# NNLP Artifact Contracts (Normative)

:::info[Purpose]
Standardize what each step must produce to make review possible and repeatable. Tool-agnostic by design.
:::

## Artifact List (Per Loop Step)

- **Intent Spec**
- **Constraint Spec**
- **Plan (optional when scope is small)**
- **Delegation Contract** (for AI tasks)
- **Draft Artifact(s)** (code, docs, tests, plans)
- **Review Evidence** (tests/checks/citations)
- **Acceptance Record** (decision + owner + residual risk)
- **Iteration Log** (learnings, changes to specs)

## Minimum Required Fields

**Intent Spec**
- Outcome and success criteria (measurable)
- Non-goals
- Acceptance signals

**Constraint Spec**
- Boundaries: security, safety, compliance, cost, scope
- Data boundaries/sources allowed
- Exclusions/refusals

**Plan (if used)**
- Steps, owners, and milestones
- Risks/assumptions

**Delegation Contract**
- AI role and task scope (single artifact/decision)
- Allowed sources/context; refusals/stop conditions
- Traceability requirements

**Draft Artifact**
- Content produced (code/docs/tests/plans)
- Source/trace (prompt/context/model) if AI-generated

**Review Evidence**
- What was checked (tests, linters, factual checks, citations)
- Results and defects found
- Link to constraints/intent being verified

**Acceptance Record**
- Decision (accepted/rejected)
- Human owner; residual risks; timestamp

**Iteration Log**
- Changes made; reasons; links to updated artifacts

## Optional Fields (When Material)

- Cost/latency budgets; performance targets
- Compliance/safety checklists
- Observability hooks (what to monitor post-release)
- Rollback/mitigation notes

## Evidence Requirements for Verification

- Evidence must map to Intent and Constraints (which criterion, which check).
- Tests/checks must be recorded (commands, outputs, screenshots, citations).
- LLM-as-judge outputs are advisory only; require human acceptance.

## Storage Conventions (Tool-Agnostic)

- Keep artifacts in version control (docs + specs alongside code where applicable).
- Link prompts/context to outputs (traceability).
- Keep acceptance records and iteration logs near the work item (e.g., PR, ticket, doc folder).

## Key Decision

Artifact contracts are **tool-agnostic**. Tool examples can be added later without changing the normative requirements.
