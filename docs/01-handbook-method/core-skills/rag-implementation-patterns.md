---
sidebar_label: 'RAG Patterns'
title: 'RAG Implementation Patterns'
---

# Retrieval-Augmented Generation (RAG)

Retrieval-Augmented Generation (RAG) is a powerful technique for building LLM applications that can reason about and answer questions over private or real-time data. It enhances a Large Language Model by retrieving relevant information from an external knowledge source and providing it to the model as context within the prompt.

RAG is a core skill for building sophisticated AI applications. For a basic overview, refer to the [Core Skills Introduction](/docs/01-handbook-method/core-skills).

## Why Use RAG?

1.  **Access to External Knowledge:** LLMs only know what they learned during training. RAG allows them to access up-to-date, proprietary, or specific information that was not in their training data.
2.  **Reduces Hallucinations:** By grounding the model's response in factual, retrieved documents, RAG significantly reduces the likelihood that the model will "hallucinate" or make up incorrect information.
3.  **Provides Citations:** Because the model's response is based on specific documents, you can cite the sources, allowing users to verify the information. This builds trust and transparency.

## The High-Level RAG Process

The RAG process can be broken down into two main stages: **Indexing** (done offline) and **Retrieval/Generation** (done at runtime).

```mermaid
graph TD
    subgraph Indexing Pipeline (Offline)
        A[Load Documents] --> B(Chunk Documents);
        B --> C(Embed Chunks);
        C --> D[Store in Vector DB];
    end

    subgraph Retrieval Pipeline (Online)
        E[User Query] --> F(Embed Query);
        F --> G{Search Vector DB};
        D --> G;
        G --> H[Retrieve Relevant Chunks];
        H --> I(Augment Prompt);
        E --> I;
        I --> J{LLM Generate};
        J --> K[Final Answer];
    end

    style D fill:#cde4ff
    style J fill:#baffc9
```

### 1. Indexing (Offline)

The first step is to prepare your knowledge base so that it can be searched efficiently.

1.  **Load:** Your documents (e.g., PDFs, Markdown files, web pages) are loaded into memory.
2.  **Chunk:** The documents are split into smaller, more manageable chunks. This is important because you want to retrieve only the most relevant snippets of information for a given query. A chunk might be a paragraph or a few paragraphs.
3.  **Embed:** Each chunk is passed through an **embedding model**, which is a neural network that converts the text into a numerical vector (an "embedding"). This vector captures the semantic meaning of the text.
4.  **Store:** The embeddings (and their corresponding text chunks) are loaded into a specialized **vector database** (or vector index). This database is optimized for finding the most similar vectors for a given query vector.

:::tip[Your Chunking Strategy is Critical]
The way you chunk your documents can have a huge impact on RAG performance. If your chunks are too small, they may not have enough context. If they are too large, you might introduce too much noise into the prompt. Experimenting with different chunk sizes and overlap strategies is a key part of optimizing a RAG system.
:::

### 2. Retrieval and Generation (Runtime)

This is what happens when a user submits a query to your application.

1.  **Embed Query:** The user's query is converted into an embedding using the same embedding model from the indexing stage.
2.  **Retrieve:** The vector database is searched to find the `k` most similar document chunk embeddings to the user's query embedding. The corresponding text chunks are retrieved.
3.  **Augment:** The retrieved text chunks are formatted and added to the prompt that will be sent to the LLM. A common prompt structure looks like this:

    ```text
    Use the following context to answer the user's question. If you don't know the answer, just say that you don't know.

    Context:
    ---
    [... content of retrieved chunk 1 ...]
    ---
    [... content of retrieved chunk 2 ...]
    ---

    Question: [User's original query]

    Answer:
    ```
4.  **Generate:** The augmented prompt is sent to the LLM, which generates a response that is grounded in the provided context.

## Common RAG Patterns

-   **Basic RAG:** The standard process described above. It's effective for many question-answering tasks.
-   **Sentence-Window Retrieval:** Documents are chunked into individual sentences for embedding, but the retrieved context includes the full sentences before and after the matched sentence (a "window"). This provides more context while still allowing for very specific retrieval.
-   **Auto-Merging Retrieval:** Documents are chunked hierarchically (e.g., into paragraphs and then into sections). If the retrieved chunks are mostly from the same parent document, the system "merges" them and retrieves the larger parent chunk, providing the LLM with more holistic context.

## Next Steps

While Basic RAG is incredibly powerful, advanced RAG systems often involve fine-tuning components of the pipeline for even better performance.

- **[Fine-Tuning Walkthrough](./fine-tuning-walkthrough.md):** Learn how you can fine-tune the embedding or ranking models within your RAG pipeline to improve retrieval quality.
