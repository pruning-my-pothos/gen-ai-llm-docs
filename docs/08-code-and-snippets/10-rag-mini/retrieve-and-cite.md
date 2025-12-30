# Retrieve & Cite (Python)

Query the local store and show sources.

## Code (retrieve.py)
```python
import chromadb
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
client = chromadb.Client()
collection = client.get_or_create_collection("mini-rag")

def query(q: str, k: int = 3):
    q_emb = model.encode([q]).tolist()[0]
    res = collection.query(query_embeddings=[q_emb], n_results=k)
    docs = res["documents"][0]
    metas = res["metadatas"][0]
    for i, (doc, meta) in enumerate(zip(docs, metas), 1):
        print(f"[{i}] source={meta['source']}")
        print(doc[:400], "\n")

if __name__ == "__main__":
    query("What is the main idea?")
```

## Run
```bash
python retrieve.py
```

## Validate

- Top results should include the file you ingested.
- If results look noisy, try smaller chunks or better embeddings (`all-mpnet-base-v2`).***
