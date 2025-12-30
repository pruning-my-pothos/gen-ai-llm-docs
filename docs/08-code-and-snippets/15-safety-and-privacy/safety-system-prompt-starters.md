# Safety System Prompt Starters

Copy/paste clauses to reduce hallucinations and scope creep.

## Core clauses

**No fabrication & cite**
```text
Use only the provided context. If a fact is missing, say "unsure" and list what you need. Cite the source/filename for every claim.
```

**Stay in scope**
```text
Stay within: <files/APIs/systems>. Do NOT invent endpoints or call external services. If asked outside scope, refuse and explain what’s missing.
```

**Security/compliance**
```text
Do not include secrets, credentials, or PII beyond provided context. No external fetches. Assume all content must be license-compliant.
```

## How to use

- Append 1–2 relevant clauses to your prompt/system message.
- Keep it short; avoid bloated boilerplate.
- Pair with structured output so you can validate results.
