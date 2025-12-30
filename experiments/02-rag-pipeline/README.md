# 02 · RAG Pipeline (Shailesh's Notes)

I’m extending the KB into a simple RAG loop: retrieve chunks, optionally rerank, and generate an answer with citations. Staying local/OSS-friendly.

## What I’m Building

- Goal: Ask a question against my KB and get a grounded answer with source paths.
- Stack: Python, Chroma store, MiniLM embeddings, a local LLM (or stub) via `transformers`/`ctransformers` as a placeholder.
- Why: I want a minimal, transparent loop before swapping in heavier models or hosted endpoints.

## Setup (ELI12)

Reuse the KB setup from `01-rag-knowledge-base`:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install chromadb sentence-transformers langchain-text-splitters
# If you want a tiny local model for generation (optional):
pip install transformers accelerate
```

You should already have `rag_demo.py` populated. Add this file next to it: `rag_qa.py`.

## Code (rag_qa.py)

```python
import os
import chromadb
from sentence_transformers import SentenceTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Optional: plug a local model; here we just echo context for demo
def generate_answer(question: str, contexts: list[str]) -> str:
    # Replace with your model call; keep it simple for now
    joined = "\n\n".join(contexts)
    return f"Q: {question}\nA (context-based draft):\n{joined[:800]}"

CHUNK_SIZE = 500
CHUNK_OVERLAP = 50
DATA_DIR = "data"

model = SentenceTransformer("all-MiniLM-L6-v2")
client = chromadb.Client()
collection = client.get_or_create_collection("kb")

def build_if_empty():
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP, separators=["\n\n", "\n", " "]
    )
    # Simple guard: if collection empty, ingest
    if collection.count() > 0:
        return
    docs = []
    for root, _, files in os.walk(DATA_DIR):
        for name in files:
            path = os.path.join(root, name)
            with open(path, "r", encoding="utf-8") as f:
                text = f.read()
            for idx, chunk in enumerate(splitter.split_text(text)):
                docs.append({"id": f"{path}-{idx}", "text": chunk, "source": path})
    embeddings = model.encode([d["text"] for d in docs]).tolist()
    collection.upsert(
        ids=[d["id"] for d in docs],
        documents=[d["text"] for d in docs],
        metadatas=[{"source": d["source"]} for d in docs],
        embeddings=embeddings,
    )

def retrieve(question: str, k: int = 3):
    q_emb = model.encode([question]).tolist()[0]
    result = collection.query(query_embeddings=[q_emb], n_results=k)
    docs = result["documents"][0]
    metas = result["metadatas"][0]
    return list(zip(docs, metas))

def answer(question: str, k: int = 3):
    hits = retrieve(question, k=k)
    contexts = [doc for doc, _ in hits]
    draft = generate_answer(question, contexts)
    print("=== Answer (draft) ===")
    print(draft)
    print("\n=== Sources ===")
    for i, (_, meta) in enumerate(hits):
        print(f"[{i+1}] {meta['source']}")

if __name__ == "__main__":
    build_if_empty()
    answer("What is the main idea?")
```

## Run It

```bash
python rag_qa.py
```

You’ll get a draft answer plus the source paths for the retrieved chunks. Swap `generate_answer` with your preferred local model call when ready.

## Validation (quick)

- Ask a known question; confirm the top chunks include the right files.
- Check that sources are printed and match the expected docs.
- If answers look noisy, tweak chunking or try `all-mpnet-base-v2` embeddings for better recall.

## Options & Reasoning

- Retrieval: stick with Chroma for simplicity; Faiss if you want pure in-memory speed; PGVector/Weaviate if you already run them.
- Generation: start with a tiny local model or stub; when confident, point to a stronger local model (e.g., via transformers/ctransformers). Keep prompts explicit: include constraints and ask for citations.
- Rerank: optional; try a cross-encoder reranker if your corpus is dense or noisy.

## What I Learned Here

Keeping a stub/echo generator first lets me debug retrieval without blaming the model. Once retrieval is solid (sources look right), I swap in a real model and tighten the prompt to require citations and refusals when context is missing.
