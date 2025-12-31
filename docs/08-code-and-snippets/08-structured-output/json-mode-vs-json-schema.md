---
title: "JSON Mode vs. JSON Schema"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["structured-output", "json", "json-schema", "function-calling"]
last_reviewed: "2025-12-31"
---

# JSON Mode vs. JSON Schema

Getting Large Language Models (LLMs) to reliably output structured data is crucial for integrating them into applications. Two primary methods for achieving JSON output are **JSON Mode** and **JSON Schema (often via Function Calling)**. While both aim for JSON, they offer different levels of control and robustness.

:::info[The Goal: Predictable Data for Your Application]
Your application needs predictable data to work reliably. This guide differentiates between two approaches to get JSON from an LLM and helps you choose the right one for your needs.
:::

---

## 1. JSON Mode (For Syntactic Validity)

**What it is**: JSON Mode is an API setting that instructs the LLM to output only syntactically valid JSON. The model is constrained at the token generation level to ensure the output can always be parsed as JSON.

**How it works**: You typically enable this via an API parameter (e.g., `response_format={"type": "json_object"}` in OpenAI's API) or a strong prompt instruction. The model will then try to generate JSON.

**Pros**:
-   **Simplicity**: Easy to enable.
-   **Guaranteed Parsability**: The output is always valid JSON, preventing `JSONDecodeError`s.

**Cons**:
-   **No Schema Enforcement**: It only guarantees *syntactic* validity, not *structural* or *semantic* validity. The JSON can still contain unexpected keys, wrong data types, or be missing required fields.
-   **Model Hallucination**: The model might hallucinate keys/values not requested.

### Example: JSON Mode with Post-Validation

```python
import json
from typing import Dict, Any, List

# Assume an LLM client function (e.g., OpenAI, Ollama)
def call_llm_json_mode(prompt_messages: List[Dict[str, str]]) -> str:
    """
    Simulates an LLM call with JSON mode enabled.
    In a real app, this would use the LLM client with appropriate JSON mode parameters.
    """
    # Example simulated response
    if "extract" in prompt_messages[-1]['content'].lower():
        return '{"name": "Alice Smith", "email": "alice@example.com", "phone": "123-456-7890"}'
    elif "summarize" in prompt_messages[-1]['content'].lower():
        return '{"summary": "A brief summary.", "keywords": ["summary", "brief"]}'
    else: # Model might hallucinate if not strongly prompted
        return '{"unexpected_key": "some_value", "user_id": 123}'

def validate_contact_data(data: Dict[str, Any]) -> Dict[str, Any]:
    """Client-side validation for expected contact data."""
    if not isinstance(data, dict):
        raise ValueError("Output is not a dictionary.")
    
    # Check for required fields and types
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")

    if not isinstance(name, str) or not name:
        raise ValueError("Name is required and must be a string.")
    if not isinstance(email, str) or "@" not in email:
        raise ValueError("Email is required and must be a valid format.")
    # Phone number validation can be more complex (regex)
    if not isinstance(phone, str): # or re.match(r"^\d{3}-\d{3}-\d{4}$", phone)
        raise ValueError("Phone is required and must be a string.")
    
    return {"name": name, "email": email, "phone": phone} # Return only expected fields


# --- Usage with JSON Mode ---
prompt_messages = [
    {"role": "system", "content": "You are a data extractor. Extract contact information."},
    {"role": "user", "content": "Extract contact info for Alice Smith, alice@example.com, 123-456-7890."}
]

raw_json_output = call_llm_json_mode(prompt_messages)
print(f"Raw LLM JSON Output (JSON Mode): {raw_json_output}")

try:
    parsed_data = json.loads(raw_json_output)
    validated_data = validate_contact_data(parsed_data)
    print("Validated Data:", validated_data)
except (json.JSONDecodeError, ValueError) as e:
    print(f"Validation Error: {e}")
```

---

## 2. JSON Schema (For Structural and Semantic Validity)

**What it is**: JSON Schema is a declarative language that allows you to define the structure, types, and constraints of a JSON object. When combined with an LLM, especially through "function calling" or "tool use" APIs, it ensures the model outputs data that strictly adheres to your definition.

**How it works**: You provide the LLM (or its API) with one or more JSON Schema definitions. The LLM's role then becomes to generate an "invocation" of one of these schemas, filling in the fields according to the user's request. The API often performs built-in validation against the schema.

**Pros**:
-   **Strict Enforcement**: Guarantees the output adheres to defined types, required fields, and constraints (e.g., `enum`, `minLength`, `pattern`).
-   **Reduced Hallucination**: The model is less likely to generate irrelevant fields.
-   **Clear Contract**: Provides a clear contract between your application and the LLM output.

**Cons**:
-   **API Dependency**: Requires an LLM API that supports function calling or tool use with JSON Schema. Not all local or open-source models support this natively.
-   **More Complex Setup**: Requires defining schemas.

### Example: JSON Schema with `jsonschema` Validation

```python
import json
import jsonschema # pip install jsonschema
from typing import Dict, Any, List

# Define a JSON Schema for a Book object
book_schema = {
    "type": "object",
    "properties": {
        "title": {"type": "string", "description": "The title of the book"},
        "author": {"type": "string", "description": "The author of the book"},
        "genre": {"type": "string", "enum": ["Fiction", "Non-Fiction", "Science Fiction"]},
        "published_year": {"type": "integer", "minimum": 1500, "maximum": 2024}
    },
    "required": ["title", "author", "genre", "published_year"]
}

# Assume an LLM client that can generate JSON based on a schema
def call_llm_with_schema(prompt_messages: List[Dict[str, str]], schema: Dict[str, Any]) -> str:
    """
    Simulates an LLM call where the model is aware of a JSON Schema.
    In a real app, this would use an API's function_call or tool_use parameters.
    """
    # Example simulated response adhering to the schema
    return '{"title": "The Hitchhiker\'s Guide to the Galaxy", "author": "Douglas Adams", "genre": "Science Fiction", "published_year": 1979}'


# --- Usage with JSON Schema ---
prompt_messages_with_schema = [
    {"role": "system", "content": "Extract book information."},
    {"role": "user", "content": "I need details about 'The Hitchhiker's Guide to the Galaxy' by Douglas Adams, published in 1979, which is a science fiction classic."}
]

raw_json_output_schema = call_llm_with_schema(prompt_messages_with_schema, book_schema)
print(f"Raw LLM JSON Output (Schema Aware): {raw_json_output_schema}")

try:
    parsed_data_schema = json.loads(raw_json_output_schema)
    jsonschema.validate(instance=parsed_data_schema, schema=book_schema)
    print("Validated Data (JSON Schema):", parsed_data_schema)
except (json.JSONDecodeError, jsonschema.ValidationError) as e:
    print(f"Validation Error: {e}")
```

---

## When to Choose Which

| Feature / Scenario | JSON Mode | JSON Schema (Function Calling) |
| :--- | :--- | :--- |
| **Guarantees Syntactic JSON?** | Yes | Yes (if API enforces) |
| **Guarantees Schema Adherence?** | No | Yes |
| **Ease of Use (Setup)** | Very Easy | More Complex (schema definition) |
| **Robustness** | Moderate (requires post-validation) | High (API often validates) |
| **Use Cases** | Quick prototypes, simple key-value extraction, when only parsing errors are a concern. | Production-grade applications, complex data structures, strict data integrity requirements, building agents. |
| **API Support** | Widely supported (often via `response_format` parameter or strong prompt) | Specific APIs (OpenAI, Gemini, some local LLMs with custom tooling) |

:::tip[Always Validate Client-Side]
Even when using JSON Schema with APIs that perform validation, it's a good practice to include client-side validation using a library like `jsonschema`. This provides an extra layer of defense against unexpected issues and ensures your application always receives data in the exact format it expects.
:::
