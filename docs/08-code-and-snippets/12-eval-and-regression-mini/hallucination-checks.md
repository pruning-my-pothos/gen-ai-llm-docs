---
title: "Hallucination Detection"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["evaluation", "hallucination", "rag", "safety"]
last_reviewed: "2025-12-31"
---

# Hallucination Detection

One of the biggest challenges with Large Language Models (LLMs) is their propensity to "hallucinate"—generating factually incorrect but plausible-sounding information. In RAG systems, the goal is to *ground* the LLM's response in provided context, but hallucinations can still occur. Detecting and mitigating these is crucial for trust and reliability.

:::info[The Goal: Factual Accuracy and Trust]
The objective is to identify when an LLM is generating information that is not supported by its knowledge base or the provided context, thereby improving the factual accuracy and trustworthiness of your application.
:::

---

## The Problem: Plausible Lies

LLMs are trained to generate coherent and convincing text. If they lack information or misinterpret a prompt, they will often "make things up" rather than admit ignorance. These fabrications can be subtle and difficult for users to detect.

---

## Methods for Hallucination Detection

### 1. LLM-as-a-Judge (Context Adherence)

A powerful method is to use another (or the same) LLM to act as a "judge." This judge LLM is given the original question, the provided context, and the generated answer, and is asked to determine if the answer is faithful to the context.

### Python Code Example: LLM-as-a-Judge for Faithfulness

```python
import openai # pip install openai
from typing import List, Dict, Any, Tuple

# Assuming OPENAI_API_KEY is set in your environment
# client = openai.OpenAI()

# Mock LLM client for demonstration
def mock_llm_judge_call(messages: List[Dict[str, str]], temperature: float = 0.0) -> str:
    """Simulates an LLM call for a judge."""
    judge_prompt = messages[-1]['content'].lower()
    if "is the answer fully supported by the context" in judge_prompt:
        if "quantum physics" in judge_prompt and "provided context" in judge_prompt:
            return "YES" # Assume it's supported by a long context
        elif "paris is the capital of france" in judge_prompt and "not mention" in judge_prompt:
            return "NO" # Assume context didn't mention it
    return "JUDGE_ERROR"


def check_hallucination_llm_judge(
    question: str,
    answer: str,
    context: str, # The RAG context provided to the original LLM
    llm_client_func: callable = mock_llm_judge_call,
    model: str = "gpt-4" # The judge LLM
) -> Tuple[bool, str]:
    """
    Uses an LLM to determine if an answer is faithful to the provided context.

    Args:
        question: The original user question.
        answer: The LLM's generated answer.
        context: The context (e.g., retrieved documents) provided to the LLM.
        llm_client_func: Function to call the judge LLM.
        model: Model to use for the judge LLM.

    Returns:
        Tuple (is_faithful: bool, reason: str)
    """
    judge_system_prompt = """
    You are an expert judge. Your task is to determine if an AI assistant's answer
    is fully supported by the provided context. 
    
    Respond with 'YES' if the answer is fully supported by the context.
    Respond with 'NO' if the answer contains any information not explicitly stated or implied by the context.
    If the answer includes any information that contradicts the context, respond with 'NO'.
    Provide a brief reason for your decision.
    """
    
    judge_user_prompt = f"""
    ### QUESTION ###
    {question}

    ### CONTEXT ###
    {context}

    ### ANSWER ###
    {answer}

    Is the answer fully supported by the context?
    """
    
    messages = [
        {"role": "system", "content": judge_system_prompt},
        {"role": "user", "content": judge_user_prompt}
    ]
    
    judge_response = llm_client_func(messages, temperature=0.0) # Use low temperature for judge
    
    if judge_response.strip().upper().startswith("YES"):
        return True, judge_response
    elif judge_response.strip().upper().startswith("NO"):
        return False, judge_response
    else:
        return False, f"Judge LLM response unparseable: {judge_response}"

# --- Example Usage ---
q1 = "Explain quantum physics in simple terms."
a1 = "Quantum physics studies the behavior of matter and energy at the atomic and subatomic level. It describes a reality where particles can exist in multiple states simultaneously."
c1 = "Quantum mechanics is a fundamental theory in physics that describes nature at the smallest scales of energy levels of atoms and subatomic particles. Classical physics provides an accurate description of nature at everyday scales."

is_faithful1, reason1 = check_hallucination_llm_judge(q1, a1, c1)
print(f"\nQuestion: {q1}\nAnswer: {a1}\nContext: {c1}")
print(f"Is Faithful: {is_faithful1}, Reason: {reason1}")

q2 = "What is the capital of France?"
a2 = "Paris is the capital of France."
c2 = "The provided context discusses the history of the Eiffel Tower and its construction details, but does not mention the capital of France."

is_faithful2, reason2 = check_hallucination_llm_judge(q2, a2, c2)
print(f"\nQuestion: {q2}\nAnswer: {a2}\nContext: {c2}")
print(f"Is Faithful: {is_faithful2}, Reason: {reason2}")
```

---

### 2. Overlap Metrics (Simple Text Comparison)

A simpler, though less robust, method involves checking for keyword or phrase overlap between the generated answer and the provided context. If the answer contains significant information not present in the context, it might be a hallucination.

```python
from collections import Counter
import re

def word_overlap_ratio(text1: str, text2: str) -> float:
    """Calculates the ratio of overlapping words between two texts."""
    words1 = set(re.findall(r'\b\w+\b', text1.lower()))
    words2 = set(re.findall(r'\b\w+\b', text2.lower()))
    
    if not words1 or not words2:
        return 0.0
        
    common_words = words1.intersection(words2)
    return len(common_words) / min(len(words1), len(words2))

# --- Example Usage ---
answer_text = "The sky appears blue due to Rayleigh scattering."
context_text = "Rayleigh scattering explains why the sky is blue."

overlap = word_overlap_ratio(answer_text, context_text)
print(f"\nWord overlap ratio: {overlap:.2f}") # High overlap expected
```

---

:::warning[Limitations of Automated Detection]
Automated hallucination detection is a challenging problem and an active area of research. No single method is foolproof. For high-stakes applications, human-in-the-loop review is often indispensable.
:::

:::tip[Mitigation is the Best Defense]
The best defense against hallucination is robust RAG prompt engineering. Ensure your system prompt strongly instructs the LLM to answer *only* from the provided context (see [Retrieve and Cite](../10-rag-mini/retrieve-and-cite.md)) and use settings that reduce creativity (see [Deterministic Settings](../09-output-validation-and-guards/deterministic-settings.md)).
:::
