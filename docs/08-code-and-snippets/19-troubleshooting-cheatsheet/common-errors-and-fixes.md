---
title: "Common LLM Errors and Quick Fixes"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["troubleshooting", "errors", "fixes", "debugging"]
last_reviewed: "2025-12-31"
---

# Common LLM Errors and Quick Fixes

Working with LLMs, especially locally, can present a variety of technical challenges. This cheatsheet outlines common errors you might encounter and provides quick, actionable solutions to get your application back on track.

:::info[The Goal: Rapid Problem Resolution]
The objective is to help you quickly diagnose and resolve frequent issues encountered during LLM setup, development, and operation, minimizing downtime and frustration.
:::

---

## 1. API Connection Errors

Errors related to connecting to the LLM server.

### Symptoms
-   `requests.exceptions.ConnectionError`
-   `openai.APIConnectionError`
-   "Connection refused", "Host unreachable"
-   "Could not connect to localhost:XXXX"

### Causes & Fixes
-   **LLM Server Not Running**:
    -   **Fix**: Ensure your local LLM server (Ollama, LM Studio) is actively running. For Ollama, check `ollama serve`. For LM Studio, ensure the app is open and the server is started in the UI.
-   **Incorrect Endpoint/Port**:
    -   **Fix**: Double-check that your application's `base_url` or `endpoint` exactly matches the running server's address and port.
        -   Ollama default: `http://localhost:11434/v1`
        -   LM Studio default: `http://localhost:1234/v1`
    -   *Related Guide: [HTTP Basics for Local APIs](./../16-local-api-patterns/openai-compatible-servers.md)*
-   **Firewall Blocking**:
    -   **Fix**: Ensure your firewall isn't blocking the port your LLM server is listening on. Temporarily disable the firewall for testing.
    -   *Related Guide: [Networking, Ports, Firewalls](./networking-ports-firewalls.md)*

---

## 2. Model Not Found / Not Loaded Errors

Errors indicating the LLM server cannot find or use the specified model.

### Symptoms
-   "Model 'llama3' not found"
-   "Model is not loaded"
-   `openai.APIStatusError: 404 Not Found` (if the API endpoint for the model doesn't exist)

### Causes & Fixes
-   **Model Not Pulled/Downloaded**:
    -   **Fix**: Ensure the model is actually downloaded and available on your local server.
        -   Ollama: `ollama list` to see available models; `ollama pull <model-name>` to download.
        -   LM Studio: Download via the UI; ensure it's selected in the local server tab.
    -   *Related Guide: [Ollama Setup Guide](./../01-setup-and-installs/ollama-setup.md)*
-   **Incorrect Model Name**:
    -   **Fix**: Verify the model name in your code exactly matches the name on the server.
-   **Insufficient VRAM/RAM**:
    -   **Fix**: The model might be too large for your hardware. Try a smaller model or a more aggressive quantization. Check your system's memory.
    -   *Related Guide: [OOM Debug Playbook](./oom-debug-playbook.md), [Quantization Basics](./../04-model-management/quantization-basics.md)*

---

## 3. Context Window Exceeded Errors

Trying to send too much information to the LLM.

### Symptoms
-   `openai.APIStatusError: 400 Bad Request` with message like "maximum context length exceeded" or "too many tokens".
-   LLM output is truncated or incomplete.

### Causes & Fixes
-   **Prompt Too Long**:
    -   **Fix**: Reduce the size of your prompt (system prompt, user query, history, RAG context).
    -   *Related Guide: [Prompt Size Budgeting](./../05-token-counting/prompt-size-budgeting.md), [Context Budget Enforcement](./../06-context-hygiene/context-budget-enforcement.md)*
-   **Incorrect Token Counting**:
    -   **Fix**: Ensure you're accurately counting tokens (especially for chat messages) before sending the prompt.
    -   *Related Guide: [Token Counting in Python](./../05-token-counting/token-count-python.md), [Token Counting in Node.js](./../05-token-counting/token-count-node.md)*

---

## 4. Invalid JSON / Malformed Output

LLM fails to produce valid structured output.

### Symptoms
-   `json.JSONDecodeError`
-   Output contains preamble/postamble text around the JSON.
-   JSON is truncated or has syntax errors.

### Causes & Fixes
-   **LLM Hallucination/Confusion**:
    -   **Fix**: Strengthen your prompt engineering:
        -   Explicitly instruct the model to *only* output JSON.
        -   Use clear delimiters for context/instructions.
        -   Reduce `temperature` (e.g., to 0.0 or 0.1).
    -   *Related Guides: [JSON Mode vs. JSON Schema](./../08-structured-output/json-mode-vs-json-schema.md), [Deterministic Settings](./../09-output-validation-and-guards/deterministic-settings.md)*
-   **Output Truncation**:
    -   **Fix**: Increase `max_tokens` to allow the LLM to complete its JSON output.
    -   *Related Guide: [Partial Output Repair](./../08-structured-output/partial-output-repair.md)*
-   **Parsing Issues**:
    -   **Fix**: Use robust JSON parsing (e.g., `json5`) or implement output repair strategies.
    -   *Related Guide: [Partial Output Repair](./../08-structured-output/partial-output-repair.md)*

---

## 5. Unexpected / Incorrect Output

The LLM responds, but the answer is wrong, irrelevant, or hallucinates.

### Symptoms
-   Factual inaccuracies.
-   Irrelevant responses.
-   Ignoring system prompts or provided context.
-   Generating harmful/unsafe content.

### Causes & Fixes
-   **Poor Prompt Engineering**:
    -   **Fix**: Refine your system prompt. Ensure instructions are clear, unambiguous, and prioritized.
    -   *Related Guides: [Structured Task Specification Template](./../07-prompting-patterns/task-spec-template.md), [Message Priority and Ordering](./../06-context-hygiene/message-priority-and-ordering.md)*
-   **RAG Issues**:
    -   **Fix**: Retrieval is poor or LLM is ignoring context.
    -   *Related Guide: [Common RAG Failure Modes](./../10-rag-mini/rag-failure-modes.md)*
-   **LLM Temperature Too High**:
    -   **Fix**: Reduce `temperature` for more factual/deterministic output.
    -   *Related Guide: [Deterministic Settings](./../09-output-validation-and-guards/deterministic-settings.md)*
-   **Prompt Injection**:
    -   **Fix**: Implement defense strategies for prompt injection.
    -   *Related Guide: [Prompt Injection Defense Strategies](../15-safety-and-privacy/prompt-injection-defense.md)*

---

:::tip[Check Your Logs First]
When debugging, always check your application logs (and the LLM server logs, if accessible). Structured logging can quickly point to the source of the problem.
:::
