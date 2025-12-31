---
title: "Minimal Retrieval Evaluation"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["evaluation", "rag", "retrieval", "metrics"]
last_reviewed: "2025-12-31"
---

# Minimal Retrieval Evaluation

For a RAG system to be effective, its retrieval component must consistently fetch relevant documents. While manual inspection is crucial, automated metrics allow for more scalable and objective evaluation. This guide demonstrates how to calculate basic retrieval metrics like Hit Rate and Mean Reciprocal Rank (MRR) using a [golden prompts set](./golden-prompts-set.md).

:::info[The Goal: Quantifying Retrieval Performance]
The objective is to objectively measure how well your vector store and retrieval strategy identify and rank the relevant documents for a given query, providing a numerical score for comparison and improvement.
:::

---

## The Problem: Scalable Relevance

Manually checking retrieved documents for every query is not feasible for large test sets. Automated metrics provide a quick, programmatic way to gauge relevance.

---

## 1. Setup: Golden Prompts with Relevant Document IDs

To automate retrieval evaluation, your [golden prompts set](./golden-prompts-set.md) must include the IDs of the documents that are considered "relevant" for each question.

```jsonl
# golden_prompts_retrieval.jsonl

{"id": "q1", "question": "Why is the sky blue?", "expected_relevant_doc_ids": ["demo.txt-chunk-0", "wiki-sky-color-chunk-1"]}
{"id": "q2", "question": "What is photosynthesis?", "expected_relevant_doc_ids": ["biology.txt-chunk-0"]}
{"id": "q3", "question": "Tell me about large language models.", "expected_relevant_doc_ids": ["ai_book.txt-chunk-0", "llm-basics-chunk-2"]}
{"id": "q4", "question": "Who invented the lightbulb?", "expected_relevant_doc_ids": []} # No relevant docs in our small set
```

---

## 2. Retrieval Evaluation Metrics

### a. Hit Rate (`Hit@K`)

-   **Definition**: The percentage of queries for which at least one relevant document is found within the top `K` retrieved results.
-   **Interpretation**: A higher hit rate means your retriever is generally finding *some* relevant information.

### b. Mean Reciprocal Rank (`MRR`)

-   **Definition**: The average of the reciprocal ranks of the first relevant document for each query.
    -   If the first relevant document is at rank 1, reciprocal rank = 1/1 = 1.
    -   If at rank 2, reciprocal rank = 1/2 = 0.5.
    -   If no relevant document is found, reciprocal rank = 0.
-   **Interpretation**: MRR emphasizes finding relevant documents *higher* in the search results. A higher MRR indicates better ranking.

---

## 3. Python Script for Retrieval Evaluation

This script uses ChromaDB (assuming it's populated from [Ingest, Chunk, and Embed](../10-rag-mini/ingest-chunk-embed.md)) and calculates `Hit@K` and `MRR`.

```python
import json
import chromadb
from sentence_transformers import SentenceTransformer
from typing import List, Dict, Any, Tuple
import numpy as np

# --- Configuration ---
CHROMA_DB_PATH = "chroma_data/"
EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"
TOP_K_RETRIEVAL = 5 # Number of documents to retrieve for evaluation

# --- Initialize Components ---
model = SentenceTransformer(EMBEDDING_MODEL_NAME)
client = chromadb.PersistentClient(path=CHROMA_DB_PATH)
collection = client.get_or_create_collection("mini-rag-docs")

def load_golden_set_with_retrieval_data(filepath: str) -> List[Dict[str, Any]]:
    """Loads a golden prompts set from a JSONL file with expected_relevant_doc_ids."""
    golden_set = []
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            golden_set.append(json.loads(line.strip()))
    return golden_set

def evaluate_retrieval(
    golden_set_filepath: str,
    top_k: int = TOP_K_RETRIEVAL
) -> Dict[str, float]:
    """
    Evaluates retrieval performance using Hit@K and MRR metrics.
    """
    golden_set = load_golden_set_with_retrieval_data(golden_set_filepath)
    
    total_queries = len(golden_set)
    hits_at_k = 0
    reciprocal_ranks = []
    
    if total_queries == 0:
        return {"hit_rate": 0.0, "mrr": 0.0}

    for item in golden_set:
        query_text = item['question']
        expected_relevant_ids = set(item.get('expected_relevant_doc_ids', []))
        
        if not expected_relevant_ids:
            # Skip queries without expected relevant docs for these metrics
            total_queries -= 1
            continue

        query_embedding = model.encode([query_text]).tolist()
        results = collection.query(
            query_embeddings=query_embedding,
            n_results=top_k,
            include=['ids']
        )
        
        retrieved_ids = results['ids'][0] if results and results['ids'] else []
        
        # Calculate Hit@K
        if any(doc_id in expected_relevant_ids for doc_id in retrieved_ids):
            hits_at_k += 1
        
        # Calculate Reciprocal Rank
        rr = 0
        for rank, doc_id in enumerate(retrieved_ids):
            if doc_id in expected_relevant_ids:
                rr = 1.0 / (rank + 1)
                break
        reciprocal_ranks.append(rr)

    hit_rate = hits_at_k / total_queries if total_queries > 0 else 0.0
    mrr = np.mean(reciprocal_ranks) if reciprocal_ranks else 0.0

    return {"hit_rate": hit_rate, "mrr": mrr}


if __name__ == "__main__":
    # Ensure golden_prompts_retrieval.jsonl exists or create a dummy one
    try:
        with open("golden_prompts_retrieval.jsonl", "r", encoding="utf-8") as f:
            pass
    except FileNotFoundError:
        print("golden_prompts_retrieval.jsonl not found. Creating a dummy one.")
        with open("golden_prompts_retrieval.jsonl", "w", encoding="utf-8") as f:
            f.write('{"id": "q1", "question": "Why is the sky blue?", "expected_relevant_doc_ids": ["demo.txt-chunk-0"]}\n') # Assuming demo.txt has sky info
            f.write('{"id": "q2", "question": "How do plants make food?", "expected_relevant_doc_ids": ["biology.txt-chunk-0"]}\n') # Assuming biology.txt has plant info
            f.write('{"id": "q3", "question": "Tell me about large language models.", "expected_relevant_doc_ids": ["ai_book.txt-chunk-0"]}\n') # Hypothetical doc for LLM def
            f.write('{"id": "q4", "question": "Who invented the lightbulb?", "expected_relevant_doc_ids": []}\n') # No relevant docs in our small set

    # NOTE: Ensure your ChromaDB is populated with these expected_relevant_doc_ids
    # from running ingest-chunk-embed.md for this to work correctly.

    retrieval_metrics = evaluate_retrieval(
        golden_set_filepath="golden_prompts_retrieval.jsonl",
        top_k=TOP_K_RETRIEVAL
    )

    print("\n--- Retrieval Evaluation Results ---")
    print(f"Hit Rate @{TOP_K_RETRIEVAL}: {retrieval_metrics['hit_rate']:.2f}")
    print(f"MRR: {retrieval_metrics['mrr']:.2f}")
```

---

:::tip[Tuning for Retrieval]
If your retrieval metrics are low, consider:
-   **Embedding Model**: Try a different embedding model that might be better suited for your domain.
-   **Chunking Strategy**: Adjust `CHUNK_SIZE` and `CHUNK_OVERLAP` in your ingestion pipeline.
-   **Reranking**: Add a reranking step ([Minimal Reranking](../10-rag-mini/rerank-minimal.md)) to improve precision.
:::

:::warning[Limitations of Simplified Metrics]
These simplified metrics (Hit Rate, MRR) provide a good starting point. For comprehensive, production-grade RAG evaluation, consider using advanced frameworks like [RAGAS](https://docs.ragas.io/en/latest/) or LlamaIndex's evaluation modules, which assess aspects like context relevance, faithfulness, and answer correctness.
:::
