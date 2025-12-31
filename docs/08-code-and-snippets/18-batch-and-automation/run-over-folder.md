---
title: "LLM Processing Over a Folder of Files"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["batch-processing", "automation", "files", "python", "data-extraction"]
last_reviewed: "2025-12-31"
---

# LLM Processing Over a Folder of Files

Many applications involve processing unstructured data stored across multiple files in a directory. Leveraging Large Language Models to analyze, summarize, or extract information from these files in an automated batch process can be incredibly powerful. This guide demonstrates how to iterate through a folder, process each text file with an LLM, and save the results.

:::info[The Goal: Automated Unstructured Data Analysis]
The objective is to automate the analysis and transformation of content across a collection of documents, extracting insights or generating summaries without manual intervention.
:::

---

## The Workflow

1.  **Scan Input Directory**: Identify all relevant files (e.g., `.txt`, `.md`, `.pdf` after conversion) in a specified folder.
2.  **Read File Content**: Load the text content of each file.
3.  **Define LLM Task**: Formulate the prompt for the LLM based on the file's content (e.g., "Summarize this document").
4.  **Process in Parallel**: Send these tasks to the LLM concurrently to speed up the overall process.
5.  **Save Output**: Store the LLM's response for each file in a designated output directory, maintaining a link to the original filename.

---

## Python Code Example: Summarizing Documents in a Folder

This script will read all text files in an input directory, use a local LLM to summarize each document, and save the summaries to an output directory. It uses `asyncio` for parallel processing.

### Prerequisites

-   Ensure you have an OpenAI-compatible local LLM server running (e.g., Ollama, LM Studio) and a model loaded (e.g., `llama3`).
-   Install necessary Python libraries: `httpx` (for async requests), `tqdm` (for progress bar).
    ```bash
    pip install httpx tqdm
    ```

### Code

```python
import asyncio
import httpx
import os
import glob
from tqdm.asyncio import tqdm
from typing import List, Dict, Any, Optional

# ---
Configuration ---
INPUT_DIR = "input_docs"
OUTPUT_DIR = "output_summaries"
LOCAL_LLM_ENDPOINT = "http://localhost:11434/v1/chat/completions" # e.g., Ollama
LOCAL_MODEL_NAME = "llama3"
LLM_MAX_TOKENS = 150 # Max tokens for the summary
MAX_CONCURRENT_REQUESTS = 5 # Adjust based on your local LLM's capacity

# ---
LLM Call Function (adapted from parallelism-basics.md) ---
async def call_llm_async(messages: List[Dict[str, str]], model_name: str) -> Optional[str]:
    """Makes an asynchronous LLM API call."""
    payload = {
        "model": model_name,
        "messages": messages,
        "max_tokens": LLM_MAX_TOKENS,
        "temperature": 0.3, 
        "stream": False
    }
    try:
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(LOCAL_LLM_ENDPOINT, json=payload)
            response.raise_for_status()
            return response.json()['choices'][0]['message']['content']
    except httpx.RequestError as e:
        print(f"Error calling LLM: {e}")
        return None

async def process_document(filepath: str) -> Optional[Dict[str, str]]:
    """Reads a document, summarizes it with LLM, and returns original path and summary."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        prompt_messages = [
            {"role": "system", "content": "You are a helpful assistant. Summarize the following document concisely."},
            {"role": "user", "content": f"Document Title: {os.path.basename(filepath)}\nDocument Content:\n{content}"}
        ]
        
        summary = await call_llm_async(prompt_messages, LOCAL_MODEL_NAME)
        
        if summary:
            return {"filepath": filepath, "summary": summary}
        else:
            return None
            
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return None

async def main():
    # Ensure input and output directories exist
    os.makedirs(INPUT_DIR, exist_ok=True)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # 1. Simulate dummy input documents
    if not any(os.path.isfile(os.path.join(INPUT_DIR, f)) for f in os.listdir(INPUT_DIR)):
        print(f"Creating dummy documents in {INPUT_DIR}...")
        with open(os.path.join(INPUT_DIR, "doc1.txt"), "w") as f:
            f.write("Artificial intelligence (AI) is intelligence demonstrated by machines, unlike the natural intelligence displayed by humans and animals. Leading AI textbooks define the field as the study of 'intelligent agents'.")
        with open(os.path.join(INPUT_DIR, "doc2.md"), "w") as f:
            f.write("## Quantum Computing\nQuantum computers are a new type of computer that use the principles of quantum mechanics to solve problems that classical computers cannot.")
        with open(os.path.join(INPUT_DIR, "doc3.txt"), "w") as f:
            f.write("The capital of France is Paris. It is known for its art, culture, and iconic landmarks like the Eiffel Tower.")

    # 2. Scan Input Directory for text files
    filepaths = glob.glob(os.path.join(INPUT_DIR, "*.txt")) + glob.glob(os.path.join(INPUT_DIR, "*.md"))
    if not filepaths:
        print(f"No text files found in {INPUT_DIR}. Please add some.")
        return

    print(f"Found {len(filepaths)} documents to process in {INPUT_DIR}")

    # 3. Prepare tasks for parallel processing with semaphore
    semaphore = asyncio.Semaphore(MAX_CONCURRENT_REQUESTS)

    async def sem_task(filepath_arg):
        async with semaphore:
            return await process_document(filepath_arg)
            
    # Process documents in parallel with a progress bar
    processed_results = await tqdm(asyncio.gather(*[sem_task(fp) for fp in filepaths]), total=len(filepaths), desc="Summarizing documents")

    # 4. Save Output
    for result in processed_results:
        if result:
            original_filename = os.path.basename(result["filepath"])
            output_filename = os.path.join(OUTPUT_DIR, f"summary_{original_filename}")
            with open(output_filename, 'w', encoding='utf-8') as f:
                f.write(result["summary"])
            print(f"Saved summary for {original_filename} to {output_filename}")
        else:
            print(f"Skipped a file due to processing error.")

if __name__ == "__main__":
    print("--- Starting LLM Processing Over a Folder ---")
    asyncio.run(main())

```

---

## 4. How to Run

1.  **Ensure Local LLM is Running**: Make sure your local LLM server (e.g., Ollama with `llama3`) is active.
2.  **Save Code**: Save the script above as `process_folder.py`.
3.  **Execute**:
    ```bash
    python process_folder.py
    ```
    Dummy input files will be created if the `input_docs` folder is empty, and summaries will be saved in the `output_summaries/` directory.

---

:::tip[Handling Different File Types]
For non-plain-text files (e.g., PDF, DOCX, images), you'll need a preprocessing step to convert them into extractable text before feeding them to the LLM. Libraries like `PyPDF2`, `python-docx`, or OCR (Optical Character Recognition) tools can be used for this.
:::

:::warning[Rate Limits & Cost]
As with CSV batch processing, be extremely careful about rate limits and costs when processing many files with cloud LLM APIs. Parallel processing can quickly exhaust your budget or hit API limits. Implement exponential backoff and careful budgeting.
:::