---
title: "Message Priority and Ordering"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["context-window", "prompt-engineering", "rag", "lost-in-the-middle"]
last_reviewed: "2025-12-31"
---

# Message Priority and Ordering

The order in which you place information in a prompt is not arbitrary. Research and empirical evidence show that Large Language Models tend to pay more attention to information at the very beginning and very end of their context window. This guide explains how to structure your prompts to leverage this behavior.

:::info[The "Lost in the Middle" Problem]
Recent studies have highlighted a phenomenon known as "lost in the middle," where LLMs are less likely to accurately use information presented in the middle of a long prompt. By strategically ordering your prompt's components, you can mitigate this effect and improve the model's performance.

**Attention Pattern**: `[Strong Attention] ... [Weak Attention] ... [Strong Attention]`
:::

---

## A Recommended Prompt Structure for RAG

To work around the "lost in the middle" issue, you should place your most critical information at the beginning and end of the prompt. For a typical Retrieval-Augmented Generation (RAG) application, a robust ordering is as follows:

1.  **System Prompt**: Always first. This contains the model's core instructions, persona, and constraints. It sets the stage for the entire generation.
2.  **Retrieved Context**: The retrieved documents or data chunks. This is the "open book" the model needs to consult to ground its answer in facts. Placing it early ensures it gets high attention.
3.  **Conversation History**: The history of the dialogue. While useful for conversational flow, it's often less critical than the retrieved context for answering the user's *current* question. It can safely occupy the "middle".
4.  **User Question**: Always last. Placing the user's specific query at the very end of the prompt focuses the model's attention on the immediate task it needs to perform.

This "sandwich" structure—`[Instructions -> Context -> History -> Question]`—is a powerful and widely-used heuristic.

---

## Code Example: Assembling a Chat Prompt

This Python function demonstrates how to assemble a list of messages for a chat API in the recommended order.

```python
from typing import List, Dict

def assemble_rag_prompt(
    system_prompt: str,
    retrieved_context: List[str],
    history: List[Dict[str, str]],
    user_question: str
) -> List[Dict[str, str]]:
    """
    Assembles a list of messages for a RAG chat API call in a prioritized order.

    Args:
        system_prompt (str): The main system prompt.
        retrieved_context (List[str]): A list of retrieved document chunks.
        history (List[Dict[str, str]]): The conversation history.
        user_question (str): The user's current question.

    Returns:
        A list of message dictionaries ready for an API call.
    """
    
    # 1. Start with the system prompt
    messages = [{"role": "system", "content": system_prompt}]

    # 2. Add the retrieved context, formatted clearly
    # Using XML-style tags is a common and effective method.
    context_str = "\n\n".join(
        [f"<document index='{i+1}'>\n{chunk}\n</document>" for i, chunk in enumerate(retrieved_context)]
    )
    context_message = f"Here are the search results to use when answering the user's question:\n{context_str}"
    messages.append({"role": "system", "content": context_message})

    # 3. Add the conversation history (if any)
    # This assumes history is already a list of message dicts
    if history:
        messages.extend(history)

    # 4. Add the final user question
    messages.append({"role": "user", "content": user_question})

    return messages

# --- Example Usage ---
sys_prompt = "You are a helpful AI assistant. Answer the user's question based on the provided documents."
docs = ["The sky is blue due to Rayleigh scattering.", "Water is a liquid at room temperature."]
chat_history = [
    {"role": "user", "content": "What color is the ocean?"},
    {"role": "assistant", "content": "The ocean is typically blue."}
]
question = "Why is the sky blue?"

final_prompt_messages = assemble_rag_prompt(sys_prompt, docs, chat_history, question)

# You can now send 'final_prompt_messages' to your chat API.
# It will be structured for optimal performance.
import json
print(json.dumps(final_prompt_messages, indent=2))
```

---

:::tip[Experimentation is Key]
While the `Instructions -> Context -> History -> Question` structure is a robust starting point, some models may have different quirks. If you are tuning for maximum performance on a specific task, it can be worthwhile to experiment with different orderings (e.g., placing the question before the context) to see what works best for your chosen model.
:::