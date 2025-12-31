---
title: "Context Budget Enforcement"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["context-hygiene", "tokens", "budgeting", "prompt-engineering"]
last_reviewed: "2025-12-31"
---

# Context Budget Enforcement

Automatically ensuring your prompt fits within the model's context window is crucial for reliable LLM applications. This guide provides a Python function to intelligently build a prompt by prioritizing and trimming its components to stay within a specified token limit.

:::info[The Goal: Intelligent Prompt Construction]
The objective is to maximize the amount of relevant information sent to the model without ever exceeding its context window, preventing errors and "amnesia."
:::

---

## The Problem: Exceeding Context Limits

As discussed in [Context Window Basics](./../04-model-management/context-window-basics.md), if your prompt's total token count exceeds the model's capacity, the API call will likely fail or the model will simply truncate the input, leading to incomplete or incorrect responses. Manually managing this can be error-prone.

---

## The Intelligent Prompt Builder Function

The `build_constrained_prompt` function below takes all your prompt components (system prompt, user question, conversation history, RAG context) and a token limit. It then assembles the prompt in a prioritized order, trimming less critical components as needed, and reserving space for the model's output.

```python
import tiktoken
from typing import List, Dict, Optional

# Assuming this function is available from token-count-python.md
def count_chat_message_tokens(
    messages: List[Dict[str, str]],
    model: str = "gpt-3.5-turbo-0613"
) -> int:
    """Returns the number of tokens used by a list of messages."""
    # This implementation is based on the token-count-python.md guide
    # In a real app, you would import it or define it here.
    try:
        encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        # Fallback for local models not in tiktoken's registry
        encoding = tiktoken.get_encoding("cl100k_base")
        
    tokens_per_message = 3
    tokens_per_name = 1 # Simplified for brevity, refer to full guide for model-specifics

    num_tokens = 0
    for message in messages:
        num_tokens += tokens_per_message
        for key, value in message.items():
            num_tokens += len(encoding.encode(value))
            if key == "name":
                num_tokens += tokens_per_name
    num_tokens += 3  # every reply is primed with <|start|>assistant<|message|>
    return num_tokens


def build_constrained_prompt(
    system_prompt: str,
    user_question: str,
    conversation_history: List[Dict[str, str]],
    rag_context: List[str],
    max_tokens: int,
    model_name: str = "gpt-3.5-turbo-0613",
    output_reserve_tokens: int = 1500, # Tokens reserved for model's response
) -> List[Dict[str, str]]:
    """
    Intelligently builds a prompt by prioritizing components and trimming
    less critical parts to stay within a token budget.

    Args:
        system_prompt: The main system prompt.
        user_question: The user's current question.
        conversation_history: List of past messages.
        rag_context: List of retrieved document chunks.
        max_tokens: The model's total context window size.
        model_name: The model to use for token counting.
        output_reserve_tokens: Tokens to reserve for the model's output.

    Returns:
        A list of messages ready for the LLM API.
    """
    
    current_messages: List[Dict[str, str]] = []
    
    # Calculate effective budget for the prompt itself
    prompt_budget = max_tokens - output_reserve_tokens
    
    # 1. Start with the most critical components: System Prompt and User Question
    #    (as per Message Priority and Ordering guide)
    initial_messages = [{"role": "system", "content": system_prompt}]
    
    # Format RAG context clearly
    context_str = "\n\n".join(
        [f"<document index='{i+1}'>\n{chunk}\n</document>" for i, chunk in enumerate(rag_context)]
    )
    if context_str:
        initial_messages.append({"role": "system", "content": f"Here are relevant documents:\n{context_str}"})

    initial_messages.append({"role": "user", "content": user_question})
    
    current_messages.extend(initial_messages)
    
    # Check if initial message already exceeds budget
    if count_chat_message_tokens(current_messages, model_name) > prompt_budget:
        print("Warning: Initial system prompt, RAG context, and user question exceed budget.")
        # Fallback: try to fit just system and user question
        current_messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_question}
        ]
        if count_chat_message_tokens(current_messages, model_name) > prompt_budget:
             raise ValueError("Even system prompt and user question alone exceed token budget!")
        print("Trimmed RAG context as initial prompt is too large.")

    # 2. Iteratively add conversation history, trimming if necessary
    # Add newest messages first (end of history list)
    temp_history = list(conversation_history) # Make a mutable copy
    while temp_history:
        # Try adding the next message(s)
        test_messages = current_messages + temp_history[-1:] # Add the latest message
        
        if count_chat_message_tokens(test_messages, model_name) <= prompt_budget:
            current_messages = test_messages
            temp_history.pop() # Remove added message from temp_history
        else:
            # Cannot add more history, break loop
            print(f"Warning: Truncated conversation history to fit budget.")
            break
            
    # Reverse history to maintain chronological order in final prompt
    final_history = [msg for msg in current_messages if msg not in initial_messages]
    final_history.reverse()
    
    # Reassemble final messages with correct priority
    final_prompt = []
    final_prompt.append({"role": "system", "content": system_prompt})
    if context_str and {"role": "system", "content": f"Here are relevant documents:\n{context_str}"} in initial_messages:
        final_prompt.append({"role": "system", "content": f"Here are relevant documents:\n{context_str}"})
    final_prompt.extend(final_history)
    final_prompt.append({"role": "user", "content": user_question})


    return final_prompt

# --- Example Usage ---
system_instruction = "You are a helpful and concise assistant."
user_query = "Summarize the history of AI."
rag_data = [
    "AI began with early philosophical inquiries into thought processes.",
    "The Dartmouth workshop in 1956 is widely considered the birth of AI.",
    "Expert systems dominated the 1980s.",
    "Machine learning became prominent in the 2000s.",
    "Deep learning revolutionized AI in the 2010s."
]
chat_hist = [
    {"role": "user", "content": "Hello!"},
    {"role": "assistant", "content": "Hi there! How can I help you today?"},
    {"role": "user", "content": "What is the capital of France?"},
    {"role": "assistant", "content": "Paris is the capital of France."},
    {"role": "user", "content": "Thanks. And who invented the lightbulb?"},
    {"role": "assistant", "content": "Thomas Edison is often credited with inventing the practical incandescent light bulb."}
]

# Set a small budget for demonstration
model_context_window = 100 # Artificially small for demonstration
reserved_for_output = 20

constrained_messages = build_constrained_prompt(
    system_instruction,
    user_query,
    chat_hist,
    rag_data,
    max_tokens=model_context_window,
    output_reserve_tokens=reserved_for_output
)

print("\n--- Final Constrained Prompt ---")
# print(json.dumps(constrained_messages, indent=2))
print(f"Total tokens in final prompt: {count_chat_message_tokens(constrained_messages)}")
print(f"Budget used: {count_chat_message_tokens(constrained_messages)} / {model_context_window}")

# Example with a larger budget to see more components
model_context_window_large = 1000
constrained_messages_large = build_constrained_prompt(
    system_instruction,
    user_query,
    chat_hist,
    rag_data,
    max_tokens=model_context_window_large,
    output_reserve_tokens=reserved_for_output
)
print("\n--- Final Constrained Prompt (Larger Budget) ---")
print(f"Total tokens in final prompt: {count_chat_message_tokens(constrained_messages_large)}")
print(f"Budget used: {count_chat_message_tokens(constrained_messages_large)} / {model_context_window_large}")

```

---

:::tip[Guardrail for Your Prompts]
This `build_constrained_prompt` function acts as a robust guardrail, preventing your application from sending oversized prompts. It prioritizes the most critical information, ensuring the model always receives the most relevant context up to its limit.
:::