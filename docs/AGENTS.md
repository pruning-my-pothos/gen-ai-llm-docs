---
title: "CLI Agent Operating Guide"
id: "AGENTS"
archetype: "tooling"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "agents", "cli", "workflow", "guardrails"]
last_reviewed: "2025-12-20"
---

# CLI Agents (General)

## Overview

:::info[Purpose]
Guardrails for any CLI-based agent (Codex CLI, Aider, Claude Code/terminal, similar) operating in this repo.
:::

This file defines how CLI-based agents should behave inside this repo.

GenAI & LLM Handbook assumes AI can execute, but humans own:

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

- Anyone running CLI copilots/agents against this repository
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
- auto-commit without human review

If uncertain about licensing, stop and ask for a citation or replacement.

---

## Supported CLI Agents (pick the one you use)

- **Codex CLI**: `codex <agent> "Plan/Implement/Review ..."`
- **Aider**: interactive; start with `aider --model gpt-4o-mini --no-auto-commit` (or your model); begin with a plan prompt.
- **Claude Code (terminal)**: run `claude code` (or provider CLI) and paste the plan/implement prompts below.

> All agents must follow the same operating mode: plan → execute in small diffs → verify → summarize. Disable auto-commit/auto-apply when possible.

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

| Good Allowed | Avoid Not Allowed |
| --- | --- |
| Create docs using repo templates | Change repo structure without explicit instruction |
| Update links, indexes, navigation | Introduce new dependencies without justification |
| Add diagrams (Mermaid) where relevant | Add external code without license clarity |
| Add experiments under `experiments/` (standard structure) | Weaken security/governance docs |

---

## Practical Examples & Templates (Good/Bad)

Good Good instruction to an agent

- “Create `docs/foundations/02-llm-deep-dive/fundamentals/01-how-llms-work-enough-for-practice.md` using the repo doc template. Keep it practice-oriented. Include one Mermaid diagram. Add a short ‘How this impacts GenAI & LLM Handbook execution’ section. Do not add external links unless necessary.”

Bad Bad instruction to an agent

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

### Aider (example prompts)

- Start interactive session (no auto-commit):
  ```bash
  aider --model gpt-4o-mini --no-auto-commit
  ```
- First message: `Plan the changes for: <task>. List files to edit. Do not modify files yet.`
- When ready to edit: `Implement <task>. Constraints: <list>. Keep diffs small.`
- Review: `Review the current diffs; list risks/regressions and missing constraints. Do not change files.`

### Claude Code (terminal) / similar

- First message: `Plan the changes for: <task>. Files to touch? Constraints? Validation steps? No code yet.`
- Implement: `Apply the plan in small diffs. Respect constraints: <list>. Summarize diffs and tests run.`
- Review: `Review current changes for risks/regressions. No new edits; just findings.`

---

## Resources & References

- GenAI & LLM Handbook Method: `docs/01-handbook-method/`
- Guardrails: `docs/05-responsible-ai/`
- Templates: `docs/06-templates/`
- Code & Snippets: `docs/08-code-and-snippets/`

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-20
- Version: 0.1.0
