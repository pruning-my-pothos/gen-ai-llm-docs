---
title: "Switching Models Without Breaking Your App"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["models", "architecture", "decoupling", "llms"]
last_reviewed: "2025-12-31"
---

# Switching Models Without Breaking Your App

As you develop an LLM-powered application, you'll often want to swap models to test for quality, cost, or performance. Tightly coupling your code to a specific model or API makes this difficult. This guide presents two strategies for building model-agnostic applications.

:::info[Goal: Treat LLMs as Interchangeable Backends]
The ideal architecture allows you to switch from a local Ollama model to a remote OpenAI API call by changing only a single line of configuration, not your application logic.
:::

---

## The Core Problem: Incompatible APIs

Different model providers have different API schemas. A request to a local LM Studio server (which mimics OpenAI) is different from a request to a local Ollama server.

-   **Endpoint**: `.../v1/chat/completions` vs. `.../api/chat`
-   **Response Shape**: `response.choices[0].message.content` vs. `response.message.content`

Hard-coding your application to one of these schemas makes switching painful.

---

## Strategy 1: The Adapter Pattern

The Adapter pattern involves creating a consistent interface in your application and then writing "adapter" classes that wrap the specific logic for each model provider.

### Example: Python Adapters

1.  **Define a Base Class (Interface)**:
    This abstract class defines the single, consistent method your application will use.
    ```python
    from abc import ABC, abstractmethod

    class LLMAdapter(ABC):
        @abstractmethod
        def complete(self, prompt: str, system_prompt: str) -> str:
            pass
    ```

2.  **Create Concrete Implementations**:
    Each class handles the specific logic for one API.

    ```python
    import requests
    import json

    # Adapter for any OpenAI-compatible API (like LM Studio)
    class OpenAICompatibleAdapter(LLMAdapter):
        def __init__(self, api_url="http://localhost:1234/v1"):
            self.api_url = api_url

        def complete(self, prompt: str, system_prompt: str) -> str:
            response = requests.post(
                f"{self.api_url}/chat/completions",
                json={
                    "model": "local-model",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": prompt}
                    ]
                }
            )
            response.raise_for_status()
            return response.json()['choices'][0]['message']['content']

    # Adapter for Ollama's native API
    class OllamaAdapter(LLMAdapter):
        def __init__(self, model="llama3", api_url="http://localhost:11434"):
            self.model = model
            self.api_url = api_url

        def complete(self, prompt: str, system_prompt: str) -> str:
            response = requests.post(
                f"{self.api_url}/api/chat",
                json={
                    "model": self.model,
                    "system": system_prompt,
                    "prompt": prompt,
                    "stream": False,
                }
            )
            response.raise_for_status()
            return response.json()['message']['content']
    ```

Your application code can now be written to depend only on the `LLMAdapter`, making it easy to switch.

---

## Strategy 2: Use a Unifying Library (LiteLLM)

A simpler and often more robust approach is to use a library designed to solve this exact problem. **LiteLLM** is a popular choice that provides a single, OpenAI-compatible interface for over 100 different LLM APIs.

### Example: LiteLLM

1.  **Installation**:
    ```bash
    pip install litellm
    ```

2.  **Usage**:
    LiteLLM handles all the translation for you. You can call different models by simply changing the `model` string.

    ```python
    from litellm import completion

    # Call a local Ollama model
    response_ollama = completion(
        model="ollama/llama3", 
        messages=[{"role": "user", "content": "Hi, how are you?"}]
    )
    print("Ollama:", response_ollama.choices[0].message.content)

    # Switch to calling the real OpenAI API by changing one line
    # (Requires OPENAI_API_KEY environment variable to be set)
    response_openai = completion(
        model="gpt-3.5-turbo", 
        messages=[{"role": "user", "content": "Hi, how are you?"}]
    )
    print("OpenAI:", response_openai.choices[0].message.content)
    ```

:::tip[Start with a Library]
For new projects, using a library like LiteLLM from the start is highly recommended. It saves you from writing boilerplate adapter code and makes your application instantly compatible with a huge range of models.
:::

---

## Pre-flight Checklist for Model Switching

After implementing one of the strategies above, use this checklist before finalizing a model swap:

-   [ ] **Context Window**: Does the new model have a context window that fits your prompts?
-   [ ] **Parameters**: Have you explicitly set `temperature`, `top_p`, etc., or do you need to adjust them for the new model?
-   [ ] **Output Validation**: Run a small test suite of 5-10 known prompts. Does the new model's output quality, style, and refusal rate meet your requirements?
-   [ ] **Performance**: Check the latency and memory usage. Do you need to use a different quantization level?
-   [ ] **Embeddings**: If you are changing embedding models, you **must** re-index all of your documents.
