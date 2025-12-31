---
title: "Retrieve and Cite for RAG"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["rag", "retrieval", "citation", "prompt-engineering"]
last_reviewed: "2025-12-31"
---

# Retrieve and Cite for RAG

Retrieval-Augmented Generation (RAG) is a powerful technique to ground LLM responses in external, up-to-date, or proprietary knowledge. This guide demonstrates how to retrieve relevant document chunks from your vector store and then instruct the LLM to use this context to answer questions, complete with citations.

:::info[The Goal: Grounded and Verifiable Answers]
The objective is to reduce LLM hallucinations and provide verifiable answers by ensuring the model's response is directly supported by the retrieved factual context. Citations build user trust.
:::

---

## 1. Installation

We'll continue using `chromadb` for our vector store and `sentence-transformers` for embeddings. Make sure you've also run the [Ingest, Chunk, and Embed](./ingest-chunk-embed.md) script to populate your ChromaDB collection.

```bash
pip install chromadb sentence-transformers
```

---

## 2. Code Example: Retrieve, Augment, and Prompt for Citation

This script queries the ChromaDB collection with a user question, retrieves the most relevant document chunks, and then constructs a prompt for an LLM, instructing it to answer based *only* on the provided context and to *cite* its sources.

```python
import chromadb
from sentence_transformers import SentenceTransformer
from typing import List, Dict, Any, Optional

# --- Configuration ---
CHROMA_DB_PATH = "chroma_data/" # Path where your ChromaDB is stored (from ingest-chunk-embed.md)
EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"

# --- Initialize Components ---
model = SentenceTransformer(EMBEDDING_MODEL_NAME)
client = chromadb.PersistentClient(path=CHROMA_DB_PATH)
collection = client.get_or_create_collection("mini-rag-docs")

# --- Dummy LLM Client (Replace with your actual client, e.g., OpenAI, Ollama) ---
def call_llm(messages: List[Dict[str, str]], temperature: float = 0.0) -> str:
    """
    Simulates an LLM API call.
    In a real app, replace this with your actual LLM client.
    """
    print("\n--- Simulating LLM Call ---")
    print(f"System Prompt: {messages[0]['content'][:100]}...") # First message is system prompt
    print(f"User Question: {messages[-1]['content']}") # Last message is user question
    print("Retrieved Context:")
    for msg in messages:
        if msg["role"] == "system" and "Here are the search results" in msg["content"]:
            print(msg["content"])
    
    # Simulate an answer based on provided context
    if "Rayleigh scattering" in messages[0]["content"] and "sky" in messages[-1]["content"]:
        return "The sky appears blue due to Rayleigh scattering, which causes shorter blue wavelengths of light to be scattered more efficiently than longer red wavelengths. [Source: demo.txt]"
    elif "photosynthesis" in messages[0]["content"] and "plants" in messages[-1]["content"]:
        return "Plants use photosynthesis to convert light energy into chemical energy, creating their own food. [Source: biology.txt]"
    else:
        return "Based on the provided information, I cannot answer that question."


def retrieve_and_augment(user_question: str, top_k: int = 3) -> str:
    """
    Retrieves relevant documents, augments the prompt, and calls the LLM.
    """
    # 1. Embed the user's question
    query_embedding = model.encode([user_question]).tolist()

    # 2. Retrieve top_k relevant documents from the vector store
    results = collection.query(
        query_embeddings=query_embedding,
        n_results=top_k,
        include=['documents', 'metadatas'] # Ensure we get content and metadata
    )
    
    retrieved_chunks = []
    if results and results['documents'] and results['documents'][0]:
        for i, doc_content in enumerate(results['documents'][0]):
            metadata = results['metadatas'][0][i]
            # Format chunks with their source for LLM citation
            retrieved_chunks.append(f"<document source='{metadata.get('source', 'unknown')}'>\n{doc_content}\n</document>")
    
    # 3. Construct the LLM prompt (Augmentation)
    system_instruction = """
    You are a helpful assistant. Answer the user's question based SOLELY on the provided search results.
    If the answer is not found in the search results, state that you cannot answer the question based on the provided information.
    Cite your sources by referring to the <document source='filename'> tag (e.g., [Source: filename.txt]).
    """

    # Combine system instruction, retrieved context, and user question
    # Prioritize instructions and user question for better model attention
    # (as per message-priority-and-ordering.md)
    messages = [
        {"role": "system", "content": system_instruction},
    ]

    if retrieved_chunks:
        # Put retrieved context early in the prompt
        context_message = f"Here are the search results to use:\n{''.join(retrieved_chunks)}"
        messages.append({"role": "system", "content": context_message})
    else:
        # If no context, instruct model it has no information
        messages.append({"role": "system", "content": "No relevant documents were found to answer the question."})

    messages.append({"role": "user", "content": user_question})

    # 4. Call the LLM with the augmented prompt
    llm_response = call_llm(messages)
    
    return llm_response

# --- Example Usage ---
if __name__ == "__main__":
    # Ensure you have data ingested by running ingest-chunk-embed.md first!
    
    question_1 = "Why is the sky blue according to the documents?"
    answer_1 = retrieve_and_augment(question_1)
    print("\n--- Answer 1 ---")
    print(answer_1)

    question_2 = "How do plants make food?"
    answer_2 = retrieve_and_augment(question_2)
    print("\n--- Answer 2 ---")
    print(answer_2)

    question_3 = "What is the capital of France?"
    answer_3 = retrieve_and_augment(question_3)
    print("\n--- Answer 3 ---")
    print(answer_3)
```

---

## 3. How to Run

1.  **Ensure data is ingested**: First, run the `ingest_script.py` (from [Ingest, Chunk, and Embed](./ingest-chunk-embed.md)) to populate your `chroma_data/` directory.
2.  **Save the Python script**: Save the code above as `rag_query.py`.
3.  **Execute**:
    ```bash
    python rag_query.py
    ```

You should see output from the simulated LLM, including answers and citations based on the documents you ingested.

---

:::tip[Handling Noisy or Missing Retrieval]
If no relevant documents are retrieved (`retrieved_chunks` is empty), ensure your system prompt explicitly instructs the LLM to state that it cannot answer based on the provided information, rather than hallucinating.
:::
