---
title: "LLM Agent Configuration Example"
archetype: "template"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["configuration", "agents", "tool-use", "template", "yaml"]
last_reviewed: "2025-12-31"
slug: /08-code-and-snippets/config-examples/agent-config
---

# LLM Agent Configuration Example

This template provides a structured YAML file to configure the behavior, available tools, and control mechanisms for an LLM agent. Externalizing agent configuration allows for easier experimentation with different LLMs, toolsets, and safety parameters without modifying the core agent logic.

:::info[The Goal: Flexible Agent Deployment]
The objective is to define your agent's capabilities and operational boundaries declaratively, enabling quick iteration on agent performance, safety, and functionality.
:::

---

## Template: `agent_config.yaml`

```yaml
# agent_config.yaml

agent_name: "CustomerSupportAgent"
description: "An LLM agent designed to assist with QuantumFlow Cloud Services inquiries."

# --- LLM Configuration for the Agent ---
# Refers to a configuration defined in llm_config.yaml or similar
llm_settings:
  provider: "ollama"
  model: "llama3"
  temperature: 0.5 # Slightly lower for more reliable reasoning
  max_tokens: 1000 # Max tokens for an LLM turn within the agent loop
  seed: 42 # For reproducibility during testing

# --- Available Tools for the Agent ---
# Each entry refers to a tool's definition (e.g., its JSON Schema)
tools:
  - name: "get_product_info"
    description: "Retrieve details about QuantumFlow products."
    schema_path: "./tools/product_info_schema.json" # Path to JSON Schema file
    # Corresponding function to execute (your application maps this to actual Python function)
  - name: "create_support_ticket"
    description: "Create a new support ticket in the ticketing system."
    schema_path: "./tools/support_ticket_schema.json"
  - name: "knowledge_base_search"
    description: "Search the QuantumFlow knowledge base for relevant documents."
    schema_path: "./tools/kb_search_schema.json"

# --- Agent Control and Safety Measures ---
stop_conditions:
  max_iterations: 10 # Prevent infinite loops
  max_total_tokens: 8000 # Total tokens for the entire agent conversation
  timeout_seconds: 120 # Max time for the entire agent run

safety_guards:
  prompt_injection_check_enabled: true # Enable input scanning for red flags
  output_validation_schema_path: "./output_validation_schema.json" # Validate final output
  human_handoff_threshold: 3 # If agent fails/refuses X times, hand off to human

# --- Example Usage (Python conceptual) ---
# import yaml
# import json
# # Assume llm_config is loaded from llm_api_config.yaml
# # from your_app.llm_client import get_llm_client # Function to initialize client from config
# # from your_app.tool_registry import load_tool_schemas, get_tool_executor # Map tool name to function

# with open("agent_config.yaml", 'r') as f:
#     agent_config = yaml.safe_load(f)

# llm_client = get_llm_client(agent_config['llm_settings']) # Initialize LLM client

# # Load tool schemas from paths and prepare tool executors
# tool_schemas = load_tool_schemas([tool['schema_path'] for tool in agent_config['tools']])
# tool_executors = get_tool_executor([tool['name'] for tool in agent_config['tools']])

# # Then pass these configs to your agent orchestration logic
# # from your_app.agent_orchestrator import run_agent
# # run_agent(llm_client, tool_schemas, tool_executors, agent_config['stop_conditions'], agent_config['safety_guards'])
```

---

## How to Use

1.  **Save**: Save this content as `agent_config.yaml` (or similar name) in your project.
2.  **Define Tools**: Create separate JSON Schema files for each tool referenced under `tools` (e.g., `product_info_schema.json`).
3.  **Customize**: Adjust `llm_settings`, `tools`, `stop_conditions`, and `safety_guards` to fit your agent's purpose.
4.  **Load in Code**: In your agent orchestration logic (e.g., a Python script), load this YAML file using `PyYAML` and use its values to configure the agent's behavior.

---

:::tip[Modular Tool Definitions]
It's good practice to keep tool JSON Schema definitions in separate files and reference them from `agent_config.yaml`. This makes `agent_config.yaml` cleaner and allows tool schemas to be reused.
:::

:::warning[Security of Tools]
Always ensure that the actual functions your agent calls (via `tool_executor_map`) are robustly implemented and secured, especially when they perform sensitive actions. (See [Sandboxing and Allowlists for LLM Agents](../../17-agents-and-tool-use-mini/sandboxing-and-allowlists.md)).
:::
