---
title: "Logging Tokens and Latency"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["logging", "observability", "metrics", "cost-optimization", "performance"]
last_reviewed: "2025-12-31"
---

# Logging Tokens and Latency

Beyond just logging prompts and outputs, capturing quantitative metrics like token counts and latency for each LLM interaction is crucial. These metrics provide invaluable insights for cost optimization, performance analysis, capacity planning, and identifying bottlenecks in your LLM application.

:::info[The Goal: Quantifiable Insights]
The objective is to turn every LLM call into a data point that can be analyzed to understand application costs, responsiveness, and efficiency, enabling data-driven optimization.
:::

---

## Why Log Tokens and Latency?

-   **Cost Management**: Monitor and optimize API costs by tracking input and output token usage. Identify expensive prompts or models.
-   **Performance Optimization**: Pinpoint slow interactions by analyzing Time to First Token (TTFT) and Time to Last Token (TLFT). Optimize for user perceived speed.
-   **Capacity Planning**: Understand the load on your LLM infrastructure and plan for scaling by analyzing aggregate token usage and request rates.
-   **Debugging**: Correlate performance anomalies with specific prompts or model behaviors.

---

## Python Code Example: Structured Logging with Metrics

This example integrates token counting (from [Token Counting in Python](./../05-token-counting/token-count-python.md)) and latency profiling (from [Latency Profiling](./../13-resource-and-performance/latency-profiling-mini.md)) into structured log entries.

```python
import logging
import sys
import time
import uuid
import json
import requests
import tiktoken # pip install tiktoken
from typing import List, Dict, Any, Optional

# --- Configuration ---
# Replace with your actual LLM endpoint and model
OLLAMA_API_URL = "http://localhost:11434/api/chat"
TARGET_MODEL_FOR_BENCHMARK = "llama3" 
TARGE T_ENCODING_FOR_COUNTING = "cl100k_base" # For tiktoken counting

# --- Logger Setup (from prompt-output-logging.md) ---
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO) 
# Clear existing handlers to prevent duplicate output in notebooks/REPLs
if logger.hasHandlers():
    logger.handlers.clear()
handler = logging.StreamHandler(sys.stdout)
formatter = logging.Formatter('%(message)s') # Simple format for structured log output
handler.setFormatter(formatter)
logger.addHandler(handler)

# --- Token Counting Functions (from token-count-python.md) ---
def count_string_tokens(string: str, encoding_name: str = TARGET_ENCODING_FOR_COUNTING) -> int:
    encoding = tiktoken.get_encoding(encoding_name)
    return len(encoding.encode(string))

def count_chat_message_tokens(messages: List[Dict[str, str]], model: str = TARGET_MODEL_FOR_BENCHMARK) -> int:
    # Simplified version for demonstration. Use the full function from token-count-python.md
    try:
        encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        encoding = tiktoken.get_encoding("cl100k_base")
    
    num_tokens = 0
    for message in messages:
        num_tokens += len(encoding.encode(message.get("content", ""))) # Simplified
    num_tokens += 3 # Priming tokens
    return num_tokens

# --- LLM Call Function with Latency Measurement (adapted from latency-profiling-mini.md) ---
def call_llm_and_measure_latency(
    messages: List[Dict[str, str]],
    llm_endpoint: str,
    model_name: str,
    max_output_tokens: int = 150
) -> Dict[str, Any]:
    """
    Makes an LLM call, measures TTFT/TLFT, and returns response and metrics.
    """
    start_time = time.perf_counter()
    first_token_time: Optional[float] = None
    full_response_text = ""
    total_output_tokens = 0

    try:
        if "ollama" in llm_endpoint:
            payload = {
                "model": model_name,
                "messages": messages,
                "max_tokens": max_output_tokens,
                "stream": True # Crucial for measuring TTFT
            }
            response_stream = requests.post(llm_endpoint, json=payload, stream=True)
            response_stream.raise_for_status()
            for chunk in response_stream.iter_lines():
                if chunk:
                    decoded_chunk = chunk.decode('utf-8')
                    try:
                        json_chunk = json.loads(decoded_chunk)
                        if first_token_time is None:
                            first_token_time = time.perf_counter()
                        if 'content' in json_chunk['message']:
                            token_text = json_chunk['message']['content']
                            full_response_text += token_text
                            total_output_tokens += count_string_tokens(token_text)
                    except json.JSONDecodeError:
                        pass
        else: # Assuming OpenAI-compatible API
            payload = {
                "model": model_name,
                "messages": messages,
                "max_tokens": max_output_tokens,
                "stream": True
            }
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
                            token_text = json_chunk['choices'][0]['delta']['content']
                            full_response_text += token_text
                            total_output_tokens += count_string_tokens(token_text)
                    except json.JSONDecodeError:
                        pass
    except requests.exceptions.RequestException as e:
        logger.error(f"LLM API call failed: {e}")
        return {"error": str(e)}

    end_time = time.perf_counter()

    ttft = first_token_time - start_time if first_token_time is not None else 0
    tlft = end_time - start_time

    return {
        "response_content": full_response_text,
        "input_tokens": count_chat_message_tokens(messages, model_name),
        "output_tokens": total_output_tokens,
        "ttft_seconds": round(ttft, 4),
        "tlft_seconds": round(tlft, 4),
        "tps_overall": round(total_output_tokens / tlft, 4) if tlft > 0 else 0
    }

# --- Main Logging Function ---
def log_llm_metrics(
    request_id: str,
    messages: List[Dict[str, str]],
    model_name: str,
    llm_endpoint: str,
    max_output_tokens: int = 150
):
    """
    Performs an LLM call, measures its metrics, and logs them.
    """
    llm_call_result = call_llm_and_measure_latency(messages, llm_endpoint, model_name, max_output_tokens)

    if "error" in llm_call_result:
        logger.error(json.dumps({
            "event": "llm_call_failed",
            "request_id": request_id,
            "model": model_name,
            "error": llm_call_result["error"],
            "timestamp": time.time(),
            "prompt_messages": messages # Log prompt even on error for debugging
        }))
        return None
    
    # Log all relevant data in a single structured entry
    log_entry = {
        "event": "llm_call_metrics",
        "request_id": request_id,
        "model": model_name,
        "input_tokens": llm_call_result["input_tokens"],
        "output_tokens": llm_call_result["output_tokens"],
        "ttft_seconds": llm_call_result["ttft_seconds"],
        "tlft_seconds": llm_call_result["tlft_seconds"],
        "tps_overall": llm_call_result["tps_overall"],
        "prompt_messages": messages,
        "response_content": llm_call_result["response_content"],
        "timestamp": time.time()
    }
    logger.info(json.dumps(log_entry))
    
    return llm_call_result["response_content"]

# --- Example Usage ---
if __name__ == "__main__":
    messages_to_send = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain the concept of time dilation in a concise paragraph."}
    ]
    
    req_id = str(uuid.uuid4())
    
    print("\n--- Performing LLM call and logging metrics ---")
    response = log_llm_metrics(
        request_id=req_id,
        messages=messages_to_send,
        model_name=TARGET_MODEL_FOR_BENCHMARK,
        llm_endpoint=OLLAMA_API_URL # Or OPENAI_API_URL for LM Studio/OpenAI
    )
    
    if response:
        print(f"\nResponse received: {response[:100]}...")
```

---

## Analyzing Logs

With these structured log entries, you can use log management tools (e.g., ELK Stack, Splunk, Grafana Loki) to:

-   **Dashboard Costs**: Aggregate `input_tokens` and `output_tokens` over time.
-   **Monitor Performance**: Track average and percentile `ttft_seconds` and `tlft_seconds`.
-   **Identify Bottlenecks**: Spot specific prompts or models that consistently have high latency or token counts.
-   **Set Alerts**: Trigger alerts if cost or latency exceeds predefined thresholds.

---

:::tip[Sampling for High Volume]
For very high-volume applications, logging every single LLM interaction might incur significant storage and processing costs for your logging system. Consider implementing a sampling strategy where you only log a percentage of requests (e.g., 10%) or specific types of requests (e.g., only those that fail validation).
:::