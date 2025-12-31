---
title: "Schema-First Structured Output Examples"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["structured-output", "json-schema", "examples", "data-extraction"]
last_reviewed: "2025-12-31"
---

# Schema-First Structured Output Examples

Defining your desired output with a JSON Schema is the most robust way to get structured, reliable data from an LLM. This approach provides a clear contract for the model, significantly reducing hallucinations and ensuring your application receives data in the exact format it expects.

:::info[The Goal: Precise Data Extraction]
By providing a formal JSON Schema, you tell the LLM exactly what fields, types, and constraints to adhere to. This transforms the LLM into a powerful, flexible data extraction engine.
:::

---

## 1. Example: Extracting Simple Contact Information

Let's define a schema for extracting basic contact details from a piece of text.

### JSON Schema Definition

```json
{
  "type": "object",
  "properties": {
    "person_name": {
      "type": "string",
      "description": "The full name of the person."
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "The email address of the person."
    },
    "phone_number": {
      "type": "string",
      "pattern": "^\\+?[1-9]\\d{1,14}$",
      "description": "The phone number of the person, including country code if available."
    }
  },
  "required": ["person_name", "email"]
}
```

### Python Implementation (Conceptual with OpenAI API)

```python
import openai
import json
from typing import List, Dict, Any

# Assume you have your OpenAI API key set up
# client = openai.OpenAI()

def extract_contact_info(text: str) -> Dict[str, Any]:
    """
    Extracts contact information from text using an LLM guided by JSON Schema.
    """
    
    # In a real application, you would pass the schema to the API's 'tools' or 'function_call' parameter.
    # For demonstration, we'll simulate the LLM's response.
    
    # Example prompt if you were using a local model or a generic chat API
    # that doesn't natively support function calling but can be prompted:
    prompt_messages = [
        {"role": "system", "content": f"Extract contact information from the following text based on this JSON Schema:\n{json.dumps(book_schema, indent=2)}\n\nOnly output the JSON object."},
        {"role": "user", "content": text}
    ]

    # Simulated LLM response for demonstration (should match the schema)
    if "Alice Smith" in text:
        llm_response_content = '{"person_name": "Alice Smith", "email": "alice.smith@example.com", "phone_number": "+15551234567"}'
    else:
        llm_response_content = '{"person_name": "John Doe", "email": "john.doe@example.com"}' # Missing phone

    # If using OpenAI's API:
    # response = client.chat.completions.create(
    #     model="gpt-4",
    #     messages=[{"role": "user", "content": text}],
    #     tools=[{"type": "function", "function": {"name": "extract_info", "parameters": book_schema}}],
    #     tool_choice={"type": "function", "function": {"name": "extract_info"}}
    # )
    # tool_call = response.choices[0].message.tool_calls[0]
    # return json.loads(tool_call.function.arguments)

    return json.loads(llm_response_content)

# --- Usage ---
text1 = "My name is Alice Smith, you can reach me at alice.smith@example.com or call +15551234567."
contact1 = extract_contact_info(text1)
print("Contact 1:", contact1)

text2 = "John Doe's email is john.doe@example.com."
contact2 = extract_contact_info(text2)
print("Contact 2:", contact2)
```

---

## 2. Example: Extracting a List of Items (Shopping List)

This schema demonstrates how to extract an array of objects, useful for lists of tasks, products, or events.

### JSON Schema Definition

```json
{
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "description": "A list of items found in the text.",
      "items": {
        "type": "object",
        "properties": {
          "item_name": {
            "type": "string",
            "description": "The name of the item."
          },
          "quantity": {
            "type": "integer",
            "description": "The quantity of the item.",
            "minimum": 1
          }
        },
        "required": ["item_name", "quantity"]
      }
    }
  },
  "required": ["items"]
}
```

### Python Implementation (Conceptual)

```python
# Assuming your LLM client is set up to handle schema-based output
def extract_shopping_list(text: str) -> Dict[str, Any]:
    """
    Extracts a shopping list from text using an LLM guided by JSON Schema.
    """
    # Simulated LLM response
    llm_response_content = '{"items": [{"item_name": "Milk", "quantity": 2}, {"item_name": "Eggs", "quantity": 12}, {"item_name": "Bread", "quantity": 1}]}'
    return json.loads(llm_response_content)

# --- Usage ---
text = "I need 2 cartons of Milk, a dozen Eggs, and one loaf of Bread."
shopping_list = extract_shopping_list(text)
print("Shopping List:", shopping_list)
```

---

## 3. Example: Extracting Nested Data with Enums (Product Review)

For more complex data, you can use nested objects and `enum` types to constrain values to a predefined set.

### JSON Schema Definition

```json
{
  "type": "object",
  "properties": {
    "product_name": {
      "type": "string",
      "description": "The name of the product being reviewed."
    },
    "rating": {
      "type": "integer",
      "minimum": 1,
      "maximum": 5,
      "description": "The rating given to the product (1-5 stars)."
    },
    "sentiment": {
      "type": "string",
      "enum": ["positive", "neutral", "negative"],
      "description": "The overall sentiment of the review."
    },
    "comment": {
      "type": "string",
      "description": "The detailed comment from the review."
    },
    "recommend": {
      "type": "boolean",
      "description": "Whether the reviewer recommends the product."
    }
  },
  "required": ["product_name", "rating", "sentiment", "comment", "recommend"]
}
```

### Python Implementation (Conceptual)

```python
# Assuming your LLM client is set up to handle schema-based output
def extract_product_review(text: str) -> Dict[str, Any]:
    """
    Extracts structured product review data from text.
    """
    # Simulated LLM response
    llm_response_content = '{"product_name": "Wireless Headphones", "rating": 4, "sentiment": "positive", "comment": "Great sound quality for the price, but battery life is just okay.", "recommend": true}'
    return json.loads(llm_response_content)

# --- Usage ---
review_text = "I love these Wireless Headphones! Great sound quality for the price, though the battery life is just okay. Definitely recommend them."
product_review = extract_product_review(review_text)
print("Product Review:", product_review)
```

---

:::tip[Clear Descriptions are Key]
Even with JSON Schema, the `description` fields within your schema properties are crucial. They provide natural language hints to the LLM about what data to extract for each field, significantly improving accuracy.
:::

:::warning[Client-Side Validation for Local Models]
For local LLMs that don't natively support function calling with JSON Schema, you'll need to rely on strong prompting to get JSON output and then perform client-side validation using a library like `jsonschema` to ensure adherence to your schema.
:::