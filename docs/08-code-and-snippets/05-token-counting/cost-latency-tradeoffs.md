---
title: "Token Count: Cost and Latency Trade-offs"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["tokens", "cost", "latency", "performance", "business"]
last_reviewed: "2025-12-31"
---

# Token Count: Cost and Latency Trade-offs

Token count isn't just a technical constraint; it's a primary driver of two critical metrics for any real-world application: **cost** and **latency**. Understanding this relationship is key to moving from a prototype to a production-ready product.

:::info[Tokens = Money and Time]
Every token you process has a direct impact on your operational costs and your users' experience. Efficiently managing your token count is a core discipline of applied AI engineering.
:::

---

## Tokens and API Cost

When using commercial LLM providers like OpenAI, Anthropic, or Google, you are billed per token. This pricing is usually split into two categories:

-   **Input Tokens**: The tokens you send *to* the model (your system prompt, chat history, RAG context, and user question).
-   **Output Tokens**: The tokens the model generates *for* you in its response.

Output tokens are often more expensive than input tokens because they require more computational effort from the provider.

### The Cost Formula

The total cost of a single API call can be calculated as follows:

`Total Cost = (Input Tokens / 1,000,000 * Input Price per 1M) + (Output Tokens / 1,000,000 * Output Price per 1M)`

#### Example Calculation
Let's say a model costs:
-   Input: $0.50 per 1 million tokens
-   Output: $1.50 per 1 million tokens

If your prompt has **4,000 input tokens** and the model generates **500 output tokens**:
-   Input Cost: `(4000 / 1,000,000 * 0.50) = $0.002`
-   Output Cost: `(500 / 1,000,000 * 1.50) = $0.00075`
-   **Total Cost**: `$0.00275`

This may seem small, but for an application serving thousands of users, these costs add up very quickly.

---

## Tokens and Latency (User Experience)

Latency is how long a user has to wait for a response. In streaming LLM applications, we can break this down into two parts:

1.  **Time to First Token (TTFT)**: How long the user waits after sending their message to see the *first word* of the AI's response.
    -   This is primarily determined by the **number of input tokens**. The more text the model has to process, the longer it takes to begin generating a response. A high TTFT makes your application feel unresponsive or "stuck."

2.  **Time Per Output Token (TPOT)**: How quickly the rest of the words in the response are generated (the "typing speed").
    -   This is determined by the model's inference speed. The total time for a response to be completed depends on the **number of output tokens**. A slow TPOT can make the AI feel sluggish.

### The Trade-off Illustrated

| If you increase... | Impact on Cost | Impact on Latency | Why? |
| :--- | :--- | :--- | :--- |
| **Input Tokens** | **Increases** | **Increases TTFT** | The model has more text to process before generating a response. |
| **Output Tokens** | **Increases** | **Increases total generation time** | The model has more text to create. |

---

## Levers for Optimization

You have several levers to pull to balance cost, latency, and quality.

-   **Model Size & Quantization**: A smaller model (7B vs 70B) or a more aggressively quantized model (`Q4_K_M` vs `Q8_0`) will have lower latency and can be run on cheaper hardware. This is your most powerful lever.
-   **Context Length**: Shorter prompts are cheaper and result in a faster TTFT. This is why **[Prompt Size Budgeting](./prompt-size-budgeting.md)** is so important.
-   **Retrieval Strategy**: For RAG, retrieving fewer, more relevant document chunks (`top_k=3` instead of `top_k=5`) directly reduces input tokens.
-   **Max Output Tokens**: Capping the maximum number of tokens the model can generate prevents runaway costs and ensures responses are concise.

:::tip[Connect the Concepts]
**[Prompt Size Budgeting](./prompt-size-budgeting.md)** and choosing the right **[Quantization Level](./../04-model-management/quantization-basics.md)** are your primary tools for controlling cost and latency *before* you even make an API call.
:::
