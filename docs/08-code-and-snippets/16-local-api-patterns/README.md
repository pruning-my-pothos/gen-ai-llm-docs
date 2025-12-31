---
title: "Local API Patterns"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["local-llm", "api", "client", "streaming", "index"]
last_reviewed: "2025-12-31"
---

# Local API Patterns

Interacting with Large Language Models locally is a cornerstone of privacy-preserving, cost-effective, and rapid GenAI development. This section provides practical guides and code examples for setting up and effectively communicating with local LLM servers that mimic the popular OpenAI API specification.

:::info[Goal: Seamless Local LLM Integration]
The objective is to enable you to easily integrate local LLMs into your applications, using familiar client libraries and API patterns, allowing for offline development and easy switching between local and cloud models.
:::

## Guides and Snippets

-   [**OpenAI-Compatible Local LLM Servers**](./openai-compatible-servers.md): An overview of popular local LLM inference servers (Ollama, LM Studio, vLLM) that support the OpenAI API standard, and why this compatibility is so beneficial.

-   [**`curl` Chat Completions for Local LLMs**](./curl-chat-completions.md): Learn how to make basic chat completion requests to your local OpenAI-compatible LLM API directly from the command line using `curl` for quick testing and debugging.

-   [**Minimal Python Client for Local LLMs**](./python-client-minimal.md): A step-by-step guide to setting up a Python client using the `openai` library to programmatically interact with local LLM servers.

-   [**Minimal Node.js Client for Local LLMs**](./node-client-minimal.md): The equivalent guide for Node.js developers, demonstrating how to use the `openai` client library to communicate with local LLMs from a JavaScript/TypeScript application.

-   [**Streaming Basics for LLM Outputs**](./streaming-basics.md): Enhance user experience by learning how to enable and process streamed LLM outputs, which allows text to appear incrementally as it's generated.

:::tip[Unified Development Workflow]
By understanding how to interact with local LLMs via OpenAI-compatible APIs, you create a unified development workflow. You can build and test locally with speed and privacy, then seamlessly deploy to a cloud API when ready for production scale, often with just an endpoint change.
:::