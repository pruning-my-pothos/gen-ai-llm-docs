---
title: "Minimal Node.js Client for Local LLMs"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["nodejs", "typescript", "openai-api", "local-llm", "client"]
last_reviewed: "2025-12-31"
---

# Minimal Node.js Client for Local LLMs

Just like its Python counterpart, the `openai` Node.js client library can be used to interact with local LLM servers that support the OpenAI API specification. This allows JavaScript/TypeScript developers to leverage familiar tools and patterns for local LLM development.

:::info[The Goal: Programmatic Interaction (Node.js)]
The objective is to establish a basic Node.js setup that allows your applications to send prompts and receive responses from local OpenAI-compatible LLM servers, facilitating integration into JavaScript-based systems.
:::

---

## 1. Installation

First, install the `openai` Node.js client library.

```bash
# Using npm
npm install openai

# Using pnpm
pnpm add openai

# Using yarn
yarn add openai
```

---

## 2. Configure the Client

To direct the client to your local server, set the `baseURL` option when initializing the `OpenAI` client. The `apiKey` parameter can typically be set to a dummy value (e.g., `"ollama"` or `"lm-studio"`) as local servers usually don't require authentication.

```typescript
import OpenAI from "openai";

// --- Configuration ---
// Point to your local server.
// Ollama: "http://localhost:11434/v1"
// LM Studio: "http://localhost:1234/v1"
// vLLM: "http://localhost:8000/v1"
const LOCAL_LLM_ENDPOINT = "http://localhost:11434/v1";
const LOCAL_MODEL_NAME = "llama3"; // The model name you have pulled/loaded on your local server

// Initialize the OpenAI client to point to your local server
const client = new OpenAI({
  baseURL: LOCAL_LLM_ENDPOINT,
  apiKey: "ollama", // Dummy API key for local servers
});
```

---

## 3. Minimal Chat Completion Example

This example demonstrates a basic chat completion request, sending a system prompt and a user query to your local LLM.

```typescript
import OpenAI from "openai";

// Assuming client and LOCAL_MODEL_NAME are defined as above
// const LOCAL_LLM_ENDPOINT = "http://localhost:11434/v1";
// const LOCAL_MODEL_NAME = "llama3"; 
// const client = new OpenAI({baseURL: LOCAL_LLM_ENDPOINT, apiKey: "ollama"});

async function getChatCompletion(
  userMessage: string,
  systemMessage: string = "You are a helpful assistant."
): Promise<string> {
  const messages = [
    { role: "system" as const, content: systemMessage }, // 'as const' helps with type inference
    { role: "user" as const, content: userMessage },
  ];

  try {
    const response = await client.chat.completions.create({
      model: LOCAL_MODEL_NAME,
      messages: messages,
      temperature: 0.7,
      max_tokens: 150,
    });
    return response.choices[0].message?.content || "No content received.";
  } catch (error: any) {
    if (error.status === 404) {
      console.error(
        `Server not found or endpoint incorrect. Ensure local LLM server is running at ${LOCAL_LLM_ENDPOINT}.`
      );
    } else if (error.status === 400) {
      console.error(
        `API status error: ${error.status} - ${error.message}. Check model name and server logs.`
      );
    } else {
      console.error(`An unexpected error occurred: ${error.message}`);
    }
    return "Error: Could not get response from local LLM server.";
  }
}

// --- Example Usage ---
(async () => {
  // Ensure your local LLM server (e.g., Ollama) is running
  // and has the 'llama3' model pulled/loaded.

  console.log("\n--- LLM Response (Quantum Entanglement) ---");
  const responseContent1 = await getChatCompletion(
    "Explain the concept of quantum entanglement."
  );
  console.log(responseContent1);

  console.log("\n--- LLM Response (Geography Expert) ---");
  const responseContent2 = await getChatCompletion(
    "What is the capital of Japan?",
    "You are a geography expert."
  );
  console.log(responseContent2);
})();
```

---

:::tip[Streaming for Better UX]
For a more interactive and responsive user experience, especially with longer LLM outputs, enable streaming in your API calls. This allows your application to display tokens as they are generated.
*Related Guide: [Streaming Basics](./streaming-basics.md)*
:::

:::warning[API Keys and Environment]
While local servers typically don't strictly enforce API key validation, it's good practice to provide a placeholder `apiKey` to satisfy the client library's requirements. For actual cloud services, you would load your `OPENAI_API_KEY` from environment variables using a library like `dotenv`.
:::