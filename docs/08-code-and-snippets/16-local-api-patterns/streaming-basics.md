---
title: "Streaming Basics for LLM Outputs"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["streaming", "api", "user-experience", "latency"]
last_reviewed: "2025-12-31"
---

# Streaming Basics for LLM Outputs

By default, an LLM API call will wait until the entire response is generated before sending it back to your application. For longer responses, this can lead to a noticeable delay, making your application feel unresponsive. Streaming output allows the LLM to send tokens incrementally as they are generated, significantly improving the perceived responsiveness for the user.

:::info[The Goal: Responsive User Experience]
The objective is to display LLM output to the user as it's being generated, mimicking a "typing" effect, which drastically reduces the perceived latency and enhances the interactive feel of your application.
:::

---

## Why Use Streaming?

-   **Improved Perceived Latency**: Users see the response build up in real-time, rather than staring at a blank screen. This significantly reduces Time to First Token (TTFT).
-   **Enhanced User Experience**: Makes interactions feel more dynamic and conversational.
-   **Reduced Memory Footprint**: For very long responses, your client doesn't need to hold the entire message in memory before processing begins.

---

## Enabling Streaming in API Calls

Most LLM APIs, including OpenAI-compatible local servers, support streaming responses by setting a `stream: true` parameter in your request payload.

---

## 1. Python Example: Processing Streamed Responses

Using the `openai` Python client library, you can easily iterate over streamed responses.

```python
import openai
from openai import OpenAI
import os
import time
from typing import List, Dict

# --- Configuration (from python-client-minimal.md) ---
LOCAL_LLM_ENDPOINT = "http://localhost:11434/v1" # e.g., Ollama
LOCAL_MODEL_NAME = "llama3"

client = OpenAI(
    base_url=LOCAL_LLM_ENDPOINT,
    api_key="ollama" # Dummy API key for local servers
)

def stream_chat_completion(user_message: str, system_message: str = "You are a helpful assistant.") -> str:
    """
    Sends a chat completion request with streaming enabled and prints the response incrementally.
    """
    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_message}
    ]

    full_response_content = ""
    try:
        stream = client.chat.completions.create(
            model=LOCAL_MODEL_NAME,
            messages=messages,
            temperature=0.7,
            stream=True # Enable streaming
        )

        print("LLM Response (Streaming): ", end="", flush=True)
        for chunk in stream:
            # Each chunk contains a small piece of the message
            content_chunk = chunk.choices[0].delta.content
            if content_chunk:
                print(content_chunk, end="", flush=True)
                full_response_content += content_chunk
        print() # Add a newline after the full response

    except openai.APIConnectionError as e:
        print(f"Server connection error: {e}")
        return "Error: Could not connect to local LLM server."
    except openai.APIStatusError as e:
        print(f"API status error: {e.status_code} - {e.response}")
        return "Error: LLM API returned an error."
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return "Error: An unexpected error occurred."
    
    return full_response_content

# --- Example Usage ---
if __name__ == "__main__":
    if not os.getenv("OLLAMA_SERVER_RUNNING"): # Simple check to avoid running if no server
         print("Skipping streaming example: OLLAMA_SERVER_RUNNING env var not set.")
         print("Please ensure Ollama is running and set OLLAMA_SERVER_RUNNING=true to test.")
    else:
        print("\n--- Streaming Response Example ---")
        streamed_response = stream_chat_completion("Explain the benefits of streaming LLM responses in a concise paragraph.")
        print(f"\nFull streamed response captured: {streamed_response[:50]}...")
```

---

## 2. Node.js Example: Processing Streamed Responses

Using the `openai` Node.js client library, you can iterate asynchronously over the stream.

```typescript
import OpenAI from "openai";

// --- Configuration (from node-client-minimal.md) ---
const LOCAL_LLM_ENDPOINT = "http://localhost:11434/v1"; // e.g., Ollama
const LOCAL_MODEL_NAME = "llama3"; 

const client = new OpenAI({
  baseURL: LOCAL_LLM_ENDPOINT,
  apiKey: "ollama",
});

async function streamChatCompletion(
  userMessage: string,
  systemMessage: string = "You are a helpful assistant."
): Promise<string> {
  const messages = [
    { role: "system" as const, content: systemMessage },
    { role: "user" as const, content: userMessage },
  ];

  let fullResponseContent = "";
  try {
    const stream = await client.chat.completions.create({
      model: LOCAL_MODEL_NAME,
      messages: messages,
      temperature: 0.7,
      stream: true, // Enable streaming
    });

    process.stdout.write("LLM Response (Streaming): ");
    for await (const chunk of stream) {
      const contentChunk = chunk.choices[0].delta.content;
      if (contentChunk) {
        process.stdout.write(contentChunk);
        fullResponseContent += contentChunk;
      }
    }
    process.stdout.write("\n"); // Add a newline after the full response

  } catch (error: any) {
    console.error(`Error during streaming: ${error.message}`);
    return "Error: Could not get streaming response from local LLM server.";
  }
  
  return fullResponseContent;
}

// --- Example Usage ---
(async () => {
    // Ensure your local LLM server (e.g., Ollama) is running
    // and has the 'llama3' model pulled/loaded.
    // In a real environment, you might check an env var for server status.

    console.log("\n--- Streaming Response Example (Node.js) ---");
    const streamedResponse = await streamChatCompletion(
      "Explain the benefits of streaming LLM responses in a concise paragraph."
    );
    console.log(`\nFull streamed response captured: ${streamedResponse.substring(0, 50)}...`);
})();
```

---

:::tip[Handling Partial Words]
When reconstructing the response from streamed chunks, be aware that chunks might sometimes split a word. For display, this is usually fine, but if you're performing content analysis on chunks, you might need to buffer and reassemble words.
:::

:::warning[Token Counting with Streams]
If you need to accurately count tokens for streamed outputs, ensure your token counter is applied to *each token chunk* as it arrives and that you account for any special characters or prefixes the API might send.
*Related Guide: [Logging Tokens and Latency](./../14-logging-and-tracing/token-and-latency-logging.md)*
:::