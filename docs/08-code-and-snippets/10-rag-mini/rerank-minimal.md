---
title: "Minimal Reranking for RAG"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["rag", "reranking", "retrieval", "sentence-transformers"]
last_reviewed: "2025-12-31"
---

# Minimal Reranking for RAG

In Retrieval-Augmented Generation (RAG), initial document retrieval (e.g., from a vector store) is often based solely on semantic similarity. While effective, this doesn't always guarantee direct relevance to the user's nuanced query. **Reranking** is a post-retrieval step that refines the initial set of documents, selecting those most directly relevant to the query.

:::info[The Goal: Improve Retrieval Precision]
The objective of reranking is to boost the signal-to-noise ratio of your retrieved context, ensuring the LLM receives the most pertinent information to answer the user's question, thus reducing hallucinations and improving answer quality.
:::

---

## The Problem: Beyond Semantic Similarity

Vector search excels at finding documents that are *semantically similar* to a query. However, semantic similarity doesn't always equal *direct relevance*.

**Example**:
-   **Query**: "What are the health benefits of green tea?"
-   **Vector Search might retrieve**: Documents about "tea history", "caffeine effects", "healthy beverages".
-   **A Reranker would prioritize**: Documents specifically discussing "green tea health benefits" among the retrieved set.

---

## The Solution: Specialized Reranker Models

Rerankers are typically separate, often smaller, machine learning models (commonly called **cross-encoders**) that take a query and a retrieved document pair and output a relevance score. They are trained to directly predict how relevant a document is to a query.

The process is:
1.  **Initial Retrieval**: Get `N` (e.g., 10-20) candidate documents from your vector store.
2.  **Rerank**: Pass each `(query, document)` pair to the reranker model.
3.  **Select Top K**: Take the top `K` (e.g., 3-5) documents with the highest relevance scores from the reranker.

---

## Python Code Example: Basic Reranking

We'll use a pre-trained `cross-encoder` model from the `sentence-transformers` library.

### Installation

```bash
pip install sentence-transformers
```

### Implementation

```python
from sentence_transformers import CrossEncoder
from typing import List, Dict, Any

# 1. Load a Cross-Encoder Reranker Model
# 'cross-encoder/ms-marco-MiniLM-L-6-v2' is a good general-purpose reranker
reranker_model = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

def rerank_documents(query: str, documents: List[str], top_n: int = 3) -> List[Dict[str, Any]]:
    """
    Reranks a list of documents based on their relevance to a query.

    Args:
        query: The user's query string.
        documents: A list of retrieved document strings (e.g., from a vector store).
        top_n: The number of top-ranked documents to return.

    Returns:
        A list of dictionaries, where each dict contains 'document' and 'relevance_score',
        sorted by relevance.
    """
    if not documents:
        return []

    # Create pairs of (query, document) for the reranker
    sentences_to_rank = [(query, doc) for doc in documents]

    # Generate relevance scores
    scores = reranker_model.predict(sentences_to_rank)

    # Combine documents with their scores and sort
    scored_documents = []
    for i, doc in enumerate(documents):
        scored_documents.append({"document": doc, "relevance_score": float(scores[i])})

    # Sort in descending order of relevance score
    scored_documents.sort(key=lambda x: x["relevance_score"], reverse=True)

    # Return the top N
    return scored_documents[:top_n]

# --- Example Usage ---
user_query = "What are the benefits of eating broccoli?"
# Simulate documents retrieved from a vector store (initial 7)
initial_retrieved_documents = [
    "Broccoli is a green vegetable that resembles a miniature tree. It is rich in vitamins C and K.",
    "Many vegetables are good for you. Carrots contain beta-carotene.",
    "Eating a diet rich in vegetables like broccoli can reduce the risk of chronic diseases.",
    "Green smoothies are a great way to get your daily dose of greens.",
    "Broccoli contains compounds that may have anti-cancer properties.",
    "How to cook broccoli: steaming and roasting are popular methods.",
    "Healthy eating habits contribute to overall well-being."
]

print(f"Query: '{user_query}'")
print("\n--- Initial Retrieved Documents ---")
for i, doc in enumerate(initial_retrieved_documents):
    print(f"{i+1}. {doc}")

reranked_docs = rerank_documents(user_query, initial_retrieved_documents, top_n=3)

print("\n--- Reranked Documents (Top 3) ---")
for i, item in enumerate(reranked_docs):
    print(f"{i+1}. Score: {item['relevance_score']:.4f} - {item['document']}")

# Notice how the reranker prioritizes documents directly addressing "benefits"
```

---

:::tip[When to Use Reranking]
Reranking adds a small amount of latency (due to the extra model inference) and potentially cost. It is most beneficial when:
-   You need higher precision for your RAG system.
-   Your initial retrieval is good at finding semantic matches but struggles with pinpointing direct relevance.
-   Your application demands very high answer quality and minimal hallucination.
:::

:::warning[Reranker Choice]
The performance of the reranker model can vary. Choose a reranker that is pre-trained on a domain similar to your documents and query types. The MS MARCO dataset (used by the example model) is good for general relevance ranking.
:::