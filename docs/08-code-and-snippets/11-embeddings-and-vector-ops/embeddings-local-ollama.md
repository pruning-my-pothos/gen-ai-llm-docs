---
title: "Generating Local Embeddings with Ollama"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["embeddings", "ollama", "local-llm", "vector-ops"]
last_reviewed: "2025-12-31"
---

# Generating Local Embeddings with Ollama

Embeddings are numerical representations of text that capture its semantic meaning. They are the backbone of Retrieval-Augmented Generation (RAG) and other semantic search applications. While many cloud providers offer embedding APIs, generating them locally with tools like Ollama offers benefits in terms of privacy, cost, and latency.

:::info[The Goal: Text to Numbers]
The objective is to convert human-readable text into a dense vector (a list of numbers) where the "distance" between vectors reflects the semantic similarity of the original texts.
:::

---

## 1. Install Ollama and Pull an Embedding Model

If you haven't already, install Ollama (see [Ollama Setup Guide](../01-setup-and-installs/ollama-setup.md)). Then, pull a dedicated embedding model. `nomic-embed-text` is a popular and high-performing choice.

```bash
ollama pull nomic-embed-text
```

---

## 2. Python Example: Generating Embeddings

You can generate embeddings directly from Python using the `ollama` client library.

### Installation

```bash
pip install ollama
```

### Code

```python
import ollama # pip install ollama
from typing import List, Dict, Any

# --- Configuration ---
OLLAMA_EMBEDDING_MODEL = "nomic-embed-text"

def generate_embeddings(texts: List[str]) -> List[List[float]]:
    """
    Generates embeddings for a list of texts using a local Ollama model.
    """
    embeddings: List[List[float]] = []
    for text in texts:
        try:
            response = ollama.embeddings(
                model=OLLAMA_EMBEDDING_MODEL,
                prompt=text
            )
            embeddings.append(response['embedding'])
        except Exception as e:
            print(f"Error generating embedding for text: '{text[:50]}...' - {e}")
            embeddings.append([]) # Append empty or handle error as needed
            
    return embeddings

# --- Example Usage ---
if __name__ == "__main__":
    documents = [
        "The quick brown fox jumps over the lazy dog.",
        "A fast, ginger canine leaps above a sluggish hound.",
        "I love to eat pizza and pasta.",
        "Artificial intelligence is transforming industries globally."
    ]

    print(f"Generating embeddings using '{OLLAMA_EMBEDDING_MODEL}'...")
    text_embeddings = generate_embeddings(documents)

    for i, emb in enumerate(text_embeddings):
        print(f"Document {i+1} embedding shape: ({len(emb)},)")
        # print(f"First 5 dimensions: {emb[:5]}") # Uncomment to see actual values

    # You can then use these embeddings for similarity comparison
    # (see similarity-metrics.md for how to calculate cosine similarity)
```

---

## 3. Benefits of Local Embedding Generation

-   **Privacy**: Your data never leaves your local machine, which is critical for sensitive information.
-   **Cost-Effective**: No API costs, especially for large volumes of text.
-   **Latency**: Avoids network latency for generating embeddings, speeding up ingestion and retrieval.
-   **Offline Capabilities**: Works without an internet connection.

---

:::tip[Choosing an Embedding Model]
While `nomic-embed-text` is a great general-purpose model, consider exploring other models on the Ollama library or Hugging Face. The choice of embedding model can significantly impact the quality of your retrieval. Models fine-tuned for specific domains often perform better in those domains.
:::