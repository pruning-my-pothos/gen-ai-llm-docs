---
title: "NNLP: Nuanced Natural Language Programming"
archetype: "repository-readme"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["nnlp", "genai", "llm", "natural-language-programming", "systems-thinking", "technical-writing", "evaluation", "governance"]
last_reviewed: "2025-12-20"
---

# NNLP: Nuanced Natural Language Programming

## Overview
NNLP is a practical framework for building real software and documentation workflows using natural language, with AI as an execution partner. It treats language as a technical surface and requires professional fluency across:

- Logic
- Language
- Systems
- Sentences

NNLP is designed for real-world execution: product and user needs, constraints, trade-offs, review discipline, evaluation, and governance.

## Why It Matters
Natural language can now produce code, architecture, and documentation at speed. The risk is not speed. The risk is loss of clarity, correctness, and ownership.

NNLP exists to make natural language execution reliable by teaching:
- How to specify intent and constraints precisely
- How to delegate without surrendering accountability
- How to validate outputs with evidence and tests
- How to operate safely across privacy, licensing, and governance

## Audience, Scope & Personas
### Audience
- Product and engineering practitioners building with GenAI tools
- Technical writers and enablement professionals operating in AI-assisted workflows
- Tech leads and architects building safe, repeatable AI-mediated delivery
- Solo builders using CLI copilots and local models

### Scope
This repo covers:
- The NNLP framework and method
- Practitioner-grade GenAI and LLM fundamentals
- Execution patterns and professional scenarios
- Tooling guidance (CLI copilots, LLM frameworks, local-first)
- Guardrails, evaluation, and adoption

### Personas
- Builder: ships features with AI-assisted development
- Architect: needs system integrity and maintainability
- Doc and Enablement: produces accurate docs, runbooks, and change material
- Platform and Ops: needs safe workflows, evaluation, and incident readiness

## Prerequisites
- Comfort with basic software concepts (APIs, repos, version control)
- Willingness to write and revise specifications
- A review posture: you verify before you trust

## Security, Compliance & Privacy
NNLP assumes:
- You do not paste secrets into tools or prompts
- You treat user data and proprietary code as restricted inputs
- You validate licensing when incorporating generated or referenced code
- You maintain human accountability for decisions and releases

See: `docs/07-guardrails-and-governance/`

## Tasks & Step-by-Step Instructions
### Recommended learning path (chronological)
1. Start Here  
   `docs/00-start-here/00-what-is-nnlp.md`  
   `docs/00-start-here/03-the-nnlp-map.md`

2. Core Skills  
   `docs/01-core-skills/00-core-skills-overview.md`  
   Then: Logic → Language → Systems → Sentences

3. GenAI and LLM Fundamentals (practitioner focus)  
   `docs/02-genai-llm-fundamentals/00-fundamentals-index.md`

4. NNLP Method (how work gets done)  
   `docs/03-nnlp-method/00-the-nnlp-loop.md`  
   Then: Discovery → Intent → Constraints → Delegation → Review → Acceptance

5. Execution Patterns and Professional Scenarios  
   `docs/04-execution-patterns/00-pattern-index.md`  
   `docs/05-professional-scenarios/00-scenarios-index.md`

6. Guardrails and Evaluation  
   `docs/07-guardrails-and-governance/guardrails-index.md`  
   `docs/08-evaluation/00-eval-overview.md`

### Quickstart: run NNLP on a real task
Use the templates to execute one small scenario end-to-end:

1. Create artifacts:
   - `docs/09-templates/discovery-brief.template.md`
   - `docs/09-templates/intent-spec.template.md`
   - `docs/09-templates/constraint-spec.template.md`
   - `docs/09-templates/delegation-contract.template.md`
   - `docs/09-templates/acceptance-criteria.template.md`

2. Use a CLI copilot (or local model) to generate changes:
   - Follow: `docs/06-frameworks-and-tooling/01-cli-copilots/00-cli-agnostic-workflow.md`

3. Review with evidence:
   - Follow: `docs/03-nnlp-method/06-review-and-interrogation.md`
   - Apply: `docs/09-templates/review-checklist.template.md`

4. Score the outcome:
   - Use: `docs/08-evaluation/05-scenario-scorecards.md`

## Access Control & Permissions
This repo is designed for public learning and reuse.
- If you adapt it inside an organization, mirror it privately.
- If you contribute, avoid including proprietary code, secrets, or restricted content.

## Practical Examples & Templates (✅/❌)
✅ Good NNLP intent (specific, testable)
- “Add a search endpoint for customers that supports pagination and returns deterministic JSON, with unit tests and a short ADR describing trade-offs.”

❌ Bad NNLP intent (ambiguous, unbounded)
- “Make the API better and faster.”

Templates live here:
- `docs/09-templates/`

## Known Issues & Friction Points
- Ambiguity scales badly: vague language creates brittle systems.
- Tools can overproduce: output volume is not correctness.
- Local models vary: quality depends on model size, context window, and evaluation discipline.

## Tips & Best Practices
- Write constraints before you generate
- Ask for diffs and small increments, not giant rewrites
- Treat language as a spec, not a chat message
- Always define acceptance criteria

## Troubleshooting Guidance
If outputs drift or become inconsistent:
- Reduce scope and restate constraints
- Require structured outputs
- Add acceptance tests and rubric scoring
- Switch from generation to interrogation mode

## Dependencies, Risks & Escalation Path
### Dependencies
- Version control discipline
- A review loop (human verification)
- A clear boundary policy for data and secrets

### Risks
- Hallucinated APIs, non-existent libraries, silent regressions
- Privacy leakage via prompts
- License contamination

Escalation:
- Use the guardrails and evaluation sections before shipping changes.

## Success Metrics & Outcomes
You will know NNLP is working when:
- Your intent specs produce consistent implementations
- Fewer regressions occur from AI-generated changes
- Reviews become faster because constraints are explicit
- Stakeholders receive clearer artifacts: ADRs, runbooks, acceptance criteria

## Resources & References
- Syllabus mapping source used for conceptual coverage: `docs/99-resources/syllabus-mapping.md` :contentReference[oaicite:0]{index=0}
- Start here: `docs/00-start-here/`

## Last Reviewed / Last Updated
- Last reviewed: 2025-12-20
- Version: 0.1.0
