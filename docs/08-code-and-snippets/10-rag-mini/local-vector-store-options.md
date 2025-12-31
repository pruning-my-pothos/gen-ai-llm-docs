---
title: "Local Vector Store Options"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["rag", "vector-store", "chromadb", "faiss", "lancedb"]
last_reviewed: "2025-12-31"
---

# Local Vector Store Options

After you've ingested, chunked, and embedded your documents, you need a place to store these high-dimensional vector embeddings and efficiently search them. While cloud-based vector databases exist for production, several excellent options are available for local development and smaller-scale RAG applications.

:::info[The Goal: Efficient Similarity Search]
A vector store allows you to quickly find documents or chunks that are semantically similar to a given query, using the embeddings as numerical representations of meaning.
:::

---

## 1. FAISS (Facebook AI Similarity Search)

FAISS is a library for efficient similarity search and clustering of dense vectors. It's incredibly fast and powerful but primarily an in-memory solution.

### Pros
-   **Extremely Fast**: Optimized for performance, especially on CPU and GPU.
-   **Flexible**: Highly customizable with many index types.

### Cons
-   **In-Memory**: Data is lost when the application stops unless manually saved/loaded.
-   **No Metadata Filtering**: Primarily for vector search; doesn't easily handle filtering by metadata (like source document).
-   **Installation**: Can be more involved depending on your system (e.g., `faiss-gpu` vs `faiss-cpu`).

### Installation
```bash
pip install faiss-cpu # or faiss-gpu if you have a compatible GPU
```

### Python Example: In-Memory FAISS Index

```python
import faiss # pip install faiss-cpu
import numpy as np
from sentence_transformers import SentenceTransformer
from typing import List, Dict, Any

# Assume you have your SentenceTransformer model and some text chunks
model = SentenceTransformer("all-MiniLM-L6-v2")
documents = [
    "The sky is blue because of Rayleigh scattering.",
    "Water is a liquid at room temperature and pressure.",
    "Photosynthesis is the process plants use to convert light energy into chemical energy.",
    "LLMs are powerful language models."
]

# Generate embeddings
embeddings = model.encode(documents).astype('float32') # FAISS often expects float32

# 1. Create a FAISS index
#    IndexFlatL2: A simple L2 (Euclidean distance) index.
#    embeddings.shape[1]: The dimensionality of the vectors.
index = faiss.IndexFlatL2(embeddings.shape[1])

# 2. Add vectors to the index
index.add(embeddings)

print(f"FAISS index contains {index.ntotal} vectors.")

# 3. Perform a similarity search
query_text = "What makes the sky appear blue?"
query_embedding = model.encode([query_text]).astype('float32')

k = 2 # Number of nearest neighbors to retrieve
distances, indices = index.search(query_embedding, k)

print(f"\nQuery: '{query_text}'")
print("Nearest neighbors (FAISS):")
for i, idx in enumerate(indices[0]):
    print(f"- Rank {i+1}: '{documents[idx]}' (Distance: {distances[0][i]:.4f})")
```

---

## 2. ChromaDB

ChromaDB is a developer-friendly, open-source embedding database designed for AI applications. It's easy to set up and supports both in-memory and persistent modes.

### Pros
-   **Easy to Use**: Simple Python API.
-   **Persistent**: Can store data to disk, so it's not lost on shutdown.
-   **Metadata Filtering**: Supports pre- or post-filtering results based on document metadata.
-   **Built-in Embedders**: Can handle embedding generation internally (though we use `sentence-transformers` for consistency).

### Cons
-   **Less Scalable**: Not designed for petabyte-scale data like dedicated production vector databases.
-   **Performance**: Generally not as raw performant as FAISS for pure vector search, but sufficient for local RAG.

### Installation
```bash
pip install chromadb
```

### Python Example: Persistent ChromaDB

```python
import chromadb
from sentence_transformers import SentenceTransformer
from typing import List, Dict, Any

# Assume you have your SentenceTransformer model and some text chunks
model = SentenceTransformer("all-MiniLM-L6-v2")
documents = [
    {"id": "doc1", "content": "The sky is blue because of Rayleigh scattering.", "metadata": {"source": "wiki", "page": 1}},
    {"id": "doc2", "content": "Water is a liquid at room temperature and pressure.", "metadata": {"source": "wiki", "page": 2}},
    {"id": "doc3", "content": "Photosynthesis is the process plants use to convert light energy into chemical energy.", "metadata": {"source": "biology", "page": 1}},
    {"id": "doc4", "content": "LLMs are powerful language models.", "metadata": {"source": "ai_book", "page": 1}}
]

# 1. Initialize a persistent ChromaDB client
#    Data will be stored in the 'chroma_data/' directory
client = chromadb.PersistentClient(path="chroma_data/")
collection = client.get_or_create_collection("mini-rag-docs")

# Check if collection is empty, then add data (to avoid duplicates on rerun)
if collection.count() == 0:
    print("Adding documents to ChromaDB...")
    collection.add(
        ids=[d["id"] for d in documents],
        documents=[d["content"] for d in documents],
        metadatas=[d["metadata"] for d in documents],
        embeddings=model.encode([d["content"] for d in documents]).tolist() # Encode and add embeddings
    )
    print(f"ChromaDB collection count: {collection.count()}")
else:
    print(f"ChromaDB collection already contains {collection.count()} documents.")

# 2. Perform a similarity search
query_text = "What makes the sky appear blue?"
query_embedding = model.encode([query_text]).tolist()

k = 2 # Number of nearest neighbors to retrieve
results = collection.query(
    query_embeddings=query_embedding,
    n_results=k,
    # You can also add where_clause for metadata filtering, e.g.,
    # where_clause={"source": "wiki"}
)

print(f"\nQuery: '{query_text}'")
print("Nearest neighbors (ChromaDB):")
for i, doc_id in enumerate(results['ids'][0]):
    print(f"- Rank {i+1}: '{results['documents'][0][i]}' (Source: {results['metadatas'][0][i]['source']})")
```

---

:::tip[When to Choose Which]
-   **FAISS**: When you need extreme performance for purely vector-based search, are managing persistence manually, or have very large datasets (often paired with other systems for metadata).
-   **ChromaDB**: For ease of use, persistence, and built-in metadata filtering for local development and small to medium-scale RAG applications. It's often the best starting point for local RAG.
:::

:::warning[Scaling to Production]
For large-scale, production RAG systems with massive document corpora and high query loads, you will likely need to migrate to dedicated, managed cloud-based vector databases (e.g., Pinecone, Weaviate, Qdrant, Milvus, Google Cloud Vector Search).
:::