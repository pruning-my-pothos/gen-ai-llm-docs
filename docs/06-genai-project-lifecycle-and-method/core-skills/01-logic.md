---
title: "Logic"
archetype: "core-skill"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "logic", "reasoning", "constraints", "causality", "genai"]
last_reviewed: "2025-12-20"
---

# Logic

:::info[Core idea]
Logic defines the "rules of the game" for AI. If your rules are fuzzy, your AI will lose the match.
:::

## At a Glance

| Focus                       | Use Logic To                       | Failure If Missing       |
| --------------------------- | ---------------------------------- | ------------------------ |
| Causal relationships        | Determine outcomes from inputs     | AI makes leaps of faith  |
| Conditions & consequences   | Define "if-then" scenarios         | Unexpected side effects  |
| Invariants & boundaries     | Limit what AI can change           | Unintended changes occur |
| Consistency & completeness  | Ensure no contradictions or gaps   | AI generates conflicting logic |

---

## Overview

Logic is the backbone of GenAI & LLM Documentation.
It’s the skill of **defining clear, unambiguous rules for an AI to follow**. AI operates by a form of logic, but it’s fuzzy and probabilistic. Your job, as the human, is to provide the crisp, deterministic logic that governs its actions.

In GenAI & LLM Documentation, logic governs:

- how intent is translated into execution steps
- how constraints define boundaries
- how delegation grants specific permissions
- how review verifies correct behavior

---

## What Logic Means in GenAI & LLM Documentation

Logic in GenAI & LLM Documentation is **not formal proofs or math-heavy reasoning**.

It means:

- identifying cause-and-effect relationships
- defining precise conditions for actions
- establishing consistent rules and principles
- structuring prompts and specs to avoid contradictions

GenAI & LLM Documentation treats logical clarity as a **preventative control**.

:::tip[Signal of quality]
If you can draw a flowchart or decision tree of your prompt, your logic is probably good.
:::

---

## Why Logic Discipline Matters with AI

LLMs:

- excel at pattern matching and probabilistic inference
- struggle with strict, multi-step logical reasoning
- will fill in gaps if your logic is incomplete

If logic is fuzzy:

- models will generate plausible but incorrect code
- constraints will be ignored or misinterpreted
- errors will be harder to trace

GenAI & LLM Documentation treats logical clarity as a **preventative control**.

:::danger[Stop here]
If your prompt contains "AI should figure out...", your logic is incomplete.
:::

---

## Common Logical Constructs in GenAI & LLM Documentation

### Conditional Statements (If-Then-Else)

Define behavior based on specific conditions.

Example:

- "IF `user.role` is 'admin', THEN allow access to `adminPanel`. ELSE redirect to `dashboard`."

### Loops and Iterations

Specify repetitive tasks.

Example:

- "FOR each item in `cartItems`, calculate its subtotal."

### Invariants

Statements that must always be true.

Example:

- "The total order price **must always** be positive."

### Preconditions and Postconditions

Define what must be true before and after an operation.

Example:

- "PRECONDITION: `user_id` exists in the database. POSTCONDITION: `user_record` is updated."

GenAI & LLM Documentation logic requires ordering to be explicit.

---

## Logic-Level Failure Modes

### Contradictory Logic

Instructions or constraints that conflict.

Effect:

- AI attempts to reconcile, or picks one arbitrarily
- unpredictable outcomes

Fix:

- review for internal consistency

---

### Incomplete Logic

Missing conditions or steps.

Effect:

- AI fills in gaps with assumptions
- unexpected behavior

Fix:

- explicitly state all conditions and steps

---

### Implicit Logic

Relying on AI to infer unstated rules.

Effect:

- AI makes assumptions
- behavior deviates from intent

Fix:

- make all logical rules explicit

---

## Logic Across the GenAI & LLM Documentation Method

Logic appears at every stage of GenAI & LLM Documentation:

- **Discovery Brief**
  Identify the core problem and its boundaries

- **Intent Spec**
  Define success criteria as clear, testable outcomes

- **Constraint Spec**
  Encode guardrails and non-negotiables as logical rules

- **Delegation Contract**
  Specify permissions and prohibitions based on logical conditions

- **Generation Requests**
  Structure prompts to guide the AI's reasoning path

- **Review**
  Verify that the generated output adheres to the specified logic

- **Acceptance**
  Confirm all logical conditions for "done" are met

Logic underpins every step of reliable AI-assisted work.

---

## Practical Logic Checklist

Before generating:

- Are all conditions for actions explicit?
- Are there any contradictions in instructions?
- Have edge cases been considered (e.g., empty inputs, zero values)?
- Is the order of operations clear?
- Can this logic be translated into a flowchart?

If no, revise.

---

## Logic and Review

During review:

- Trace the logic of the generated output step-by-step.
- Compare the AI's derived logic against your explicit logical rules.
- If the AI output deviates, identify where your input logic was ambiguous or incomplete.

Fix the logic in your prompt, not just the AI's output.

---

## How to Practice Logic in GenAI & LLM Documentation

- Draw flowcharts for complex processes.
- List preconditions and postconditions for functions.
- Write "if-then" statements for every decision point.
- Challenge assumptions by asking "what if X is false?"
- Turn prose into bulleted rules.

:::tip[Fast drill]
Take a paragraph describing a feature. Break it down into discrete `IF <condition> THEN <action> ELSE <alternative_action>` statements.
:::

Logic clarifies intent, and clear intent prevents AI hallucinations.

---

## Next Skill

Proceed to:
**`docs/01-skills/06-common-skill-gaps.md`**

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-20
- Version: 0.1.0