# 04 · Evaluation (Shailesh's Notes)

I want quick, local checks for retrieval quality and answer grounding before I iterate further. Keep it simple: small query set, basic metrics, and a short rubric.

## What I’m Building

- Goal: Evaluate my RAG pipeline on a tiny set of known Q&A pairs.
- Stack: Python; measure recall@k/precision@k on retrieval; a simple rubric for answers.
- Why: Fast feedback—catch bad chunking/embeddings before swapping models or adding complexity.

## Setup (ELI12)

Use the same venv as RAG. Add `pandas` for a tiny report:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install pandas
```

## Data: mini eval set

Create `eval_queries.csv`:
```
question,expected_source
"Who works at Acme?","data/people.md"
"What is Acme's business?","data/company.md"
```

## Code (eval_rag.py)

```python
import pandas as pd
import chromadb
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
client = chromadb.Client()
collection = client.get_or_create_collection("kb")

def topk_sources(question, k=3):
    q_emb = model.encode([question]).tolist()[0]
    res = collection.query(query_embeddings=[q_emb], n_results=k)
    return [m["source"] for m in res["metadatas"][0]]

def eval_retrieval(csv_path="eval_queries.csv", k=3):
    df = pd.read_csv(csv_path)
    hits = []
    for _, row in df.iterrows():
        q, expected = row["question"], row["expected_source"]
        sources = topk_sources(q, k=k)
        hit = expected in sources
        hits.append(hit)
    recall_at_k = sum(hits) / len(hits) if hits else 0
    print(f\"Recall@{k}: {recall_at_k:.2f} ({sum(hits)}/{len(hits)})\")

if __name__ == \"__main__\":
    eval_retrieval()
```

## Run It

```bash
python eval_rag.py
```

You’ll get Recall@3. Adjust `k` and expand the eval set as needed.

## Quick Answer Rubric (manual or LLM judge)

- Correctness: Does the answer match the source?
- Grounding: Are citations present and real?
- Completeness: Are key points covered?
- Safety: Does it refuse when context is missing?

Score each 1–3 and note failures. For speed, do this on a handful of queries.

## Options & Reasoning

- Retrieval metrics: recall@k is easiest; add precision@k if you have multiple expected sources.
- Judge: start manual; if you add an LLM judge, be explicit about citations and refusals.
- Data size: keep eval tiny (5–20 questions) to iterate fast; expand only after major changes.

## What I Learned Here

Small, focused evals catch bad chunking or embeddings early. If recall is low, fix ingestion/chunking/embeddings before blaming the model. Add a simple rubric so “looks okay” becomes “pass/fail” on correctness, grounding, and safety.
