---
title: "Ollama Setup"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["setup", "local-llm", "ollama", "inference", "cli"]
last_reviewed: "2025-12-31"
---

# Ollama Setup

This guide covers the installation and basic usage of Ollama, a powerful command-line tool for running and managing local Large Language Models (LLMs).

:::info[What is Ollama?]
Ollama is a lightweight, extensible framework for running LLMs on your local machine. It excels in its simplicity and command-line-first approach. When you install Ollama, it automatically exposes an OpenAI-compatible API server, making it incredibly easy to integrate local models into your applications.
:::

---

## 1. Installation

Ollama provides simple installation methods for all major operating systems.

### macOS

The recommended installation method for macOS is using Homebrew.

```bash
brew install ollama
```

### Windows & Linux

For Windows and Linux, the recommended method is to use the official installer from the website.

1.  Navigate to the [Ollama download page](https://ollama.com/download).
2.  Follow the instructions for your specific operating system. For Linux, this typically involves a single `curl` command.

### Verify Installation

After installation, verify that Ollama is working by checking the version number.

```bash
ollama --version
# Expected output: ollama version is 0.1.xx
```

---

## 2. Model Management

Ollama makes it simple to download and manage models directly from the command line.

### Pull a Model

Use the `ollama pull` command to download a model from the Ollama model library.

```bash
# We recommend starting with the small and fast Phi-3 model
ollama pull phi3

# Or, pull a larger, more capable model like Mistral
ollama pull mistral
```

### List Downloaded Models

To see all the models you have downloaded locally, use `ollama list`.

```bash
ollama list
```

### Remove a Model

If you need to free up disk space, you can remove a model with `ollama rm`.

```bash
ollama rm phi3
```

---

## 3. Interactive Chat

You can chat with a model directly in your terminal using the `ollama run` command.

```bash
ollama run phi3
```

This will start an interactive session. You can type your prompts and get responses in real-time. To exit the session, type `/bye`.

You can also pass a prompt directly:

```bash
ollama run phi3 "Why is the sky blue?"
```

---

## 4. Using the API Server

By default, the Ollama application runs a background service that hosts an OpenAI-compatible API on port `11434`.

:::tip[Check Server Status]
On macOS and Windows, the Ollama application manages the server automatically. On Linux, it's managed by `systemd`. You can check the running models and their status with `ollama ps`.
:::

### `curl` Example

Test the API endpoint from your terminal.

```bash
curl -X POST http://localhost:11434/api/chat \
-d '{
  "model": "phi3",
  "messages": [
    { "role": "user", "content": "Why is the sky blue?" }
  ],
  "stream": false
}'
```

### Python Example (`requests`)

Make sure you have `requests` installed (`pip install requests`).

```python
import requests
import json

url = "http://localhost:11434/api/chat"

payload = {
    "model": "phi3",
    "messages": [
        {"role": "user", "content": "Why is the sky blue?"}
    ],
    "stream": False
}

try:
    response = requests.post(url, json=payload)
    response.raise_for_status()
    
    response_json = response.json()
    assistant_message = response_json['message']['content']
    
    print("Assistant:", assistant_message)

except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")

```

### Node.js/TypeScript Example (`axios`)

Make sure you have `axios` installed (`npm install axios` or `pnpm add axios`).

```typescript
import axios from 'axios';

const url = 'http://localhost:11434/api/chat';

const data = {
  model: 'phi3',
  messages: [
    { role: 'user', content: 'Why is the sky blue?' },
  ],
  stream: false,
};

async function getCompletion() {
  try: {
    const response = await axios.post(url, data);
    
    const assistantMessage = response.data.message.content;
    console.log('Assistant:', assistantMessage);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('An Axios error occurred:', error.response?.data || error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

getCompletion();
```

:::warning[API Differences]
Note that the Ollama API has minor differences from the OpenAI API. For example, the endpoint is `/api/chat` and the response structure is slightly different for non-streaming responses. For OpenAI compatibility, you can use a library or proxy that adapts the requests, or use a tool like LiteLLM.
:::
