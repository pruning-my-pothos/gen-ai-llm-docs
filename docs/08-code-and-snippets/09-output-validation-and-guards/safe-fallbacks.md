---
title: "Safe Fallbacks for LLM Applications"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["error-handling", "fallbacks", "robustness", "resilience"]
last_reviewed: "2025-12-31"
---

# Safe Fallbacks for LLM Applications

Even with the best prompt engineering, robust validation, and retry mechanisms, LLMs can sometimes fail to produce usable or desired output. For production-grade applications, it's crucial to have a "safe fallback" strategy to gracefully handle these failures, maintain user experience, and prevent application crashes.

:::info[The Goal: Graceful Degradation]
The objective is to ensure your application remains stable and user-friendly even when the LLM component encounters an unrecoverable error or provides an unsatisfactory response.
:::

---

## Strategy 1: Default / Generic Response

For non-critical requests, providing a pre-defined, generic message is often the simplest and most effective fallback.

### When to Use It
-   The LLM is performing a non-essential task (e.g., generating a joke).
-   A full failure is acceptable, as long as the application doesn't crash.
-   The cost of human intervention or more complex fallbacks is not justified.

```python
import openai # Assuming you have an LLM client
from typing import List, Dict

# client = openai.OpenAI() # Replace with your actual LLM client

def get_llm_response_with_default(prompt_messages: List[Dict[str, str]], default_message: str) -> str:
    try:
        # Simulate LLM call
        # response = client.chat.completions.create(model="gpt-3.5-turbo", messages=prompt_messages)
        # return response.choices[0].message.content
        
        # Simulate an LLM failure or invalid output for demonstration
        raise ValueError("Simulated LLM error or invalid output")
        
    except Exception as e:
        print(f"LLM call failed with error: {e}. Returning default message.")
        return default_message

# --- Example Usage ---
messages = [{"role": "user", "content": "Tell me a joke."}]
fallback_joke = "Why don't scientists trust atoms? Because they make up everything!"

response = get_llm_response_with_default(messages, fallback_joke)
print("Response:", response)
```

---

## Strategy 2: Human Handoff

For critical tasks where accuracy and reliability are paramount, or when the LLM explicitly flags a query as ambiguous/unsafe, a human handoff is the best option.

### When to Use It
-   Customer support applications where complex queries might require human nuance.
-   Legal, medical, or financial advice applications where errors are high-stakes.
-   When the LLM detects a [Prompt Injection](../15-safety-and-privacy/prompt-injection-red-flags.md) or a safety violation.

```python
from typing import List, Dict

def handoff_to_human(user_query: str, llm_error_details: str = "") -> None:
    """
    Simulates escalating the query to a human agent.
    In a real app, this would queue the query, notify a human, etc.
    """
    print(f"\n--- Escalating to Human Agent ---")
    print(f"User Query: {user_query}")
    if llm_error_details:
        print(f"LLM Error/Failure: {llm_error_details}")
    print("Please wait while we connect you with a specialist.")

# --- Example Usage ---
# Assume an LLM call failed after multiple retries, or returned a refusal
user_query = "I need help with a very complex technical issue with my account."
llm_failure_reason = "LLM could not produce valid JSON after 3 retries."

# Trigger human handoff
handoff_to_human(user_query, llm_failure_reason)
```

---

## Strategy 3: Alternative Model / Simpler LLM

If your primary model fails, you might have a secondary, perhaps smaller or more robust, model that can handle the request. This can be a simpler, cheaper LLM or even a traditional rule-based system.

### When to Use It
-   When the primary model is too expensive or too slow for a particular request type.
-   When the primary model is prone to a specific type of failure that an alternative model handles better.
-   As a cost-saving measure: try a cheaper, smaller model first, then escalate to a larger one only if needed.

```python
from typing import List, Dict

# Assume two different LLM clients
# primary_llm_client = openai.OpenAI(model="gpt-4")
# fallback_llm_client = openai.OpenAI(model="gpt-3.5-turbo") # Cheaper/faster

def get_llm_response_with_fallback_model(prompt_messages: List[Dict[str, str]]) -> str:
    try:
        # Simulate primary LLM failure
        # response = primary_llm_client.chat.completions.create(model="gpt-4", messages=prompt_messages)
        # return response.choices[0].message.content
        raise ValueError("Simulated primary LLM failure")
    except Exception as e:
        print(f"Primary LLM failed: {e}. Trying fallback LLM.")
        try:
            # Simulate fallback LLM success
            # response = fallback_llm_client.chat.completions.create(model="gpt-3.5-turbo", messages=prompt_messages)
            # return response.choices[0].message.content
            return "This is a response from the fallback model."
        except Exception as e_fallback:
            print(f"Fallback LLM also failed: {e_fallback}. Returning generic error.")
            return "I am unable to process your request at this time."

# --- Example Usage ---
messages = [{"role": "user", "content": "Please explain quantum physics in simple terms."}]
response = get_llm_response_with_fallback_model(messages)
print("Final Response:", response)
```

---

:::tip[Log All Failures]
Regardless of your fallback strategy, always log comprehensive details of the LLM failure (input, output, error messages, retry attempts). This data is invaluable for debugging, improving your prompts, and understanding model limitations.
:::

:::warning[User Experience is Key]
When implementing fallbacks, ensure the messages displayed to the user are clear, polite, and manage expectations. Avoid exposing internal errors.
:::
