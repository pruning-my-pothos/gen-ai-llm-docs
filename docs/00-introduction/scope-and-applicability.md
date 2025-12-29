---
title: "GenAI & LLM Documentation Scope and Applicability"
archetype: "standard"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "standard", "scope", "applicability", "governance"]
last_reviewed: "2025-12-28"
---

# GenAI & LLM Documentation Scope and Applicability

:::info[Value Proposition]
Draw a clear boundary for when GenAI & LLM Documentation applies, what it governs, and when it may be skipped. Define “professional environment” in impact terms, not job titles.
:::

## Overview

Not all AI usage requires the full rigor of GenAI & LLM Documentation. This document defines the scope and applicability of the framework, helping practitioners identify when to engage with its principles and when a lighter touch is appropriate. The core idea is that the level of diligence should scale with the potential impact of the AI-assisted work.

GenAI & LLM Documentation applies when AI-assisted work can meaningfully affect users, systems, finances, safety, compliance, or reputation. Titles do not matter; **impact does**.

**Goal**: Provide clear guidelines for when to apply GenAI & LLM Documentation, ensuring proportionate effort and risk management.
**Anti-pattern**: Applying GenAI & LLM Documentation for trivial tasks, leading to unnecessary overhead, or skipping it for critical work, leading to high-risk outcomes.

---

## When to Use

| ✅ Use This Pattern When...           | 🚫 Do Not Use When...                     |
| :------------------------------------ | :---------------------------------------- |
| Work has measurable business impact   | The work is purely experimental with no intention of deployment |
| Outputs will affect users or systems  | The output is a quick personal draft with no wider audience |
| Regulatory compliance is required     | You are learning to use an AI tool for the first time on a toy project |

---

## Applicability Triggers (GenAI & LLM Documentation MUST apply when any are true)

GenAI & LLM Documentation **MUST** be applied to AI-assisted work if the outputs:

-   Are intended for production systems or public-facing documentation.
-   Could impact user data privacy or security.
-   Could affect financial transactions or business revenue.
-   Have implications for regulatory compliance or legal obligations.
-   Could affect user safety or well-being.
-   Are part of a team's shared codebase or knowledge base.

---

## Exemptions (GenAI & LLM Documentation MAY be skipped when all are true)

GenAI & LLM Documentation **MAY** be skipped for AI-assisted work if *all* of the following conditions are met:

-   The work is purely for personal learning or exploration.
-   The outputs will not be deployed, shared, or integrated into any production or shared system.
-   There is no potential for impact on users, systems, finances, safety, compliance, or reputation.
-   The activity is explicitly designated as a "sandbox" or "play" environment.

:::warning[Critical Risk]
Treating GenAI & LLM Documentation as optional for “small” production changes. Even minor changes can have outsized impact in complex systems.
:::

---

## Governing Artifacts and Processes

The application of GenAI & LLM Documentation is governed by its core method and artifacts:

-   **Intent Spec**: Defines what success looks like.
-   **Constraint Spec**: Defines the boundaries and non-negotiables.
-   **Review & Interrogation**: Ensures output meets standards.
- **Process**: `docs/03-method/00-the-genai-llm-loop.md`

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0