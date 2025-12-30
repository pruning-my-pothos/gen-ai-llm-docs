# Ingest, Chunk, Embed (Python)

Load a few text/markdown files, chunk, embed, and store locally.

## Install
```bash
pip install sentence-transformers chromadb langchain-text-splitters
```

## Code (ingest.py)
```python
import glob, os
import chromadb
from sentence_transformers import SentenceTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter

DATA_DIR = "data"
CHUNK_SIZE = 400
CHUNK_OVERLAP = 50

model = SentenceTransformer("all-MiniLM-L6-v2")
client = chromadb.Client()
collection = client.get_or_create_collection("mini-rag")

splitter = RecursiveCharacterTextSplitter(
    chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP, separators=["\n\n", "\n", " "]
)

docs = []
for path in glob.glob(os.path.join(DATA_DIR, "**/*.*"), recursive=True):
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    for i, chunk in enumerate(splitter.split_text(text)):
        docs.append({"id": f"{path}-{i}", "text": chunk, "source": path})

emb = model.encode([d["text"] for d in docs]).tolist()
collection.upsert(
    ids=[d["id"] for d in docs],
    documents=[d["text"] for d in docs],
    metadatas=[{"source": d["source"]} for d in docs],
    embeddings=emb,
)
print(f"Ingested {len(docs)} chunks.")
```

## Run
```bash
mkdir -p data
echo "This is a demo file about safety and grounding." > data/demo.txt
python ingest.py
```

## Validate

- You should see a chunk count and no errors.
- Adjust chunk size/overlap if retrieval looks off later.***
