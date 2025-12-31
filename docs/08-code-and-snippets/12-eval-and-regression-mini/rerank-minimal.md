---
title: "Rerank (Minimal)"
---

# Rerank (Minimal)

:::info[When to rerank]
Use a small reranker when top-k retrieval is noisy; improves precision without changing your index.
:::

## Python example (Cohere rerank local-ish)
```python
import cohere
co = cohere.Client("YOUR_KEY")

query = "How do we handle PII?"
docs = ["doc1 text ...", "doc2 text ...", "doc3 text ..."]

res = co.rerank(model="rerank-english-v3.0", query=query, documents=docs, top_n=3)
for item in res:
    print(item.index, item.relevance_score)
```

## Tips
- Keep initial `k` small (e.g., 8–12), rerank to top 3–5.
- For purely local stacks, consider llama.cpp-based rerank models (higher latency) or heuristics (BM25 + metadata filters) as a fallback.
