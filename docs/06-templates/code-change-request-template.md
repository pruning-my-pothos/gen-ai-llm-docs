---
title: "Code Change Request Template"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["code", "prompting", "template", "tests"]
last_reviewed: "2025-12-28"
---

## Code Change Request Template

:::info[Value Proposition]
Copy/paste prompt to request a safe, scoped code change with tests and self-checks.
:::

## Prompt

```text
You are assisting with: <feature/fix>.

Change:
- Files: <target files/paths>
- Goal: <one-sentence intent>

Constraints:
- Stack: <languages/frameworks/style>
- Tests: must add/update tests; show commands to run.
- Safety: no new deps without note; no external calls; no secrets.

Context:
- Current behavior: <short summary or snippet references>
- Desired behavior: <expected outcome>

Deliverable:
- Provide the diff or full file(s) only.
- Include brief test plan: commands + what they cover.
- If unsure, say "unsure" and list missing info.
```

## How to Use

- Paste into your generation tool; fill in the `<...>` slots with file paths and expected behavior.
- Attach relevant code snippets or point to files to reduce guesswork.
- Pair with Prompt Safety Add-ons for stricter guardrails.

## Quick Links

- Prompt Safety: [Add-ons](/docs/06-templates/prompt-safety-addons)
- Generation Request: [Template](/docs/06-templates/generation-request-template)
- Testing Tools: [Handbook](/docs/01-handbook-method/testing-tools)
- Write Tests: [Execution Pattern](/docs/02-execution-patterns/07-write-tests)

## Next Step

After applying the change, run the referenced tests and capture outcomes in the [Iteration Log](/docs/06-templates/iteration-log-template).
