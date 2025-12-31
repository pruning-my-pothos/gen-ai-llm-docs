---
title: "Embeddings & Vector Operations"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["embeddings", "vector-ops", "rag", "index"]
last_reviewed: "2025-12-31"
---

# Embeddings & Vector Operations

Vector embeddings are the numerical representations of text that capture semantic meaning, forming the bedrock of modern Retrieval-Augmented Generation (RAG) systems, semantic search, and recommendation engines. This section delves into how to generate, compare, and store these crucial data structures.

:::info[Goal: Understanding Semantic Space]
The objective is to provide a foundational understanding of embeddings and the operations performed on them, enabling you to effectively build and evaluate semantic search and RAG capabilities.
:::

## Guides and Snippets

-   [**Generating Local Embeddings with Ollama**](./embeddings-local-ollama.md): Learn how to convert text into high-dimensional vectors locally using Ollama, offering benefits in privacy, cost, and latency.

-   [**Similarity Metrics for Vector Embeddings**](./similarity-metrics.md): Explore the mathematical foundations of comparing vectors, focusing on Cosine Similarity and Euclidean Distance, and understand when to use each.

-   [**Vector Database Cheatsheet**](./vector-db-cheatsheet.md): An overview of various options for storing and searching vector embeddings, from in-memory indexes and local persistent stores to managed cloud solutions and vector capabilities in traditional databases.

-   [**Quick Evaluation of Retrieval Quality**](./quick-eval-retrieval-quality.md): Learn practical, manual methods for quickly assessing if your RAG system is retrieving the most relevant documents for a given query.

:::tip[Building Blocks of RAG]
Embeddings and vector operations are core components of RAG. Start by understanding **[Generating Local Embeddings]**, then delve into **[Similarity Metrics]** to understand how vectors are compared. Explore the **[Vector Database Cheatsheet]** to choose where to store them, and finally, use **[Quick Evaluation]** to validate your retrieval.
:::