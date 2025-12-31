---
title: "Tokens-per-Second (t/s) Benchmark"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["performance", "benchmark", "llm-inference", "metrics"]
last_reviewed: "2025-12-31"
---

# Tokens-per-Second (t/s) Benchmark

Tokens-per-second (t/s) is the primary metric for measuring the raw generation speed of a Large Language Model. It quantifies how many output tokens an LLM can generate within one second, directly impacting the perceived responsiveness and overall user experience of your LLM application.

:::info[The Goal: Quantify LLM Inference Speed]
The objective is to objectively measure the throughput of your LLM, helping you compare different models, quantization levels, and hardware configurations to optimize for speed.
:::

---

## 1. Measuring t/s with Ollama

Ollama conveniently provides the tokens-per-second metric directly in its command-line interface when you run a model.

```bash
ollama run llama3 "Explain the concept of quantum entanglement in simple terms, keep the answer to around 200 words."
```

**Example Output from Ollama:**
```
Explain the concept of quantum entanglement in simple terms, keep the answer to around 200 words.
Quantum entanglement is a bizarre phenomenon where two or more particles become linked...
... (full response) ...
model: llama3
...
load duration: 2.128827708s
prompt eval count: 32 token(s)
prompt eval duration: 174.453ms
prompt eval rate: 183.43 token/s
eval count: 180 token(s)
eval duration: 1.096316s
eval rate: 164.15 token/s  # This is your tokens-per-second
total duration: 1.272583s
```
The `eval rate` is the tokens-per-second (t/s) for generation.

---

## 2. Measuring t/s with Python (API Calls)

When calling an LLM via an API (e.g., a local Ollama server, OpenAI, etc.), you can calculate t/s by tracking the time taken for generation and counting the output tokens.

### Python Implementation

```python
import time
import requests
import json
import tiktoken # pip install tiktoken (for accurate token counting)
from typing import List, Dict

# ---
Configuration ---
# Replace with your actual LLM endpoint and model
OLLAMA_API_URL = "http://localhost:11434/api/chat"
OPENAI_API_URL = "http://localhost:1234/v1/chat/completions" # For LM Studio or OpenAI API
TARGET_MODEL = "llama3" # Or "gpt-3.5-turbo", etc.
TARGET_ENCODING = "cl100k_base" # For tiktoken counting

# Function to count tokens in a string (from token-count-python.md)
def count_string_tokens(text: str, encoding_name: str = TARGET_ENCODING) -> int:
    encoding = tiktoken.get_encoding(encoding_name)
    return len(encoding.encode(text))

def benchmark_tokens_per_second(
    prompt: str,
    llm_endpoint: str,
    model_name: str,
    max_output_tokens: int = 200,
    num_runs: int = 3
) -> float:
    """
    Measures the average tokens-per-second for an LLM call.
    """
    all_tps = []

    for _ in range(num_runs):
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
        
        payload = {
            "model": model_name,
            "messages": messages,
            "max_tokens": max_output_tokens,
            "stream": False # Ensure non-streaming for simple total time measurement
        }

        start_time = time.time()
        try:
            if "ollama" in llm_endpoint:
                response = requests.post(llm_endpoint, json=payload)
                response.raise_for_status()
                response_json = response.json()
                generated_text = response_json['message']['content']
            elif "openai" in llm_endpoint or "v1/chat/completions" in llm_endpoint:
                headers = {"Content-Type": "application/json"}
                # For OpenAI API, also include API key in headers if needed
                # headers["Authorization"] = f"Bearer {os.getenv('OPENAI_API_KEY')}"
                response = requests.post(llm_endpoint, headers=headers, json=payload)
                response.raise_for_status()
                response_json = response.json()
                generated_text = response_json['choices'][0]['message']['content']
            else:
                raise ValueError("Unsupported LLM endpoint type.")

        except requests.exceptions.RequestException as e:
            print(f"LLM API call failed: {e}")
            continue

        end_time = time.time()
        
        # Count actual generated tokens (not requested max_tokens)
        generated_tokens_count = count_string_tokens(generated_text, TARGET_ENCODING)
        
        duration = end_time - start_time
        
        if duration > 0:
            tps = generated_tokens_count / duration
            all_tps.append(tps)
            print(f"Run finished. Generated {generated_tokens_count} tokens in {duration:.2f}s. TPS: {tps:.2f}")
        else:
            print("Duration was zero, cannot calculate TPS.")

    if all_tps:
        avg_tps = sum(all_tps) / len(all_tps)
        print(f"\nAverage TPS over {len(all_tps)} runs: {avg_tps:.2f}")
        return avg_tps
    return 0.0

# ---
Example Usage ---
if __name__ == "__main__":
    benchmark_prompt = "Generate a detailed and long response about the history of artificial intelligence, covering key milestones from its inception to modern deep learning advancements. Aim for 500 words."
    
    print("\n---
Benchmarking Ollama (Local) ---")
    ollama_avg_tps = benchmark_tokens_per_second(
        prompt=benchmark_prompt,
        llm_endpoint=OLLAMA_API_URL,
        model_name=TARGET_MODEL,
        max_output_tokens=300 # Request a consistent output length
    )

    # You could run this again for LM Studio or OpenAI API
    # print("\n---
Benchmarking LM Studio (Local OpenAI-compatible) ---")
    # lm_studio_avg_tps = benchmark_tokens_per_second(
    #     prompt=benchmark_prompt,
    #     llm_endpoint=OPENAI_API_URL,
    #     model_name="local-model", # Model name for LM Studio
    #     max_output_tokens=300
    # )
```

---

## Factors Affecting Tokens-per-Second

-   **Model Size and Quantization**: Smaller models and lower quantization levels (e.g., `Q4_K_M`) generally result in higher t/s. (See [Quantization Basics](./../04-model-management/quantization-basics.md)).
-   **Hardware**: A powerful GPU or Apple Silicon's Neural Engine dramatically increases t/s compared to running on CPU.
-   **Context Window**: Extremely long input prompts can slightly reduce t/s due to increased prompt processing time.
-   **Batch Size**: For multiple concurrent requests, batching can improve overall throughput but might affect individual request latency.

---

:::tip[Consistent Benchmarking]
For meaningful comparisons, ensure your benchmark:
-   Uses the **same prompt and expected output length**.
-   Runs in an **isolated environment** with minimal background processes.
-   Averages results over **multiple runs**.
:::

:::warning[t/s vs. Latency]
Tokens-per-second measures throughput after the generation starts. It doesn't tell you about **Time to First Token (TTFT)**, which is how long it takes for the *first word* of the response to appear. A high t/s is good, but a high TTFT can still make your application feel slow. (See [Latency Profiling](./latency-profiling-mini.md)).
:::