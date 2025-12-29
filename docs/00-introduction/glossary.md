---
title: "Glossary"
archetype: "terminology"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "glossary", "terminology"]
last_reviewed: "2025-12-28"
---

# Glossary

:::info[Precision matters]
Clear, consistent terminology is fundamental for effective communication with both humans and AI. This glossary defines key terms used throughout the GenAI & LLM Documentation.
:::

## Key Terms

| Term                                            | Definition                                                                                                                                                                                                                                                                                                                      | Reference                                                                      |
| :---------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| **GenAI & LLM Documentation** (Generative AI & Large Language Model Documentation) | A method that treats language as executable infrastructure, with AI assisting and humans accountable. | `00-what-is-genai-llm.md` |
| **GenAI & LLM Documentation Loop**              | The execution rhythm from discovery through iteration.                                                                                                                                                                                                                                                    | `../03-method/00-the-genai-llm-loop.md`                                        |
| **Discovery Brief**                             | Short artifact capturing problem, context, and success markers without prescribing solutions.                                                                                                                                                                                                               | `../03-method/01-discovery-brief.md`                                      |
| **Intent Spec**                                 | Statement of goals and desired outcomes, independent of implementation.                                                                                                                                                                                                                                     | `../03-method/02-intent-spec.md`                                          |
| **Constraint Spec**                             | Non-negotiables, trade-offs, and guardrails the solution must honor.                                                                                                                                                                                                                                      | `../03-method/03-constraint-spec.md`                                      |
| **Delegation Contract**                         | Explicit permissions and prohibitions for AI assistance.                                                                                                                                                                                                                                                  | `../03-method/04-delegation-contract.md`                                  |
| **Generation Request**                          | Structured ask to an AI system, scoped by prior artifacts.                                                                                                                                                                                                                                                | `../03-method/05-generation-requests.md`                                  |
| **Review & Interrogation**                      | Systematic verification that outputs match intent, constraints, and acceptance criteria.                                                                                                                                                                                                                  | `../03-method/06-review-and-interrogation.md`                             |
| **Acceptance Criteria**                         | Observable conditions that define “done.”                                                                                                                                                                                                                                                                 | `../03-method/07-acceptance-criteria.md`                                  |
| **Artifact**                                    | A concrete, reviewable output from a stage of the GenAI & LLM Documentation Loop (e.g., spec, plan, code, test, documentation).                                                                                                                                                                    | `../03-method/12-artifact-contracts.md`                                   |
| **Human-in-the-Loop (HITL)**                    | A workflow where human input and decision-making are intentionally integrated at critical junctures of an automated or AI-driven process.                                                                                                                                                             | `../08-evaluation/03-human-review-protocols.md`                                |
| **Grounding**                                   | Providing an LLM with relevant, accurate, and up-to-date information (e.g., from a vector database or specific documents) to inform its response and prevent hallucinations. Often achieved via Retrieval Augmented Generation (RAG).                                                                 | `../02-genai-llm-fundamentals/04-retrieval-and-grounding-rag.md`               |
| **Hallucination**                               | An LLM output that is factually incorrect, makes false claims, or presents non-existent information as truth, often without external supporting evidence.                                                                                                                                               | `../02-genai-llm-fundamentals/07-hallucinations-and-failure-modes.md`          |

---

## Core Formula

**GenAI & LLM Documentation = Logic × Language × Systems × Sentences**. If any factor is zero, reliability collapses.

---

## Symbols and Labels Used in GenAI & LLM Documentation

We use a set of visual cues and icons to convey information density, warnings, and calls to action.

-   `💡` (Tip): Helpful advice, best practices.
-   `⚠️` (Warning): Important considerations, potential pitfalls.
-   `🛑` (Stop): Critical risks, do not proceed without addressing.
-   `✅` (Good): Example of a good practice or output.
-   `❌` (Bad): Example of a bad practice or output.

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0