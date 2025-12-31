---
title: "RAG Pipeline Configuration Example"
archetype: "template"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["configuration", "rag", "template", "json"]
last_reviewed: "2025-12-31"
---

# RAG Pipeline Configuration Example

This template provides a structured JSON file to configure all components of a Retrieval-Augmented Generation (RAG) pipeline. Separating your RAG configuration from your code allows for easier experimentation with different chunking strategies, embedding models, and retrieval parameters without code changes.

:::info[The Goal: Flexible RAG Pipeline Management]
The objective is to define your RAG pipeline's behavior declaratively, enabling quick iteration on performance, cost, and output quality by simply updating a configuration file.
:::

---

## Template: `rag_pipeline_config.json`

```json
{
  "pipeline_name": "MyDocumentQAPipeline",
  "description": "Configuration for a RAG pipeline answering questions over a document set.",
  "data_sources": [
    {
      "type": "directory",
      "path": "./data/knowledge_base_docs",
      "include_patterns": ["*.txt", "*.md", "*.pdf"],
      "exclude_patterns": ["*.tmp", "*.bak"]
    },
    {
      "type": "web_url",
      "url": "https://example.com/faq.html",
      "parser": "html_to_text"
    }
  ],
  "chunking_strategy": {
    "type": "RecursiveCharacterTextSplitter",
    "chunk_size": 1000,
    "chunk_overlap": 200,
    "separators": ["\n\n", "\n", " ", ""]
  },
  "embedding_model": {
    "provider": "ollama",
    "model_name": "nomic-embed-text",
    "api_endpoint": "http://localhost:11434/api/embeddings"
  },
  "vector_store": {
    "type": "chromadb",
    "path": "./chroma_data/my_rag_collection",
    "collection_name": "rag_document_chunks"
  },
  "retrieval": {
    "top_k_chunks": 5,
    "reranker": {
      "enabled": true,
      "model_name": "cross-encoder/ms-marco-MiniLM-L-6-v2",
      "top_n_reranked": 3
    }
  },
  "generation_llm": {
    "provider": "ollama",
    "model_name": "llama3",
    "api_endpoint": "http://localhost:11434/v1/chat/completions",
    "temperature": 0.2,
    "max_tokens": 500,
    "system_prompt": "You are a helpful assistant. Answer the user\'s question based SOLELY on the provided documents. Cite sources where appropriate."
  }
}
```

---

## How to Use

1.  **Save**: Save this content as `rag_pipeline_config.json` (or similar name) in your project.
2.  **Customize**: Adjust the parameters for data sources, chunking, embedding model, vector store, retrieval, and generation LLM to match your specific RAG setup.
3.  **Load in Code**: In your Python application, load this JSON file using the `json` module.
    ```python
    import json
    # with open("rag_pipeline_config.json", 'r') as f:
    #     rag_config = json.load(f)
    # Then use rag_config dictionary to initialize your RAG components.
    ```
4.  **Integrate**: Use the loaded configuration to dynamically build and run your RAG pipeline.

---

:::tip[Modular Configuration]
For very complex RAG systems, you might break this into multiple JSON files (e.g., `chunking_config.json`, `retrieval_config.json`) and combine them in your main application logic.
:::

:::warning[Security of API Endpoints]
If your embedding or generation LLM API endpoint is exposed externally, ensure it's properly secured and authenticated. For local development, `http://localhost` is generally safe.
:::
