---
title: "LM Studio Setup"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["setup", "local-llm", "lm-studio", "inference"]
last_reviewed: "2025-12-31"
---

# LM Studio Setup

This guide provides step-by-step instructions for installing LM Studio, downloading a model, and running a local inference server that is compatible with the OpenAI API standard.

:::info[What is LM Studio?]
LM Studio is a desktop application that allows you to discover, download, and run local Large Language Models (LLMs). Its key feature is a built-in server that mimics the OpenAI API, making it an excellent tool for local development and testing of LLM-powered applications without needing an internet connection or paying for API access.
:::

---

## 1. Prerequisites

:::warning[System Requirements]
- **Operating System**: macOS (Apple Silicon recommended), Windows (with Nvidia GPU recommended), or Linux.
- **RAM**: Minimum 16 GB RAM is recommended for running 7B parameter models. 32 GB+ is better for larger models.
- **Disk Space**: At least 20 GB of free disk space for the application and a few models. Models can range from 3 GB to over 100 GB.
:::

---

## 2. Installation

1.  **Download LM Studio**: Navigate to the official [LM Studio website](https://lmstudio.ai/) and download the installer for your operating system.
2.  **Install the Application**: Run the downloaded installer and follow the on-screen instructions.

---

## 3. Download a Model

1.  **Open LM Studio**: Launch the application.
2.  **Search for a Model**: Click on the **Search** tab (magnifying glass icon) in the left-hand sidebar.
3.  **Find a Model**: In the search bar, type the name of a model to try. For a quick start, we recommend a small, high-quality model.
    - **Recommended Starter Model**: `Phi-3-mini-4k-instruct-q4` (Search for `Phi-3-mini-4k-instruct` and look for a GGUF quantized version).
4.  **Download**: From the search results, find a GGUF version of the model (e.g., from user `microsoft-community`) and click the **Download** button next to it. Wait for the download to complete.

---

## 4. Run the Local Inference Server

1.  **Navigate to Server Tab**: Click the **Local Server** tab (server icon `</>`) in the left-hand sidebar.
2.  **Select Your Model**: At the top of the screen, click the dropdown menu to select the model you just downloaded.
3.  **Start the Server**: Click the **Start Server** button. The server will load the model into memory and start listening for requests on a local port (usually `1234`). You will see server logs appear in the window.

---

## 5. Interact with the Server

Once the server is running, you can send it API requests as if it were the OpenAI API.

### `curl` Example

This is a simple way to test the server from your terminal.

```bash
curl -X POST "http://localhost:1234/v1/chat/completions" \
-H "Content-Type: application/json" \
-d 
'{
  "model": "local-model",
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello! What is the capital of France?" }
  ],
  "temperature": 0.7
}'
```

### Python Example (`requests`)

For use in Python scripts. Make sure you have the `requests` library installed (`pip install requests`).

```python
import requests
import json

url = "http://localhost:1234/v1/chat/completions"

headers = {
    "Content-Type": "application/json"
}

data = {
    "model": "local-model",  # This field is ignored by LM Studio but required by the spec
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello! What is the capital of France?"}
    ],
    "temperature": 0.7
}

try:
    response = requests.post(url, headers=headers, data=json.dumps(data))
    response.raise_for_status()  # Raise an exception for bad status codes
    
    # Assuming the response is JSON
    response_json = response.json()
    assistant_message = response_json['choices'][0]['message']['content']
    
    print("Assistant:", assistant_message)

except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")

```

### Node.js/TypeScript Example (`axios`)

For use in Node.js applications. Make sure you have `axios` installed (`npm install axios` or `pnpm add axios`).

```typescript
import axios from 'axios';

const url = 'http://localhost:1234/v1/chat/completions';

const data = {
  model: 'local-model', // This field is ignored by LM Studio
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Hello! What is the capital of France?' },
  ],
  temperature: 0.7,
};

async function getCompletion() {
  try {
    const response = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    
    const assistantMessage = response.data.choices[0].message.content;
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

---

:::tip[Troubleshooting]
- **"Model not loaded" error**: Ensure you have selected a model from the dropdown in the Local Server tab before starting the server.
- **Server connection refused**: Double-check that the server is running and check the port number in the LM Studio server logs.
- **Slow responses**: Loading the model can take time. Wait for the "Model loaded" message in the logs. Performance depends heavily on your hardware.
:::