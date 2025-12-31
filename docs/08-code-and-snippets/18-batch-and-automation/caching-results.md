---
title: "Caching LLM Results"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["batch-processing", "caching", "performance", "cost-optimization"]
last_reviewed: "2025-12-31"
---

# Caching LLM Results

In many LLM applications, especially batch processing tasks, you'll encounter situations where the same prompt or a very similar one is sent to the LLM multiple times. Making redundant API calls wastes money, consumes unnecessary compute resources, and adds latency. Caching allows you to store and reuse previously generated LLM responses, significantly improving efficiency.

:::info[The Goal: Reduce Redundant LLM Calls]
The objective is to avoid re-invoking the LLM for identical requests, thereby optimizing costs, reducing latency, and improving the overall throughput of your application.
:::

---

## Why Cache LLM Results?

-   **Cost Savings**: Eliminate redundant API calls to expensive cloud LLMs.
-   **Performance Improvement**: Serve responses instantly from cache, drastically reducing latency for repeat queries.
-   **Rate Limit Management**: Reduce the number of API calls, making it easier to stay within rate limits.
-   **Consistency**: Ensure identical inputs always yield identical (cached) outputs, which can aid testing and debugging.

---

## Key Principle: Cache Key Generation

The most critical aspect of caching is generating a reliable **cache key**. The key must uniquely represent *all* parameters that could affect the LLM's output. This includes:

-   The full `messages` list (for chat completions).
-   The `model` name.
-   All generation parameters (`temperature`, `top_p`, `max_tokens`, `seed`, `stop_sequences`, etc.).

A common strategy is to hash a JSON representation of these parameters.

---

## 1. In-Memory Caching with `functools.lru_cache`

Python's `functools.lru_cache` is a simple decorator for caching the results of function calls in memory. It's ideal for small, ephemeral caches or when you only need to optimize within a single run of a script.

### Pros
-   **Easy to Use**: A single decorator.
-   **Fast**: Pure Python, highly optimized.

### Cons
-   **Non-Persistent**: Cache is cleared when the application restarts.
-   **Memory Bound**: Can consume significant RAM if not size-limited.
-   **Hashing Limitations**: Can only cache functions with hashable arguments (e.g., `list` is not hashable, so you need a wrapper).

### Python Example

```python
import functools
import json
import requests
from typing import List, Dict, Any, Optional, Tuple
import hashlib

# --- Configuration ---
LOCAL_LLM_ENDPOINT = "http://localhost:11434/v1/chat/completions" # e.g., Ollama
LOCAL_MODEL_NAME = "llama3"

# --- LLM Call Function (non-streaming for simplicity) ---
def call_llm_api(messages: List[Dict[str, str]], model_name: str, **kwargs) -> Optional[str]:
    """Makes an LLM API call."""
    payload = {
        "model": model_name,
        "messages": messages,
        **kwargs # Include other parameters like temperature, max_tokens
    }
    try:
        response = requests.post(LOCAL_LLM_ENDPOINT, json=payload, timeout=30)
        response.raise_for_status()
        return response.json()['choices'][0]['message']['content']
    except requests.exceptions.RequestException as e:
        print(f"Error calling LLM: {e}")
        return None

# --- Cached LLM Call Wrapper ---
@functools.lru_cache(maxsize=128) # Cache up to 128 unique calls
def get_cached_llm_response(
    messages_tuple: Tuple[Tuple[str, str], ...], # Must be hashable
    model_name: str, 
    **kwargs: Any # All other hashable parameters
) -> Optional[str]:
    """
    Cached version of the LLM call.
    Note: messages are converted to a tuple of tuples to be hashable.
    """
    messages = [{"role": role, "content": content} for role, content in messages_tuple]
    print(f"--- Calling LLM for prompt (cached: {'NO' if len(get_cached_llm_response.cache_info().hits) == get_cached_llm_response.cache_info().misses else 'YES'}) ---")
    return call_llm_api(messages, model_name, **kwargs)

# --- Example Usage ---
if __name__ == "__main__":
    prompts = [
        "Explain AI in one sentence.",
        "What is the capital of Japan?",
        "Explain AI in one sentence.", # Repeat prompt
        "Tell me a short joke."
    ]

    for prompt_text in prompts:
        messages_for_llm = (("user", prompt_text),) # Convert to hashable tuple of tuples
        
        response = get_cached_llm_response(
            messages_for_llm, 
            LOCAL_MODEL_NAME, 
            temperature=0.7, 
            max_tokens=50
        )
        print(f"Prompt: '{prompt_text}' -> Response: '{response[:50]}...'
")

    print("\nCache Info:", get_cached_llm_response.cache_info())
```

---

## 2. Persistent Caching (File-based JSON)

For batch processing or when you need cache hits across application restarts, a persistent cache is necessary. A simple file-based JSON cache is a good starting point.

### Pros
-   **Persistent**: Cache survives application restarts.
-   **Simple**: Easy to implement without external databases.

### Cons
-   **Concurrency**: Not ideal for concurrent writes without locking mechanisms.
-   **Scalability**: Less performant for very large caches compared to dedicated databases.

### Python Example

```python
import json
import hashlib
import os
from typing import List, Dict, Any, Optional

# --- Configuration ---
CACHE_FILE = "llm_cache.json"

# --- Cache Management Functions ---
def load_cache(filepath: str) -> Dict[str, Any]:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def save_cache(cache_data: Dict[str, Any], filepath: str):
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(cache_data, f, indent=2)

def generate_cache_key(messages: List[Dict[str, str]], model_name: str, **kwargs: Any) -> str:
    """Generates a unique hash key for a given LLM request."""
    # Ensure messages are sorted for consistent hashing
    sorted_messages = sorted([f"{msg['role']}:{msg['content']}" for msg in messages])
    
    # Include all relevant parameters
    cache_data = {
        "messages": sorted_messages,
        "model": model_name,
        "params": sorted(kwargs.items()) # Ensure kwargs are sorted for consistent hash
    }
    return hashlib.sha256(json.dumps(cache_data, sort_keys=True).encode('utf-8')).hexdigest()

def get_or_set_llm_response_persistent(
    messages: List[Dict[str, str]],
    model_name: str,
    cache_filepath: str = CACHE_FILE,
    **kwargs: Any
) -> Optional[str]:
    """
    Checks cache for response, if not found, calls LLM and caches result.
    """
    cache_data = load_cache(cache_filepath)
    cache_key = generate_cache_key(messages, model_name, **kwargs)

    if cache_key in cache_data:
        print(f"--- Serving from cache for key: {cache_key[:8]}... ---")
        return cache_data[cache_key]
    
    print(f"--- Cache miss for key: {cache_key[:8]}... Calling LLM. ---")
    response_content = call_llm_api(messages, model_name, **kwargs)
    
    if response_content:
        cache_data[cache_key] = response_content
        save_cache(cache_data, cache_filepath)
    
    return response_content

# --- Example Usage ---
if __name__ == "__main__":
    prompts_for_persistent_cache = [
        "What is the capital of Germany?",
        "Explain large language models briefly.",
        "What is the capital of Germany?", # Repeat prompt
    ]

    for prompt_text in prompts_for_persistent_cache:
        messages_for_llm = [{"role": "user", "content": prompt_text}]
        response = get_or_set_llm_response_persistent(
            messages_for_llm,
            LOCAL_MODEL_NAME,
            temperature=0.5, # Important: include all params in cache key
            max_tokens=75
        )
        print(f"Prompt: '{prompt_text}' -> Response: '{response[:50]}...'
")
```

---

:::tip[Invalidating Cache]
When you change your prompt engineering, LLM parameters, or switch to a new model, the old cache entries are likely invalid. You should either:
-   Generate a new cache key (e.g., by including a version number in the key).
-   Clear the cache entirely.
:::

:::warning[Caching Sensitive Data]
Be extremely cautious about caching PII or sensitive data. If you implement a cache, ensure it adheres to your data privacy policies and potentially redact PII *before* caching. (See [PII Redaction Basics](./../14-logging-and-tracing/pii-redaction-basics.md)).
:::