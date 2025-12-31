---
title: "Single-Tool LLM Agent"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["agents", "tool-use", "agent-loop", "python"]
last_reviewed: "2025-12-31"
---

# Single-Tool LLM Agent

An LLM agent is an LLM enhanced with the ability to perceive its environment, reason about what to do, and then act through external tools. This "agentic" behavior allows LLMs to overcome their inherent limitations (e.g., lack of up-to-date information, inability to perform complex calculations) and execute multi-step tasks. This guide demonstrates building a minimal agent that can use a single external tool.

:::info[The Goal: Automate Multi-Step Tasks]
The objective is to enable the LLM to autonomously determine when to use a tool, execute it, and then incorporate the tool's result into its reasoning to achieve a user's goal.
:::

---

## The Agent Loop: Observe-Reason-Act

The core of any LLM agent is an iterative loop:

1.  **Observe**: The agent receives new information (e.g., a user query, the result of a tool execution).
2.  **Reason**: The LLM analyzes the current state and decides on the next action:
    *   Call a tool (and with what arguments)?
    *   Formulate a final answer to the user?
    *   Ask a clarifying question?
3.  **Act**: The agent either executes the chosen tool (triggering an external action) or generates a final natural language response.

This loop continues until the agent believes it has achieved the user's goal or a predefined stop condition is met.

---

## Python Code Example: A Minimal Calculator Agent

This example builds a basic agent that can use a simple `calculator` tool to answer arithmetic questions. We'll reuse the `calculator` tool concept from [Tool Use Instructions](./../07-prompting-patterns/tool-use-instructions.md).

```python
import openai # pip install openai
import json
import re
from typing import List, Dict, Any, Optional

# --- 1. LLM Client (conceptual, replace with your actual client) ---
# For demonstration, we'll use a mock function.
# In a real app, configure `openai.OpenAI` client
# client = openai.OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

def mock_llm_call_agent(messages: List[Dict[str, str]], tool_schemas: List[Dict]) -> Dict[str, Any]:
    """
    Simulates an LLM call capable of generating tool calls or final answers.
    """
    last_user_message = messages[-1]['content'].lower()
    
    if "123 plus 456" in last_user_message or "sum of" in last_user_message:
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
    elif "calculator tool gives 579" in last_user_message:
        return {
            "choices": [{
                "message": {
                    "role": "assistant",
                    "content": "The sum of 123 and 456 is 579."
                }
            }]
        }
    else:
        return {
            "choices": [{
                "message": {
                    "role": "assistant",
                    "content": "I cannot answer that question directly. Please ask a simple arithmetic question."
                }
            }]
        }

# --- 2. Tool Definition (from Tool Use Instructions) ---
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

# --- 3. Tool Executor (from Tool Use Instructions) ---
def execute_calculator(operation: str, num1: float, num2: float) -> float:
    """Executes the calculator function."""
    if operation == "add": return num1 + num2
    if operation == "subtract": return num1 - num2
    if operation == "multiply": return num1 * num2
    if operation == "divide": 
        if num2 == 0: raise ValueError("Division by zero")
        return num1 / num2
    raise ValueError("Unknown operation")

# --- Agent Orchestration ---
def run_single_tool_agent(
    user_query: str,
    available_tools: List[Dict],
    tool_executor: Dict[str, callable],
    llm_client_func: callable = mock_llm_call_agent, # Replace with client.chat.completions.create
    max_iterations: int = 5
) -> str:
    """
    Orchestrates a single-tool agent loop.
    """
    messages: List[Dict[str, str]] = [
        {"role": "user", "content": user_query}
    ]
    
    for i in range(max_iterations):
        print(f"\n--- Agent Iteration {i+1} ---")
        # 1. Reason (LLM decides next step)
        llm_response = llm_client_func(messages, tool_schemas=available_tools)
        
        message = llm_response["choices"][0]["message"]
        
        # 2. Act (Tool call or Final Answer)
        if message.get("tool_calls"):
            tool_call = message["tool_calls"][0] # Assuming one tool call per turn for simplicity
            tool_name = tool_call["function"]["name"]
            tool_args = json.loads(tool_call["function"]["arguments"])
            
            print(f"Agent chose to call tool: {tool_name} with args: {tool_args}")
            
            if tool_name in tool_executor:
                try:
                    tool_output = tool_executor[tool_name](**tool_args)
                    print(f"Tool '{tool_name}' executed. Output: {tool_output}")
                    
                    # Add tool output to messages for next LLM turn
                    messages.append(message) # Append LLM's tool call message
                    messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call["id"],
                        "name": tool_name,
                        "content": str(tool_output) # Convert tool output to string
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
            print(f"Agent generated final answer: {message['content']}")
            return message["content"]
        else:
            return "Agent stopped without a clear answer or tool call."
            
    return "Agent reached max iterations without finding a final answer."


# --- Example Usage ---
if __name__ == "__main__":
    tools = [calculator_tool_schema]
    tool_executors = {"calculator": execute_calculator}

    print("\n--- Running Calculator Agent ---")
    question_math = "What is the sum of 123 and 456?"
    final_answer = run_single_tool_agent(question_math, tools, tool_executors)
    print(f"\nFinal Agent Response: {final_answer}")

    print("\n--- Running Agent for Non-Tool Question ---")
    question_non_tool = "What is the capital of France?"
    final_answer_non_tool = run_single_tool_agent(question_non_tool, tools, tool_executors)
    print(f"\nFinal Agent Response: {final_answer_non_tool}")
```

---

:::tip[Designing Tools for Agents]
-   **Atomic**: Each tool should perform a single, well-defined action.
-   **Reliable**: Tools should ideally be robust and handle edge cases gracefully.
-   **Descriptive**: Provide clear `name`s and `description`s in the tool schema to help the LLM understand their purpose.
:::

:::warning[Security of Tool Execution]
Executing LLM-generated tool calls is a significant security risk. Always validate tool calls and their arguments before execution. Implement robust [Sandboxing and Allowlists](./sandboxing-and-allowlists.md) to mitigate risks.
:::