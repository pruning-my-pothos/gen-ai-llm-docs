---
title: "Tool Use Instructions"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["prompt-engineering", "tool-use", "agents", "function-calling"]
last_reviewed: "2025-12-31"
---

# Tool Use Instructions

Tool use (also known as function calling or function grounding) empowers Large Language Models to interact with external systems, retrieve real-time information, perform calculations, or execute actions that are beyond their core capabilities. This guide explains how to instruct an LLM to use tools and how to process its tool calls.

:::info[The Goal: Expand LLM Capabilities]
By integrating tools, LLMs can overcome limitations like lack of up-to-date knowledge, inability to perform precise calculations, or execute external API calls, transforming them into powerful agents.
:::

---

## The Tool Use Cycle

A typical tool-use interaction follows this cycle:

1.  **User Query**: The user asks a question that requires external information or action.
2.  **Tool Description**: The application provides the LLM with a description of available tools.
3.  **LLM Decides**: The LLM determines if a tool is needed and, if so, which one and with what arguments.
4.  **LLM Calls Tool**: The LLM outputs a structured "tool call".
5.  **Application Executes**: Your application parses the tool call and executes the actual function.
6.  **Tool Result**: The tool returns its result to the application.
7.  **Result to LLM**: The application sends the tool's result back to the LLM.
8.  **LLM Responds**: The LLM uses the tool's output to formulate a final answer to the user.

---

## 1. Describing Tools to the LLM

You provide the LLM with a schema or description of the tools it can use. This is often done using JSON Schema, similar to how OpenAPI specifications describe APIs.

### Example Tool: A Calculator

```json
{
  "name": "calculator",
  "description": "A tool for performing basic arithmetic calculations. Only takes one operation at a time.",
  "parameters": {
    "type": "object",
    "properties": {
      "operation": {
        "type": "string",
        "enum": ["add", "subtract", "multiply", "divide"]
      },
      "num1": {
        "type": "number",
        "description": "The first number."
      },
      "num2": {
        "type": "number",
        "description": "The second number."
      }
    },
    "required": ["operation", "num1", "num2"]
  }
}
```

This JSON describes a `calculator` tool that takes an `operation`, `num1`, and `num2`. You would typically include this JSON description within your system prompt or use a specialized API (like OpenAI's `tools` parameter).

---

## 2. Instructing the LLM to Call Tools

Your system prompt needs to clearly tell the model that it has access to tools and how to format its calls.

```python
from typing import List, Dict

def create_tool_use_prompt(user_query: str, available_tools_json: str) -> List[Dict[str, str]]:
    """
    Creates messages for an LLM to instruct it on tool use.
    """
    system_prompt = f"""
You are an expert assistant with access to the following tools:
{available_tools_json}

To use a tool, you MUST format your response as a JSON object inside <tool_code></tool_code> tags, like this:
<tool_code>
{{
  "tool_name": "tool_name_here",
  "parameters": {{
    "param1": "value1",
    "param2": "value2"
  }}
}}
</tool_code>
If you need to use multiple tools, call them sequentially.
If the user's question can be answered without a tool, respond directly.
"""
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_query}
    ]
    return messages

# --- Example Usage ---
calculator_tool_description = """
{
  "name": "calculator",
  "description": "A tool for performing basic arithmetic calculations. Only takes one operation at a time.",
  "parameters": {
    "type": "object",
    "properties": {
      "operation": {"type": "string", "enum": ["add", "subtract", "multiply", "divide"]},
      "num1": {"type": "number"},
      "num2": {"type": "number"}
    },
    "required": ["operation", "num1", "num2"]
  }
}
"""

user_q = "What is 123 plus 456?"
tool_use_messages = create_tool_use_prompt(user_q, calculator_tool_description)

# In a real app, this would go to the LLM.
# Expected LLM output (example):
# <tool_code>
# {
#   "tool_name": "calculator",
#   "parameters": {
#     "operation": "add",
#     "num1": 123,
#     "num2": 456
#   }
# }
# </tool_code>
```

---

## 3. Parsing Tool Calls

Your application needs to extract the tool call from the LLM's text output. This usually involves parsing a specific format (JSON, XML, or a custom delimiter).

```python
import re
import json
from typing import Optional, Dict, Any

def parse_tool_call(llm_output: str) -> Optional[Dict[str, Any]]:
    """
    Parses an LLM's output to extract a tool call.
    Assumes tool call is formatted as JSON within <tool_code> tags.
    """
    match = re.search(r"<tool_code>(.*?)</tool_code>", llm_output, re.DOTALL)
    if match:
        try:
            tool_call_json = match.group(1).strip()
            return json.loads(tool_call_json)
        except json.JSONDecodeError:
            print("Error: Could not parse tool call JSON.")
            return None
    return None

# --- Example Usage ---
llm_response_with_tool = """
Okay, I can help you with that. I will use the calculator tool.
<tool_code>
{
  "tool_name": "calculator",
  "parameters": {
    "operation": "add",
    "num1": 123,
    "num2": 456
  }
}
</tool_code>
"""

llm_response_no_tool = "The capital of France is Paris."

parsed_call = parse_tool_call(llm_response_with_tool)
if parsed_call:
    print(f"Detected tool call: {parsed_call['tool_name']} with params {parsed_call['parameters']}")
else:
    print("No tool call detected.")

parsed_call_no_tool = parse_tool_call(llm_response_no_tool)
if parsed_call_no_tool:
    print(f"Detected tool call: {parsed_call_no_tool['tool_name']} with params {parsed_call_no_tool['parameters']}")
else:
    print("No tool call detected from direct response.")
```

---

## 4. Executing the Tool and Returning the Result

Once parsed, your application executes the actual function. The result of this execution is then sent back to the LLM to allow it to form its final answer.

```python
# Assuming your actual tool functions
def execute_calculator(operation: str, num1: float, num2: float) -> float:
    if operation == "add": return num1 + num2
    if operation == "subtract": return num1 - num2
    if operation == "multiply": return num1 * num2
    if operation == "divide": return num1 / num2
    raise ValueError("Unknown operation")

# --- Simplified Example of Full Cycle ---
user_message_history = [
    {"role": "system", "content": "You are a helpful assistant with access to a calculator tool."},
    {"role": "user", "content": "What is 123 plus 456?"}
]
# Assume previous steps led to LLM output with tool call
llm_tool_call_output = """
<tool_code>
{
  "tool_name": "calculator",
  "parameters": {
    "operation": "add",
    "num1": 123,
    "num2": 456
  }
}
</tool_code>
"""
parsed_call_data = parse_tool_call(llm_tool_call_output)

if parsed_call_data and parsed_call_data["tool_name"] == "calculator":
    operation = parsed_call_data["parameters"]["operation"]
    num1 = parsed_call_data["parameters"]["num1"]
    num2 = parsed_call_data["parameters"]["num2"]
    
    tool_result = execute_calculator(operation, num1, num2)
    
    # Append tool output to messages and call LLM again
    user_message_history.append({"role": "assistant", "content": llm_tool_call_output})
    user_message_history.append({"role": "tool", "tool_call_id": "call_id_123", "name": "calculator", "content": str(tool_result)})
    
    # Next LLM call would be with updated history, to form the final answer
    # final_llm_response = call_llm(user_message_history)
    print(f"Tool executed, result: {tool_result}")
    # print(f"Final LLM response: {final_llm_response}")
```

---

:::tip[Function Calling APIs]
Many LLM providers (OpenAI, Google Gemini, Anthropic) offer dedicated "function calling" or "tool use" APIs that simplify this cycle, handling much of the parsing and instruction formatting automatically. While this guide shows a manual approach, these APIs often provide a more streamlined development experience.
:::