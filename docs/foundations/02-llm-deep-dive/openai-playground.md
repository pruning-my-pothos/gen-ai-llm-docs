---
title: "OpenAI Playground"
archetype: "standard"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm"]
last_reviewed: "2025-12-20"
---
# OpenAI Playground

:::info[Value Proposition]
The Playground is a safe space to test prompts, parameters, and system messages before you wire them into code.
:::

## What to Use It For

- Compare **temperature/top_p** settings quickly.
- Prototype **system prompts** and see behavior changes.
- Inspect **token counts** and cost estimates.
- Export working prompts to code snippets (cURL/Python/Node).

## Fast Workflow

1) Choose a model (e.g., `gpt-4o-mini`), set `temperature 0.2`, `top_p 0.9`.
2) Add a short system message (role/constraints).
3) Paste a realistic user message.
4) Toggle “View code” to capture the request payload.

## Example System Prompt

```
You are a precise technical writer. Respond in concise bullet points.
Do not invent APIs; cite only provided context.
```

## Export to Code (Node)

```javascript
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const completion = await client.chat.completions.create({
  model: "gpt-4o-mini",
  temperature: 0.2,
  messages: [
    { role: "system", content: "You are a precise technical writer." },
    { role: "user", content: "Summarize the auth API spec in bullets." }
  ]
});
console.log(completion.choices[0].message.content);
```

## Pitfalls

- Playground defaults may differ from your production SDK defaults; copy the full payload.
- Stay under org data-handling rules—don’t paste secrets or customer data.

## Next Step

Once you lock the prompt/params here, move it into version-controlled code and add tests (see `05-structured-output-and-tool-use.md` for schema-safe responses).
