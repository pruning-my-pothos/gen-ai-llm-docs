---
title: "Agents & Tool Use (Mini)"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["agents", "tool-use", "function-calling", "index"]
last_reviewed: "2025-12-31"
---

# Agents & Tool Use (Mini)

LLM agents represent a significant leap beyond simple prompt-response systems. By empowering LLMs with the ability to use external tools, observe their environment, reason about their next steps, and act iteratively, we can enable them to solve complex, multi-step tasks. This section provides foundational concepts and practical implementations for building basic LLM agents.

:::info[Goal: From Prompt to Autonomy]
The objective is to equip you with the understanding and code patterns to build LLM applications that can plan, execute tools, and iteratively work towards a goal, effectively extending their capabilities beyond text generation.
:::

## Guides and Snippets

-   [**Tool Schemas and Contracts**](./tool-schemas-and-contracts.md): Learn how to formally define the interface for external tools using JSON Schema, establishing a clear contract for the LLM to generate valid tool calls.

-   [**Single-Tool LLM Agent**](./single-tool-agent.md): A minimal, end-to-end implementation of the Observe-Reason-Act loop, demonstrating how an agent can use a single tool to achieve a specific goal.

-   [**Multi-Tool Agent with Routing**](./multi-tool-routing-minimal.md): Expand your agent's capabilities by enabling it to dynamically select and use the most appropriate tool from a diverse set of options based on the user's query.

-   [**Agent Stop Conditions and Budgets**](./stop-conditions-and-budgets.md): Crucial guardrails for controlling agent execution. Learn how to implement limits on iterations, tokens, and time to prevent infinite loops and excessive resource consumption.

-   [**Sandboxing and Allowlists for LLM Agents**](./sandboxing-and-allowlists.md): Address the critical security implications of agents. This guide explains how to mitigate risks associated with LLM-generated tool execution through isolation (sandboxing) and explicit permissions (allowlists).

:::tip[Building Agents Incrementally]
Start with understanding **[Tool Schemas and Contracts]** and building a **[Single-Tool LLM Agent]**. Then, expand to **[Multi-Tool Routing]**. Always integrate **[Stop Conditions and Budgets]** and prioritize **[Sandboxing and Allowlists]** for robust and secure agent deployment.
:::