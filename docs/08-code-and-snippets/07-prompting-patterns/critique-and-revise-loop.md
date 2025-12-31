---
title: "Critique and Revise Loop"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["prompt-engineering", "self-correction", "critique", "iteration"]
last_reviewed: "2025-12-31"
---

# Critique and Revise Loop

Even the most powerful LLMs can make mistakes or produce suboptimal outputs. The critique and revise loop (also known as self-correction or self-reflection) is an advanced prompting pattern that empowers the model to evaluate its own work against a set of criteria and then iteratively improve it.

:::info[The Goal: Higher Quality Outputs]
This pattern aims to achieve higher quality, more robust outputs for complex tasks by leveraging the model's reasoning capabilities to identify and correct its own flaws.
:::

---

## The Critique and Revise Process

This loop typically involves three distinct steps, each requiring a separate interaction with the LLM (or a specialized "critique" model):

1.  **Generate**: The model receives the initial prompt and generates a first-pass output.
2.  **Critique**: The model is then given its generated output, the original prompt, and a specific set of evaluation criteria. Its task is to critically analyze its own output and identify any shortcomings.
3.  **Revise**: Finally, the model receives the original prompt, its initial output, and its self-generated critique. With this full context, it's instructed to revise and improve the output.

This process can be iterated multiple times (`max_attempts`) to progressively refine the output.

---

## Python Code Example

This example demonstrates how to orchestrate a simple critique and revise loop using a generic LLM client.

```python
from typing import List, Dict
import time # For simulating LLM calls

# Assume a simple LLM client function
# In a real application, this would be an API call to OpenAI, Ollama, etc.
def call_llm(messages: List[Dict[str, str]], temperature: float = 0.7) -> str:
    """
    Simulates an LLM API call.
    In a real app, replace this with your actual LLM client.
    """
    print(f"--- LLM Call (Temp: {temperature}) ---")
    # For demonstration, a simple placeholder response
    if "critique" in messages[-1]['content'].lower():
        # Simulate critique
        if "correct" in messages[-2]['content'].lower(): # If previous was already good
             return "Critique: The answer is excellent and meets all criteria."
        return "Critique: The answer is too generic and lacks specific details. It does not fully address the nuance of the question."
    elif "revise" in messages[-1]['content'].lower():
         # Simulate revision
         if "generic" in messages[-2]['content'].lower(): # If critique was generic
            return "Revised Output: The revised output now includes specific examples and addresses the nuance more thoroughly."
         return "Revised Output: The initial output was already good, no further revision needed."
    else:
        return "Initial Output: This is a generic answer to your question."


def critique_and_revise(
    initial_prompt_messages: List[Dict[str, str]],
    evaluation_criteria: str,
    llm_client_func: callable = call_llm,
    max_attempts: int = 3,
    temperature: float = 0.7
) -> Dict[str, str]:
    """
    Orchestrates a critique and revise loop to improve LLM output.

    Args:
        initial_prompt_messages: The messages for the initial generation call.
        evaluation_criteria: A string detailing how the output should be evaluated.
        llm_client_func: A function that simulates/makes LLM calls.
        max_attempts: Maximum number of critique/revise cycles.
        temperature: Temperature for LLM calls.

    Returns:
        A dictionary containing the final output and history of attempts.
    """
    
    current_output = ""
    history: List[Dict[str, str]] = []

    for attempt in range(max_attempts):
        print(f"\n--- Attempt {attempt + 1} ---")
        
        # 1. Generate (or Revise)
        if attempt == 0:
            generation_messages = initial_prompt_messages
        else:
            # For revision, provide original prompt, previous output, and critique
            generation_messages = [
                *initial_prompt_messages, # Original messages
                {"role": "assistant", "content": current_output}, # Previous output
                {"role": "system", "content": f"Critique: {history[-1]['critique']}"}, # Last critique
                {"role": "user", "content": "Based on the original prompt, the previous output, and the critique, revise the output to meet the criteria. Provide only the revised output."}
            ]
        
        generated_text = llm_client_func(generation_messages, temperature=temperature)
        current_output = generated_text # Update current output
        
        if "revised output: " in current_output.lower():
            current_output = current_output.replace("Revised Output: ", "", 1)
        
        print(f"Generated Output:\n{current_output}")

        # 2. Critique
        critique_prompt_messages = [
            {"role": "system", "content": f"Critique the following output based on these criteria: {evaluation_criteria}. Provide only the critique."},
            {"role": "assistant", "content": generated_text}, # The output to be critiqued
            {"role": "user", "content": "Critique this output."}
        ]
        
        critique = llm_client_func(critique_prompt_messages, temperature=0.0) # Lower temp for deterministic critique
        if "critique: " in critique.lower():
            critique = critique.replace("Critique: ", "", 1)
        
        print(f"Critique:\n{critique}")

        history.append({"output": generated_text, "critique": critique})

        # Check if the critique indicates success or no further revision needed
        if "excellent" in critique.lower() or "no further revision" in critique.lower():
            print("Critique successful, output meets criteria or no further revision needed.")
            break
            
        time.sleep(0.5) # Simulate processing time

    return {"final_output": current_output, "history": history, "attempts": attempt + 1}


# --- Example Usage ---
initial_user_prompt = "Write a short, engaging marketing email for a new AI-powered personal assistant app. Focus on benefits, not features."
criteria = "The email must be under 150 words, highlight at least 3 distinct benefits, and have a clear call to action. It should sound friendly and professional."

initial_messages_for_llm = [
    {"role": "system", "content": "You are a marketing expert."},
    {"role": "user", "content": initial_user_prompt}
]

result = critique_and_revise(initial_messages_for_llm, criteria, max_attempts=3)

print("\n--- Final Result ---")
print(f"Final Output after {result['attempts']} attempts:\n{result['final_output']}")
