---
title: "NNLP Accountability and Delegation Model"
archetype: "foundation"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["nnlp", "accountability", "delegation", "governance", "standard"]
last_reviewed: "2025-12-20"
---

# NNLP Accountability and Delegation Model

:::info[Purpose]
Make “AI is not a peer” enforceable. Define what delegation means, where it stops, and who remains accountable.
:::

## Accountability: Definition and Boundary

- **Accountability** stays human. A named person owns outcomes, risk acceptance, and release decisions.
- AI output is **not an authority source**; it is a draft to be verified.
- Acceptance requires human judgment with evidence.

## Delegation: Definition and Boundary

- **Delegation** is assigning AI to produce draft artifacts within explicit constraints and scope.
- Delegation stops at **judgment**: AI cannot approve, accept, or sign off risk.
- Delegation scope must be single-artifact or single-decision at a time.

## What MUST Remain Human (Non-Delegable)

- Prioritization, trade-offs, and release/ship decisions.
- Risk acceptance, security/privacy approvals, compliance acceptance.
- Final acceptance of artifacts; ownership assignment.

## What MAY Be Delegated (Draftable Artifacts)

- Draft code, docs, tests, plans, briefs, runbooks, PRDs, scorecards, system cards.
- Transliteration or refactoring under constraints.
- Summaries, comparisons, and structured extracts with sources.

## Verification Responsibility

- Requester/owner validates outputs against intent, constraints, and evidence (tests, checks, citations).
- Reviewers ensure traceability: prompt/context → output → acceptance decision.
- AI cannot self-verify; “LLM-as-judge” outputs are guidance, not authority.

## Auditability

- Record: prompts/system messages, context supplied, model/version, parameters, retrieved sources, outputs, acceptance decision, and owner.
- Keep links to artifacts (briefs, specs, tests) and evidence used for acceptance.

## Anti-Patterns (Responsibility Transfer Signals)

- “The AI said it was fine” used as acceptance rationale.
- Skipping constraints/review because “it looked right.”
- Broad, open-ended delegation without a single owner or artifact.
- No traceability from decision to sources/prompts.

## Key Decision

This model uses explicit language: **AI output is not an authority source**. Accountability, acceptance, and risk remain human-only.
