---
title: "Few-shot Prompting (Minimal)"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["prompt-engineering", "few-shot", "pattern"]
last_reviewed: "2025-12-31"
---

# Few-shot Prompting (Minimal)

Few-shot prompting is a powerful technique to guide a Large Language Model (LLM) towards a desired output format or behavior by providing a few examples directly in the prompt. This works by showing the model a pattern before asking it to complete a new task.

:::info[The Goal: Pattern Recognition]
The LLM learns the desired task from the provided examples, effectively "priming" it for the new input. This is particularly useful for tasks where the output format is crucial or where the task is nuanced.
:::

---

## How it Works

Instead of just telling the model what to do (zero-shot), or giving it step-by-step instructions (chain-of-thought), you show it. The model infers the underlying pattern or instruction from the examples.

A minimal few-shot prompt typically consists of:
1.  **Instruction (optional but recommended)**: A brief description of the task.
2.  **Example 1**: An input-output pair for the task.
3.  **Example 2**: Another input-output pair (more examples generally improve performance).
4.  **New Input**: The actual input for which you want the model to generate a response.

---

## Minimal Example: Sentiment Classification

Let's say you want to classify the sentiment of a review as either "positive", "negative", or "neutral".

```python
from typing import List, Dict

def create_few_shot_prompt(review: str) -> List[Dict[str, str]]:
    """
    Creates a few-shot prompt for sentiment classification.
    """
    messages = [
        {"role": "system", "content": "Classify the sentiment of the following product reviews."},
        
        # Example 1
        {"role": "user", "content": "Review: The battery life is terrible. It dies in an hour."},
        {"role": "assistant", "content": "Sentiment: negative"},
        
        # Example 2
        {"role": "user", "content": "Review: This product exceeded my expectations. Highly recommend!"},
        {"role": "assistant", "content": "Sentiment: positive"},
        
        # New Input
        {"role": "user", "content": f"Review: {review}"},
    ]
    return messages

# --- Example Usage ---
new_review = "The delivery was fast, but the item quality is just okay."
prompt_messages = create_few_shot_prompt(new_review)

# In a real application, you would send prompt_messages to your LLM API.
# The expected assistant response for the new_review would be "Sentiment: neutral"
import json
print(json.dumps(prompt_messages, indent=2))
```

In this example, the model learns the "Review: [text] 
 Sentiment: [label]" pattern and applies it to the new input.

---

## Tips for Effective Few-shot Prompting

-   **High-Quality Examples**: The quality of your examples directly impacts the model's performance. Ensure they are correct, unambiguous, and cover typical scenarios.
-   **Diversity**: If possible, include examples that represent the diversity of your input data and desired outputs.
-   **Consistency**: Maintain a consistent format across all examples and for the new input.
-   **Token Budget**: Be mindful of your context window. Too many examples will consume tokens quickly. Start with 2-3 examples and add more only if necessary.
-   **Order**: The order of examples can sometimes matter. Experiment with different orderings if performance is critical.