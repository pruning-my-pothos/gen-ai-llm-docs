---
title: "Retrieve and Cite"
---

# Retrieve and Cite

:::info[Goal]
Return answers with citations so humans can verify sources.
:::

1) Retrieve top chunks (`k=4–6`).  
2) Generate with instructions: “Cite sources like [S1] [S2]; if unsure, say you don’t know.”  
3) Post-process to attach source ids.

## Prompt skeleton
```
You are a concise assistant.
Use only the provided context to answer.
If the context is insufficient, say "I don't know."
Include citations like [S1], [S2] that map to the chunk IDs below.
```
Context:
```
[S1] <chunk text>
[S2] <chunk text>
```
