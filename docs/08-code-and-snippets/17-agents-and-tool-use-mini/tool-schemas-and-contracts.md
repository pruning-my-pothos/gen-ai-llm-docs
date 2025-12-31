---
title: "Tool Schemas and Contracts"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["agents", "tool-use", "function-calling", "json-schema"]
last_reviewed: "2025-12-31"
---

# Tool Schemas and Contracts

For LLMs to reliably use external tools, there needs to be a clear, unambiguous specification of what each tool does and what parameters it expects. This specification is often defined using JSON Schema. The "contract" defines the expected behavior: the LLM promises to generate tool calls that conform to the schema, and your application promises to execute the tool and return its result.

:::info[The Goal: Reliable Tool Invocation]
The objective is to create a robust interface between the LLM's reasoning and your application's functions, ensuring that tool calls are correctly formatted, validated, and executable.
:::

---

## 1. Defining Tool Schemas

Each tool the LLM can access needs a description. This typically includes:
-   `name`: A unique identifier for the tool.
-   `description`: A natural language explanation of what the tool does. This helps the LLM decide when and how to use it.
-   `parameters`: A JSON Schema object defining the input arguments the tool expects. This is crucial for validation.

### Example: A Complex "Booking" Tool

Let's define a tool for booking a flight or hotel, which has more complex parameters.

```json
{
  "type": "function",
  "function": {
    "name": "book_travel",
    "description": "Books a flight or a hotel. Always requires confirmation from the user before finalizing a booking.",
    "parameters": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["flight", "hotel"],
          "description": "The type of travel to book (flight or hotel)."
        },
        "destination": {
          "type": "string",
          "description": "The destination city or hotel location."
        },
        "start_date": {
          "type": "string",
          "format": "date",
          "description": "The start date of the travel in YYYY-MM-DD format."
        },
        "end_date": {
          "type": "string",
          "format": "date",
          "description": "The end date of the travel in YYYY-MM-DD format. Required for hotels, optional for flights (round trip)."
        },
        "num_travelers": {
          "type": "integer",
          "minimum": 1,
          "description": "The number of travelers. Defaults to 1 if not specified."
        },
        "class_preference": {
          "type": "string",
          "enum": ["economy", "business", "first"],
          "description": "Preferred class for flights. Defaults to economy."
        }
      },
      "required": ["type", "destination", "start_date"]
    }
  }
}
```

---

## 2. The Contract: LLM Generation & Application Execution

### LLM's Side of the Contract

The LLM (when properly prompted or using a function-calling API) is expected to:
-   **Choose the Right Tool**: Determine if a tool is needed based on the user's query.
-   **Generate Valid Arguments**: Fill in the `parameters` of the chosen tool call according to its JSON Schema definition, inferring values from the user's prompt.
-   **Handle Missing Information**: If required parameters are missing from the user's query, the LLM should ask clarifying questions instead of hallucinating values.

### Application's Side of the Contract

Your application is responsible for:
-   **Parsing Tool Calls**: Reliably extract the tool name and arguments from the LLM's output.
-   **Validation**: Optionally re-validate the arguments against the JSON Schema for an extra layer of safety.
-   **Execution**: Call the corresponding actual function in your codebase.
-   **Feedback**: Return the tool's execution result (or an error) back to the LLM for it to formulate a final response.

---

## 3. Naming Conventions for Reliability

-   **Descriptive Tool Names**: Use clear, concise names (e.g., `get_current_weather`, `book_travel`).
-   **Clear Descriptions**: Provide detailed natural language descriptions for both the tool itself and each of its parameters. These descriptions are what the LLM reads to understand the tool.
-   **Consistent Parameter Naming**: Use snake_case for parameter names (e.g., `start_date`, not `startDate`).

### Example Python Tool Description (for LLM prompt)

```python
import json

def get_tool_descriptions(tool_schemas: List[Dict]) -> str:
    """
    Formats tool schemas into a string for inclusion in an LLM's system prompt.
    """
    formatted_tools = []
    for tool in tool_schemas:
        formatted_tools.append(f"""
Tool Name: {tool['function']['name']}
Description: {tool['function']['description']}
Parameters (JSON Schema): {json.dumps(tool['function']['parameters'], indent=2)}
        """)
    return "\n---\n".join(formatted_tools)

# --- Example Usage with the booking_travel schema ---
booking_tool_schema = {
  "type": "function",
  "function": {
    "name": "book_travel",
    "description": "Books a flight or a hotel. Always requires confirmation from the user before finalizing a booking.",
    "parameters": {
      "type": "object",
      "properties": {
        "type": {"type": "string", "enum": ["flight", "hotel"]},
        "destination": {"type": "string"},
        "start_date": {"type": "string", "format": "date"}
      },
      "required": ["type", "destination", "start_date"]
    }
  }
}

formatted_tool_info = get_tool_descriptions([booking_tool_schema])
print(formatted_tool_info)

# This formatted_tool_info would then be part of your system prompt to the LLM.
# Your system prompt would also instruct the LLM on how to generate the tool call output.
```
*Related Guide: [Tool Use Instructions](./../07-prompting-patterns/tool-use-instructions.md) for how the LLM interprets and generates tool calls.*

---

:::tip[Use Pydantic for Python Tools]
If you're using Python, you can define your tool parameters using Pydantic models. Pydantic can automatically generate the JSON Schema for you, reducing manual errors and ensuring your code and schema stay in sync.
:::

:::warning[Security Risk: Unvalidated Tool Calls]
Never execute tool calls generated by an LLM without strict validation of the tool name and all its parameters. Malicious inputs could trick the LLM into generating dangerous or unauthorized tool calls. (See [Sandboxing and Allowlists](./sandboxing-and-allowlists.md)).
:::