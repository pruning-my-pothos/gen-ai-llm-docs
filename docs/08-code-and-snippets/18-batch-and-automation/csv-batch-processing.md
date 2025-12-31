---
title: "CSV Batch Processing with LLMs"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["batch-processing", "csv", "data-enrichment", "automation", "python"]
last_reviewed: "2025-12-31"
---

# CSV Batch Processing with LLMs

Many business datasets are stored in CSV (Comma Separated Values) format. Leveraging Large Language Models for batch processing of these CSVs can automate tasks like data cleaning, categorization, summarization of text fields, or data enrichment. This guide demonstrates how to read a CSV, process its rows with an LLM in parallel, and write the augmented data to a new CSV file.

:::info[The Goal: Automated Data Transformation]
The objective is to automate the processing of structured data by applying LLM capabilities (e.g., understanding, summarization, categorization) to each row or specific fields within a CSV dataset.
:::

---

## Why Process CSVs with LLMs?

-   **Data Enrichment**: Add new, derived columns (e.g., sentiment, keywords, summaries).
-   **Categorization/Tagging**: Classify free-form text into predefined categories.
-   **Data Cleaning**: Identify and correct errors or inconsistencies in text fields.
-   **Translation**: Translate columns of text into other languages.

---

## The Workflow

1.  **Read Input CSV**: Load the data from your source CSV file.
2.  **Define LLM Task**: For each row/field, define the prompt you'll send to the LLM.
3.  **Process in Parallel**: Send multiple LLM requests concurrently to speed up processing.
4.  **Handle Errors**: Gracefully manage failed LLM calls, rate limits, or invalid outputs.
5.  **Write Output CSV**: Save the original data along with the LLM's new insights to a new CSV.

---

## Python Code Example: Summarizing Product Reviews

This script will read a CSV of product reviews, use a local LLM to summarize each review, and save the results to a new CSV. It uses `asyncio` for parallel processing.

### Prerequisites

-   Ensure you have an OpenAI-compatible local LLM server running (e.g., Ollama, LM Studio) and a model loaded (e.g., `llama3`).
-   Install necessary Python libraries: `httpx` (for async requests), `pandas` (for CSV handling), `tqdm` (for progress bar).
    ```bash
    pip install httpx pandas tqdm
    ```

### Code

```python
import asyncio
import httpx
import pandas as pd
import csv
from tqdm.asyncio import tqdm
from typing import List, Dict, Any, Optional
import os # Added import for os.path.exists

# --- Configuration ---
INPUT_CSV_PATH = "product_reviews.csv"
OUTPUT_CSV_PATH = "product_reviews_summarized.csv"
LOCAL_LLM_ENDPOINT = "http://localhost:11434/v1/chat/completions" # e.g., Ollama
LOCAL_MODEL_NAME = "llama3"
LLM_MAX_TOKENS = 80 # Max tokens for the summary
MAX_CONCURRENT_REQUESTS = 5 # Adjust based on your local LLM's capacity

# --- Dummy Input CSV ---
def create_dummy_csv(filepath: str):
    """Creates a dummy CSV file for testing."""
    data = [
        {"id": 1, "product": "Smartphone", "review": "Great phone, but the battery life is a bit short. Camera is amazing!", "category": "Electronics"},
        {"id": 2, "product": "Coffee Maker", "review": "Makes decent coffee, but it's very noisy. Easy to clean though.", "category": "Kitchen"},
        {"id": 3, "product": "Running Shoes", "review": "Super comfortable for long runs. A bit pricey but worth it.", "category": "Apparel"},
        {"id": 4, "product": "Headphones", "review": "Sound quality is superb, but they hurt my ears after an hour of use.", "category": "Electronics"},
        {"id": 5, "product": "Book: AI for Beginners", "review": "Very informative and easy to understand. Highly recommend for newcomers to AI.", "category": "Books"},
    ]
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)

# --- LLM Call Function (adapted from parallelism-basics.md) ---
async def call_llm_async(messages: List[Dict[str, str]], model_name: str) -> Optional[str]:
    """Makes an asynchronous LLM API call."""
    payload = {
        "model": model_name,
        "messages": messages,
        "max_tokens": LLM_MAX_TOKENS,
        "temperature": 0.3, # Keep summaries concise
        "stream": False
    }
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(LOCAL_LLM_ENDPOINT, json=payload)
            response.raise_for_status()
            return response.json()['choices'][0]['message']['content']
    except httpx.RequestError as e:
        print(f"Error calling LLM for prompt: {messages[-1]['content'][:50]}... - {e}")
        return None

async def summarize_review(row: Dict[str, Any]) -> Dict[str, Any]:
    """Processes a single review row with an LLM for summarization."""
    review_text = row["review"]
    prompt_messages = [
        {"role": "system", "content": "You are a helpful assistant. Summarize the following product review concisely."},
        {"role": "user", "content": f"Product: {row['product']}\nReview: {review_text}"}
    ]
    
    summary = await call_llm_async(prompt_messages, LOCAL_MODEL_NAME)
    
    # Add new fields to the row
    row["llm_summary"] = summary if summary else "Error: Could not summarize."
    
    # Example for categorization
    # category_prompt = [... for categorization...]
    # category_response = await call_llm_async(category_prompt, LOCAL_MODEL_NAME)
    # row["llm_category"] = category_response if category_response else "Unknown"
    
    return row

async def main():
    # 1. Ensure dummy CSV exists
    if not os.path.exists(INPUT_CSV_PATH):
        print(f"Creating dummy CSV: {INPUT_CSV_PATH}")
        create_dummy_csv(INPUT_CSV_PATH)

    # 2. Read Input CSV
    df_input = pd.read_csv(INPUT_CSV_PATH)
    print(f"Loaded {len(df_input)} reviews from {INPUT_CSV_PATH}")

    # 3. Prepare tasks for parallel processing
    tasks = []
    for _, row in df_input.iterrows():
        tasks.append(summarize_review(row.to_dict())) # Convert row to dict
    
    # Use a semaphore to limit concurrent requests
    semaphore = asyncio.Semaphore(MAX_CONCURRENT_REQUESTS)

    async def sem_task(task_coro):
        async with semaphore:
            return await task_coro
            
    # Process reviews in parallel with a progress bar
    processed_rows = await tqdm(asyncio.gather(*[sem_task(t) for t in tasks]), total=len(tasks), desc="Summarizing reviews")

    # 4. Write Output CSV
    df_output = pd.DataFrame(processed_rows)
    df_output.to_csv(OUTPUT_CSV_PATH, index=False, encoding='utf-8')
    print(f"\nSummarized reviews saved to {OUTPUT_CSV_PATH}")

if __name__ == "__main__":
    print("--- Starting CSV Batch Processing with LLMs ---")
    asyncio.run(main())

```

---

## 4. How to Run

1.  **Ensure Local LLM is Running**: Make sure your local LLM server (e.g., Ollama with `llama3`) is active.
2.  **Save Code**: Save the script above as `process_reviews.py`.
3.  **Execute**:
    ```bash
    python process_reviews.py
    ```
    A `product_reviews_summarized.csv` file will be created with the LLM-generated summaries.

---

:::tip[Handling Large CSVs]
For very large CSVs, consider processing them in chunks (e.g., 1000 rows at a time) rather than loading the entire file into memory. Also, implement robust error logging and resume functionality.
:::

:::warning[Rate Limits & Cost]
When using cloud LLM APIs for batch processing, be extremely mindful of rate limits and costs. Parallel processing can quickly exhaust your budget or hit API limits. Implement exponential backoff and careful budgeting.
:::