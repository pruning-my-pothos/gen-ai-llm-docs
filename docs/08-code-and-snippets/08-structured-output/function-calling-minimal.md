---
title: "Minimal Function Calling Example"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["structured-output", "function-calling", "agents", "openai-api"]
last_reviewed: "2025-12-31"
---

# Minimal Function Calling Example

Function calling is a specialized API feature offered by many LLM providers (like OpenAI, Google Gemini) that allows you to reliably get structured data from the model. Instead of just generating free-form text, the LLM can generate a structured call to a predefined function in your code.

:::info[The Goal: Bridging LLMs and Your Code]
Function calling acts as a bridge, enabling LLMs to execute specific actions or retrieve information from your application's tools, making them powerful agents that can interact with the real world.
:::

---

## The Function Calling Workflow

1.  **Define a Tool**: You provide the LLM with a description of a tool (function) it can use, including its name, description, and the JSON Schema of its parameters.
2.  **User Query**: The user asks a question that might require this tool.
3.  **LLM Generates Tool Call**: Based on the user's query and the tool descriptions, the LLM determines if a tool is needed and, if so, generates a structured "tool call" object (function name + arguments).
4.  **Application Executes Tool**: Your application receives this tool call, parses it, and then executes the actual function in your code.
5.  **Tool Output to LLM**: The result of the function execution is sent back to the LLM.
6.  **LLM Responds**: The LLM uses the tool's output to formulate a natural language response to the user.

---

## Minimal Example: Getting Current Weather

Let's illustrate this with a simple `get_current_weather` function.

### 1. Define Your Tool (Python Function)

First, define the actual Python function you want the LLM to be able to "call".

```python
def get_current_weather(location: str, unit: str = "fahrenheit") -> str:
    """
    Get the current weather in a given location.
    
    Args:
        location: The city and state, e.g., "San Francisco, CA".
        unit: The unit of temperature, "celsius" or "fahrenheit".
    """
    if "san francisco" in location.lower():
        return f"It's 72 degrees {unit} and sunny in San Francisco, CA."
    elif "boston" in location.lower():
        return f"It's 50 degrees {unit} and cloudy in Boston, MA."
    else:
        return f"Weather information for {location} not available."
```

### 2. Convert to JSON Schema

Next, describe this Python function to the LLM using a JSON Schema format that the API expects.

```python
weather_tool_schema = {
    "type": "function",
    "function": {
        "name": "get_current_weather",
        "description": "Get the current weather in a given location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city and state, e.g. San Francisco, CA"
                },
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["location"]
        }
    }
}
```

### 3. Call the LLM with Tool Definitions

Now, make an API call to the LLM, including the `tools` definition. When the user asks a question relevant to the tool, the LLM will generate a `tool_calls` message instead of a regular text response.

```python
import openai # pip install openai
import json
from typing import List, Dict

# Assuming OPENAI_API_KEY is set in your environment variables
# client = openai.OpenAI()

def call_llm_with_function(user_question: str, tools_definition: List[Dict]) -> Dict:
    """
    Simulates calling an LLM with function definitions.
    In a real app, this makes the actual OpenAI API call.
    """
    messages = [{"role": "user", "content": user_question}]

    # Simulated OpenAI API response for demonstration
    if "weather" in user_question.lower() and "san francisco" in user_question.lower():
        return {
            "choices": [{
                "message": {
                    "role": "assistant",
                    "tool_calls": [{
                        "id": "call_abc123",
                        "type": "function",
                        "function": {
                            "name": "get_current_weather",
                            "arguments": '{"location": "San Francisco, CA", "unit": "fahrenheit"}'
                        }
                    }]
                }
            }]
        }
    elif "weather" in user_question.lower() and "boston" in user_question.lower():
        return {
            "choices": [{
                "message": {
                    "role": "assistant",
                    "tool_calls": [{
                        "id": "call_def456",
                        "type": "function",
                        "function": {
                            "name": "get_current_weather",
                            "arguments": '{"location": "Boston, MA", "unit": "celsius"}'
                        }
                    }]
                }
            }]
        }
    else:
        return {
            "choices": [{
                "message": {
                    "role": "assistant",
                    "content": "I cannot fulfill that request without a tool."
                }
            }]
        }

    # Real OpenAI API call:
    # response = client.chat.completions.create(
    #     model="gpt-3.5-turbo",
    #     messages=messages,
    #     tools=tools_definition,
    #     tool_choice="auto", # Let the model decide if it wants to call a tool
    # )
    # return response.model_dump() # For pydantic v2+


# --- Usage ---
user_q_1 = "What's the weather like in San Francisco?"
llm_response_1 = call_llm_with_function(user_q_1, [weather_tool_schema])

# Check if the LLM decided to call a tool
if llm_response_1["choices"][0]["message"].get("tool_calls"):
    tool_call = llm_response_1["choices"][0]["message"]["tool_calls"][0]
    tool_name = tool_call["function"]["name"]
    tool_args = json.loads(tool_call["function"]["arguments"])
    
    print(f"LLM wants to call tool: {tool_name} with args: {tool_args}")
    
    # Execute the actual tool function in your code
    if tool_name == "get_current_weather":
        weather_output = get_current_weather(tool_args["location"], tool_args.get("unit", "fahrenheit"))
        print(f"Tool executed, result: {weather_output}")
        
        # Send tool output back to LLM for final response
        final_messages = [
            {"role": "user", "content": user_q_1},
            llm_response_1["choices"][0]["message"], # The assistant's tool call
            {"role": "tool", "tool_call_id": tool_call["id"], "name": tool_name, "content": weather_output}
        ]
        # final_llm_response = client.chat.completions.create(model="gpt-3.5-turbo", messages=final_messages)
        # print("Final LLM Response:", final_llm_response.choices[0].message.content)
    
else:
    print("LLM responded directly:", llm_response_1["choices"][0]["message"].get("content"))
```

---

:::tip[Beyond Weather]
Function calling is not limited to simple tasks. You can define tools for:
-   Database queries
-   Sending emails/messages
-   Making API calls to external services (e.g., booking a flight)
-   Performing complex calculations
The key is to give the LLM access to well-defined functions that your application can execute reliably.
:::