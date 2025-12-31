---
title: "Deduplication and Near-Duplicate Scanning"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["context-hygiene", "rag", "deduplication", "data-cleaning"]
last_reviewed: "2025-12-31"
---

# Deduplication and Near-Duplicate Scanning

In Retrieval-Augmented Generation (RAG), the quality of your retrieved context is paramount. Including identical or highly similar document chunks in your prompt wastes valuable context window space, increases cost and latency, and can confuse the model. This guide provides two strategies for cleaning up your retrieved context.

:::info[The Goal: Maximize Information Density]
The objective is to ensure every token in your context provides new, relevant information to the model. Deduplication is a critical step in achieving this.
:::

---

## Strategy 1: Exact Deduplication

This is the simplest form of cleanup. It removes chunks that are 100% identical, which can happen if your retrieval process pulls the same text from different sources.

We can implement this efficiently in Python using a `set` to keep track of seen documents.

```python
from typing import List

def deduplicate_exact(documents: List[str]) -> List[str]:
    """
    Removes exact duplicate documents from a list while preserving order.

    Args:
        documents: A list of strings, where each string is a document chunk.

    Returns:
        A list of unique document strings in their original order.
    """
    seen = set()
    unique_documents = []
    for doc in documents:
        if doc not in seen:
            seen.add(doc)
            unique_documents.append(doc)
    return unique_documents

# --- Example ---
retrieved_docs = [
    "The sky is blue due to Rayleigh scattering.",
    "Water is a liquid at room temperature.",
    "The sky is blue due to Rayleigh scattering.", # Exact duplicate
    "Photosynthesis is how plants make food."
]

unique_docs = deduplicate_exact(retrieved_docs)
print(unique_docs)
# Expected Output:
# [
#   'The sky is blue due to Rayleigh scattering.',
#   'Water is a liquid at room temperature.',
#   'Photosynthesis is how plants make food.'
# ]
```

---

## Strategy 2: Near-Duplicate Detection

Sometimes, retrieved chunks are not identical but are so similar that they add no new information. For example, one sentence might be slightly rephrased. We can detect and remove these "near-duplicates" by calculating a text similarity score.

### Installation

We will use the `rapidfuzz` library, which is a fast and easy-to-use text similarity calculator.

```bash
pip install rapidfuzz
```

### Implementation

This function compares each new document to the ones already accepted. If the similarity ratio is above a certain threshold, it's considered a near-duplicate and is discarded.

```python
from typing import List
from rapidfuzz import fuzz

def deduplicate_near(documents: List[str], threshold: int = 95) -> List[str]:
    """
    Removes near-duplicate documents from a list based on a similarity threshold.

    Args:
        documents: A list of document strings.
        threshold: The similarity ratio (0-100) above which a document
                   is considered a near-duplicate.

    Returns:
        A list of documents with near-duplicates removed.
    """
    unique_documents = []
    for doc in documents:
        is_near_duplicate = False
        for unique_doc in unique_documents:
            # Using token_set_ratio is good for catching rephrased sentences
            similarity = fuzz.token_set_ratio(doc, unique_doc)
            if similarity > threshold:
                is_near_duplicate = True
                break
        
        if not is_near_duplicate:
            unique_documents.append(doc)
            
    return unique_documents

# --- Example ---
retrieved_docs_with_near_duplicates = [
    "The sky appears blue because of a phenomenon called Rayleigh scattering.",
    "Water is a liquid when it is at room temperature.",
    "Because of Rayleigh scattering, the sky looks blue.", # Near-duplicate of the first doc
    "Photosynthesis is the process plants use to make their food."
]

# Use a slightly lower threshold to catch the rephrasing
near_duplicate_free_docs = deduplicate_near(retrieved_docs_with_near_duplicates, threshold=90)
print(near_duplicate_free_docs)
# Expected Output:
# [
#   'The sky appears blue because of a phenomenon called Rayleigh scattering.',
#   'Water is a liquid when it is at room temperature.',
#   'Photosynthesis is the process plants use to make their food.'
# ]
```

:::tip[Performance Considerations]
Exact deduplication is very fast. Near-duplicate detection is much more computationally expensive because it compares each document with every other document. For real-time applications, apply it only to a small number of retrieved chunks (e.g., the top 10) and use a fast library like `rapidfuzz`.
:::