---
title: "PII Redaction Basics"
---

# PII Redaction Basics

:::info[Goal]
Strip obvious personal data before it reaches models or logs.
:::

- Detect patterns: emails, phone numbers, addresses, IDs (use regex or libraries).
- Replace with placeholders: `[EMAIL]`, `[PHONE]`, `[ID]`.
- Log redacted text only; keep originals in secure storage if needed.
- Document what is redacted so downstream consumers understand the placeholders.
