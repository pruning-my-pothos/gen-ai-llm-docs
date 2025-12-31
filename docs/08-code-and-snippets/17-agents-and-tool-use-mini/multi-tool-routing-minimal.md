---
title: "Multi-Tool Agent with Routing"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["agents", "tool-use", "multi-tool", "routing"]
last_reviewed: "2025-12-31"
---

# Multi-Tool Agent with Routing

Real-world tasks often require more than a single tool. A multi-tool agent can dynamically select the most appropriate tool from a diverse set of options, allowing it to tackle more complex problems and engage in more sophisticated reasoning. This guide demonstrates how to build an LLM agent capable of routing requests to different tools.

:::info[The Goal: Diverse Problem-Solving]
The objective is to enable the LLM to choose the right external function from a pool of tools based on the user's query and its internal reasoning, significantly expanding its problem-solving capabilities.
:::

---

## The Challenge: Tool Selection

When multiple tools are available, the LLM must first decide:
1.  Is a tool needed at all?
2.  If yes, which tool is the most appropriate for the current user query?
3.  What arguments should be passed to that tool?

This decision-making process is handled by the LLM itself, which acts as a router.

---

## Python Code Example: Agent with Calculator and Weather Tools

This example expands on the [Single-Tool LLM Agent](./single-tool-agent.md) by introducing a second tool (weather lookup) and enabling the agent to choose between them.

```python
import openai
import json
import re
from typing import List, Dict, Any, Optional

# --- 1. Mock LLM Client (Replace with your actual client) ---
# For demonstration, simulates LLM responses including tool calls.
def mock_llm_call_multi_agent(messages: List[Dict[str, str]], tool_schemas: List[Dict]) -> Dict[str, Any]:
    """
    Simulates an LLM call capable of generating tool calls or final answers.
    """
    last_user_message = messages[-1]['content'].lower()
    
    if "123 plus 456" in last_user_message:
        return {
            "choices": [{
                "message": {
                    "role": "assistant",
                    "tool_calls": [{
                        "id": "call_calc_add",
                        "type": "function",
                        "function": {
                            "name": "calculator",
                            "arguments": '{"operation": "add", "num1": 123, "num2": 456}'
                        }
                    }]
                }
            }]
        }
    elif "weather in san francisco" in last_user_message:
        return {
            "choices": [{
                "message": {
                    "role": "assistant",
                    "tool_calls": [{
                        "id": "call_weather_sf",
                        "type": "function",
                        "function": {
                            "name": "get_current_weather",
                            "arguments": '{"location": "San Francisco, CA"}'
                        }
                    }]
                }
            }]
        }
    elif "calculator tool gives 579" in last_user_message: # Follow-up after calculator tool
        return {
            "choices": [{
                "message": {
                    "role": "assistant",
                    "content": "The sum of 123 and 456 is 579."
                }
            }]
        }
    elif "weather tool reports 72 degrees" in last_user_message: # Follow-up after weather tool
        return {
            "choices": [{
                "message": {
                    "role": "assistant",
                    "content": "The current weather in San Francisco, CA is 72 degrees fahrenheit and sunny."
                }
            }]
        }
    else: # Direct answer or cannot find tool
        return {
            "choices": [{
                "message": {
                    "role": "assistant",
                    "content": "I cannot answer that question directly. Please ask an arithmetic question or about weather."
                }
            }]
        }

# --- 2. Tool Definitions (from Tool Schemas & Contracts) ---
calculator_tool_schema = {
  "type": "function",
  "function": {
    "name": "calculator",
    "description": "A tool for performing basic arithmetic calculations.",
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
}

weather_tool_schema = {
    "type": "function",
    "function": {
        "name": "get_current_weather",
        "description": "Get the current weather in a given location. Always requires location.",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city and state, e.g., 'San Francisco, CA'."
                },
                "unit": {
                    "type": "string",
                    "enum": ["celsius", "fahrenheit"],
                    "description": "The unit of temperature. Defaults to fahrenheit."
                }
            },
            "required": ["location"]
        }
    }
}

# --- 3. Tool Executors (from Tool Use Instructions / Single-Tool Agent) ---
def execute_calculator(operation: str, num1: float, num2: float) -> float:
    if operation == "add": return num1 + num2
    if operation == "subtract": return num1 - num2
    if operation == "multiply": return num1 * num2
    if operation == "divide": 
        if num2 == 0: raise ValueError("Division by zero")
        return num1 / num2
    raise ValueError("Unknown operation")

def execute_get_current_weather(location: str, unit: str = "fahrenheit") -> str:
    if "san francisco" in location.lower():
        return f"It's 72 degrees {unit} and sunny in San Francisco, CA."
    elif "boston" in location.lower():
        return f"It's 50 degrees {unit} and cloudy in Boston, MA."
    else:
        return f"Weather information for {location} not available."

# --- Agent Orchestration ---
def run_multi_tool_agent(
    user_query: str,
    available_tool_schemas: List[Dict],
    tool_executor_map: Dict[str, callable],
    llm_client_func: callable = mock_llm_call_multi_agent, # Replace with client.chat.completions.create
    max_iterations: int = 5
) -> str:
    """
    Orchestrates a multi-tool agent loop.
    """
    messages: List[Dict[str, str]] = [
        {"role": "user", "content": user_query}
    ]
    
    for i in range(max_iterations):
        print(f"\n--- Agent Iteration {i+1} ---")
        llm_response_object = llm_client_func(messages, tool_schemas=available_tool_schemas)
        message = llm_response_object["choices"][0]["message"]
        
        if message.get("tool_calls"):
            # The LLM decided to call a tool
            tool_call = message["tool_calls"][0] # Assuming one tool call per turn for simplicity
            tool_name = tool_call["function"]["name"]
            tool_args = json.loads(tool_call["function"]["arguments"])
            
            print(f"Agent chose to call tool: {tool_name} with args: {tool_args}")
            
            if tool_name in tool_executor_map:
                try:
                    # Execute the tool
                    tool_output = tool_executor_map[tool_name](**tool_args)
                    print(f"Tool '{tool_name}' executed. Output: {tool_output}")
                    
                    # Send tool output back to LLM for next turn
                    messages.append(message) # Append LLM's tool call message
                    messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call["id"],
                        "name": tool_name,
                        "content": str(tool_output) # Tool output must be a string
                    })
                except Exception as e:
                    print(f"Error executing tool '{tool_name}': {e}")
                    messages.append(message)
                    messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call["id"],
                        "name": tool_name,
                        "content": f"Error: {e}"
                    })
            else:
                return f"Error: Agent tried to call unknown tool '{tool_name}'."
        elif message.get("content"):
            # The LLM generated a final answer
            print(f"Agent generated final answer: {message['content']}")
            return message["content"]
        else:
            return "Agent stopped without a clear answer or tool call."
            
    return "Agent reached max iterations without finding a final answer."


# --- Example Usage ---
if __name__ == "__main__":
    all_tools = [calculator_tool_schema, weather_tool_schema]
    tool_executors = {
        "calculator": execute_calculator,
        "get_current_weather": execute_get_current_weather
    }

    print("\n--- Running Multi-Tool Agent (Calculator) ---")
    question_calc = "What is 123 plus 456?"
    final_answer_calc = run_multi_tool_agent(question_calc, all_tools, tool_executors)
    print(f"\nFinal Agent Response: {final_answer_calc}")

    print("\n--- Running Multi-Tool Agent (Weather) ---")
    question_weather = "What's the weather like in San Francisco today?"
    final_answer_weather = run_multi_tool_agent(question_weather, all_tools, tool_executors)
    print(f"\nFinal Agent Response: {final_answer_weather}")
    
    print("\n--- Running Multi-Tool Agent (General Question) ---")
    question_general = "What is the capital of France?"
    final_answer_general = run_multi_tool_agent(question_general, all_tools, tool_executors)
    print(f"\nFinal Agent Response: {final_answer_general}")
```

---

:::tip[Clear Tool Descriptions]
The LLM's ability to accurately select the correct tool depends heavily on the clarity and precision of your tool descriptions (`description` field in the schema). Spend time crafting these descriptions to minimize ambiguity.
:::

:::warning[Handling Multiple Tool Calls]
Some advanced LLMs (and their APIs) can generate multiple tool calls in a single turn. Your parsing logic might need to be adapted to handle a list of `tool_calls` rather than assuming a single one. This example simplifies by only processing the first tool call.
:::