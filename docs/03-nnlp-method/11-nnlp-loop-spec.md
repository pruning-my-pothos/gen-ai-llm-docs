---
title: "NNLP Loop: Normative Process Model"
archetype: "foundation"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["nnlp", "process", "loop", "workflow", "standard"]
last_reviewed: "2025-12-20"
---

# NNLP Loop: Normative Process Model

:::info[Purpose]
Define the required NNLP workflow so teams can adopt it consistently. Keep the 8-step loop, with explicit verification inside Review.
:::

## Process Steps (8-Step Loop)

1) **Discovery Brief**  
   Inputs: problem statement, stakeholders, constraints, non-goals.  
   Outputs: agreed problem framing, success signals.

2) **Intent Spec**  
   Inputs: Discovery.  
   Outputs: success criteria, definition of done, acceptance signals.

3) **Constraint Spec**  
   Inputs: Discovery, Intent.  
   Outputs: boundaries (security, safety, compliance, cost, scope), data boundaries, exclusions.

4) **Delegation Contract**  
   Inputs: Intent, Constraints.  
   Outputs: AI role, task scope (single artifact/decision), sources allowed, refusals, stop conditions.

5) **Generation Request**  
   Inputs: Delegation Contract + context.  
   Outputs: Draft artifact(s) (code/docs/plans/tests) with traceability to prompts/context.

6) **Review & Interrogation (Verification)**  
   Inputs: Draft artifact(s), Intent, Constraints.  
   Outputs: Evidence (tests, checks, citations), defects found, go/no-go recommendation.

7) **Acceptance Criteria**  
   Inputs: Review evidence.  
   Outputs: Accepted/rejected decision with owner; notes on residual risk.

8) **Iteration / Release**  
   Inputs: Accepted artifacts; feedback and defects.  
   Outputs: Released/merged artifacts; updated specs; logged learnings and changes.

## Required Inputs/Outputs per Step

- Each step consumes prior artifacts (briefs, specs, contracts) and produces a reviewable artifact.  
- Traceability must link prompts/context → outputs → acceptance decision.

## Required Gates

- Verification is mandatory before acceptance.  
- No acceptance without evidence tied to Intent and Constraints.  
- Acceptance must name the human owner.

## Stopping Rules

- Stop iterating when acceptance criteria are met with evidence, and residual risks are documented/approved.
- Stop and reframe (back to Discovery/Intent) if success criteria or constraints change materially.

## Failure Modes (Per Step)

- Discovery: solving the wrong problem; missing stakeholders.  
- Intent: ambiguous success; no measurable signals.  
- Constraints: overreach, unsafe changes, missing data boundaries.  
- Delegation: broad/unbounded tasks; no refusals/stop conditions.  
- Generation: hallucinated or mis-scoped drafts; missing traceability.  
- Review: superficial checks; no evidence; “looks good” approvals.  
- Acceptance: ownership unclear; risk unacknowledged.  
- Iteration/Release: learnings not captured; specs not updated; regressions untracked.

## Key Decision

Keep the 8-step loop. Verification is explicit inside Review & Interrogation; acceptance requires evidence and a named human owner.
