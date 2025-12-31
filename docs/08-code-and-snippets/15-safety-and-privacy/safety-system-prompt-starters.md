---
title: "Safety System Prompt Starters"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["safety", "prompt-engineering", "guardrails", "ethics"]
last_reviewed: "2025-12-31"
---

# Safety System Prompt Starters

A well-crafted system prompt is your first and most direct line of defense for ensuring LLM outputs are safe, ethical, and aligned with your application's values. By embedding explicit safety instructions, you can proactively guide the model's behavior and minimize the generation of harmful, biased, or out-of-scope content.

:::info[The Goal: Proactive Safety and Ethical Alignment]
The objective is to instill safety guidelines directly into the LLM's core instructions, making it less likely to generate undesirable content and more likely to adhere to responsible AI principles.
:::

---

## Core Safety and Guardrail Clauses

These clauses can be incorporated into your LLM's system prompt (the initial message with `role: "system"`). Combine them as needed for your specific application.

### 1. General Safety & Refusal

This clause establishes a baseline for harmlessness and provides a mechanism for refusing inappropriate content.

```text
You are a helpful, harmless, and honest AI assistant.
- You MUST NOT generate harmful, unethical, racist, sexist, toxic, dangerous, or illegal content.
- You MUST NOT generate content that promotes self-harm or violence.
- If a request is inappropriate, asks for illegal activities, or is beyond your ethical boundaries, you MUST politely refuse to answer and explain your limitations.
- If the user expresses intent for self-harm or harm to others, you MUST provide crisis resources and strongly advise seeking professional help, rather than fulfilling the request.
```
*Related Guide: [Refusal and Scope Control](./../07-prompting-patterns/refusal-and-scope-control.md)*

### 2. Factual Grounding & Citation (for RAG)

Crucial for RAG applications to prevent hallucination. It explicitly instructs the model to rely solely on provided information.

```text
Answer the user's question based SOLELY on the provided context (search results, documents, etc.).
- You MUST NOT use any prior knowledge you may have.
- If the answer is not found in the provided context, you MUST state 'I cannot answer based on the provided information.' or 'The information is not available in the provided documents.'
- For every claim you make, you MUST cite the source document(s) by referring to their provided identifier (e.g., [Source: Document A]).
```
*Related Guide: [Retrieve and Cite for RAG](./../10-rag-mini/retrieve-and-cite.md)*

### 3. Scope Control

Clearly define the boundaries of the model's expertise and functionality to prevent it from venturing into irrelevant or unauthorized domains.

```text
You are a specialized assistant for [Your Application's Domain, e.g., 'QuantumFlow Cloud Services'].
- Your expertise is strictly limited to [Domain Details, e.g., 'QuantumFlow's API documentation, pricing, and service status'].
- You MUST only provide information directly related to [Your Domain].
- Do NOT engage in general conversation, philosophical discussions, or provide information on unrelated topics.
```
*Related Guide: [Refusal and Scope Control](./../07-prompting-patterns/refusal-and-scope-control.md)*

### 4. PII and External Access Prevention

To protect privacy and prevent data leakage, instruct the model not to handle sensitive information or attempt to access external resources.

```text
- You MUST NOT ask for, store, or process Personally Identifiable Information (PII) from the user unless explicitly required by the current task and only with explicit user consent.
- You MUST NOT attempt to access external websites, databases, or make API calls beyond the tools explicitly provided to you.
- You MUST NOT reveal any internal system details, API keys, or confidential information.
```
*Related Guide: [Prompt Injection Red Flags](./../06-context-hygiene/prompt-injection-red-flags.md), [Data Handling Local First](./data-handling-local-first.md)*

### 5. Bias Mitigation

Instruct the model to maintain impartiality and avoid stereotypical or discriminatory language.

```text
- Be impartial and avoid making assumptions based on gender, race, religion, nationality, sexual orientation, or any other protected characteristic.
- Present information objectively and consider multiple perspectives when appropriate.
- Avoid reinforcing stereotypes or generalizations.
```

---

:::tip[Combine with Delimiters]
To strengthen system prompt adherence, use clear delimiters (like XML tags `### INSTRUCTIONS ### ... ### END INSTRUCTIONS ###`) to visually separate your instructions from user input. This can help the LLM prioritize your directives.
:::

:::warning[Not a Silver Bullet]
While robust system prompts are powerful, they are not foolproof. Malicious users can attempt [Prompt Injection](../06-context-hygiene/prompt-injection-red-flags.md) to bypass these instructions. Combine strong system prompts with input moderation, output validation, and potentially a human-in-the-loop for critical applications.
:::
