---
title: "Client-side JSON Schema Validation"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["validation", "json-schema", "structured-output", "python"]
last_reviewed: "2025-12-31"
---

# Client-side JSON Schema Validation

While instructing LLMs to produce structured JSON output (especially with function calling APIs) significantly improves reliability, it's not foolproof. LLMs can still sometimes hallucinate incorrect values, miss required fields, or generate data that violates complex constraints. Client-side validation using a library like `jsonschema` provides an essential guardrail.

:::info[The Goal: Absolute Data Integrity]
The objective is to ensure that any JSON received from an LLM strictly conforms to your application's expected data model before it's processed downstream.
:::

---

## Why Client-side Validation?

-   **Redundancy**: Adds an extra layer of safety, even if the API claims to validate.
-   **Local Model Support**: Essential for local LLMs or APIs that don't natively support robust schema enforcement.
-   **Debugging**: Helps identify subtle LLM generation errors you might otherwise miss.
-   **Data Integrity**: Prevents malformed or invalid data from corrupting your application.

---

## 1. Installation

Install the `jsonschema` library using pip:

```bash
pip install jsonschema
```

---

## 2. Basic Validation Example

Let's define a simple JSON Schema and validate some LLM-generated JSON against it.

### JSON Schema

```json
{
  "type": "object",
  "properties": {
    "item": {"type": "string"},
    "quantity": {"type": "integer", "minimum": 1},
    "unit": {"type": "string", "enum": ["kg", "g", "pcs"]}
  },
  "required": ["item", "quantity", "unit"]
}
```

### Python Implementation

```python
import json
import jsonschema
from typing import Dict, Any, Optional

# Define your JSON Schema
shopping_item_schema = {
  "type": "object",
  "properties": {
    "item": {"type": "string"},
    "quantity": {"type": "integer", "minimum": 1},
    "unit": {"type": "string", "enum": ["kg", "g", "pcs"]}
  },
  "required": ["item", "quantity", "unit"]
}

def validate_llm_output(json_data: Dict[str, Any], schema: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Validates LLM-generated JSON data against a given JSON Schema.

    Args:
        json_data: The parsed JSON object from the LLM.
        schema: The JSON Schema to validate against.

    Returns:
        The validated JSON data if successful, otherwise None.
    """
    try:
        jsonschema.validate(instance=json_data, schema=schema)
        print("Validation successful!")
        return json_data
    except jsonschema.ValidationError as e:
        print(f"Validation Error: {e.message}")
        print(f"Path: {list(e.path)}")
        print(f"Validator: {e.validator} with value {e.validator_value}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred during validation: {e}")
        return None

# --- Example Usage ---
# Valid output from LLM
valid_llm_output = {
    "item": "Apples",
    "quantity": 5,
    "unit": "kg"
}
validated_data_1 = validate_llm_output(valid_llm_output, shopping_item_schema)
print("Valid data:", validated_data_1)

# Invalid output: missing required field 'unit'
invalid_llm_output_1 = {
    "item": "Milk",
    "quantity": 2
}
validated_data_2 = validate_llm_output(invalid_llm_output_1, shopping_item_schema)
print("Invalid data (missing field):", validated_data_2)

# Invalid output: quantity is less than minimum
invalid_llm_output_2 = {
    "item": "Bread",
    "quantity": 0,
    "unit": "pcs"
}
validated_data_3 = validate_llm_output(invalid_llm_output_2, shopping_item_schema)
print("Invalid data (min quantity):", validated_data_3)

# Invalid output: unit is not in enum
invalid_llm_output_4 = {
    "item": "Cheese",
    "quantity": 1,
    "unit": "block"
}
validated_data_4 = validate_llm_output(invalid_llm_output_4, shopping_item_schema)
print("Invalid data (enum):", validated_data_4)
```

---

:::tip[Integrating with Pydantic]
For Python developers, using a library like Pydantic can further streamline schema definition and validation. Pydantic models can automatically generate JSON Schemas, and provide built-in validation for incoming data, making them an excellent choice for structured LLM outputs.
:::

:::warning[Validation is a Guardrail]
Client-side validation acts as a crucial guardrail. When validation fails, your application should implement robust error handling, such as retrying the LLM call with feedback, logging the error, or triggering a human review. (See [Retry on Invalid Output](./retry-on-invalid.md)).
:::