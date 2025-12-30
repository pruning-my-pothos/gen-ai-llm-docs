---
title: "Test Request Template"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["tests", "prompting", "template"]
last_reviewed: "2025-12-28"
---

## Test Request Template

:::info[Value Proposition]
Use this prompt to ask an LLM to propose or author tests for a change, with clear scope and evidence.
:::

## Prompt

```text
You are assisting with: test planning/writing.

Change summary:
- Affected files/areas: <paths>
- Behavior change: <short description>

Constraints:
- Test framework: <jest/pytest/vitest/etc.>
- Coverage: focus on <units/integration/e2e> and key edge cases.
- Safety: no network calls; no new deps unless specified.

Deliverable:
- Propose tests (names + purpose) AND provide code for the highest-value cases.
- Include commands to run the tests.
- If context is missing, say "unsure" and list what you need.
```

## How to Use

- Fill in the change summary and framework; attach relevant code snippets or diffs.
- Ask for both a short plan and code for top-priority cases to keep it concise.
- Pair with the Code Change Request for end-to-end flow.

## Quick Links

- Testing Tools: [Handbook](/docs/01-handbook-method/testing-tools)
- Write Tests: [Execution Pattern](/docs/02-execution-patterns/07-write-tests)
- Code Change Request: [Template](/docs/06-templates/code-change-request-template)
- Prompt Safety Add-ons: [Template](/docs/06-templates/prompt-safety-addons)

## Next Step

Run the proposed tests, capture results in your CI/terminal logs, and log outcomes in the [Iteration Log](/docs/06-templates/iteration-log-template).
