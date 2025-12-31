---
title: "Parallelism Basics for LLM Calls"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["batch-processing", "parallelism", "concurrency", "python", "performance"]
last_reviewed: "2025-12-31"
---

# Parallelism Basics for LLM Calls

When processing multiple LLM requests, making calls sequentially (one after another) can be very slow, especially if you're waiting for network responses from an API. Parallelism allows you to make multiple LLM calls concurrently, significantly speeding up batch processing tasks.

:::info[The Goal: Faster Batch Processing]
The objective is to leverage concurrency to maximize throughput when your application needs to make many independent LLM calls, reducing the total time required to process a batch of data.
:::

---

## Why Parallelize LLM Calls?

LLM API calls are typically **I/O-bound** operations: your application spends most of its time waiting for a response from the LLM server. Traditional sequential execution wastes this waiting time. Parallelism allows your application to start new requests while waiting for previous ones to complete.

---

## Python Parallelism Strategies

Python offers several ways to achieve parallelism. For I/O-bound tasks like LLM API calls, `threading` and `asyncio` are generally preferred over `multiprocessing` (which is better for CPU-bound tasks).

### 1. Using `threading` (Synchronous API Calls)

`threading` allows multiple parts of your program to run concurrently within the same process. It's effective for I/O-bound tasks because Python's Global Interpreter Lock (GIL) is released during I/O operations.

#### Implementation

```python
import threading
import time
import requests
import json
from typing import List, Dict, Any, Optional, Tuple

# --- Configuration (from previous guides) ---
LOCAL_LLM_ENDPOINT = "http://localhost:11434/v1/chat/completions" # e.g., Ollama
LOCAL_MODEL_NAME = "llama3"

# --- LLM Call Function (non-streaming for simplicity) ---
def call_llm_sync(prompt_messages: List[Dict[str, str]], model_name: str) -> Optional[str]:
    """Makes a synchronous LLM API call."""
    payload = {
        "model": model_name,
        "messages": prompt_messages,
        "max_tokens": 50,
        "temperature": 0.7,
        "stream": False
    }
    try:
        response = requests.post(LOCAL_LLM_ENDPOINT, json=payload, timeout=30)
        response.raise_for_status()
        return response.json()['choices'][0]['message']['content']
    except requests.exceptions.RequestException as e:
        print(f"Error calling LLM: {e}")
        return None

def process_prompt_threaded(prompt: str, results: List[Tuple[str, Optional[str]]]):
    """Function to be run by each thread."""
    messages = [{"role": "user", "content": prompt}]
    response = call_llm_sync(messages, LOCAL_MODEL_NAME)
    results.append((prompt, response))

def run_threaded_llm_calls(prompts: List[str]) -> List[Tuple[str, Optional[str]]]:
    """Orchestrates parallel LLM calls using threading."""
    start_time = time.time()
    results = []
    threads = []

    for prompt in prompts:
        thread = threading.Thread(target=process_prompt_threaded, args=(prompt, results))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join() # Wait for all threads to complete

    end_time = time.time()
    print(f"\nThreaded processing complete in {end_time - start_time:.2f} seconds.")
    return results

# --- Example Usage ---
if __name__ == "__main__":
    prompts_to_process = [
        "Explain AI in one sentence.",
        "What is the capital of Japan?",
        "Tell me a short joke.",
        "Summarize the plot of Hamlet in 50 words.",
        "What is 2+2?",
    ]
    
    print("--- Running threaded LLM calls ---")
    threaded_results = run_threaded_llm_calls(prompts_to_process)
    for prompt, result in threaded_results:
        print(f"Prompt: '{prompt}'\nResponse: '{result[:50]}...'
")

```

---

### 2. Using `asyncio` (Asynchronous API Calls)

`asyncio` is Python's framework for writing concurrent code using the `async`/`await` syntax. It's highly efficient for I/O-bound tasks as it allows the program to switch between tasks during I/O waits, without the overhead of multiple threads.

#### Installation (`httpx` for async requests)

```bash
pip install httpx
```

#### Implementation

```python
import asyncio
import httpx # pip install httpx
import time
from typing import List, Dict, Any, Tuple, Optional

# --- Configuration ---
LOCAL_LLM_ENDPOINT = "http://localhost:11434/v1/chat/completions"
LOCAL_MODEL_NAME = "llama3"

# --- Async LLM Call Function ---
async def call_llm_async(prompt_messages: List[Dict[str, str]], model_name: str) -> Optional[str]:
    """Makes an asynchronous LLM API call."""
    payload = {
        "model": model_name,
        "messages": prompt_messages,
        "max_tokens": 50,
        "temperature": 0.7,
        "stream": False
    }
    try:
        async with httpx.AsyncClient(timeout=30.0) as client: # Configure timeout for client
            response = await client.post(LOCAL_LLM_ENDPOINT, json=payload)
            response.raise_for_status()
            return response.json()['choices'][0]['message']['content']
    except httpx.RequestError as e:
        print(f"Error calling LLM asynchronously: {e}")
        return None

async def run_asyncio_llm_calls(prompts: List[str]) -> List[Tuple[str, Optional[str]]]:
    """Orchestrates parallel LLM calls using asyncio."""
    start_time = time.time()
    tasks = []
    
    for prompt in prompts:
        messages = [{"role": "user", "content": prompt}]
        tasks.append(call_llm_async(messages, LOCAL_MODEL_NAME))
    
    responses = await asyncio.gather(*tasks) # Run all tasks concurrently
    
    results = [(prompts[i], responses[i]) for i in range(len(prompts))]

    end_time = time.time()
    print(f"\nAsyncio processing complete in {end_time - start_time:.2f} seconds.")
    return results

# --- Example Usage ---
if __name__ == "__main__":
    prompts_to_process = [
        "Explain AI in one sentence.",
        "What is the capital of Japan?",
        "Tell me a short joke.",
        "Summarize the plot of Hamlet in 50 words.",
        "What is 2+2?",
    ]
    
    print("\n--- Running asyncio LLM calls ---")
    asyncio_results = asyncio.run(run_asyncio_llm_calls(prompts_to_process))
    for prompt, result in asyncio_results:
        print(f"Prompt: '{prompt}'\nResponse: '{result[:50]}...'
")

```

---

:::tip[Choose the Right Tool]
-   Use `threading` for simpler concurrent execution, especially if you're wrapping existing synchronous code.
-   Use `asyncio` for highly efficient I/O-bound concurrency in new projects, as it's generally more performant for many tasks.
:::

:::warning[Rate Limits]
When using cloud LLM APIs, be mindful of rate limits. Parallelism will hit these limits faster. Implement exponential backoff and retry logic in your API clients to handle `TooManyRequests` errors gracefully.
:::