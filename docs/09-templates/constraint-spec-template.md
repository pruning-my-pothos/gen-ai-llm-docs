---
title: "Constraint Spec Template"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "constraints", "boundaries", "template"]
last_reviewed: "2025-12-28"
---

# Constraint Spec Template

:::info[Value Proposition]
Encode all non-negotiable boundaries, technical requirements, and guardrails for an AI-assisted task. This prevents AI overreach, ensures compliance with architectural standards, and mitigates risks from hallucinations or unintended behavior.
:::

## Overview

The Constraint Spec (Constraint Specification) is a critical artifact in the GenAI Project Lifecycle. It defines the "rules of the game" for AI, establishing clear limits and mandatory requirements that the AI's output **MUST** adhere to. While the Intent Spec defines _what_ to achieve, the Constraint Spec defines _how_ the solution must behave and _what it cannot do_. This specification is paramount for controlling AI's generative capabilities.

**Goal**: Provide clear, unambiguous boundaries and non-functional requirements that AI-generated output must satisfy.
**Anti-pattern**: Relying on implicit assumptions about coding standards, security, or architecture, leading to AI generating incompatible or dangerous code.

---

## Template

```markdown
# Constraint Spec: [Name of Feature/Task]

**1. Technical Constraints:**
-   **Language**: [e.g., TypeScript 5.x]
-   **Runtime**: [e.g., Node.js 20.x]
-   **Framework**: [e.g., React 18.x with Functional Components]
-   **Database Interaction**: [e.g., Must use an existing `UserRepository` interface]
-   **Coding Standards**: [e.g., Adhere to ESLint Airbnb config]

**2. Non-Functional Requirements:**
-   **Security**:
    -   [e.g., Authentication: Must use JWT tokens]
    -   [e.g., Data Exposure: Only public profile information should be returned]
-   **Performance**: [e.g., Endpoint must respond within 100ms (P90)]
-   **Error Handling**: [e.g., Return HTTP 401 for unauthenticated, 404 for not found]

**3. Architectural Boundaries:**
-   [e.g., The endpoint must be a RESTful GET endpoint at `/api/users/{id}`]
-   [e.g., The new code must integrate with the existing Express.js application structure]

**4. Prohibitions/Exclusions:**
-   **MUST NOT** [e.g., introduce any new npm packages without explicit approval]
-   **MUST NOT** [e.g., generate any frontend code]
-   **MUST NOT** [e.g., modify existing authentication middleware]
```

---
## Practical Example: Constraint Spec for a User Profile API Endpoint

**Objective**: Generate a new API endpoint for user profile retrieval.

**Constraint Spec:**

```markdown
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

Proceed to defining the **Generation Request**.

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0