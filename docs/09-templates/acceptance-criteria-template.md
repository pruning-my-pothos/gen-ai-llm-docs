---
title: "Acceptance Criteria Template"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "acceptance", "qa", "template"]
last_reviewed: "2025-12-28"
---

# Acceptance Criteria Template

:::info[Value Proposition]
Define objective, measurable conditions that must be met for an AI-generated output to be considered "done." This transforms subjective "looks good" into evidence-based "is good," preventing premature acceptance and ensuring quality.
:::

## Overview

Acceptance Criteria are the objective standards against which AI-generated artifacts are judged. Acceptance is not a feeling; it is a checklist. This artifact clearly outlines the specific behaviors, performance metrics, and quality standards that an output must satisfy before it can be integrated, shipped, or moved to the next stage of development. It serves as the final gateway before AI-assisted work is deemed complete.

**Goal**: Establish a clear, verifiable definition of "done" for AI-generated outputs.
**Anti-pattern**: Relying on vague approval or subjective judgment ("I like it") for AI-assisted work, leading to inconsistent quality and hidden flaws.

---

## Template

```markdown
# Acceptance Criteria: [Name of Feature/Task]

**Intent Spec (Recap):** 
(A brief summary of the Intent Spec, or a link to the full artifact.)

**Constraint Spec (Recap):**
(A brief summary of the Constraint Spec, or a link to the full artifact.)

---

**Scenario 1: [Name of Scenario, e.g., Successful User Registration]**
-   **GIVEN** [precondition 1]
-   **AND** [precondition 2]
-   **WHEN** [action is performed]
-   **THEN**
    -   The system **MUST** [expected outcome 1].
    -   The system **MUST** [expected outcome 2].
    -   ...

**Scenario 2: [Name of Scenario, e.g., Registration with Existing Email]**
-   **GIVEN** [precondition]
-   **WHEN** [action is performed]
-   **THEN**
    -   The system **MUST** [expected outcome].
    -   ...

**Non-Functional Criteria:**
-   **Performance**: The system **MUST** [performance metric, e.g., respond within 200ms (P95)].
-   **Security**: The system **MUST** [security requirement, e.g., use bcrypt for password hashing].
-   **Accessibility**: The UI **MUST** [accessibility standard, e.g., be WCAG 2.1 AA compliant].
-   ...
```

---
## Practical Example: Acceptance Criteria for a User Registration Endpoint

**Objective**: Define acceptance criteria for an AI-generated user registration endpoint.

**Acceptance Criteria:**

```markdown
**Scenario 1: Successful User Registration**
-   **GIVEN** a unique username, valid email format, and a strong password.
-   **WHEN** a POST request is sent to `/api/register` with these credentials.
-   **THEN**
    -   The API **MUST** respond with HTTP status `201 Created`.
    -   The response body **MUST** contain a JSON object with the new user's ID and username (e.g., `{ "id": "...", "username": "..." }`).
    -   A new user record **MUST** be created in the database with the provided username and email.
    -   The password in the database **MUST** be securely hashed using bcrypt.

**Scenario 2: Registration with Existing Email**
-   **GIVEN** an email that already exists in the system.
-   **WHEN** a POST request is sent to `/api/register` with this email and valid other credentials.
-   **THEN**
    -   The API **MUST** respond with HTTP status `409 Conflict`.
    -   The response body **MUST** contain a JSON object indicating the conflict (e.g., `{ "message": "Email already registered" }`).
    -   No new user record **MUST** be created.

**Scenario 3: Registration with Invalid Email Format**
-   **GIVEN** an invalid email format (e.g., "user@.com").
-   **WHEN** a POST request is sent to `/api/register` with this email.
-   **THEN**
    -   The API **MUST** respond with HTTP status `400 Bad Request`.
    -   The response body **MUST** contain a JSON object indicating the validation error (e.g., `{ "message": "Invalid email format" }`).

**Non-Functional Criteria:**
-   The `/api/register` endpoint **MUST** respond within 150ms (P90) under normal load conditions.
-   Password hashing **MUST** use bcrypt with at least 10 salt rounds.
-   All error messages **MUST** be sanitized and not expose internal server details.
```

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Vague Criteria**        | Subjective interpretation, inconsistent quality. | Make criteria specific, measurable, achievable, relevant, time-bound (SMART). |
| **Testing Implementation Details** | Criteria break with internal refactors.  | Focus on observable behavior, not internal logic. |
| **Ignoring Non-Functional Requirements** | Performance, security, or usability issues. | Explicitly include non-functional criteria where relevant. |

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0