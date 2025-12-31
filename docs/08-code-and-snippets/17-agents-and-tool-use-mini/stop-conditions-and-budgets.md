---
title: "Agent Stop Conditions and Budgets"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["agents", "tool-use", "budgets", "control-flow"]
last_reviewed: "2025-12-31"
---

# Agent Stop Conditions and Budgets

LLM agents operate in iterative loops, deciding on actions and executing tools until a goal is met. Without proper safeguards, these loops can lead to unintended consequences: infinite execution, excessive API costs, or actions that spiral out of control. Implementing robust stop conditions and budgets is crucial for making agents safe, predictable, and cost-effective.

:::info[The Goal: Controlled Autonomy]
The objective is to introduce guardrails that manage the agent's autonomy, ensuring it operates within predefined boundaries for iterations, resources, and time, thereby preventing runaway behavior.
:::

---

## The Problem: Unbounded Execution

An agent's reasoning process can sometimes get stuck in a loop, continuously calling tools or generating intermediate thoughts without reaching a final answer. This can quickly deplete API budgets and cause application instability.

---

## Common Stop Conditions and Budgets

### 1. Maximum Iterations

The simplest and most fundamental guardrail. Limit the number of times the agent can cycle through its Observe-Reason-Act loop.

-   **Why**: Prevents infinite loops and ensures a bounded execution time.
-   **Implementation**: Add an iteration counter to your agent loop and break if it exceeds `max_iterations`. (Already shown in [Single-Tool Agent](./single-tool-agent.md)).

### 2. Token Budget Enforcement

Monitor the total tokens consumed (input + output) by the agent during its entire run. This directly controls API costs.

-   **Why**: Prevents unexpected cost spikes due to long reasoning chains or tool outputs.
-   **Implementation**: Use a token counting function (e.g., from [Token Counting in Python](./../05-token-counting/token-count-python.md)) to track tokens and halt if a `max_token_budget` is exceeded.

### 3. Time Budget

Set a maximum elapsed time for the agent's execution.

-   **Why**: Ensures a responsive user experience and prevents very long-running background processes.
-   **Implementation**: Record `start_time` and check `time.time() - start_time` against a `max_time_seconds` limit within the loop.

### 4. Explicit Final Answer Detection

The agent is designed to produce a final answer. If it generates an explicit final answer, the loop should terminate.

-   **Why**: Indicates goal achievement, and further execution is unnecessary.
-   **Implementation**: Check if the LLM's response contains a final `content` message without any `tool_calls`. (Already shown in [Single-Tool Agent](./single-tool-agent.md)).

### 5. Tool Execution Failure Threshold

If a tool repeatedly fails or returns errors, the agent might be misusing it or encountering an unsolvable problem.

-   **Why**: Prevents the agent from endlessly retrying a broken tool or getting stuck.
-   **Implementation**: Track consecutive tool failures and stop the loop if a threshold is met.

---

## Python Code Example: Agent with Integrated Budgets

This example extends the multi-tool agent to include token and time budgets.

```python
import openai
import json
import re
import time
import tiktoken # pip install tiktoken
from typing import List, Dict, Any, Optional, Tuple

# Assume golden_prompts_set.py has the load_golden_set
# from .golden_prompts_set import load_golden_set

# --- Mock LLM Client (Replace with your actual client) ---
# See single-tool-agent.md for a more detailed mock
def mock_llm_call_budgeted(messages: List[Dict[str, str]], tool_schemas: List[Dict]) -> Dict[str, Any]:
    """Simulates an LLM call. Sometimes calls tool, sometimes answers."""
    last_user_message = messages[-1]['content'].lower()
    if "sum of" in last_user_message and "123" in last_user_message:
        return {"choices": [{"message": {"role": "assistant", "tool_calls": [{"id": "call_123", "type": "function", "function": {"name": "calculator", "arguments": '{"operation": "add", "num1": 123, "num2": 456}'}}]}}]}
    elif "calculator tool gives 579" in last_user_message:
        return {"choices": [{"message": {"role": "assistant", "content": "The sum of 123 and 456 is 579."}}]}
    else:
        return {"choices": [{"message": {"role": "assistant", "content": "I can only perform arithmetic for now."}}]}


# --- Token Counting Function (from ../05-token-counting/token-count-python.md) ---
# Simplified for demonstration; use full function for accuracy
def count_chat_message_tokens(messages: List[Dict[str, str]], model: str = "gpt-3.5-turbo") -> int:
    try:
        encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        encoding = tiktoken.get_encoding("cl100k_base")
    num_tokens = 0
    for message in messages:
        num_tokens += len(encoding.encode(message.get("content", "")))
    num_tokens += len(messages) * 3 + 3 # Rough estimate for role/priming tokens
    return num_tokens

# --- Tool Definitions and Executors (from multi-tool-routing-minimal.md) ---
calculator_tool_schema = { "type": "function", "function": { "name": "calculator", "description": "A tool for performing basic arithmetic calculations.", "parameters": { "type": "object", "properties": { "operation": {"type": "string", "enum": ["add", "subtract"]}, "num1": {"type": "number"}, "num2": {"type": "number"}}, "required": ["operation", "num1", "num2"]}}}
def execute_calculator(operation: str, num1: float, num2: float) -> float:
    if operation == "add": return num1 + num2
    # ... other operations ...
    raise ValueError("Unknown operation")


def run_budgeted_agent(
    user_query: str,
    available_tool_schemas: List[Dict],
    tool_executor_map: Dict[str, callable],
    llm_client_func: callable = mock_llm_call_budgeted,
    model_name: str = "gpt-3.5-turbo",
    max_iterations: int = 5,
    max_token_budget: int = 4000, # Max total tokens for the conversation
    max_time_seconds: int = 60, # Max seconds for agent execution
    llm_temperature: float = 0.7
) -> str:
    """
    Orchestrates an agent loop with integrated stop conditions and budgets.
    """
    messages: List[Dict[str, str]] = [
        {"role": "user", "content": user_query}
    ]
    
    start_time = time.time()
    total_tokens_used = 0

    for i in range(max_iterations):
        if time.time() - start_time > max_time_seconds:
            print(f"Time budget exceeded ({max_time_seconds}s). Stopping agent.")
            return "Agent stopped: Time budget exceeded."
        
        current_conversation_tokens = count_chat_message_tokens(messages, model_name)
        if current_conversation_tokens > max_token_budget:
            print(f"Token budget exceeded ({current_conversation_tokens}/{max_token_budget} tokens). Stopping agent.")
            return "Agent stopped: Token budget exceeded."
            
        print(f"\n--- Agent Iteration {i+1} ---" (Tokens: {current_conversation_tokens}/{max_token_budget}, Time: {time.time() - start_time:.2f}s)")
        
        # 1. Reason (LLM decides next step)
        llm_response_object = llm_client_func(messages, tool_schemas=available_tool_schemas)
        message = llm_response_object["choices"][0]["message"]
        
        # 2. Act (Tool call or Final Answer)
        if message.get("tool_calls"):
            tool_call = message["tool_calls"][0]
            tool_name = tool_call["function"]["name"]
            tool_args = json.loads(tool_call["function"]["arguments"])
            
            print(f"Agent chose to call tool: {tool_name} with args: {tool_args}")
            
            if tool_name in tool_executor_map:
                try:
                    tool_output = tool_executor_map[tool_name](**tool_args)
                    print(f"Tool '{tool_name}' executed. Output: {tool_output}")
                    
                    messages.append(message)
                    messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call["id"],
                        "name": tool_name,
                        "content": str(tool_output)
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
    tools = [calculator_tool_schema] # Only calculator for simplicity
    tool_executors = {"calculator": execute_calculator}

    print("\n--- Running Budgeted Agent ---")
    question_budgeted = "What is the sum of 123 and 456?"
    final_answer_budgeted = run_budgeted_agent(
        question_budgeted, 
        tools, 
        tool_executors,
        max_token_budget=1000, # Example budget
        max_time_seconds=30    # Example timeout
    )
    print(f"\nFinal Agent Response: {final_answer_budgeted}")
```

---

:::tip[Combine Budgets for Robustness]
Combining multiple stop conditions (e.g., max iterations, token budget, time budget) provides the most robust guardrails for your agent. The agent will stop at whichever limit it hits first.
:::

:::warning[Balance Constraints Carefully]
Too strict budgets can prevent your agent from solving complex problems that naturally require more steps or tokens. Experiment to find the right balance for your application's requirements.
:::