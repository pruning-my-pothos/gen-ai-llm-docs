---
title: "Prompt Size Budgeting"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["tokens", "prompt-engineering", "context-window", "budgeting"]
last_reviewed: "2025-12-31"
---

# Prompt Size Budgeting

A model's context window is a finite resource. Prompt budgeting is the practice of strategically allocating space to the different parts of your prompt to ensure the most important information fits and you don't hit the model's limit.

:::info[A Balancing Act]
Think of your model's context window (e.g., 8,192 tokens) as a fixed budget. You must "spend" your tokens wisely across your system prompt, conversation history, retrieved documents, and the user's question, while leaving enough room for the model to generate a response.
:::

---

## Components of a Modern Prompt

A typical prompt for a RAG-powered chatbot consists of several parts:

-   **System Prompt**: Initial instructions that define the model's persona, capabilities, and constraints.
-   **Conversation History**: The last `N` turns of the conversation to provide short-term memory.
-   **Retrieved Context (RAG)**: The top `K` document chunks retrieved from a vector database that are relevant to the user's question.
-   **User's Current Question**: The actual query from the user.

---

## The Budgeting Process

### Step 1: Know Your Model's Limit

First, identify the total context window size of your model. This is your total budget. You can find this on the model's Hugging Face card or by using `ollama show`. Let's assume an **8,192 token limit** for our example.

### Step 2: Reserve Space for the Output

The model's generated answer consumes tokens from the same window. If you use up all the tokens in the prompt, the model has no room to "think." You must reserve a buffer for the output. A safe reservation is typically 1,000-2,000 tokens.

-   **Total Budget**: 8,192 tokens
-   **Output Reservation**: -1,500 tokens
-   **Available Prompt Budget**: **6,692 tokens**

### Step 3: Allocate Your Prompt Budget

Now, allocate the remaining tokens across the components of your prompt. Priority should be given to the most critical information.

#### Example Budget for an 8k Model

| Component | Example Budget | Priority | Notes |
| :--- | :--- | :--- | :--- |
| System Prompt | 300 tokens | High | Fixed instructions, persona. Should always be included. |
| Retrieved Context | 4,000 tokens | High | The most important retrieved document chunks for grounding the answer. |
| Chat History | 2,000 tokens | Medium | A summary of the conversation or the last N messages. |
| User Question | 392 tokens | Variable | Remaining buffer for the user's query. |
| **Output Buffer** | **1,500 tokens**| **Reserved** | **Room for the model's answer.** |
| **Total** | **8,192 tokens**| | |

---

## Strategies for Staying Under Budget

If your total prompt size exceeds your budget, you need to start trimming.

-   **Prioritize Ruthlessly**: The most valuable information for answering a specific question is usually the **Retrieved Context** and the **User's Question**. The chat history is often the first thing that can be trimmed.
-   **Summarize History**: Instead of including the full chat history, create a running summary of the conversation and include that instead.
-   **Reduce RAG Chunks**: If you are retrieving 5 document chunks, try reducing it to the top 3. This is often the most effective way to save a large number of tokens.
-   **Truncate Content**: The simplest, but crudest, method is to simply cut off the oldest messages or the least relevant document chunks once the token limit is reached.

:::tip[Implement Your Budget with a Token Counter]
This budgeting process isn't just theoretical. Before you construct your final prompt, you should use a token counting function to measure the size of each component.

Use the functions from the [Python](./token-count-python.md) or [Node.js](./token-count-node.md) token counting guides to check each part of your prompt and enforce your budget rules in code.
:::
