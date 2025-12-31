---
title: "Prompt Safety Add-ons"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["prompting", "safety", "constraints", "template"]
last_reviewed: "2025-12-28"
---

:::info[Value Proposition]
Drop-in constraints you can append to any prompt to reduce hallucinations, scope creep, and policy violations.
:::

## Add-on Snippets

**No Fabrication & Citations**
```text
Use only the provided context. If a required fact is missing, say "unsure" and request the exact snippet you need. Cite the source section or filename for every claim.
```

**Scope Boundaries**
```text
Stay within scope: <systems/files/APIs>. Do NOT call external services, invent endpoints, or modify dependencies. If asked outside scope, refuse and explain what is missing.
```

**Security & Compliance**
```text
Do not include secrets, credentials, or PII beyond what is provided. Do not fetch external data. Assume all content must be license-compliant and attribution-ready.
```

**Style & Review Readiness**
```text
Write in a concise, factual style. Output a single, clean block. Include a self-check list covering requirements, tests, and constraints. If any item fails, state it explicitly.
```

## How to Use

- Append one or more snippets to your [Prompt Skeleton](/docs/06-templates/prompt-skeleton-template).
- Keep the list short; pick only what is relevant to avoid noise.
- For risky work, pair with the [Constraint Spec](/docs/06-templates/constraint-spec-template) and [Review & Interrogation Template](/docs/06-templates/review-and-interrogation-template).

## Quick Links

- Prompt Skeleton: [Template](/docs/06-templates/prompt-skeleton-template)
- Constraint Spec: [Template](/docs/06-templates/constraint-spec-template)
- Review & Interrogation: [Template](/docs/06-templates/review-and-interrogation-template)
- Generation Request: [Template](/docs/06-templates/generation-request-template)

## Next Step

Use these add-ons with the [Prompt Skeleton](/docs/06-templates/prompt-skeleton-template), then move to the [Generation Request Template](/docs/06-templates/generation-request-template) to draft the full instruction.