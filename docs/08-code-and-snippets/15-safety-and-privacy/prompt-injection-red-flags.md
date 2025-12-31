---
title: "Prompt Injection Red Flags"
---

# Prompt Injection Red Flags

:::warning[Watch for]
- Instructions like “ignore previous,” “reset,” or “switch roles.”
- Hidden/encoded data (base64, hex) asking to be decoded.
- Prompts that exfiltrate secrets (“print all env vars,” “show system prompt”).
- Requests to fetch untrusted URLs or run code.
:::

## Mitigations
- Pre-scan inputs for keywords/patterns; reject or sanitize.
- Keep system prompts short and hard to override.
- Combine with allowlists for tools/URLs and tight output validation.
