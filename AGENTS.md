---
title: "GenAI & LLM Documentation Agent Instructions for Codex"
archetype: "tooling"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "codex", "agents", "cli", "workflow", "guardrails"]
last_reviewed: "2025-12-20"
---

# agents.md (Codex Agents)

## Overview

This file defines how Codex agents should behave inside this repo.

GenAI & LLM Documentation assumes AI can execute, but humans own:

- intent
- trade-offs
- acceptance
- risk

This document enforces that discipline for any agent-style workflow.

---

## Why It Matters

Agents can generate large changes quickly. That is useful, but also risky.

This file is designed to:

- prevent scope creep
- enforce constraints
- force evidence-based reviews
- keep outputs aligned to business and user needs

---

## Audience, Scope & Personas

### Audience

- Anyone running Codex (or similar CLI copilots) against this repository
- Contributors creating docs, patterns, scenarios, or experiments

### Scope

Applies to:

- code generation
- doc generation
- refactors
- experiments
- scenario labs

---

## Prerequisites

- You can run your tool’s help command (example: `codex --help`)
- You can review diffs before committing
- You can run tests or at least perform basic validation

---

## Security, Compliance & Privacy

Agents must never:

- paste secrets or tokens into prompts
- fetch private data or proprietary code from outside this repo
- introduce code with unclear licensing

If uncertain about licensing, stop and ask for a citation or replacement.

---

## Tasks & Step-by-Step Instructions

### Operating Mode (required)

Agents must follow this order:

1. **Clarify intent**

   - Restate the goal in one paragraph.
   - List explicit out-of-scope items.

2.  **List constraints**

    - Functional constraints
    - Non-functional constraints (security, performance, compatibility)
    - Repo conventions (frontmatter, section structure)

3.  **Plan**

    - Produce a short plan with numbered steps.
    - Identify files that will change.
    - Identify validation steps.

4.  **Execute in small diffs**

    - Prefer incremental commits or incremental patches.
    - Avoid rewriting large files unless explicitly requested.

5.  **Interrogate**

    - Explain why changes satisfy constraints.
    - Call out remaining risks or assumptions.

6.  **Acceptance**
    - Map output to acceptance criteria.
    - Provide a clear “ready” or “not ready” statement.

---

## Access Control & Permissions

### Allowed

- Create new docs according to GenAI & LLM Documentation templates
- Update links, indexes, and navigation
- Add diagrams (Mermaid) where relevant
- Add experiments under `experiments/` with the standard structure

### Not Allowed

- Changing repo structure without explicit instruction
- Introducing new dependencies without justification
- Adding external code without license clarity
- Editing security or governance docs to weaken controls

---

## Practical Examples & Templates (✅/❌)

✅ Good instruction to an agent

- “Create `docs/02-genai-llm-fundamentals/01-nlp-and-embeddings-enough-for-practice.md` using the repo doc template. Keep it practice-oriented. Include one Mermaid diagram. Add a short ‘How this impacts GenAI & LLM Documentation execution’ section. Do not add external links unless necessary.”

❌ Bad instruction to an agent

- “Write everything about embeddings and update the repo to support it.”

---

## Known Issues & Friction Points

- Agents tend to over-generate and over-refactor.
- Agents may invent tool commands or configs if unspecified.
- Large prompts encourage shallow compliance instead of deep correctness.

Mitigation:

- Require explicit constraints.
- Require small diffs.
- Require validation steps.

---

## Tips & Best Practices

- Ask for a plan before code.
- Ask for diffs, not full-file rewrites.
- Keep one task per run.
- Require “assumptions” to be listed explicitly.
- Require “what I changed” and “how I verified” every time.

---

## Troubleshooting Guidance

If the agent drifts:

- Reduce scope.
- Re-state constraints as a checklist.
- Require the agent to quote file paths it will edit.
- Require it to stop after planning.

If the agent hallucinates tool usage:

- Force it to rely only on repo content and `codex --help` output you provide.

---

## Dependencies, Risks & Escalation Path

### Risks

- Scope creep
- License contamination
- Silent regressions in docs structure
- Incorrect technical claims

Escalation

- Stop execution.
- Switch to “review-only” mode.
- Open a small issue describing the failure and the guardrail update needed.

---

## Success Metrics & Outcomes

A successful agent run produces:

- minimal diffs aligned to intent
- explicit constraints honored
- clear validation notes
- no new ambiguity introduced

---

## Codex CLI command template

I cannot assume the exact Codex CLI flags you have installed. Use this pattern and adapt based on `codex --help`.

### Plan-only run

```bash
codex <agent-or-mode> "Plan the changes for: <task>. List files to edit. Do not write code."
```

### Execute with diff discipline

```bash
codex <agent-or-mode> "Implement: <task>. Constraints: <list>. Output: unified diff only. No extra files."
```

### Review-only run

```bash
codex <agent-or-mode> "Review the diff in: <files>. Identify risks, regressions, missing constraints. Do not implement."
```

If you paste your `codex --help` output, I will convert these into exact commands for your installed version.

---

## Resources & References

- GenAI & LLM Documentation Method: `docs/03-nnlp-method/`
- Guardrails: `docs/07-guardrails-and-governance/`
- Templates: `docs/09-templates/`

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-20
- Version: 0.1.0