---
title: "Retry on Invalid LLM Output"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["validation", "error-handling", "robustness", "retry"]
last_reviewed: "2025-12-31"
---

# Retry on Invalid LLM Output

LLMs are powerful but can sometimes generate malformed JSON, outputs that don't adhere to specified formats, or content that fails other validation checks. Instead of immediately failing, a robust LLM application can implement a "retry with feedback" mechanism, giving the model a chance to self-correct.

:::info[The Goal: Self-Correction and Resilience]
The objective is to leverage the LLM's own reasoning capabilities to fix its mistakes, making your application more resilient to minor generation errors and reducing the need for manual intervention.
:::

---

## The Problem: Imperfect Generation

-   **Syntactic Errors**: Malformed JSON, missing characters.
-   **Semantic Errors**: Valid JSON, but values don't conform to schema constraints (e.g., `enum` violation, wrong type).
-   **Content Errors**: Output includes forbidden keywords, or fails a regex check.

---

## The Solution: Retry with Feedback Loop

The core idea is to catch validation errors, provide the LLM with the invalid output and the specific error message, and ask it to try again.

1.  **Generate**: Call the LLM with the initial prompt.
2.  **Validate**: Apply your validation logic (e.g., JSON Schema, Regex Guard).
3.  **If Valid**: Proceed with the output.
4.  **If Invalid**: Construct a new prompt that includes:
    *   The original instructions.
    *   The LLM's previous (invalid) output.
    *   The specific validation error message.
    *   A clear instruction to correct the mistake and try again.
5.  **Retry**: Call the LLM with this new, feedback-rich prompt.
6.  **Loop**: Repeat steps 2-5 for a fixed number of `max_retries`.

---

## Python Code Example

This example demonstrates how to implement a retry mechanism for JSON output validation, using a conceptual LLM client and a `jsonschema` validator.

```python
import json
import jsonschema
from typing import List, Dict, Any, Callable, Optional
import time

# --- Dummy LLM Client (Replace with your actual client) ---
def mock_llm_call(messages: List[Dict[str, str]]) -> str:
    """Simulates an LLM API call, sometimes returning invalid JSON."""
    if "initial request" in messages[-1]["content"].lower():
        # Simulate initial malformed output
        print("Mock LLM: Generating initial (malformed) JSON.")
        return '{"item": "Laptop", "price": "twelve hundred", "currency": "USD"' # Malformed and wrong type
    elif "fix the invalid json" in messages[-1]["content"].lower():
        # Simulate correction after feedback
        print("Mock LLM: Correcting JSON based on feedback.")
        return '{"item": "Laptop", "price": 1200, "currency": "USD"}'
    else:
        print("Mock LLM: Responding with default (valid) JSON.")
        return '{"item": "Default", "price": 100, "currency": "USD"}'

# --- Validator Function (from jsonschema-validate.md) ---
shopping_item_schema = {
  "type": "object",
  "properties": {
    "item": {"type": "string"},
    "quantity": {"type": "integer", "minimum": 1},
    "price": {"type": "integer", "minimum": 1}, # Changed to integer for this example
    "currency": {"type": "string", "enum": ["USD", "EUR", "GBP"]}
  },
  "required": ["item", "price", "currency"] # Removed quantity for this example
}

def validate_json_output(json_string: str, schema: Dict[str, Any]) -> Tuple[bool, Optional[Dict[str, Any]], Optional[str]]:
    """
    Parses and validates a JSON string against a schema.
    Returns (is_valid, parsed_data, error_message).
    """
    try:
        parsed_data = json.loads(json_string)
        jsonschema.validate(instance=parsed_data, schema=schema)
        return True, parsed_data, None
    except json.JSONDecodeError as e:
        return False, None, f"JSONDecodeError: {e}"
    except jsonschema.ValidationError as e:
        return False, None, f"ValidationError: {e.message} at path {list(e.path)}"
    except Exception as e:
        return False, None, f"Unexpected error: {e}"

# --- Retry Logic ---
def call_llm_with_retry_and_feedback(
    initial_messages: List[Dict[str, str]],
    validator_func: Callable[[str], Tuple[bool, Optional[Dict[str, Any]], Optional[str]]],
    schema: Dict[str, Any],
    max_retries: int = 3,
    llm_client: Callable[[List[Dict[str, str]]], str] = mock_llm_call # Use mock LLM
) -> Optional[Dict[str, Any]]:
    """
    Calls LLM, validates output, and retries with feedback on failure.
    """
    current_messages = list(initial_messages)
    
    for attempt in range(max_retries + 1):
        print(f"\n--- Attempt {attempt + 1} ---")
        llm_response_text = llm_client(current_messages)
        
        is_valid, parsed_data, error_message = validator_func(llm_response_text, schema)
        
        if is_valid:
            print("Validation successful!")
            return parsed_data
        else:
            print(f"Validation failed: {error_message}")
            if attempt < max_retries:
                # Append feedback message for the LLM
                feedback_message = {
                    "role": "system",
                    "content": (
                        f"You previously provided the following invalid output:\n\n"
                        f"```json\n{llm_response_text}\n```\n\n"
                        f"This output failed validation with the following error:\n"
                        f"{error_message}\n\n"
                        f"Please correct the output and provide valid JSON according to the schema. "
                        f"Respond with ONLY the valid JSON."
                    )
                }
                current_messages.append(feedback_message)
                time.sleep(1) # Simulate delay before retry
            else:
                print(f"Max retries ({max_retries}) reached. Failed to get valid output.")
                return None

# --- Example Usage ---
initial_prompt_messages = [
    {"role": "system", "content": "Extract item details as JSON."},
    {"role": "user", "content": "I need to buy a Laptop for 1200 USD."}
]

# Using the validator_func from jsonschema-validate.md
final_parsed_data = call_llm_with_retry_and_feedback(
    initial_messages=initial_prompt_messages,
    validator_func=validate_json_output,
    schema=shopping_item_schema,
    max_retries=2
)

if final_parsed_data:
    print("\nFinal Valid Data:", final_parsed_data)
else:
    print("\nFailed to extract valid data after retries.")
```

---

:::tip[When to Use This Pattern]
This retry mechanism is particularly effective for structured data extraction or function calling where a minor syntax error or schema deviation can be fixed by the LLM itself with clear feedback.
:::

:::warning[Max Retries is Crucial]
Always set a `max_retries` limit. If the LLM repeatedly fails to correct itself, continuing to retry will only waste tokens and add latency. After `max_retries`, your application should resort to a [Safe Fallback](./safe-fallbacks.md).
:::