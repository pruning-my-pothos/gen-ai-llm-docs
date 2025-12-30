# 06 · Chat Interface (Shailesh's Notes)

I’m wiring a minimal chat interface on top of the RAG backend. Keep it simple: local server/CLI, citations, refusals when context is missing.

## What I’m Building

- Goal: Chat against my KB/RAG pipeline with source citations and basic safety.
- Stack: Python; minimal FastAPI (or CLI) calling the existing RAG functions.
- Why: A thin UI helps spot UX gaps (missing citations, context carryover) before anything fancy.

## Setup (ELI12)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install fastapi uvicorn
pip install chromadb sentence-transformers langchain-text-splitters
```

Reuse your RAG retrieval/generation code from `02-rag-pipeline`.

## Code (chat_server.py)

```python
from fastapi import FastAPI
from pydantic import BaseModel
import chromadb
from sentence_transformers import SentenceTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter

app = FastAPI()
model = SentenceTransformer("all-MiniLM-L6-v2")
client = chromadb.Client()
collection = client.get_or_create_collection("kb")

class Query(BaseModel):
    question: str
    k: int = 3

def retrieve(question: str, k: int):
    q_emb = model.encode([question]).tolist()[0]
    res = collection.query(query_embeddings=[q_emb], n_results=k)
    docs = res["documents"][0]
    metas = res["metadatas"][0]
    return list(zip(docs, metas))

def generate_answer(question: str, contexts: list[str]):
    # Stub: replace with your model call; here we just echo context
    joined = "\n\n".join(contexts)
    return f"Q: {question}\nA (context-based draft):\n{joined[:800]}"

@app.post("/chat")
def chat(q: Query):
    hits = retrieve(q.question, k=q.k)
    if not hits:
        return {"answer": "I don't have enough context to answer.", "sources": []}
    contexts = [d for d, _ in hits]
    answer = generate_answer(q.question, contexts)
    sources = [{"source": m["source"]} for _, m in hits]
    return {"answer": answer, "sources": sources}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## Run It

```bash
python chat_server.py
# then in another shell:
curl -X POST http://localhost:8000/chat -H "Content-Type: application/json" -d '{"question":"What is the main idea?","k":3}'
```

You’ll get an answer plus sources. Swap `generate_answer` with your model call and add citation formatting if needed.

## Validation (quick)

- Ask a known question; ensure sources are present and correct.
- Ask an out-of-scope question; confirm you get a refusal/safe response.
- Try 2–3 turns; if you need session context, add simple memory (e.g., keep last N Q/A in memory or pass as context).

## Options & Reasoning

- UI: start with FastAPI/CLI; add a simple web page later if needed.
- Safety: enforce refusals when no context; include citations; avoid calling external services by default.
- Performance: keep k small; add rerank only if needed.

## What I Learned Here

A thin chat layer exposes UX gaps fast: missing citations, weak refusals, or confusing answers. Fix those before building richer interfaces.
