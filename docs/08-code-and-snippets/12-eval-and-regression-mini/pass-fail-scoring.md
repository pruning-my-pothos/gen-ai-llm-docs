---
title: "Pass/Fail Scoring for LLM Outputs"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["evaluation", "human-in-the-loop", "quality-assurance", "pass-fail"]
last_reviewed: "2025-12-31"
---

# Pass/Fail Scoring for LLM Outputs

For many LLM applications, especially during initial development and for nuanced tasks, objective automated metrics can fall short. Human evaluation remains the gold standard. Pass/fail scoring provides a simple, direct, and effective way for humans to assess the quality of LLM outputs against predefined criteria.

:::info[The Goal: Human-Centric Quality Assessment]
The objective is to leverage human judgment to quickly determine if an LLM's response meets minimum quality and correctness standards for a given prompt, allowing for rapid iteration and improvement.
:::

---

## Why Human Pass/Fail Scoring?

-   **Nuance**: Humans can understand context, tone, and subjective quality aspects that automated metrics often miss.
-   **Simplicity**: Easy for non-technical evaluators to perform.
-   **Direct Feedback**: Provides clear signals (pass/fail) that directly inform prompt or model improvements.
-   **Early Stage Evaluation**: Ideal for small [golden prompts sets](./golden-prompts-set.md) during the prototyping phase.

---

## The Pass/Fail Process

1.  **Define Criteria**: Clearly articulate what constitutes a "pass" and a "fail" for each type of prompt (e.g., "The answer is factually correct," "The output format is valid JSON," "The response is not harmful").
2.  **Generate Outputs**: Run your LLM application with your [golden prompts set](./golden-prompts-set.md) to generate responses.
3.  **Review**: Present each (prompt, LLM output) pair to a human evaluator.
4.  **Score**: The evaluator assigns a simple "pass" or "fail" based on the criteria.
5.  **Analyze**: Calculate the pass rate and review specific failures to understand areas for improvement.

---

## Python Script for Interactive Pass/Fail Scoring

This script iterates through a golden prompts set, simulates LLM responses, and prompts a human user to score each one as pass or fail.

```python
import json
from typing import List, Dict, Any, Tuple
import time

# Assume golden_prompts_set.py has the load_golden_set function
# from .golden_prompts_set import load_golden_set

# --- Dummy LLM Client (Replace with your actual client) ---
def mock_llm_generate(prompt: str) -> str:
    """Simulates an LLM generating a response."""
    time.sleep(0.1) # Simulate some processing time
    if "capital of France" in prompt:
        return "The capital of France is Paris."
    elif "explain RAG" in prompt:
        return "RAG combines retrieval with generation. It uses external knowledge to ground LLM responses."
    elif "reverse a string" in prompt:
        return "To reverse a string in Python, you can use slicing: `s[::-1]`."
    else:
        return "I'm not sure how to answer that."

def load_golden_set(filepath: str) -> List[Dict[str, Any]]:
    """Loads a golden prompts set from a JSONL file (replicated from golden_prompts.md)."""
    golden_set = []
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            golden_set.append(json.loads(line.strip()))
    return golden_set

def run_pass_fail_evaluation(
    golden_set_filepath: str,
    llm_generation_func: callable,
    criteria: str
) -> List[Dict[str, Any]]:
    """
    Runs an interactive pass/fail evaluation on a golden prompts set.

    Args:
        golden_set_filepath: Path to the golden_prompts.jsonl file.
        llm_generation_func: Function that takes a prompt string and returns an LLM response string.
        criteria: A string explaining the pass/fail criteria to the human evaluator.

    Returns:
        A list of results, each containing prompt, LLM output, and human score.
    """
    golden_set = load_golden_set(golden_set_filepath)
    results = []
    
    print("\n--- Starting Pass/Fail Evaluation ---")
    print(f"Evaluation Criteria: {criteria}\n")

    for i, item in enumerate(golden_set):
        question = item['question']
        llm_output = llm_generation_func(question)
        
        print(f"\n--- Prompt {i+1}/{len(golden_set)} ---")
        print(f"Question: {question}")
        print(f"LLM Output:\n{llm_output}")
        
        score = ""
        while score not in ["p", "f"]:
            score = input("Score (p for Pass, f for Fail): ").lower()
            if score == "p":
                status = "PASS"
            elif score == "f":
                status = "FAIL"
            else:
                print("Invalid input. Please enter 'p' or 'f'.")
        
        results.append({
            "id": item.get("id", f"prompt_{i+1}"),
            "question": question,
            "llm_output": llm_output,
            "human_score": status
        })
    
    return results

if __name__ == "__main__":
    # Ensure golden_prompts.jsonl exists or create a dummy one
    try:
        with open("golden_prompts.jsonl", "r", encoding="utf-8") as f:
            pass
    except FileNotFoundError:
        print("golden_prompts.jsonl not found. Creating a dummy one.")
        with open("golden_prompts.jsonl", "w", encoding="utf-8") as f:
            f.write('{"id": "q1", "question": "What is the capital of France?", "expected_answer": "Paris", "relevant_docs": []}\n')
            f.write('{"id": "q2", "question": "Explain RAG in one sentence.", "expected_answer_keywords": ["retrieval", "grounding"], "relevant_docs": ["rag_overview.txt"]}\n')
            f.write('{"id": "q3", "question": "Write a python function to reverse a string.", "expected_code_snippet": "def reverse_string(s): return s[::-1]", "relevant_docs": []}\n')


    evaluation_criteria = "The answer must be factually correct and directly address the question."
    
    evaluation_results = run_pass_fail_evaluation(
        golden_set_filepath="golden_prompts.jsonl",
        llm_generation_func=mock_llm_generate,
        criteria=evaluation_criteria
    )
    
    print("\n--- Evaluation Summary ---")
    pass_count = sum(1 for r in evaluation_results if r['human_score'] == "PASS")
    fail_count = len(evaluation_results) - pass_count
    pass_rate = (pass_count / len(evaluation_results)) * 100 if evaluation_results else 0
    
    print(f"Total Prompts: {len(evaluation_results)}")
    print(f"Passed: {pass_count}")
    print(f"Failed: {fail_count}")
    print(f"Pass Rate: {pass_rate:.2f}%")
```

---

:::tip[Iterate Quickly]
Use pass/fail scoring during rapid prototyping. If a prompt consistently fails on your golden set, it's a strong signal to refine your prompt, adjust RAG components, or consider a different model.
:::

:::warning[Scalability vs. Depth]
Pass/fail scoring is excellent for quick insights on a small set. For large-scale evaluation, you will need to complement it with automated metrics and more sophisticated human evaluation frameworks (e.g., preference-based ranking).
:::