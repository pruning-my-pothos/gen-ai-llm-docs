--- 
title: "Structured Task Specification Template"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["prompt-engineering", "template", "structured-output", "consistency"]
last_reviewed: "2025-12-31"
---

# Structured Task Specification Template

For complex tasks or when you need highly reliable and consistent output from an LLM, a structured task specification in your prompt is invaluable. This approach clearly defines the model's role, the task it needs to perform, its constraints, and the desired output format, reducing ambiguity and improving results.

:::info[The Goal: Precision and Consistency]
The objective is to provide the model with an unambiguous set of instructions, minimizing the chances of misinterpretation and leading to more predictable and higher-quality outputs.
:::

---

## The Structured Prompt Template

This template breaks down the prompt into distinct sections, each serving a specific purpose. Using clear headings or delimiters (like XML tags or Markdown headings) helps the model parse and prioritize the instructions.

```text
### ROLE ###
You are a [persona/role, e.g., 'senior software engineer', 'concise technical writer'].

### TASK ###
Your primary task is to [what the model needs to achieve].

### CONTEXT ###
[Optional: Provide relevant background information, retrieved documents, or recent conversation history. Clearly delineate it.]

### CONSTRAINTS ###
[Specify rules, limitations, and boundaries for the model's behavior and output. Use bullet points for clarity.]
- You MUST adhere to [rule 1].
- You MUST NOT [rule 2].
- Keep responses to [N] words/sentences.
- Do not make assumptions; if information is missing, state it.

### FORMAT ###
[Describe the desired output format. Be as specific as possible. Examples: 'JSON', 'Markdown table', 'bulleted list', 'a short paragraph'. Provide a schema if expecting structured data.]

### USER INPUT ###
[The actual user query or data the model needs to process.]
```

---

## Python Code Example: Building a Structured Prompt

This Python function helps assemble messages for a chat API according to the structured template.

```python
from typing import List, Dict, Optional

def create_structured_task_prompt(
    role: str,
    task: str,
    constraints: List[str],
    output_format: str,
    user_input: str,
    context: Optional[str] = None
) -> List[Dict[str, str]]:
    """
    Creates a structured prompt for a chat LLM using a predefined template.

    Args:
        role: The persona or role the model should adopt.
        task: The primary task the model needs to perform.
        constraints: A list of rules/limitations for the model.
        output_format: A description of the desired output format.
        user_input: The user's specific query or data.
        context: Optional background information or retrieved documents.

    Returns:
        A list of message dictionaries for the chat API.
    """
    
    system_message_content = f"""
### ROLE ###
{role}

### TASK ###
{task}
"""
    if context:
        system_message_content += f"""
### CONTEXT ###
{context}
"""
    
    if constraints:
        constraints_str = "\n".join([f"- {c}" for c in constraints])
        system_message_content += f"""
### CONSTRAINTS ###
{constraints_str}
"""
        
    system_message_content += f"""
### FORMAT ###
{output_format}
"""
    
    messages = [
        {"role": "system", "content": system_message_content},
        {"role": "user", "content": f"### USER INPUT ###\n{user_input}"}
    ]
    
    return messages

# --- Example Usage ---
role = "a senior software engineer specializing in Python."
task = "Generate a concise Python code snippet that reverses a string."
constraints = [
    "The code MUST be a single line Python expression.",
    "Do NOT include explanations in the code output, only the code itself.",
    "Do NOT use loops.",
    "Ensure the solution is idiomatic Python."
]
output_format = "Provide only the Python code, enclosed in a single markdown code block."
user_input_data = "Input string: 'hello world'"

prompt_messages = create_structured_task_prompt(
    role,
    task,
    constraints,
    output_format,
    user_input_data
)

# In a real application, you would send prompt_messages to your LLM API.
import json
print(json.dumps(prompt_messages, indent=2))
```

---

:::tip[Use Delimiters for Clarity]
Using explicit delimiters like `### SECTION ###` or XML tags (`<role>...</role>`) can help the model differentiate between different parts of your instructions, especially for longer or more complex prompts.
:::