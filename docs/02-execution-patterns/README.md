---
title: "Execution Patterns Index"
archetype: "pattern-index"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "patterns", "execution", "recipes"]
last_reviewed: "2025-12-28"
id: 00-pattern-index
slug: /02-execution-patterns/00-pattern-index
---



:::info[Value Proposition]
Execution patterns are reusable recipes for applying GenAI & LLM Handbook to common development tasks. They provide step-by-step guidance on how to achieve specific outcomes, from creating new components to refactoring legacy code.
:::

## Overview

GenAI & LLM Handbook provides the **method** (the 8-step loop) for managing AI-assisted work. Execution patterns provide the **implementation details**—the specific instructions and considerations for common development scenarios. Think of them as battle-tested playbooks for your AI co-pilot.

**Goal**: Systematize the application of GenAI & LLM Handbook to accelerate development and improve output quality for frequent tasks.
**Anti-pattern**: Reinventing the wheel for every AI task, leading to inconsistent results and missed opportunities for automation.

---

## When to Use

| Good fit (use when...)           | Avoid (not a fit when...)                     |
| :------------------------------------ | :---------------------------------------- |
| Starting a new component or module    | The problem is entirely novel and has no existing analogue |
| Refactoring existing code             | You are simply debugging a single line of code |
| Designing a new API endpoint          | The task is purely explorational (e.g., "what can this model do?") |

---

## Pattern Categories

Patterns are organized by the primary goal they help achieve.

### Creation Patterns (Building New Things)

-   **Clean Slate**: Generating new modules, components, or services from scratch.
    -   `docs/02-execution-patterns/01-clean-slate.md`
-   **Scaffold a Repo**: Setting up an entire repository structure.
    -   `docs/02-execution-patterns/02-scaffold-a-repo.md`
-   **Design an API**: Specifying new API endpoints and their contracts.
    -   `docs/02-execution-patterns/03-design-an-api.md`
-   **Data Modeling**: Designing database schemas or data structures.
    -   `docs/02-execution-patterns/04-data-modeling.md`

### Transformation Patterns (Changing Existing Things)

-   **Refactor Safely**: Improving code structure without changing behavior.
    -   `docs/02-execution-patterns/05-refactor-safely.md`
-   **The Strangler**: Incrementally replacing legacy systems.
    -   `docs/02-execution-patterns/02-strangler-refactor.md`
-   **The Translator**: Converting code or data from one format to another.
    -   `docs/02-execution-patterns/03-translator.md`
-   **Migrations and Upgrades**: Managing schema changes and dependency updates.
    -   `docs/02-execution-patterns/10-migrations-and-upgrades.md`

### Support Patterns (Assisting Development)

-   **Debug with Evidence**: Diagnosing and resolving bugs systematically.
    -   `docs/02-execution-patterns/06-debug-with-evidence.md`
-   **The Rubber Duck**: Using AI to explain complex code or problems.
    -   `docs/02-execution-patterns/07-rubber-duck.md`
-   **Write Tests**: Generating comprehensive test suites.
    -   `docs/02-execution-patterns/07-write-tests.md`
-   **Write Docs**: Generating accurate and maintainable documentation from code.
    -   `docs/02-execution-patterns/08-write-docs.md`
-   **Release and Changelog**: Automating release notes and communication.
    -   `docs/02-execution-patterns/09-release-and-changelog.md`

---

## Visual Summary

```mermaid
graph TD
    subgraph Creation
        P1(Clean Slate)
        P2(Scaffold a Repo)
        P3(Design an API)
        P4(Data Modeling)
    end

    subgraph Transformation
        P5(Refactor Safely)
        P6(The Strangler)
        P7(The Translator)
        P8(Migrations and Upgrades)
    end

    subgraph Support
        P9(Debug with Evidence)
        P10(The Rubber Duck)
        P11(Write Tests)
        P12(Write Docs)
        P13(Release and Changelog)
    end

    P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10 & P11 & P12 & P13 --> Loop[Apply GenAI & LLM Handbook Loop]

    classDef pattern fill:#E6F7FF,stroke:#1B75BB,color:#0F1F2E;
    class P1,P2,P3,P4,P5,P6,P7,P8,P9,P10,P11,P12,P13 pattern;
    class Loop fill:#E6F7FF,stroke:#1B75BB,color:#0F1F2E;
```

---

## Getting Started with Patterns

If you are new to GenAI & LLM Handbook, start with **The "Clean Slate"** or **The "Doc-Smith"**. They have the clearest success signals.

Each pattern includes:

-   A clear value proposition.
-   When to use (and when not to use) the pattern.
-   Prerequisites for successful execution.
-   A step-by-step guide.
-   A practical example with prompts and expected outputs.
-   Common pitfalls and critical risks.

---

## Quick Links

- Handbook Method: [Overview](/docs/01-handbook-method/01-overview)
- Pattern Template: [Template](/docs/06-templates/pattern-template)
- Clean Slate Pattern: [Execution Pattern](/docs/02-execution-patterns/01-clean-slate)

## Next Step

Dive into the first pattern: [Clean Slate](/docs/02-execution-patterns/01-clean-slate).
