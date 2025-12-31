---
title: "Prompt Skeleton Template"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["prompting", "spec", "genai-llm", "template"]
last_reviewed: "2025-12-28"
---

:::info[Value Proposition]
A minimal, spec-style prompt you can drop into any workflow. Keeps intent, context, constraints, and quality gates explicit so the model cannot guess.
:::

## Template

```text
You are assisting with: <task / artifact>.

Intent:
- <goal in one sentence>

Context:
- <source files, APIs, decisions, domain facts>

Constraints:
- Tech/stack: <languages, frameworks, style guides>
- Safety/compliance: <PII rules, licensing, no external calls>
- Non-goals: <out of scope items>

Output:
- Format: <markdown table/json/code>, single block
- Must include: <fields/sections>

Quality gates:
- Verify against: <acceptance criteria or tests>
- If unsure or blocked: say "unsure", list what’s missing.
```

## How to Use

- Copy, paste, and replace the bracketed sections.
- Pair with the [Prompt Safety Add-ons](/docs/06-templates/prompt-safety-addons) for stricter controls.
- Keep it short; move long context into attached snippets, not the prompt body.

## Quick Links

- Prompt Safety: [Add-ons](/docs/06-templates/prompt-safety-addons)
- Generation Request: [Template](/docs/06-templates/generation-request-template)
- Constraint Spec: [Template](/docs/06-templates/constraint-spec-template)

## Next Step

Apply this skeleton to your task, then draft a full [Generation Request](/docs/06-templates/generation-request-template) that links to your Intent and Constraint specs.