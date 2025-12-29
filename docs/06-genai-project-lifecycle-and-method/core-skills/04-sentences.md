---
title: "Sentences"
archetype: "core-skill"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags:
  ["genai-llm", "sentences", "precision", "constraints", "interpretation", "genai"]
last_reviewed: "2025-12-20"
---

# Sentences

:::info[Smallest unit of execution]
Sentences carry instructions, constraints, and priorities. Tiny wording changes can flip behavior.
:::

## At a Glance

| Focus                        | Use Sentences To                       | Failure If Missing              |
| ---------------------------- | -------------------------------------- | ------------------------------- |
| One instruction per sentence | Prevent merged or dropped requirements | Models blend constraints        |
| Scoped statements            | Limit where actions apply              | Overreach into adjacent areas   |
| Explicit exclusions          | Protect boundaries                     | AI edits the wrong things       |
| Ordered priorities           | Signal what to honor first             | Constraints overridden silently |

---

## Overview

In GenAI & LLM Documentation, **sentences are executable units**.

They are the smallest surface where intent, logic, and systems meet model interpretation. Small changes at the sentence level can alter behavior, scope, and risk in disproportionate ways.

If logic defines _what must be true_ and systems define _where it applies_, sentences define _how that truth is interpreted_.

---

## What “Sentences” Means in GenAI & LLM Documentation

Sentences in GenAI & LLM Documentation are not stylistic choices.
They are **control structures**.

A sentence can:

- constrain or expand scope
- prioritize or de-prioritize behavior
- permit or prohibit actions
- encode assumptions explicitly or implicitly

GenAI & LLM Documentation treats sentence construction as a technical skill.

:::warning[Design rule]
If a sentence feels overloaded, it is. Split it.
:::

---

## Why Sentence Precision Matters with AI

LLMs:

- allocate attention at the token and phrase level
- infer relationships between clauses
- smooth contradictions instead of resolving them

This means:

- compound sentences can merge instructions unintentionally
- vague modifiers can override constraints
- ordering within a sentence can imply priority

Sentence-level imprecision becomes system-level behavior.

---

## Common Sentence Patterns in GenAI & LLM Documentation

### Declarative Constraints

State non-negotiables clearly.

Example:

- “The API **must** return deterministic JSON responses.”

Avoid hedging language.

---

### Scoped Statements

Limit where an instruction applies.

Example:

- “Within the customer search endpoint, add pagination…”

Scope first. Action second.

---

### Explicit Exclusions

Say what must not happen.

Example:

- “Do not modify existing authentication logic.”

Exclusions prevent overreach.

---

### Ordered Priorities

Order clauses intentionally.

Example:

- “Prioritize correctness over performance; optimize only if tests pass.”

Ordering implies importance.

---

## Sentence-Level Failure Modes

### Overloaded Sentences

Multiple instructions bundled together.

Effect:

- models blend requirements
- constraints weaken

Fix:

- split into single-purpose sentences

---

### Ambiguous Modifiers

Words like “efficient”, “clean”, “robust”.

Effect:

- subjective interpretation
- inconsistent outcomes

Fix:

- replace adjectives with conditions or metrics

---

### Implicit Defaults

Assuming context the model does not have.

Effect:

- silent assumptions
- unintended behavior

Fix:

- state defaults explicitly

---

### Hidden Conditionals

“If needed”, “where appropriate”.

Effect:

- model decides when to act
- loss of control

Fix:

- specify conditions or remove discretion

---

## Sentences Across the GenAI & LLM Documentation Method

- **Intent Spec**
  Sentences define success criteria

- **Constraint Spec**
  Sentences define boundaries and invariants

- **Delegation Contract**
  Sentences define authority and limits

- **Generation Requests**
  Sentences define task scope and ordering

- **Review**
  Sentences are compared directly to output behavior

Every stage depends on sentence clarity.

---

## Practical Sentence Checklist

Before generating:

- Is each sentence doing one job?
- Is scope stated before action?
- Are constraints unambiguous?
- Are exclusions explicit?
- Could clause ordering change interpretation?

If yes, revise.

---

## Sentences During Review

When reviewing output:

- map behavior back to specific phrases
- identify which sentence allowed undesired behavior
- tighten wording before regenerating

Do not “fix” output without fixing language first.

---

## How to Practice Sentence Precision

- Write one instruction per sentence
- Prefer short, explicit sentences
- Avoid conjunctions when precision matters
- Read sentences as if you want to exploit ambiguity
- Test by asking “what could this be misread as?”

:::tip[Fast drill]
Take three sentences from your last spec. Rewrite each to remove conjunctions and add explicit scope.
:::

Language skill compounds quickly.

---

## Core Skills Recap

You have now covered all four GenAI & LLM Documentation core skills:

- Logic
- Language
- Systems
- Sentences

Together, they form the human capability layer that makes GenAI & LLM Documentation reliable.

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-20
- Version: 0.1.0