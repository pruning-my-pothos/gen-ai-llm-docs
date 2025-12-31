---
title: "Ingest → Chunk → Embed (Mini)"
---

# Ingest → Chunk → Embed (Mini)

:::info[Purpose]
Minimal pipeline to turn raw text into indexed chunks for retrieval.
:::

1) **Ingest**: load files (Markdown/PDF/txt) and normalize to plain text.  
2) **Chunk**: split with overlap (e.g., 500–800 tokens, 80–120 overlap).  
3) **Embed**: use a small local model (e.g., `all-MiniLM-L6-v2`) and store vectors + metadata.

## Sample Python sketch
```python
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import chromadb

text = open("docs.txt").read()
splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=120)
chunks = splitter.split_text(text)

emb_model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = emb_model.encode(chunks, convert_to_numpy=True)

client = chromadb.Client()
col = client.get_or_create_collection("kb")
col.add(documents=chunks, embeddings=embeddings, ids=[f"c{i}" for i,_ in enumerate(chunks)])
```
