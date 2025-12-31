---
title: "RAG Mini"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["rag", "retrieval", "augmentation", "index"]
last_reviewed: "2025-12-31"
---

# RAG Mini

Retrieval-Augmented Generation (RAG) is a powerful technique that allows Large Language Models to access external, up-to-date, and domain-specific information, thereby reducing hallucinations and grounding responses in verifiable facts. This section provides a "mini-RAG" blueprint, covering the essential components and workflows to build a basic RAG system.

:::info[Goal: Grounded LLM Responses]
The objective is to equip you with the knowledge and code examples to build a functional RAG system that augments LLM responses with relevant, retrieved information from your own knowledge base.
:::

## Guides and Snippets

-   [**Ingest, Chunk, and Embed for RAG**](./ingest-chunk-embed.md): The foundational step. Learn how to load your documents, break them into manageable chunks, and convert those chunks into numerical vector embeddings.

-   [**Local Vector Store Options**](./local-vector-store-options.md): Explore various local databases (like FAISS and ChromaDB) designed to efficiently store and search your high-dimensional vector embeddings, with practical Python examples.

-   [**Retrieve and Cite for RAG**](./retrieve-and-cite.md): Understand the core RAG loop. This guide demonstrates how to query your vector store, augment the LLM's prompt with retrieved context, and instruct the LLM to cite its sources.

-   [**Minimal Reranking for RAG**](./rerank-minimal.md): Improve the precision of your retrieved documents. Learn how reranking refines initial search results, ensuring the LLM receives the most relevant information.

-   [**Common RAG Failure Modes and Troubleshooting**](./rag-failure-modes.md): Diagnose and fix issues in your RAG system. This guide outlines common problems (e.g., bad chunks, poor retrieval) and provides practical troubleshooting steps.

:::tip[Building Your First RAG System]
Start by preparing your data with **[Ingest, Chunk, and Embed]** and choosing a **[Local Vector Store]**. Then, implement the core **[Retrieve and Cite]** loop. If your results aren't precise enough, consider **[Minimal Reranking]**. Finally, use **[RAG Failure Modes]** to debug and refine your system.
:::