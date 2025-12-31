---
title: "Similarity Metrics for Vector Embeddings"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.1.0"
tags: ["embeddings", "vector-ops", "similarity", "cosine", "euclidean"]
last_reviewed: "2025-12-31"
---

# Similarity Metrics for Vector Embeddings

Vector embeddings represent text (or other data) as points in a high-dimensional space. To perform semantic search and find related information, you need a way to measure the "closeness" or "similarity" between these vectors. This guide explains the most common metrics used for this purpose.

:::info[The Goal: Quantifying Semantic Closeness]
The objective is to translate the intuitive idea of "how related two pieces of text are" into a precise numerical value by measuring the distance or angle between their respective embeddings.
:::

---

## 1. Cosine Similarity

Cosine similarity measures the cosine of the angle between two vectors. It determines if two vectors are pointing in roughly the same direction. It is the most commonly used metric for text embeddings because it focuses on the orientation of the vectors, not their magnitude.

-   **Interpretation**:
    -   `1`: Identical direction (perfectly similar).
    -   `0`: Orthogonal (no similarity).
    -   `-1`: Exactly opposite direction (perfectly dissimilar).
-   **Range**: For normalized vectors (magnitude = 1), the range is typically `[-1, 1]`. For most text embeddings, it will be `[0, 1]` because embeddings are usually not diametrically opposed.

### Python Code: Cosine Similarity

```python
import numpy as np
from typing import List

def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    """
    Calculates the cosine similarity between two vectors.
    """
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    
    # Compute dot product
    dot_product = np.dot(vec1, vec2)
    
    # Compute magnitudes
    magnitude1 = np.linalg.norm(vec1)
    magnitude2 = np.linalg.norm(vec2)
    
    # Avoid division by zero
    if magnitude1 == 0 or magnitude2 == 0:
        return 0.0
        
    return dot_product / (magnitude1 * magnitude2)

# --- Example Usage ---
# Simple 2D vectors
v1 = [1, 1] # Points along 45 degrees
v2 = [2, 2] # Points along 45 degrees (same direction)
v3 = [1, 0] # Points along x-axis
v4 = [-1, 0] # Points along negative x-axis (opposite direction)

print(f"Cosine Similarity (v1, v2): {cosine_similarity(v1, v2):.4f}") # Should be 1.0
print(f"Cosine Similarity (v1, v3): {cosine_similarity(v1, v3):.4f}") # Should be around 0.707
print(f"Cosine Similarity (v3, v4): {cosine_similarity(v3, v4):.4f}") # Should be -1.0

# Using text embeddings (conceptual, actual values would be higher dim)
emb_apple_fruit = [0.8, 0.2, 0.1]
emb_apple_company = [0.1, 0.7, 0.3]
emb_orange_fruit = [0.7, 0.3, 0.15]

print(f"Cosine Similarity (apple_fruit, orange_fruit): {cosine_similarity(emb_apple_fruit, emb_orange_fruit):.4f}")
print(f"Cosine Similarity (apple_fruit, apple_company): {cosine_similarity(emb_apple_fruit, emb_apple_company):.4f}")
```

---

## 2. Euclidean Distance (L2 Distance)

Euclidean distance measures the straight-line distance between two points (vectors) in space.

-   **Interpretation**:
    -   `0`: Identical vectors (points are at the same location).
    -   Larger values: Greater dissimilarity.
-   **Range**: `[0, infinity)`.

### Python Code: Euclidean Distance

```python
import numpy as np
from typing import List

def euclidean_distance(vec1: List[float], vec2: List[float]) -> float:
    """
    Calculates the Euclidean distance between two vectors.
    """
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    return np.linalg.norm(vec1 - vec2)

# --- Example Usage ---
# Simple 2D vectors
v1 = [1, 1]
v2 = [2, 2]
v3 = [1, 0]

print(f"Euclidean Distance (v1, v2): {euclidean_distance(v1, v2):.4f}") # sqrt( (2-1)^2 + (2-1)^2 ) = sqrt(2) approx 1.414
print(f"Euclidean Distance (v1, v3): {euclidean_distance(v1, v3):.4f}") # sqrt( (1-1)^2 + (1-0)^2 ) = sqrt(1) approx 1.0

# Using text embeddings (conceptual)
emb_cat = [0.9, 0.1, 0.0]
emb_kitten = [0.8, 0.2, 0.1]
emb_dog = [0.2, 0.8, 0.1]

print(f"Euclidean Distance (cat, kitten): {euclidean_distance(emb_cat, emb_kitten):.4f}")
print(f"Euclidean Distance (cat, dog): {euclidean_distance(emb_cat, emb_dog):.4f}")
```

---

## When to Use Which Metric?

-   **Cosine Similarity**:
    -   **Preferred for Text Embeddings**: Because text embeddings often capture semantic meaning primarily through direction, not magnitude.
    -   Use cases: Semantic search, recommendation systems, clustering topics.
-   **Euclidean Distance**:
    -   Can be sensitive to the magnitude of vectors. If your embedding model produces non-normalized vectors where magnitude holds meaning, it might be relevant.
    -   Use cases: Image recognition, anomaly detection where absolute distance matters.

:::tip[Vector Normalization]
Many popular embedding models (e.g., `all-MiniLM-L6-v2`) output **L2-normalized vectors** by default. When vectors are normalized, cosine similarity and Euclidean distance become directly related (a higher cosine similarity corresponds to a lower Euclidean distance). For normalized vectors, calculating cosine similarity is often simpler and more common.
:::