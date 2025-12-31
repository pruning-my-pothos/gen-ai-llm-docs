---
title: "Vector Database Cheatsheet"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["vector-db", "rag", "embeddings", "cheatsheet"]
last_reviewed: "2025-12-31"
---

# Vector Database Cheatsheet

Vector databases are specialized systems designed to store and efficiently search high-dimensional vector embeddings, making them a cornerstone of modern RAG (Retrieval-Augmented Generation) and semantic search applications. This cheatsheet provides an overview of common types and options for storing your embeddings.

:::info[The Goal: Scalable Semantic Search]
The objective of a vector database is to enable fast and accurate retrieval of semantically similar information from vast datasets, powering intelligent applications that understand context and meaning.
:::

---

## Types of Vector Databases and Their Use Cases

### 1. In-Memory Indexes (e.g., FAISS)

These libraries provide extremely fast similarity search for vectors but do not inherently offer persistence or rich querying capabilities.

-   **Pros**: Lightning-fast for pure vector search, highly optimized for performance (CPU/GPU).
-   **Cons**: Non-persistent (data is lost on restart unless manually saved/loaded), no metadata filtering out-of-the-box.
-   **Use Cases**: Small, ephemeral datasets, pure research/benchmarking, when vector search is integrated into a larger system managing persistence and metadata.
-   **Example**: FAISS (see [Local Vector Store Options](../10-rag-mini/local-vector-store-options.md))

### 2. Local Persistent Vector Stores (e.g., ChromaDB, LanceDB)

These are standalone, file-based vector databases that offer persistence and often basic metadata filtering. They are excellent for local development, prototyping, and smaller-scale deployments.

-   **Pros**: Easy to set up and use, supports persistence to disk, often includes metadata filtering, good for local RAG.
-   **Cons**: Limited scalability compared to cloud-native solutions, performance might not match highly optimized in-memory indexes for raw vector search.
-   **Use Cases**: Local RAG development, small-to-medium knowledge bases, embedding caching, edge deployments.
-   **Example**: ChromaDB (see [Local Vector Store Options](../10-rag-mini/local-vector-store-options.md)), [LanceDB](https://lancedb.com/)

### 3. Managed Cloud-Native Vector Databases (e.g., Pinecone, Weaviate, Qdrant Cloud, Milvus Cloud, Google Cloud Vector Search)

These are fully managed services designed for production-grade, large-scale RAG systems. They handle infrastructure, scaling, and high availability.

-   **Pros**: Highly scalable (billions of vectors), high-performance, rich features (metadata filtering, hybrid search, real-time updates), managed by cloud providers/vendors.
-   **Cons**: Higher cost, potential vendor lock-in, more complex to integrate than local options.
-   **Use Cases**: Production RAG systems, large-scale semantic search, complex recommendation engines, multi-modal search.
-   **Example**: [Pinecone](https://www.pinecone.io/), [Weaviate Cloud](https://cloud.weaviate.io/), [Qdrant Cloud](https://qdrant.tech/cloud/)

### 4. Vector Capabilities in Traditional Databases (e.g., PgVector for PostgreSQL, Redis Stack)

Many traditional relational or NoSQL databases are adding native support for vector embeddings and similarity search.

-   **Pros**: Leverage existing database infrastructure, simpler deployment if already using the DB, can query vectors alongside structured data.
-   **Cons**: Performance might not be as optimized as dedicated vector databases, scalability can be limited by the underlying DB's vector capabilities.
-   **Use Cases**: When you already use the traditional database, small-to-medium scale RAG, simpler deployments where a separate vector DB is overkill.
-   **Example**: [PgVector](https://github.com/pgvector/pgvector), [Redis Stack](https://redis.com/solutions/use-cases/vector-database/)

---

## Key Selection Factors

When choosing a vector database, consider:

-   **Scale**: How many vectors do you expect to store (millions, billions)?
-   **Performance**: What is your query latency requirement (milliseconds, seconds)?
-   **Cost**: What's your budget for infrastructure and operations?
-   **Features**: Do you need metadata filtering, hybrid search, real-time updates, multi-tenancy?
-   **Deployment**: Do you prefer self-managed, managed cloud, or a serverless option?

:::tip[Start Simple, Scale Up]
For most local development and prototyping, a local persistent store like ChromaDB is an excellent starting point. As your application grows and demands increase, you can then evaluate and migrate to more scalable solutions.
:::

:::warning[Vendor Lock-in]
Be mindful of vendor lock-in when choosing a managed cloud-native solution. While convenient, migrating data and logic between different platforms can be challenging.
:::
