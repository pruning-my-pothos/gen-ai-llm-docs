---
title: "Ingest, Chunk, and Embed for RAG"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["rag", "ingestion", "chunking", "embeddings", "chromadb"]
last_reviewed: "2025-12-31"
---

# Ingest, Chunk, and Embed for RAG

The foundation of any Retrieval-Augmented Generation (RAG) system is the preparation of your knowledge base. This involves a three-step process: **ingesting** your documents, **chunking** them into manageable pieces, and **embedding** those chunks into numerical vector representations.

:::info[The Goal: A Searchable Knowledge Base]
The objective is to transform raw, unstructured documents into a structured, searchable format (a vector store) that an LLM can query to ground its responses in specific facts.
:::

---

## 1. Installation

We will use a few key Python libraries for this process:

-   `sentence-transformers`: For generating embeddings locally.
-   `chromadb`: A lightweight, open-source vector database.
-   `langchain-text-splitters`: For efficient text splitting.

```bash
pip install sentence-transformers chromadb langchain-text-splitters
```

---

## 2. Code Example: Ingest, Chunk, Embed, Store

This Python script demonstrates the full pipeline to process a directory of text files and store their embeddings in a local ChromaDB collection.

```python
import glob, os
import chromadb
from sentence_transformers import SentenceTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter
from typing import List, Dict, Any

# --- Configuration ---
DATA_DIR = "data" # Directory containing your source documents
CHUNK_SIZE = 400   # Maximum number of characters per text chunk
CHUNK_OVERLAP = 50 # Number of characters to overlap between chunks

# --- Initialize Components ---
# 1. Embedding Model: Used to convert text into numerical vectors
#    'all-MiniLM-L6-v2' is a small, fast, and good-performing local model
model = SentenceTransformer("all-MiniLM-L6-v2")

# 2. ChromaDB Client: Our local vector store
client = chromadb.Client()
# Get or create a collection to store our document chunks and their embeddings
collection = client.get_or_create_collection("mini-rag-docs")

# 3. Text Splitter: Breaks down documents into smaller, searchable chunks
#    RecursiveCharacterTextSplitter tries to split by paragraphs, then sentences, then words
splitter = RecursiveCharacterTextSplitter(
    chunk_size=CHUNK_SIZE,
    chunk_overlap=CHUNK_OVERLAP,
    separators=["\n\n", "\n", " ", ""] # Prioritize splitting by paragraph, then line, then word
)

# --- Ingestion Pipeline ---
docs_to_embed: List[Dict[str, Any]] = []

# Iterate through all files in the data directory
for path in glob.glob(os.path.join(DATA_DIR, "**/*.*"), recursive=True):
    # a. Ingest: Load the document content
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    
    # b. Chunk: Split the document into smaller pieces
    #    Each chunk gets a unique ID and its source metadata
    for i, chunk_content in enumerate(splitter.split_text(text)):
        docs_to_embed.append({
            "id": f"{os.path.basename(path)}-chunk-{i}", # Unique ID for each chunk
            "content": chunk_content,
            "metadata": {"source": os.path.basename(path), "chunk_id": i}
        })

# c. Embed: Generate vector embeddings for all document chunks
#    The SentenceTransformer model converts each text chunk into a list of numbers (vector)
print(f"Generating embeddings for {len(docs_to_embed)} chunks...")
embeddings = model.encode([d["content"] for d in docs_to_embed]).tolist()

# d. Store: Upsert the chunks, metadata, and embeddings into ChromaDB
print("Storing embeddings in ChromaDB...")
collection.upsert(
    ids=[d["id"] for d in docs_to_embed],
    documents=[d["content"] for d in docs_to_embed],
    metadatas=[d["metadata"] for d in docs_to_embed],
    embeddings=embeddings,
)

print(f"Successfully ingested and embedded {len(docs_to_embed)} chunks into ChromaDB.")
print(f"Current collection count: {collection.count()}")

```

---

## 3. How to Run

1.  **Create a `data` directory**: Put some text files (e.g., `document1.txt`, `info.md`) inside this directory.
    ```bash
    mkdir -p data
    echo "This is a demo file about safety and grounding for LLMs. RAG helps avoid hallucinations." > data/demo.txt
    echo "RAG involves ingesting documents, chunking them, embedding, and then retrieval." > data/rag_overview.txt
    ```
2.  **Save the Python script**: Save the code above as `ingest_script.py`.
3.  **Execute**:
    ```bash
    python ingest_script.py
    ```

You should see output indicating the number of chunks processed and stored.

---

:::tip[Chunking Strategy Matters]
The `CHUNK_SIZE` and `CHUNK_OVERLAP` parameters are critical.
-   **Too large chunks**: May include irrelevant information, diluting relevance.
-   **Too small chunks**: May break up important context that needs to stay together.
Experiment with these values to find the sweet spot for your specific documents and use cases.
:::
