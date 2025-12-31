---
title: "Enums and Constraints in JSON Schema"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["structured-output", "json-schema", "enums", "validation"]
last_reviewed: "2025-12-31"
---

# Enums and Constraints in JSON Schema

To get truly precise and reliable structured data from an LLM, you need more than just a basic JSON structure. JSON Schema offers powerful keywords like `enum` and various constraints (`minimum`, `maxLength`, `pattern`, etc.) to enforce specific values and data rules.

:::info[The Goal: Highly Validated Output]
By using `enums` and constraints, you can reduce the model's freedom to hallucinate values and ensure that the extracted data strictly adheres to your application's requirements, simplifying downstream processing.
:::

---

## 1. Using `enum` for Fixed Values

The `enum` keyword restricts a property's value to a predefined list of allowed values. This is incredibly useful for categorical data.

### JSON Schema Definition

```json
{
  "type": "object",
  "properties": {
    "text": { "type": "string" },
    "sentiment": {
      "type": "string",
      "enum": ["positive", "neutral", "negative"],
      "description": "The sentiment of the provided text."
    }
  },
  "required": ["text", "sentiment"]
}
```

### Python Implementation (Conceptual with LLM)

```python
import json
import jsonschema # pip install jsonschema
from typing import Dict, Any, List

sentiment_schema = {
    "type": "object",
    "properties": {
        "text": { "type": "string" },
        "sentiment": {
            "type": "string",
            "enum": ["positive", "neutral", "negative"],
            "description": "The sentiment of the provided text."
        }
    },
    "required": ["text", "sentiment"]
}

# Assume LLM client returns JSON based on schema
def analyze_sentiment(text: str) -> Dict[str, Any]:
    """Simulates LLM call to analyze sentiment based on schema."""
    if "great" in text.lower():
        llm_output = '{"text": "' + text + '", "sentiment": "positive"}'
    elif "bad" in text.lower():
        llm_output = '{"text": "' + text + '", "sentiment": "negative"}'
    else:
        llm_output = '{"text": "' + text + '", "sentiment": "neutral"}'
    
    parsed_json = json.loads(llm_output)
    jsonschema.validate(instance=parsed_json, schema=sentiment_schema) # Client-side validation
    return parsed_json

# --- Usage ---
result1 = analyze_sentiment("This product is great!")
result2 = analyze_sentiment("The experience was just okay.")
print("Sentiment 1:", result1)
print("Sentiment 2:", result2)
```

---

## 2. Numeric Constraints

You can enforce rules on numeric properties using keywords like `minimum`, `maximum`, `exclusiveMinimum`, and `exclusiveMaximum`.

### JSON Schema Definition

```json
{
  "type": "object",
  "properties": {
    "item_name": { "type": "string" },
    "quantity": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100,
      "description": "The quantity of the item, must be between 1 and 100."
    },
    "price": {
      "type": "number",
      "exclusiveMinimum": 0,
      "description": "The price per unit, must be greater than 0."
    }
  },
  "required": ["item_name", "quantity", "price"]
}
```

---

## 3. String Constraints

Ensure string data meets specific length or pattern requirements using `minLength`, `maxLength`, and `pattern` (regular expressions).

### JSON Schema Definition

```json
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "minLength": 3,
      "maxLength": 20,
      "pattern": "^[a-zA-Z0-9_]+$",
      "description": "Username must be 3-20 characters, alphanumeric with underscores."
    },
    "api_key": {
      "type": "string",
      "pattern": "^sk-[a-zA-Z0-9]{32}$",
      "description": "API key format for a specific service."
    }
  },
  "required": ["username", "api_key"]
}
```

---

## 4. Array Constraints

Control the size and uniqueness of array items with `minItems`, `maxItems`, and `uniqueItems`.

### JSON Schema Definition

```json
{
  "type": "object",
  "properties": {
    "tags": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1,
      "maxItems": 5,
      "uniqueItems": true,
      "description": "A list of 1 to 5 unique tags for an item."
    }
  },
  "required": ["tags"]
}
```

---

:::tip[Combine Constraints for Robustness]
You can combine multiple constraints on a single property to create highly specific validation rules. The more precise your schema, the more reliable your LLM's structured output will be.
:::

:::warning[LLMs Can Still Hallucinate]
Even with strict schemas, an LLM might attempt to generate invalid data if the input is ambiguous or if its training data doesn't align. Always perform client-side validation (`jsonschema.validate`) to catch any outputs that don't conform to your schema.
:::