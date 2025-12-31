---
title: "Common RAG Failure Modes and Troubleshooting"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["rag", "troubleshooting", "failure-modes", "debugging"]
last_reviewed: "2025-12-31"
---

# Common RAG Failure Modes and Troubleshooting

Retrieval-Augmented Generation (RAG) significantly enhances LLM capabilities, but it also introduces new complexities and potential points of failure. Understanding why a RAG system might perform poorly is crucial for effective debugging and building robust applications.

:::info[The Goal: Diagnosing and Fixing RAG Issues]
The objective is to equip you with a mental model for identifying common RAG system problems and a checklist for troubleshooting them, improving the reliability of your LLM applications.
:::

---

## Common Failure Modes

### 1. Bad Chunks (Garbage In)

-   **Problem**: Your documents are not chunked effectively. Chunks might be too large (diluting relevance) or too small (breaking up critical context).
-   **Symptoms**: LLM struggles to find specific information within a retrieved chunk, or the answer seems incomplete even if the relevant information is technically present.
-   **Troubleshooting**:
    -   Review your [Ingest, Chunk, and Embed](./ingest-chunk-embed.md) strategy.
    -   Experiment with different `CHUNK_SIZE` and `CHUNK_OVERLAP` values.
    -   Consider more advanced chunking methods (e.g., hierarchical chunking, semantic chunking).

### 2. Poor Retrieval (Bad Search)

-   **Problem**: Your vector search isn't returning the most relevant documents for a given query.
-   **Symptoms**: LLM hallucinates or says "I don't know" despite the correct information existing within your knowledge base. The retrieved documents shown to the LLM are clearly irrelevant.
-   **Troubleshooting**:
    -   Ensure your embedding model is appropriate for your domain and query types.
    -   Check the quality of your query embeddings.
    -   Adjust the `top_k` parameter in your vector search.
    -   Consider adding a [Minimal Reranking](./rerank-minimal.md) step to refine initial search results.
    -   Improve query formulation (e.g., using query expansion techniques).

### 3. Context Window Issues (Limited Attention)

-   **Problem**: The total prompt size (system prompt + RAG context + history + user question) exceeds the model's context window, or critical information is "lost in the middle."
-   **Symptoms**: LLM ignores parts of the RAG context, forgets conversational history, or provides incomplete answers.
-   **Troubleshooting**:
    -   Review [Context Window Basics](./../04-model-management/context-window-basics.md) and [Prompt Size Budgeting](./../05-token-counting/prompt-size-budgeting.md).
    -   Implement [Context Budget Enforcement](./../06-context-hygiene/context-budget-enforcement.md).
    -   Prioritize message components using [Message Priority and Ordering](./../06-context-hygiene/message-priority-and-ordering.md).

### 4. LLM Ignoring Context

-   **Problem**: The model prioritizes its internal parametric knowledge over the provided RAG context, even when the context is relevant.
-   **Symptoms**: Hallucinations, answers not grounded in the provided documents, or answers that seem generic despite specific context.
-   **Troubleshooting**:
    -   Strengthen your system prompt: "Answer SOLELY based on the provided documents." "DO NOT use your prior knowledge."
    -   Reduce `temperature` and `top_p` to make the LLM more focused ([Deterministic Settings](./../09-output-validation-and-guards/deterministic-settings.md)).
    -   Ensure retrieved documents are clearly formatted and easy for the LLM to parse (e.g., using XML tags).

### 5. LLM Misinterpreting Context

-   **Problem**: The LLM uses the provided context but misinterprets it, leading to incorrect or subtly wrong answers.
-   **Symptoms**: Answers are technically "grounded" but factually incorrect or draw wrong conclusions from the text.
-   **Troubleshooting**:
    -   Improve the coherence and clarity of your document chunks.
    -   Consider a more capable LLM or a different prompt engineering strategy.
    -   Add [Critique and Revise Loops](./../07-prompting-patterns/critique-and-revise-loop.md) for self-correction.

---

## RAG Debugging Checklist (Quick)

:::tip[Systematic Debugging]
Approach RAG debugging systematically. Start by verifying the initial inputs and gradually move to the LLM's final output.
:::

-   [ ] **Check Source Documents**: Are your original documents accurate and clean?
-   [ ] **Inspect Chunks**: Are the chunks meaningful? Too small? Too large?
    -   (Use a local script to print chunks from your ingested data).
-   [ ] **Verify Embeddings**: Are your query and document embeddings semantically close?
    -   (Perform a manual similarity search in your vector store).
-   [ ] **Review Retrieved Documents**: When a query fails, manually inspect the `top_k` documents your retriever pulls. Are they relevant?
-   [ ] **Examine Augmented Prompt**: Print the *exact* prompt (including system instructions, context, history, and user question) that is sent to the LLM. Does it make sense? Is the context clearly separated?
-   [ ] **Test LLM Alone**: Can the LLM answer the question correctly if you *manually* provide the relevant chunk? If so, the problem is likely retrieval. If not, the problem is likely the LLM or prompt.
-   [ ] **Adjust Parameters**: Experiment with `temperature`, `top_p` for the LLM, and `top_k` for retrieval/reranking.