---
title: "Capturing LLM Run Metadata and Configuration"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["logging", "observability", "reproducibility", "debugging", "configuration"]
last_reviewed: "2025-12-31"
---

# Capturing LLM Run Metadata and Configuration

For robust LLM applications, logging extends beyond just prompts and responses. Capturing contextual metadata—such as the specific model used, its parameters, and application-level details—is crucial for debugging, auditing, comparing experiments, and ensuring reproducibility.

:::info[The Goal: Full Context for Every LLM Call]
The objective is to create comprehensive log entries that provide a complete picture of "who, what, when, and how" for each LLM interaction, enabling deeper analysis and easier troubleshooting.
:::

---

## Why Capture Metadata?

-   **Reproducibility**: Exactly recreate the conditions of an LLM call to debug an issue or replicate a result.
-   **Debugging**: Quickly identify if an issue is caused by a specific model version, parameter setting, or application configuration.
-   **Experiment Tracking**: Compare the performance of different prompts, models, or RAG configurations over time.
-   **Auditing**: Trace back an LLM's response to the exact input and configuration that generated it.
-   **Performance Analysis**: Correlate specific configurations with performance metrics like latency and token counts.

---

## Key Metadata to Capture

| Category | Example Fields | Description |
| :--- | :--- | :--- |
| **LLM Configuration** | `model_name`, `temperature`, `top_p`, `seed`, `max_tokens`, `stop_sequences`, `quantization_level` | The exact LLM and its generation parameters used for the call. |
| **Application Context** | `app_name`, `app_version`, `user_id` (anonymized), `session_id`, `request_type` | Context from your application, linking the LLM call to its origin. |
| **RAG Context (if applicable)** | `retriever_id`, `reranker_id`, `num_retrieved_chunks`, `chunk_strategy` | Details about the RAG pipeline used to fetch context for the prompt. |
| **Environment** | `hostname`, `python_version`, `framework_version` | Low-level environment details that might affect performance or behavior. |

---

## Python Code Example: Structured Logging with Full Metadata

This function extends the structured logging approach to include a rich set of metadata, building on the example from [Logging LLM Prompts and Outputs](./prompt-output-logging.md).

```python
import logging
import sys
import time
import uuid
import json
import platform
from typing import List, Dict, Any, Optional

# --- Logger Setup (from prompt-output-logging.md) ---
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO) 
if logger.hasHandlers():
    logger.handlers.clear()
handler = logging.StreamHandler(sys.stdout)
formatter = logging.Formatter('%(message)s') # Simple format for structured log output
handler.setFormatter(formatter)
logger.addHandler(handler)

# --- Dummy LLM Call (replace with actual client) ---
def call_llm_dummy(messages: List[Dict[str, str]]) -> Dict[str, Any]:
    """Simulates an LLM API call."""
    return {"choices": [{"message": {"role": "assistant", "content": "This is a dummy response."}}]}


def log_llm_interaction_with_metadata(
    request_id: str,
    messages: List[Dict[str, str]],
    llm_raw_response: Dict[str, Any],
    parsed_output: Any,
    llm_config: Dict[str, Any], # LLM specific parameters
    app_context: Dict[str, Any], # Application specific context
    rag_context_meta: Optional[Dict[str, Any]] = None, # RAG specific details
):
    """
    Logs a comprehensive, structured entry for an LLM interaction with rich metadata.
    """
    log_entry = {
        "event": "llm_interaction_full",
        "request_id": request_id,
        "timestamp": time.time(),
        "application": {
            "name": app_context.get("app_name", "unknown_app"),
            "version": app_context.get("app_version", "unknown"),
            "user_id": app_context.get("user_id", "anonymous"),
            "session_id": app_context.get("session_id", "unknown"),
            "request_type": app_context.get("request_type", "chat"),
            "hostname": platform.node(),
            "python_version": platform.python_version()
        },
        "llm_config": llm_config, # e.g., model_name, temperature, top_p, seed
        "rag_meta": rag_context_meta, # e.g., retriever, num_chunks, reranker
        "prompt_messages": messages,
        "llm_raw_response": llm_raw_response,
        "parsed_output": parsed_output,
    }
    logger.info(json.dumps(log_entry))


# --- Example Usage ---
if __name__ == "__main__":
    current_request_id = str(uuid.uuid4())
    
    # Simulate LLM configuration
    llm_configuration = {
        "model_name": "llama3:8b-instruct",
        "temperature": 0.7,
        "top_p": 0.9,
        "seed": 123,
        "max_tokens": 200
    }

    # Simulate application context
    application_context = {
        "app_name": "MyLLMChatApp",
        "app_version": "1.2.0",
        "user_id": "usr_abc123", # Anonymize PII!
        "session_id": "sess_xyz456",
        "request_type": "chat_response"
    }

    # Simulate RAG metadata
    rag_metadata = {
        "retriever": "ChromaDB-mini-rag-docs",
        "reranker": "cross-encoder/ms-marco-MiniLM-L-6-v2",
        "num_retrieved_chunks": 3,
        "chunking_strategy": "RecursiveCharacterTextSplitter"
    }

    messages_to_send = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is the capital of France?"}
    ]

    llm_response_data = call_llm_dummy(messages_to_send)
    parsed_content = llm_response_data["choices"][0]["message"]["content"]

    log_llm_interaction_with_metadata(
        request_id=current_request_id,
        messages=messages_to_send,
        llm_raw_response=llm_response_data,
        parsed_output=parsed_content,
        llm_config=llm_configuration,
        app_context=application_context,
        rag_context_meta=rag_metadata
    )
    print("\nCheck logs for detailed structured output.")
```

---

:::tip[Use Experiment Tracking Platforms]
For more advanced experiment management, consider integrating with dedicated platforms like MLflow, Weights & Biases, or LangChain's LangSmith. These tools are built to capture and visualize LLM runs and their associated metadata.
:::

:::warning[PII and Sensitive Data]
Always ensure any user-related metadata (like `user_id`) is anonymized or hashed *before* logging. Never log raw PII or sensitive internal configuration (like API keys) to your logs. (See [PII Redaction Basics](./pii-redaction-basics.md)).
:::