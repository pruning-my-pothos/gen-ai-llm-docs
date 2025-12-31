---
title: "Logging LLM Prompts and Outputs"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["logging", "observability", "debugging", "llm-ops"]
last_reviewed: "2025-12-31"
---

# Logging LLM Prompts and Outputs

Logging the inputs (prompts) and outputs of your LLM calls is fundamental for debugging, auditing, fine-tuning, and performance monitoring. This guide demonstrates how to effectively log these interactions in a structured manner using Python's built-in `logging` module.

:::info[The Goal: Visibility into LLM Interactions]
The objective is to gain insights into how your LLM is responding to various inputs, helping you identify issues, improve prompt engineering, and track model behavior over time.
:::

---

## 1. Setting Up Basic Logging

Python's `logging` module is highly flexible. For LLM applications, consider setting up a dedicated logger that can output to both console and a file.

```python
import logging
import sys

# Configure a basic logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO) # Set the minimum level to log

# Create a console handler
handler = logging.StreamHandler(sys.stdout)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

# You can also add a FileHandler for persistent logs
# file_handler = logging.FileHandler('llm_interactions.log')
# file_handler.setFormatter(formatter)
# logger.addHandler(file_handler)
```

---

## 2. Logging LLM Prompts and Responses

When logging, aim for structured information that includes the prompt (messages list for chat APIs), the raw LLM response, and any parsed output. Including unique request IDs helps correlate logs across different parts of your application.

```python
import json
from typing import List, Dict, Any

# Assume a simple LLM client function (replace with your actual client)
def call_llm(messages: List[Dict[str, str]]) -> Dict[str, Any]:
    """Simulates an LLM API call."""
    # In a real app, this would be an API call to OpenAI, Ollama, etc.
    # For demonstration, a simple placeholder response
    if "Python" in messages[-1]['content']:
        return {"choices": [{"message": {"role": "assistant", "content": "Python is a high-level, interpreted programming language."}}]}
    else:
        return {"choices": [{"message": {"role": "assistant", "content": "The capital of France is Paris."}}]}


def log_llm_interaction(
    request_id: str,
    messages: List[Dict[str, str]],
    llm_raw_response: Dict[str, Any],
    parsed_output: Any,
    model_name: str
):
    """
    Logs a structured entry for an LLM interaction.
    """
    logger.info(
        json.dumps({
            "event": "llm_interaction",
            "request_id": request_id,
            "model": model_name,
            "prompt_messages": messages,
            "llm_raw_response": llm_raw_response,
            "parsed_output": parsed_output,
            "timestamp": time.time() # Added for completeness
        })
    )

# --- Example Usage ---
import time
import uuid

# Re-configure logger to not add handlers multiple times if running in a notebook/REPL
logger.handlers.clear()
handler = logging.StreamHandler(sys.stdout)
formatter = logging.Formatter('%(message)s') # Simpler format for structured log output
handler.setFormatter(formatter)
logger.addHandler(handler)


if __name__ == "__main__":
    model = "gpt-3.5-turbo"

    # --- Interaction 1 ---
    req_id_1 = str(uuid.uuid4())
    messages_1 = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is the capital of France?"}
    ]
    
    llm_response_1 = call_llm(messages_1)
    parsed_output_1 = llm_response_1["choices"][0]["message"]["content"] # Extract content
    
    log_llm_interaction(req_id_1, messages_1, llm_response_1, parsed_output_1, model)


    # --- Interaction 2 ---
    req_id_2 = str(uuid.uuid4())
    messages_2 = [
        {"role": "system", "content": "You are a Python programming expert."},
        {"role": "user", "content": "Explain what Python is."}
    ]
    
    llm_response_2 = call_llm(messages_2)
    parsed_output_2 = llm_response_2["choices"][0]["message"]["content"] # Extract content
    
    log_llm_interaction(req_id_2, messages_2, llm_response_2, parsed_output_2, model)
```

---

:::tip[Structured Logging is Your Friend]
Logging in JSON format (as shown above) makes it much easier to parse, filter, and analyze your logs with tools like `jq`, Splunk, or Elastic Stack. Include relevant fields like `request_id`, `model`, `timestamp`, and the actual prompt/response content.
:::

:::warning[PII and Security]
Be extremely careful about logging Personally Identifiable Information (PII) from user prompts or LLM responses. Implement robust PII redaction *before* logging to protect user privacy and comply with data regulations. (See [PII Redaction Basics](./pii-redaction-basics.md)).
:::