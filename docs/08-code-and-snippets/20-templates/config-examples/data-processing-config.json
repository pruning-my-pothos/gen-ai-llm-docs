---
title: "Batch Data Processing Configuration Example"
archetype: "template"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["configuration", "batch-processing", "template", "json"]
last_reviewed: "2025-12-31"
---

# Batch Data Processing Configuration Example

This template provides a structured JSON file to configure batch data processing tasks that leverage Large Language Models. It defines the inputs, outputs, the specific LLM task, and various processing parameters, enabling repeatable and automated data transformation workflows.

:::info[The Goal: Automated LLM-driven Data Workflows]
The objective is to define and execute batch jobs that read large datasets, apply LLM intelligence (e.g., summarization, categorization, extraction), and store the enhanced data, all managed through a declarative configuration.
:::

---

## Template: `data_processing_config.json`

```json
{
  "task_name": "ProductReviewSummarization",
  "description": "Summarizes product reviews from a CSV file using an LLM.",
  
  "input": {
    "type": "csv", # or "jsonl", "directory"
    "path": "./data/raw_product_reviews.csv",
    "encoding": "utf-8",
    "delimiter": ",",
    "headers": true,
    "text_column": "review_text" # The column containing text to process
  },
  
  "output": {
    "type": "csv", # or "jsonl", "directory"
    "path": "./results/summarized_product_reviews.csv",
    "add_timestamp_suffix": true, # e.g., summarized_product_reviews_20251231.csv
    "columns_to_add": ["llm_summary", "llm_category"] # New columns to append
  },
  
  "llm_task": {
    "type": "chat_completion", # or "text_completion", "embedding"
    "system_prompt": "You are an expert product review summarizer. Provide a concise summary and categorize the sentiment (positive, neutral, negative). Output JSON.",
    "user_prompt_template": "Summarize the following review: {review_text}\n\nSummary and Sentiment:",
    "output_parser_schema": { # Optional: JSON Schema for LLM output validation
      "type": "object",
      "properties": {
        "summary": {"type": "string"},
        "sentiment": {"type": "string", "enum": ["positive", "neutral", "negative"]}
      },
      "required": ["summary", "sentiment"]
    }
  },
  
  "llm_config": {
    "provider": "ollama",
    "model": "llama3",
    "api_endpoint": "http://localhost:11434/v1/chat/completions",
    "temperature": 0.3,
    "max_tokens": 100
  },
  
  "processing_settings": {
    "parallelism_strategy": "asyncio", # or "threading", "sequential"
    "max_concurrent_requests": 5,
    "error_handling": "skip_row", # or "retry_with_feedback", "fail_job"
    "caching_enabled": true,
    "cache_path": "./cache/llm_batch_cache.json"
  },

  "logging": {
    "level": "INFO",
    "output_file": "./logs/batch_processing.log",
    "log_llm_metrics": true,
    "pii_redaction_enabled": true
  }
}
```

---

## How to Use

1.  **Save**: Save this content as `data_processing_config.json` (or similar name) in your project.
2.  **Customize**: Adjust input/output paths, LLM task details, LLM configuration (referencing `llm-api-config.yaml` as needed), and processing settings.
3.  **Implement Processor**: Write a Python script that:
    *   Loads this JSON file using the `json` module.
    *   Reads data according to `input` configuration.
    *   Constructs prompts using `llm_task`.
    *   Calls the LLM with `llm_config` parameters, utilizing parallelism from `processing_settings`.
    *   Validates LLM output against `llm_task.output_parser_schema` (if provided).
    *   Writes results according to `output` configuration.
    *   Integrates logging based on `logging` settings.

---

:::tip[Idempotency with Caching]
For batch jobs, enable caching. This ensures that if the job is rerun, it only processes new or changed data, saving costs and time. The `cache_path` setting above supports this.
:::

:::warning[Resource Consumption]
Batch processing, especially with high `max_concurrent_requests`, can be very resource-intensive for your local LLM server. Monitor your system's CPU, RAM, and GPU usage during runs.
:::
