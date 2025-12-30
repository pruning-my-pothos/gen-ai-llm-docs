# 01 · Build a RAG Knowledge Base (Shailesh's Notes)

I wanted a tiny, local RAG pipeline I could spin up in minutes—no hosted services, no surprises. This repo folder is my scratchpad with the exact steps I use.

## What I’m Building

- Goal: Load a handful of markdown/text files, chunk, embed, and query them with citations.
- Stack: Python, `sentence-transformers` for embeddings, `chromadb` as the vector store, `langchain`-style helpers kept minimal.
- Why: I needed a quick KB for experimenting with prompts and to sanity-check retrieval quality before scaling.

## Setup (ELI12)

1) Use Python 3.10+ (I used 3.11).
2) Create and activate a venv:
```bash
python3 -m venv .venv
source .venv/bin/activate
```
3) Install deps:
```bash
pip install --upgrade pip
pip install chromadb sentence-transformers langchain-text-splitters
```

## Folder Layout

```
experiments/01-rag-knowledge-base/
├── README.md          # this file
├── data/              # put your .md/.txt files here
└── rag_demo.py        # main script (see below)
```

Create `data/` and drop a few markdown/text files into it.

## Code (rag_demo.py)

```python
import glob
import os
import chromadb
from sentence_transformers import SentenceTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Config (adjust if you like)
DATA_DIR = "data"
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50

# 1) Load model & DB
model = SentenceTransformer("all-MiniLM-L6-v2")
client = chromadb.Client()
collection = client.get_or_create_collection("kb")

# 2) Load and chunk documents
splitter = RecursiveCharacterTextSplitter(
    chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP, separators=["\n\n", "\n", " "]
)
docs = []
for path in glob.glob(os.path.join(DATA_DIR, "**/*.*"), recursive=True):
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    for idx, chunk in enumerate(splitter.split_text(text)):
        docs.append({"id": f"{path}-{idx}", "text": chunk, "source": path})

# 3) Embed and upsert
embeddings = model.encode([d["text"] for d in docs]).tolist()
collection.upsert(
    ids=[d["id"] for d in docs],
    documents=[d["text"] for d in docs],
    metadatas=[{"source": d["source"]} for d in docs],
    embeddings=embeddings,
)

# 4) Query helper
def query(q: str, k: int = 3):
    q_emb = model.encode([q]).tolist()[0]
    result = collection.query(query_embeddings=[q_emb], n_results=k)
    for i, (doc, meta, score) in enumerate(
        zip(result["documents"][0], result["metadatas"][0], result["distances"][0])
    ):
        print(f"\n[{i+1}] score={score:.4f} source={meta['source']}")
        print(doc[:600])

if __name__ == "__main__":
    print("KB ready. Ask something from your files:")
    query("What is the main idea?")
```

## Choose Your Stack (options)

- Embeddings:
  - Default: `all-MiniLM-L6-v2` (small, fast, great for quick checks).
  - Better quality: `all-mpnet-base-v2` (larger, slower).
  - Domain-aware: Instructor models (e.g., `hkunlp/instructor-xl`) if you have specialized docs.
- Vector store:
  - Default: `chromadb` (simple local DB).
  - Alternative: Faiss (fast, in-memory) if you don’t need persistence.
  - If you already run one: Weaviate or PGVector—stay local if possible for sensitive data.
- Chunking:
  - Default: 500 chars with 50 overlap (fast to validate).
  - Longer docs or code? Try 800–1000 chars to preserve more context per chunk.

Why these defaults? I want a quick sanity check on retrieval without any hosted services. If retrieval looks bad, I first tweak chunking or swap to a higher-quality embedding model before changing anything else.

## Run It

```bash
python rag_demo.py
```

You should see top chunks with their source paths. Change the query string to test other questions.

## Validate (quick)

- Swap the query to something you know is in your docs; ensure the right snippet appears in top-3.
- Check `source` paths match the files you dropped in.
- If results look off, lower `CHUNK_SIZE` or tweak `CHUNK_OVERLAP`.

## Notes & Variations

- Swap embeddings: try `all-mpnet-base-v2` for higher quality (slower).
- Persistence: for repeat runs, use `chromadb.PersistentClient(path="chroma_db")`.
- Multi-format: if you have PDFs, preprocess to text first (outside this script).

## What I Learned Here

Keeping the stack tiny (MiniLM + Chroma) lets me test retrieval quality fast. If the KB can’t answer simple known questions, I fix chunking or documents before blaming the model. This is my baseline before trying bigger models or fancier RAG orchestration.
