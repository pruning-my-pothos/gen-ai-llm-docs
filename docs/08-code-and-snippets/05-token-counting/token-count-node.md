---
title: "Token Counting in Node.js / TypeScript"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["nodejs", "typescript", "tokens", "tiktoken"]
last_reviewed: "2025-12-31"
---

# Token Counting in Node.js / TypeScript with `tiktoken`

To manage context windows and API costs in a Node.js or TypeScript application, you need an accurate way to count tokens. The best tool for this is a `tiktoken` library, which brings OpenAI's standard tokenizer to JavaScript.

:::info[The Right Tool for the Job]
We recommend using `@dqbd/tiktoken`, a WASM-powered library that is fast, efficient, and compatible with the official `tiktoken` used by OpenAI models.
:::

---

## 1. Installation

Install the library using your preferred package manager.

```bash
# NPM
npm install @dqbd/tiktoken

# PNPM
pnpm add @dqbd/tiktoken

# Yarn
yarn add @dqbd/tiktoken
```

---

## 2. Basic String Token Counting

You can quickly count tokens in a simple string. The most common encoding for modern OpenAI models is `cl100k_base`.

```typescript
import { get_encoding } from "@dqbd/tiktoken";

const encoding = get_encoding("cl100k_base");

const text = "Hello world, let's count tokens!";
const tokens = encoding.encode(text);

console.log("Token count:", tokens.length); // Outputs: 7

// Don't forget to free the encoder when you're done
encoding.free();
```

---

## 3. Counting Tokens for Chat APIs

Counting tokens for chat models is more complex because special tokens are added for message roles (`system`, `user`, etc.). The following function provides an accurate count for chat completion requests.

```typescript
import {
  get_encoding,
  encoding_for_model,
  Tiktoken,
  TiktokenModel,
} from "@dqbd/tiktoken";

interface ChatMessage {
  role: "system" | "user" | "assistant" | "name";
  content: string;
  name?: string;
}

export function countChatMessageTokens(
  messages: ChatMessage[],
  model: TiktokenModel = "gpt-3.5-turbo"
): number {
  let encoding: Tiktoken;
  try {
    encoding = encoding_for_model(model);
  } catch (e) {
    console.warn("Model not found. Using cl100k_base encoding.");
    encoding = get_encoding("cl100k_base");
  }

  // Model-specific adjustments from OpenAI Cookbook
  let tokensPerMessage: number;
  let tokensPerName: number;

  if (
    [
      "gpt-3.5-turbo-0613",
      "gpt-3.5-turbo-16k-0613",
      "gpt-4-0314",
      "gpt-4-32k-0314",
      "gpt-4-0613",
      "gpt-4-32k-0613",
    ].includes(model)
  ) {
    tokensPerMessage = 3;
    tokensPerName = 1;
  } else if (model === "gpt-3.5-turbo-0301") {
    tokensPerMessage = 4;
    tokensPerName = -1;
  } else if (model.includes("gpt-3.5-turbo")) {
    // Fallback for future versions
    return countChatMessageTokens(messages, "gpt-3.5-turbo-0613");
  } else if (model.includes("gpt-4")) {
    // Fallback for future versions
    return countChatMessageTokens(messages, "gpt-4-0613");
  } else {
    throw new Error(`Model ${model} is not implemented.`);
  }

  let numTokens = 0;
  for (const message of messages) {
    numTokens += tokensPerMessage;
    for (const [key, value] of Object.entries(message)) {
      numTokens += encoding.encode(value).length;
      if (key === "name") {
        numTokens += tokensPerName;
      }
    }
  }

  numTokens += 3; // Every reply is primed with <|start|>assistant<|message|>
  
  // Important: free the encoder to release memory
  encoding.free();
  
  return numTokens;
}

// --- Example Usage ---
const messages: ChatMessage[] = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "What is the capital of France?" }
];

const totalTokens = countChatMessageTokens(messages, "gpt-4");
console.log(`Total tokens for the chat messages: ${totalTokens}`);

// Check against a context window limit
const CONTEXT_WINDOW_LIMIT = 4096; // for gpt-3.5-turbo
if (totalTokens > CONTEXT_WINDOW_LIMIT) {
    console.error("Error: Message is too long for the context window.");
}
```

:::danger[Remember to `free()` the encoder]
The `@dqbd/tiktoken` library uses WebAssembly (WASM). You **must** call `encoding.free()` when you are finished with an encoder instance to release its memory. Forgetting to do this in a long-running server process will cause a memory leak.
:::
