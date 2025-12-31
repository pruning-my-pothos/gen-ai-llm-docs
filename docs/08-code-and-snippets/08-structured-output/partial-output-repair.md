---
title: "Partial Output Repair"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNNN"
version: "1.0.0"
tags: ["structured-output", "json", "error-handling", "robustness"]
last_reviewed: "2025-12-31"
---

# Partial Output Repair

While LLMs are powerful, they don't always generate perfect, syntactically valid JSON, especially when streaming output, hitting context limits, or under pressure. Receiving malformed or partial JSON can break your application. This guide explores strategies and code snippets to robustly handle and repair such outputs.

:::info[The Goal: Robust JSON Parsing]
The objective is to make your application resilient to imperfect LLM output, ensuring that you can still extract structured data even if it's not perfectly formed.
:::

---

## The Problem: Imperfect JSON Output

LLMs are text generators, not strict JSON engines. Common issues include:

-   **Truncation**: The LLM stops generating mid-JSON due to token limits or a stop sequence.
    ```json
    {"name": "Alice", "age": 30, "city": "New York"
    ```
-   **Malformation**: Minor syntax errors like missing commas, unquoted keys, or extra characters.
    ```json
    {"name": "Bob" "age": 25} // Missing comma
    {name: "Charlie", "age": 35} // Unquoted key
    ```
-   **Preamble/Postamble**: Extra text before or after the JSON object.
    ```
    Here is the data: {"name": "David"}
    ```

---

## Strategy 1: Simple Appending for Truncation

Often, the JSON is just truncated at the end. A heuristic approach can try to append common closing characters (`}`, `]`, `"`). This is quick and dirty but can be effective for simple cases.

```python
import json
from typing import Optional

def append_closing_chars(json_string: str) -> str:
    """
    Attempts to close a truncated JSON string by appending common closing characters.
    This is a heuristic and may not work for complex cases.
    """
    # Remove any trailing whitespace that might prevent proper detection
    json_string = json_string.strip()
    
    # Try to close common structures
    if json_string.endswith('"'):
        pass # Already closed string
    elif json_string.endswith('{'):
        json_string += '}'
    elif json_string.endswith('['):
        json_string += ']'
    elif json_string.count('{') > json_string.count('}'):
        json_string += '}' * (json_string.count('{') - json_string.count('}'))
    elif json_string.count('[') > json_string.count(']'):
        json_string += ']' * (json_string.count('[') - json_string.count(']'))
    
    return json_string

def parse_robustly_simple_append(llm_output: str) -> Optional[dict]:
    """
    Parses LLM output, attempting to repair simple truncation by appending.
    """
    cleaned_output = llm_output.strip()
    try:
        return json.loads(cleaned_output)
    except json.JSONDecodeError:
        print("Initial parse failed. Attempting simple append.")
        repaired_output = append_closing_chars(cleaned_output)
        try:
            return json.loads(repaired_output)
        except json.JSONDecodeError:
            print("Simple append also failed.")
            return None

# --- Example Usage ---
truncated_json = '{"name": "Alice", "age": 30, "city": "New York"'
malformed_json = '{"name": "Bob" "age": 25}' # Missing comma
valid_json = '{"name": "Charlie", "age": 35}'

print("Truncated JSON repair:", parse_robustly_simple_append(truncated_json))
print("Malformed JSON (fails append):", parse_robustly_simple_append(malformed_json)) # Will likely still fail
print("Valid JSON:", parse_robustly_simple_append(valid_json))
```

---

## Strategy 2: Fault-Tolerant Parsing with `json5`

Libraries like `json5` (or `demjson`) are designed to parse JSON that is slightly non-standard, tolerating unquoted keys, trailing commas, and comments, which LLMs sometimes generate.

### Installation

```bash
pip install json5
```

### Implementation

```python
import json5 # pip install json5
from typing import Optional

def parse_robustly_json5(llm_output: str) -> Optional[dict]:
    """
    Parses LLM output using json5 for fault tolerance.
    """
    try:
        # json5.loads can handle many non-standard JSON formats
        return json5.loads(llm_output)
    except ValueError as e: # json5 uses ValueError for parsing errors
        print(f"json5 parsing failed: {e}")
        return None

# --- Example Usage ---
malformed_output = """
{
    name: "Eve", // Unquoted key and trailing comma
    "age": 40,
}
"""
print("\njson5 repair (malformed):", parse_robustly_json5(malformed_output))

truncated_output = '{"id": 123, "status": "active", "description": "This is a long description that got truncated'
# json5 might struggle with severe truncation that results in invalid syntax mid-string
print("json5 repair (truncated):", parse_robustly_json5(truncated_output)) 
```

---

## Strategy 3: LLM Self-Correction (Retry with Feedback)

For more complex or persistent parsing failures, you can ask the LLM to fix its own mistake. This involves sending the invalid output back to the model with clear instructions to correct it.

```python
import json
from typing import List, Dict, Any, Optional

# Assume an LLM client function
def call_llm(messages: List[Dict[str, str]], temperature: float = 0.7) -> str:
    """Simulates LLM call. Replace with your actual client."""
    # Simulate a model that sometimes makes mistakes
    if "fix this JSON" in messages[-1]['content'] and "broken_json_example" in messages[-1]['content']:
        return '{"item": "Laptop", "price": 1200, "currency": "USD"}'
    elif "{" in messages[-1]['content']: # Initial attempt to get JSON
        return '{"item": "Laptop", "price": 1200, "currency": "USD' # Truncated
    return "This is not JSON."


def attempt_json_extraction_with_retry(
    prompt_messages: List[Dict[str, str]],
    max_retries: int = 2
) -> Optional[Dict[str, Any]]:
    """
    Attempts to extract JSON from LLM output, retrying with feedback if it fails.
    """
    for attempt in range(max_retries + 1):
        print(f"\nAttempt {attempt + 1}...")
        llm_response_text = call_llm(prompt_messages)
        print(f"LLM raw response: {llm_response_text}")

        try:
            parsed_json = json.loads(llm_response_text)
            print("Successfully parsed JSON.")
            return parsed_json
        except json.JSONDecodeError as e:
            print(f"JSON parsing failed on attempt {attempt + 1}: {e}")
            if attempt < max_retries:
                # Append a correction message to the prompt for retry
                correction_message = {
                    "role": "user",
                    "content": f"The JSON you provided was invalid. Error: {e}\n"
                               f"The invalid JSON was:\n{llm_response_text}\n"
                               f"Please provide only valid JSON output this time."
                }
                prompt_messages.append(correction_message)
            else:
                print("Max retries reached. Could not get valid JSON.")
                return None
    return None

# --- Example Usage ---
initial_prompt = [
    {"role": "system", "content": "Extract item details as JSON."},
    {"role": "user", "content": "I need to buy a Laptop for $1200 USD."}
]

extracted_data = attempt_json_extraction_with_retry(initial_prompt)
if extracted_data:
    print("\nFinal Extracted Data:", extracted_data)
```

---

:::tip[Layered Approach]
The most robust strategy combines these. First, try simple appending. If that fails, try a fault-tolerant parser like `json5`. If *that* also fails, then resort to LLM self-correction with retries. This minimizes costly LLM calls while maximizing resilience.
:::