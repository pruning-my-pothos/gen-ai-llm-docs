---
title: "Copilots"
archetype: "standard"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm"]
last_reviewed: "2025-12-20"
---
# Copilots

:::info[Value Proposition]
Copilots accelerate development, but only when paired with clear intent, constraints, and review discipline.
:::

## Types of Copilots

- **IDE copilots**: inline code/completion (e.g., Cursor, GitHub Copilot, JetBrains AI).
- **Chat copilots**: side-panel agents that answer questions, refactor, and explain.
- **Domain copilots**: tuned to a stack (e.g., SQL, Terraform, docs editing).

## How to Get Value

- Start with a **task spec**: what to change, acceptance criteria, constraints.
- Ask for **diffs and tests**, not giant rewrites.
- Keep **secrets** and **proprietary data** out of prompts unless on an approved enterprise plan.

## Guardrails

- Never merge code you can’t explain.
- Keep telemetry/offline modes aligned with policy.
- Use repo-specific context (embeddings/indexes) to reduce hallucinations.

## Example Prompt (IDE Chat)

```
Task: Add `last_login` (ISO 8601) to the user response in GET /users/{id}.
Constraints: Do not change database schema; value comes from `user_logins.last_seen`.
Acceptance: Update handler, DTO, and tests; include a unit test for the new field.
Output: Show diff only.
```

## Next Step

See `01-handbook-method/prompt-engineering.md` for writing task specs, and `06-templates/ci-github-actions-snippet.md` to keep AI changes covered by CI.
