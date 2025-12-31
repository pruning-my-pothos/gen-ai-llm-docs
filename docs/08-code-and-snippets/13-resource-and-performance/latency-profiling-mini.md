---
title: "Latency Profiling for LLM Applications"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["performance", "latency", "profiling", "user-experience"]
last_reviewed: "2025-12-31"
---

# Latency Profiling for LLM Applications

While tokens-per-second (t/s) measures the raw throughput of an LLM, user experience is often more heavily influenced by latency: how quickly the user perceives a response. This guide focuses on measuring two critical latency metrics: Time to First Token (TTFT) and Time to Last Token (TLFT).

:::info[The Goal: Responsive User Experience]
The objective is to minimize the perceived wait time for users by optimizing when the first part of a response appears (TTFT) and when the full response is completed (TLFT).
:::

---

## 1. Time to First Token (TTFT)

-   **Definition**: The duration from when the LLM API request is sent until the very first token of the LLM's response is received.
-   **Why it matters**: TTFT is crucial for perceived responsiveness. A low TTFT makes an application feel fast and interactive, as the user sees immediate feedback (the LLM "starts typing"). A high TTFT can make the application feel sluggish or broken.

---

## 2. Time to Last Token (TLFT)

-   **Definition**: The total duration from when the LLM API request is sent until the very last token of the LLM's response is received and the generation is complete.
-   **Why it matters**: TLFT represents the total waiting time for the user to get the complete answer. It is directly related to the total number of output tokens and the LLM's tokens-per-second (t/s) throughput.

---

## Measuring Latency with Python (Streaming API Calls)

To accurately measure TTFT, you *must* use streaming API calls. This allows your application to process tokens as they are generated, rather than waiting for the entire response.

### Python Implementation

```python
import time
import requests
import json
import tiktoken # pip install tiktoken
from typing import List, Dict, Generator, Any, Optional

# --- Configuration ---
OLLAMA_API_URL = "http://localhost:11434/api/chat"
OPENAI_API_URL = "http://localhost:1234/v1/chat/completions" # For LM Studio or OpenAI API
TARGET_MODEL = "llama3" # Or "gpt-3.5-turbo", etc.
TARGET_ENCODING = "cl100k_base" # For tiktoken counting

# Function to count tokens in a string (from token-count-python.md)
def count_string_tokens(text: str, encoding_name: str = TARGET_ENCODING) -> int:
    encoding = tiktoken.get_encoding(encoding_name)
    return len(encoding.encode(text))

def profile_llm_latency(
    prompt: str,
    llm_endpoint: str,
    model_name: str,
    max_output_tokens: int = 200
) -> Dict[str, Any]:
    """
    Measures Time to First Token (TTFT) and Time to Last Token (TLFT) for an LLM call.
    """
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt}
    ]
    
    payload = {
        "model": model_name,
        "messages": messages,
        "max_tokens": max_output_tokens,
        "stream": True # Crucial for measuring TTFT
    }

    start_time = time.perf_counter()
    first_token_time: Optional[float] = None
    full_response_text = ""
    total_output_tokens = 0

    try:
        if "ollama" in llm_endpoint:
            response_stream = requests.post(llm_endpoint, json=payload, stream=True)
            response_stream.raise_for_status()
            for chunk in response_stream.iter_lines():
                if chunk:
                    decoded_chunk = chunk.decode('utf-8')
                    try:
                        json_chunk = json.loads(decoded_chunk)
                        if first_token_time is None:
                            first_token_time = time.perf_counter()
                            print("\n(First token received)")
                        if 'content' in json_chunk['message']:
                            token_text = json_chunk['message']['content']
                            full_response_text += token_text
                            total_output_tokens += count_string_tokens(token_text) # Simple count
                            print(token_text, end='', flush=True) # Stream to console
                    except json.JSONDecodeError:
                        pass # Ignore non-JSON lines or partial JSON
        elif "openai" in llm_endpoint or "v1/chat/completions" in llm_endpoint:
            headers = {"Content-Type": "application/json"}
            response_stream = requests.post(llm_endpoint, headers=headers, json=payload, stream=True)
            response_stream.raise_for_status()
            for chunk in response_stream.iter_lines():
                if chunk:
                    decoded_chunk = chunk.decode('utf-8').lstrip("data: ")
                    if decoded_chunk == "[DONE]":
                        break
                    try:
                        json_chunk = json.loads(decoded_chunk)
                        if json_chunk['choices'][0]['delta'].get('content'):
                            if first_token_time is None:
                                first_token_time = time.perf_counter()
                                print("\n(First token received)")
                            token_text = json_chunk['choices'][0]['delta']['content']
                            full_response_text += token_text
                            total_output_tokens += count_string_tokens(token_text)
                            print(token_text, end='', flush=True)
                    except json.JSONDecodeError:
                        pass
        else:
            raise ValueError("Unsupported LLM endpoint type.")

    except requests.exceptions.RequestException as e:
        print(f"LLM API call failed: {e}")
        return {}

    end_time = time.perf_counter()

    ttft = first_token_time - start_time if first_token_time is not None else 0
    tlft = end_time - start_time
    tps = total_output_tokens / (tlft - ttft) if (tlft - ttft) > 0 else 0

    print(f"\n\n--- Latency Report ---")
    print(f"Total Duration (TLFT): {tlft:.2f} seconds")
    print(f"Time to First Token (TTFT): {ttft:.2f} seconds")
    print(f"Output Tokens: {total_output_tokens}")
    print(f"Tokens/Second (post-TTFT): {tps:.2f}")

    return {
        "ttft": ttft,
        "tlft": tlft,
        "output_tokens": total_output_tokens,
        "tps": tps
    }

# --- Example Usage ---
if __name__ == "__main__":
    benchmark_prompt = "Explain the concept of quantum entanglement in simple terms, keep the answer to around 200 words."
    
    print("\n--- Profiling Ollama (Local) ---")
    ollama_latency = profile_llm_latency(
        prompt=benchmark_prompt,
        llm_endpoint=OLLAMA_API_URL,
        model_name=TARGET_MODEL,
        max_output_tokens=300
    )
    
    # You could run this again for LM Studio or OpenAI API
    # print("\n--- Profiling LM Studio (Local OpenAI-compatible) ---")
    # lm_studio_latency = profile_llm_latency(
    #     prompt=benchmark_prompt,
    #     llm_endpoint=OPENAI_API_URL,
    #     model_name="local-model", # Model name for LM Studio
    #     max_output_tokens=300
    # )
```

---

## Factors Affecting Latency

-   **Network Overhead**: The time it takes for your request to reach the LLM server and for tokens to stream back.
-   **Input Token Count**: Larger input prompts require more processing time, directly increasing TTFT.
-   **Model Load Time**: On local systems, the time it takes to load a model into VRAM/RAM can contribute significantly to initial latency.
-   **Model Size and Quantization**: Smaller and more aggressively quantized models generally have lower TTFT and higher t/s, leading to better TLFT.

---

:::tip[Optimize TTFT for Perceived Speed]
Users often perceive an application as faster if the TTFT is low, even if the total generation time (TLFT) is similar. Optimize your TTFT by keeping input prompts concise and leveraging fast LLMs and hardware.
:::

:::warning[Streaming is Essential]
Always use streaming API calls when measuring TTFT or delivering LLM output to users. Non-streaming calls will only provide TLFT, as you wait for the entire response before receiving anything.
:::