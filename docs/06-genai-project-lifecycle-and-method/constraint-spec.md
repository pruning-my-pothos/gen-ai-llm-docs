---
title: "Constraint Spec"
archetype: "method"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "constraints", "boundaries", "method"]
last_reviewed: "2025-12-28"
---

# Constraint Spec

:::info[Value Proposition]
Encode all non-negotiable boundaries, technical requirements, and guardrails for an AI-assisted task. This prevents AI overreach, ensures compliance with architectural standards, and mitigates risks from hallucinations or unintended behavior.
:::

## Overview

The Constraint Spec (Constraint Specification) is a critical artifact in the GenAI & LLM Documentation Loop. It defines the "rules of the game" for AI, establishing clear limits and mandatory requirements that the AI's output **MUST** adhere to. While the Intent Spec defines _what_ to achieve, the Constraint Spec defines _how_ the solution must behave and _what it cannot do_. This specification is paramount for controlling AI's generative capabilities.

**Goal**: Provide clear, unambiguous boundaries and non-functional requirements that AI-generated output must satisfy.
**Anti-pattern**: Relying on implicit assumptions about coding standards, security, or architecture, leading to AI generating incompatible or dangerous code.

---

## When to Use

| ✅ Use This Pattern When...           | 🚫 Do Not Use When...                     |
| :------------------------------------ | :---------------------------------------- |
| Every time you delegate a task to AI  | You are purely brainstorming ideas where boundaries are intentionally fluid |
| Defining technical standards          | The task is a simple informational query  |
| Mitigating security risks with AI-generated code | The AI tool is only being used for non-generative tasks (e.g., summarization) |

---

## Prerequisites

:::warning[Before you start]
A clear **Intent Spec** is essential. The Constraint Spec directly informs how that Intent can be realized safely and effectively.
:::

-   **Artifacts**: Intent Spec.
-   **Context**: Understanding of the project's technical stack, architectural patterns, security policies, and performance requirements.

---

## The Pattern (Step-by-Step)

### Step 1: Define Technical Constraints

Specify the technology stack, versions, libraries, and coding standards.

> **Practical Insight**: Be as granular as possible. "Use TypeScript 5.x, React 18.x with Functional Components, Tailwind CSS for styling. Adhere to ESLint Airbnb config for React."

### Step 2: Establish Non-Functional Requirements

Detail requirements related to performance, security, scalability, accessibility, and maintainability.

> "The API endpoint must respond within 200ms (P95). All passwords must be hashed using bcrypt with at least 10 salt rounds. Generated UI must be WCAG 2.1 AA compliant. Code must be easily testable and follow clean architecture principles."

### Step 3: Specify Architectural Boundaries

Define how the AI-generated solution must fit into the existing system architecture.

> "The microservice must expose a RESTful API. No direct database access from the frontend. Communication between services via Kafka."

### Step 4: List Prohibitions/Exclusions

Explicitly state what the AI **MUST NOT** do or include. This is as important as what it **MUST** do.

> "You must not introduce any new npm packages. You must not use global CSS. You must not generate any database migration scripts."

```mermaid
flowchart LR
    A[Technical Constraints] --> B[Non-Functional Requirements]
    B --> C[Architectural Boundaries]
    C --> D[Prohibitions/Exclusions]

    classDef step fill:#E6F7FF,stroke:#1B75BB,color:#0F1F2E;
    class A,B,C,D step;
```

---

## Practical Example: Constraint Spec for a User Profile API Endpoint

**Objective**: Generate a new API endpoint for user profile retrieval.

**Intent Spec (recap)**: "Implement a secure REST endpoint `/api/users/{id}` to retrieve user details, accessible only by authenticated users, returning user ID and public profile info."

**Constraint Spec:**

```markdown
**Constraint Spec for User Profile API Endpoint:**

**1. Technical Constraints:**
-   **Language**: TypeScript 5.x
-   **Runtime**: Node.js 20.x
-   **Framework**: Express.js 4.x
-   **Database Interaction**: Must use an existing `UserRepository` interface (assume it exists and returns `User` objects). Do not generate database queries directly.
-   **Coding Standards**: Adhere to ESLint Airbnb config for TypeScript. Use JSDoc for all public functions.

**2. Non-Functional Requirements:**
-   **Security**:
    -   Authentication: Must use JWT tokens provided in the `Authorization` header.
    -   Authorization: Only authenticated users can access their own profile. Admin users can access any profile.
    -   Data Exposure: Only public profile information (id, username, email) should be returned. No password hashes, internal IDs, or sensitive data.
-   **Performance**: Endpoint must respond within 100ms (P90).
-   **Error Handling**: Return HTTP 401 for unauthenticated, 403 for unauthorized, 404 for user not found, 500 for server errors.
    -   Error response format: `{ "message": "Error description" }`.

**3. Architectural Boundaries:**
-   The endpoint must be a RESTful GET endpoint at `/api/users/{id}`.
-   The new code must integrate with the existing Express.js application structure (e.g., `src/routes`, `src/controllers`, `src/services`).

**4. Prohibitions/Exclusions:**
-   **MUST NOT** introduce any new npm packages without explicit approval.
-   **MUST NOT** generate any frontend code.
-   **MUST NOT** modify existing authentication middleware.
-   **MUST NOT** create new database tables or alter schema.
```

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Vague Constraints**     | AI generates code that violates standards. | Be explicit, specific, and use measurable terms. |
| **Contradictory Constraints** | AI generates invalid or conflicting code. | Ensure internal consistency within the Constraint Spec. |
| **Over-Constraining**     | AI struggles to generate valid output.   | Focus on critical non-negotiables; allow AI some flexibility for minor details. |

---

## Next Step

Proceed to:
**`docs/03-method/04-delegation-contract.md`**

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0