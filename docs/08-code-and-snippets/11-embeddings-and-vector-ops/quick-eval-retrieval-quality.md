---
title: "Quick Evaluation of Retrieval Quality"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["rag", "evaluation", "retrieval", "metrics"]
last_reviewed: "2025-12-31"
---

# Quick Evaluation of Retrieval Quality

In a Retrieval-Augmented Generation (RAG) system, the quality of the retrieved documents directly impacts the LLM's ability to provide accurate and grounded answers. Before diving into complex evaluation frameworks, it's essential to have quick, practical methods to assess if your retrieval component is working as intended.

:::info[The Goal: Relevant Context]
The objective is to ensure your retriever consistently provides the most relevant document chunks to the LLM for a given query, minimizing the chances of hallucination or incorrect answers due to poor context.
:::

---

## The Problem: "Garbage In, Garbage Out"

If your retriever consistently pulls irrelevant or insufficient information, even the best LLM will struggle to provide a good answer. Early and frequent evaluation of retrieval quality is paramount.

---

## 1. Manual Inspection (Top-K Review)

This is the simplest and often most insightful method. For a small set of representative queries, you manually examine the documents retrieved by your vector store.

### How to Do It
1.  Define a small set of 5-10 "golden" test queries relevant to your knowledge base.
2.  For each query, run your retrieval system and get the top `K` (e.g., 3-5) retrieved document chunks.
3.  Manually read each retrieved chunk and determine if it helps answer the query. Categorize as "relevant," "partially relevant," or "irrelevant."

### Python Example: Inspecting Retrieved Docs

```python
import chromadb
from sentence_transformers import SentenceTransformer
from typing import List, Dict, Any

# --- Configuration ---
CHROMA_DB_PATH = "chroma_data/" # Path where your ChromaDB is stored
EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"

# --- Initialize Components ---
model = SentenceTransformer(EMBEDDING_MODEL_NAME)
client = chromadb.PersistentClient(path=CHROMA_DB_PATH)
collection = client.get_or_create_collection("mini-rag-docs")

def manual_inspect_retrieval(query: str, top_k: int = 3):
    """
    Performs retrieval and prints results for manual inspection.
    """
    query_embedding = model.encode([query]).tolist()
    results = collection.query(
        query_embeddings=query_embedding,
        n_results=top_k,
        include=['documents', 'metadatas']
    )
    
    print(f"\n--- Query: '{query}' ---")
    if results and results['documents'] and results['documents'][0]:
        for i, doc_content in enumerate(results['documents'][0]):
            metadata = results['metadatas'][0][i]
            print(f"Rank {i+1} [Source: {metadata.get('source', 'unknown')ในการใช้งานจริง]:")
            print(f"{doc_content[:200]}...\n") # Print first 200 chars for brevity
    else:
        print("No documents retrieved.")

# --- Example Usage (requires ChromaDB to be populated from ingest-chunk-embed.md) ---
if __name__ == "__main__":
    test_queries = [
        "Why is the sky blue?",
        "How do plants make food?",
        "What is the capital of France?" # (Should ideally retrieve nothing if only RAG docs exist)
    ]
    
    for q in test_queries:
        manual_inspect_retrieval(q, top_k=2)
```

:::tip[What to Look For During Inspection]
-   **Direct Answerability**: Does the chunk directly help answer the query?
-   **Completeness**: Is the chunk complete enough on its own?
-   **Irrelevance**: Does the chunk contain a lot of unrelated information?
-   **Redundancy**: Are multiple chunks saying the same thing (consider [Deduplication](./../06-context-hygiene/dedupe-and-near-duplicate-scan.md))?
:::

---

## 2. Simple Hit-Rate Check

For a predefined set of (query, expected_relevant_document_ID) pairs, you can calculate a simple "hit rate" to see how often your system retrieves at least one of the truly relevant documents within the top `K` results.

### How to Do It
1.  Create a small "ground truth" dataset: a list of queries, and for each query, the ID(s) of the document(s) that are *definitively relevant*.
2.  Run your retrieval system for each query.
3.  Check if any of the expected relevant document IDs are present in the retrieved top `K` results.

### Python Example: Hit Rate Calculation

```python
import chromadb
from sentence_transformers import SentenceTransformer
from typing import List, Dict, Any, Tuple

# --- Configuration (same as above) ---
CHROMA_DB_PATH = "chroma_data/"
EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"

model = SentenceTransformer(EMBEDDING_MODEL_NAME)
client = chromadb.PersistentClient(path=CHROMA_DB_PATH)
collection = client.get_or_create_collection("mini-rag-docs")

def calculate_hit_rate(
    test_set: List[Tuple[str, List[str]]], # List of (query, [expected_doc_ids])
    top_k: int = 3
) -> float:
    """
    Calculates the hit rate for retrieval: how many queries retrieve at least one
    expected relevant document in the top K.
    """
    hits = 0
    for query, expected_ids in test_set:
        query_embedding = model.encode([query]).tolist()
        results = collection.query(
            query_embeddings=query_embedding,
            n_results=top_k,
            include=['ids']
        )
        
        retrieved_ids = results['ids'][0] if results and results['ids'] else []
        
        # Check if any of the expected IDs are in the retrieved IDs
        if any(expected_id in retrieved_ids for expected_id in expected_ids):
            hits += 1
            
    hit_rate = hits / len(test_set)
    print(f"Calculated Hit Rate @{top_k}: {hit_rate:.2f} ({hits}/{len(test_set)} queries were hits)")
    return hit_rate

# --- Example Usage (requires ChromaDB to be populated) ---
if __name__ == "__main__":
    # Define a small test set with queries and their expected relevant document IDs
    # (These IDs would come from your ingest script's output, e.g., 'demo.txt-chunk-0')
    test_data = [
        ("Why is the sky blue?", ["demo.txt-chunk-0"]), # Assuming demo.txt has sky info
        ("How do plants make food?", ["biology.txt-chunk-0"]), # Assuming biology.txt has plant info
        ("What is a language model?", ["ai_book.txt-chunk-0"]) # Hypothetical doc for LLM def
    ]
    # NOTE: You will need to create 'ai_book.txt' in your data/ folder
    #       and run ingest_script.py before running this example.
    
    # Placeholder for a hypothetical doc in data/ai_book.txt
    # with open("data/ai_book.txt", "w") as f:
    #     f.write("A large language model is a type of AI program...")

    # Calculate hit rate with top 1 result
    hit_rate_at_1 = calculate_hit_rate(test_data, top_k=1)
    
    # Calculate hit rate with top 3 results
    hit_rate_at_3 = calculate_hit_rate(test_data, top_k=3)
```

---

:::warning[Limitations of Quick Evaluation]
These methods are great for quick sanity checks but do not replace comprehensive evaluation.
-   **Subjectivity**: Manual inspection is subjective and not scalable.
-   **Incompleteness**: Hit rate only tells you if *any* relevant document was found, not if *all* were, or if irrelevant ones were also highly ranked.

For production, consider using automated evaluation metrics for RAG (e.g., Precision, Recall, NDCG, Context Relevancy, Faithfulness).
:::