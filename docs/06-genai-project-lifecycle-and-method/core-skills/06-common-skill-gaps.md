---
title: "Common Skill Gaps"
archetype: "core-skill"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "skill-gaps", "failure-modes", "professional-practice"]
last_reviewed: "2025-12-20"
---

# Common Skill Gaps

:::info[Why this matters]
Most GenAI & LLM Documentation failures are not caused by bad tools or weak models. They are caused by human skill gaps that go unaddressed.
:::

## Overview

Most GenAI & LLM Documentation failures are not caused by bad tools or weak models.
They are caused by **human skill gaps**.

Common issues:

- ambiguity in intent
- insufficient constraints
- poor systems thinking
- imprecise language
- inadequate review discipline

These lead to:

- AI inventing intent
- over-generation
- accidental scope creep
- plausible but incorrect outputs

GenAI & LLM Documentation assumes gaps are normal and fixable, but only if they are visible.

---

## The Root Cause: Human Limitations

The challenge is not with the AI, but with human cognitive biases:

- **Optimism bias**: "It's smart, it will figure it out."
- **Confirmation bias**: "It generated what I wanted (mostly)."
- **Recency bias**: "The last thing it said was good, so it's probably right."
- **Overconfidence**: "I'm a good engineer; I know what good looks like."

GenAI & LLM Documentation provides mechanisms to counteract these biases.

---

## Identifying Gaps (Signals and Symptoms)

How to tell if a skill gap is contributing to a problem:

### Symptom: AI generates irrelevant code

- **Possible Gap**: Logic (unclear causality), Sentences (overloaded instructions)
- **Mitigation**: Deconstruct problem, define scope explicitly.

### Symptom: AI fails to use specified patterns

- **Possible Gap**: Language (ambiguous terminology), Systems (missing context)
- **Mitigation**: Use deterministic vocabulary, provide architectural context.

### Symptom: AI output is plausible but buggy

- **Possible Gap**: Review (insufficient evidence), Logic (incomplete constraints)
- **Mitigation**: Generate characterization tests, specify success criteria.

### Symptom: Constant re-generation with minor tweaks

- **Possible Gap**: Intent (fuzzy goals), Constraints (undeclared boundaries)
- **Mitigation**: Sharpen intent spec, clarify non-negotiables.

---

## The Cost of Unaddressed Gaps

Unaddressed skill gaps lead to:

- **Increased review time**: More cycles spent correcting AI's mistakes.
- **Hidden technical debt**: Plausible but unidiomatic or insecure code.
- **Erosion of trust**: Teams become hesitant to use AI tools.
- **Missed opportunities**: AI is used for trivial tasks, not complex ones.

---

## Addressing Skill Gaps

### Deliberate Practice

Focus on one skill at a time.

Example:

- For a week, focus only on writing single-instruction sentences.

### Pair Programming (with AI)

Explain your thought process to the AI.

Example:

- "Explain to me why you chose this design pattern. What alternatives did you consider?"

### Use Templates

Templates force discipline by providing structure.

Example:

- Use the Constraint Spec template even for small tasks.

### Seek Peer Review

Have others review your prompts and specs, not just the AI's output.

---

## Conclusion

Skill gaps are normal. What matters is how you address them.
GenAI & LLM Documentation provides the framework to identify and systematically improve.
This is GenAI & LLM Documentation working as intended.

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-20
- Version: 0.1.0