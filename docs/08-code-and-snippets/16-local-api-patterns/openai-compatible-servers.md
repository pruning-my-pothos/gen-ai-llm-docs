---
title: "OpenAI-Compatible Local LLM Servers"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["local-llm", "api", "openai-compatible", "ollama", "lm-studio"]
last_reviewed: "2025-12-31"
---

# OpenAI-Compatible Local LLM Servers

The OpenAI API has become a de facto standard for interacting with Large Language Models. Many local LLM inference engines and servers have adopted this API specification, allowing you to use the same client libraries and code patterns to communicate with local models as you would with remote OpenAI services. This significantly simplifies local development and model swapping.

:::info[The Goal: Interoperable LLM Development]
The objective is to leverage the familiar OpenAI API specification to seamlessly interact with local LLMs, enabling rapid prototyping, privacy-focused applications, and cost-effective development.
:::

---

## Why OpenAI API Compatibility?

-   **Interoperability**: Use existing OpenAI client libraries (Python, Node.js) with minimal changes.
-   **Flexibility**: Easily switch between local models and remote OpenAI services by simply changing the API endpoint.
-   **Ecosystem**: Benefit from a vast ecosystem of tools, frameworks, and examples built around the OpenAI API.
-   **Local Development**: Test and develop applications completely offline, without incurring API costs.

---

## Popular OpenAI-Compatible Local Servers

### 1. Ollama

Ollama is a powerful command-line tool for running LLMs locally. By default, it exposes an OpenAI-compatible API on `http://localhost:11434`.

-   **Setup Guide**: See [Ollama Setup Guide](./../01-setup-and-installs/ollama-setup.md).
-   **API Endpoint**: `http://localhost:11434/v1` (for `chat/completions`, etc.)
    -   Note: Ollama's native API is on `http://localhost:11434/api/chat`, but it also provides the `/v1` endpoint for compatibility.

### 2. LM Studio

LM Studio is a desktop application (GUI) that allows you to discover, download, and run local LLMs. It features a built-in local server that mimics the OpenAI API.

-   **Setup Guide**: See [LM Studio Setup Guide](./../01-setup-and-installs/lm-studio-setup.md).
-   **API Endpoint**: `http://localhost:1234/v1` (for `chat/completions`, etc.)

### 3. vLLM

vLLM is a fast and easy-to-use library for LLM inference and serving. It's often used for higher-performance local serving, especially with GPUs, and supports an OpenAI-compatible API.

-   **Installation**: `pip install vllm`
-   **Running Server**: `python -m vllm.entrypoints.openai.api_server --model <your_hf_model>`
-   **API Endpoint**: `http://localhost:8000/v1`

### 4. text-generation-inference (TGI)

TGI is a high-performance Rust, Python, and Cuda solution for text generation. It's developed by Hugging Face and powers their inference API. It also offers an OpenAI-compatible endpoint.

-   **Installation**: Typically via Docker.
-   **API Endpoint**: `http://localhost:80/v1`

---

## How to Interact

Once one of these servers is running with a loaded model, you can use standard OpenAI API clients or `curl` commands to send requests.

-   **Python**: Configure `openai.base_url` to point to your local server (e.g., `client = OpenAI(base_url="http://localhost:11434/v1")`).
    -   *Related Guide: [Minimal Python Client](./python-client-minimal.md)*
-   **Node.js**: Configure the `baseURL` for the OpenAI client.
    -   *Related Guide: [Minimal Node.js Client](./node-client-minimal.md)*
-   **`curl`**: Direct HTTP requests to the `/v1/chat/completions` endpoint.
    -   *Related Guide: [curl Chat Completions](./curl-chat-completions.md)*

:::tip[Unified Development Experience]
Leveraging the OpenAI API standard allows you to develop your application against a consistent interface. This means you can start with a local model for cost-effective development and easily switch to a powerful cloud model for production by changing just an endpoint URL.
:::