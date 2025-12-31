---
title: "Context Window Basics"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["models", "context-window", "tokens", "rag"]
last_reviewed: "2025-12-31"
---

# Context Window Basics

An LLM's context window is the amount of text it can "see" or "remember" at any given moment. Understanding this concept is critical for building effective and reliable AI applications.

:::info[The Model's Short-Term Memory]
Think of the context window as a model's short-term memory or attention span. Everything you send to the model—your system prompt, the user's question, any documents for context, and the history of the conversation—must fit inside this fixed-size window.
:::

---

## What is a Context Window?

When you interact with an LLM, you are sending it a "prompt." The model can only consider the information within that prompt to generate a response. The maximum size of this prompt is the **context window**.

### How is it Measured?

Context windows are measured in **tokens**. A token is a piece of a word, and a rough rule of thumb is that **1 token is about 0.75 words**. A model with a 4,000 token context window (often written as "4k") can process about 3,000 words of text at once.

### What's Inside the Window?
The total number of tokens includes:
-   **System Prompt**: The initial instructions for the model.
-   **User Prompt**: The user's most recent question or instruction.
-   **Conversation History**: The previous turns of the conversation.
-   **Retrieved Context**: Any documents or data you "stuff" into the prompt (as in RAG).
-   **The Model's Response**: The generated output also consumes space in the window.

---

## Why It's a Critical Concept

If your input exceeds the context window, the model will not see the extra information, leading to poor or irrelevant responses.

-   **Conversational "Amnesia"**: If a conversation gets too long, the model will "forget" the beginning, losing track of what was discussed.
-   **Limited RAG Performance**: The context window limits how many retrieved documents you can provide to the model to answer a question.
-   **Cost**: For API-based models, you are often charged based on the number of tokens in your prompt and the generated response. Larger context windows can lead to higher costs.

---

## What Happens When You Exceed the Limit?

Most chat applications handle this with a **"sliding window"**. When the conversation exceeds the limit, the oldest messages are dropped from the prompt to make room for new ones.

**Example (4k Context Window):**
1.  **Messages 1-10**: Total tokens: 3,500. All messages fit. The model sees the full history.
2.  **User adds Message 11**: The total token count would be 4,100.
3.  **Sliding Window Action**: To make room, the application removes Message 1 (and possibly Message 2) from the prompt before sending it to the model.
4.  **Result**: The model no longer has any memory of what was said in the first message.

## How to Find a Model's Context Window

1.  **Hugging Face**: The model card on Hugging Face almost always lists the context window size.
2.  **Ollama**: For a local Ollama model, you can use the `ollama show` command to inspect its configuration.

    ```bash
    # Use jq to extract just the context length parameter
    ollama show <model-name> --json | jq '.parameters | split("\n") | .[] | select(contains("llama.context_length"))'
    ```

---

## Context Management Strategies

-   **Be Economical**: Don't stuff the prompt with unnecessary information. Keep system prompts concise and conversation history relevant.
-   **Summarize**: For long conversations, instead of dropping old messages, create a summary of the conversation so far and include that in the prompt instead.
-   **Chunk and Rank for RAG**: When using Retrieval-Augmented Generation, split your documents into smaller chunks. Retrieve the most relevant chunks and only include the top K (e.g., top 3-5) in the prompt.

:::tip[Count Your Tokens]
To effectively manage your context, you need to know how many tokens your text will consume. See the [Token Counting](../05-token-counting/token-count-python.md) guide for tools and techniques.
:::
