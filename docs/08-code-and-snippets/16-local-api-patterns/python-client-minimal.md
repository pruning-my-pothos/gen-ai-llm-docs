---
title: "Minimal Python Client for Local LLMs"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["python", "openai-api", "local-llm", "client"]
last_reviewed: "2025-12-31"
---

# Minimal Python Client for Local LLMs

The `openai` Python client library is the standard way to interact with OpenAI's API. Thanks to the widespread adoption of the OpenAI API specification by local LLM servers, you can use the exact same client to programmatically communicate with models running on your machine (e.g., Ollama, LM Studio, vLLM).

:::info[The Goal: Programmatic Interaction]
The objective is to establish a basic Python setup that allows your applications to send prompts and receive responses from local OpenAI-compatible LLM servers, enabling integration into larger systems.
:::

---

## 1. Installation

First, install the `openai` Python client library.

```bash
pip install openai
```

---

## 2. Configure the Client

To direct the client to your local server instead of OpenAI's cloud, you simply need to set the `base_url` parameter when initializing the client. The `api_key` can typically be set to a dummy value like "ollama" or "lm-studio" as local servers usually don't require authentication.

```python
import openai
from openai import OpenAI
import os
from typing import List, Dict

# --- Configuration ---
# Point to your local server.
# Ollama: "http://localhost:11434/v1"
# LM Studio: "http://localhost:1234/v1"
# vLLM: "http://localhost:8000/v1"
LOCAL_LLM_ENDPOINT = "http://localhost:11434/v1" 
LOCAL_MODEL_NAME = "llama3" # The model name you have pulled/loaded on your local server

# Initialize the OpenAI client to point to your local server
client = OpenAI(
    base_url=LOCAL_LLM_ENDPOINT,
    api_key="ollama" # Dummy API key for local servers
)
```

---

## 3. Minimal Chat Completion Example

This example demonstrates a basic chat completion request, sending a system prompt and a user query to your local LLM.

```python
def get_chat_completion(user_message: str, system_message: str = "You are a helpful assistant.") -> str:
    """
    Sends a chat completion request to the local LLM.
    """
    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_message}
    ]

    try:
        response = client.chat.completions.create(
            model=LOCAL_MODEL_NAME,
            messages=messages,
            temperature=0.7,
            max_tokens=150
        )
        return response.choices[0].message.content
    except openai.APIConnectionError as e:
        print(f"Server connection error: {e}")
        print("Ensure your local LLM server is running and accessible at the specified base_url.")
        return "Error: Could not connect to local LLM server."
    except openai.APIStatusError as e:
        print(f"API status error: {e.status_code} - {e.response}")
        print("Check if the model name is correct and loaded on the server.")
        return "Error: LLM API returned an error."
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return "Error: An unexpected error occurred."


# --- Example Usage ---
if __name__ == "__main__":
    # Ensure your local LLM server (e.g., Ollama) is running
    # and has the 'llama3' model pulled/loaded.
    
    response_content = get_chat_completion("Explain the concept of quantum entanglement.")
    print("\nLLM Response:")
    print(response_content)

    response_content_2 = get_chat_completion("What is the capital of Japan?", system_message="You are a geography expert.")
    print("\nLLM Response (Geography Expert):")
    print(response_content_2)
```

---

:::tip[Streaming for Better UX]
For better user experience, especially with longer responses, enable streaming in your `client.chat.completions.create` call. This allows you to process and display tokens as they arrive.
*Related Guide: [Streaming Basics](./streaming-basics.md)*
:::

:::warning[API Keys]
While local servers typically don't require a real API key, the `openai` client library might still expect the `api_key` parameter. Using a dummy string like "ollama" or "lm-studio" satisfies this requirement. For actual OpenAI cloud services, ensure `os.getenv("OPENAI_API_KEY")` or a valid key is provided.
:::