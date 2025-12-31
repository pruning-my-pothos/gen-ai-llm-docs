---
title: "Token Counting in Python with Tiktoken"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["python", "tokens", "tiktoken", "context-window"]
last_reviewed: "2025-12-31"
---

# Token Counting in Python with `tiktoken`

To effectively manage a model's context window and control API costs, you need to accurately count the number of tokens in your prompts. This guide shows how to use `tiktoken`, OpenAI's fast BPE tokenizer, to do this in Python.

:::info[Why `tiktoken`?]
`tiktoken` is the official and highly optimized tokenizer used by OpenAI models like GPT-4 and GPT-3.5. It's extremely fast and provides the exact token count you'll be billed for, making it the standard choice for this task.
:::

---

## 1. Installation

Install the `tiktoken` library using pip.

```bash
pip install tiktoken
```

---

## 2. Basic String Token Counting

You can quickly count the tokens in any string by selecting the correct encoding for your target model.

-   **`cl100k_base`**: Used by `gpt-4`, `gpt-3.5-turbo`, and `text-embedding-3-small`.
-   **`p50k_base`**: Used by older models like `text-davinci-003`.

```python
import tiktoken

def count_string_tokens(string: str, encoding_name: str = "cl100k_base") -> int:
    """Returns the number of tokens in a text string."""
    encoding = tiktoken.get_encoding(encoding_name)
    num_tokens = len(encoding.encode(string))
    return num_tokens

# Example usage
my_string = "Hello world, let's count tokens!"
token_count = count_string_tokens(my_string)
print(f'The string has {token_count} tokens.')
# Expected output: The string has 7 tokens.
```

---

## 3. Counting Tokens for Chat APIs

Counting tokens for chat models is more complex. The final token count includes not just the message content, but also special tokens for the message roles (`system`, `user`, `assistant`).

The function below is adapted from the [OpenAI Cookbook](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb) and provides an accurate count for chat completion requests.

```python
import tiktoken
from typing import List, Dict

def count_chat_message_tokens(
    messages: List[Dict[str, str]],
    model: str = "gpt-3.5-turbo-0613"
) -> int:
    """
    Returns the number of tokens used by a list of messages.
    
    Args:
        messages (list): A list of dictionaries, where each dictionary
                         represents a message with 'role' and 'content' keys.
        model (str): The name of the model to use for encoding.
    
    Returns:
        int: The total number of tokens used by the messages.
    """
    try:
        encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        print("Warning: model not found. Using cl100k_base encoding.")
        encoding = tiktoken.get_encoding("cl100k_base")
        
    # Model-specific adjustments for token counting
    if model in {
        "gpt-3.5-turbo-0613",
        "gpt-3.5-turbo-16k-0613",
        "gpt-4-0314",
        "gpt-4-32k-0314",
        "gpt-4-0613",
        "gpt-4-32k-0613",
    }:
        tokens_per_message = 3
        tokens_per_name = 1
    elif model == "gpt-3.5-turbo-0301":
        tokens_per_message = 4  # every message follows <|start|>{role/name}\n{content}<|end|>\n
        tokens_per_name = -1  # if there's a name, the role is omitted
    elif "gpt-3.5-turbo" in model:
        # Fallback for future gpt-3.5-turbo versions
        return count_chat_message_tokens(messages, model="gpt-3.5-turbo-0613")
    elif "gpt-4" in model:
        # Fallback for future gpt-4 versions
        return count_chat_message_tokens(messages, model="gpt-4-0613")
    else:
        raise NotImplementedError(
            f"""num_tokens_from_messages() is not implemented for model {model}. 
            See https://github.com/openai/openai-cookbook for updates."""
        )

    num_tokens = 0
    for message in messages:
        num_tokens += tokens_per_message
        for key, value in message.items():
            num_tokens += len(encoding.encode(value))
            if key == "name":
                num_tokens += tokens_per_name
    num_tokens += 3  # every reply is primed with <|start|>assistant<|message|>
    return num_tokens

# --- Example Usage ---
messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is the capital of France?"}
]

total_tokens = count_chat_message_tokens(messages, model="gpt-4")
print(f"Total tokens for the chat messages: {total_tokens}")

# Example of checking against a context window limit
CONTEXT_WINDOW_LIMIT = 4096 # for gpt-3.5-turbo
if total_tokens > CONTEXT_WINDOW_LIMIT:
    print("Error: Message is too long for the context window.")
```

:::tip[Use this function before making an API call]
By calling `count_chat_message_tokens` before you send the request to the API, you can prevent errors and manage your context window effectively by trimming or summarizing the messages if they are too long.
:::
