---
title: "Building a Golden Prompts Set"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["evaluation", "testing", "golden-set", "prompts"]
last_reviewed: "2025-12-31"
---

# Building a Golden Prompts Set

A "golden prompts set" (or golden dataset) is a crucial artifact for objectively evaluating the performance of your LLM application. It consists of a carefully curated collection of input prompts, along with their expected outputs or associated relevant information. This set serves as your ground truth for testing.

:::info[The Goal: Consistent and Objective Evaluation]
The objective is to create a reliable benchmark that allows you to consistently measure the impact of changes to your prompts, models, or RAG pipeline over time.
:::

---

## Why is a Golden Set Crucial?

-   **Regression Testing**: Detect if new changes (model updates, prompt tweaks, code refactors) degrade performance on known scenarios.
-   **Benchmarking**: Compare different models or prompting strategies objectively.
-   **Quality Assurance**: Ensure your application consistently meets performance and quality standards.
-   **Targeted Improvement**: Identify specific areas where the model struggles.

---

## Characteristics of a Good Golden Set

-   **Representativeness**: Prompts should cover the typical use cases, user questions, and edge cases your application is designed to handle.
-   **Diversity**: Include a variety of topics, prompt styles, and expected output formats.
-   **Clear Expectations**: Each prompt should have a clear "correct" answer, a set of relevant document IDs (for RAG), or specific criteria for evaluation.
-   **Manageable Size**: Start small (e.g., 20-50 prompts) and grow it over time. Avoid making it so large that manual review becomes infeasible.
-   **Maintainability**: Store it in an easy-to-read and easy-to-update format.

---

## Storing Your Golden Prompts

A simple CSV or JSON file is often sufficient for storing your golden set. It should contain at least the input prompt and the expected output or relevant metadata.

### Example Format: JSON Lines (JSONL)

JSON Lines is excellent for this purpose as each line is a valid JSON object, making it easy to stream and parse.

```jsonl
# golden_prompts.jsonl

{"id": "q1", "question": "What is the capital of France?", "expected_answer": "Paris", "relevant_docs": []}
{"id": "q2", "question": "Explain the concept of RAG.", "expected_answer_keywords": ["retrieval", "augmented", "generation", "external knowledge", "hallucination"], "relevant_docs": ["rag_overview.txt"]}
{"id": "q3", "question": "Write a Python function to reverse a string.", "expected_code_snippet": "def reverse_string(s): return s[::-1]", "relevant_docs": []}
{"id": "q4", "question": "Summarize the document about QuantumFlow Cloud Services.", "relevant_docs": ["quantumflow_docs.txt"], "expected_summary_keywords": ["QuantumFlow", "cloud services", "features", "pricing"]}
```

-   **`id`**: A unique identifier for the prompt.
-   **`question`**: The user input or prompt text.
-   **`expected_answer` / `expected_answer_keywords` / `expected_code_snippet`**: The ground truth for evaluation. This might be a precise answer, keywords to look for, or a code snippet.
-   **`relevant_docs`**: (For RAG systems) A list of IDs for documents that *should* be retrieved by the RAG system to answer this question.

---

## Python Example: Loading a Golden Set

```python
import json
from typing import List, Dict, Any

def load_golden_set(filepath: str) -> List[Dict[str, Any]]:
    """
    Loads a golden prompts set from a JSONL file.
    """
    golden_set = []
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            golden_set.append(json.loads(line.strip()))
    return golden_set

# --- Example Usage ---
# Create a dummy golden_prompts.jsonl file
with open("golden_prompts.jsonl", "w", encoding="utf-8") as f:
    f.write('{"id": "q1", "question": "What is the capital of France?", "expected_answer": "Paris", "relevant_docs": []}\n')
    f.write('{"id": "q2", "question": "Explain RAG.", "expected_answer_keywords": ["retrieval", "grounding"], "relevant_docs": ["rag_overview.txt"]}\n')

# Load the golden set
my_golden_set = load_golden_set("golden_prompts.jsonl")
print("Loaded Golden Set:")
for item in my_golden_set:
    print(item)

# You would then iterate through this set to run your LLM application and evaluate its output.
```

---

:::tip[Keep it Current]
Regularly update your golden set with new test cases, especially those representing regressions or edge cases that your application previously failed to handle correctly. This ensures your evaluation remains relevant.
:::