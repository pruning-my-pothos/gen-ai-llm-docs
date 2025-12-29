---
title: "Intent Spec Template"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "intent", "specification", "template"]
last_reviewed: "2025-12-28"
---

# Intent Spec Template

:::info[Value Proposition]
Clearly define the desired outcome and success criteria for an AI-assisted task. This prevents scope creep, focuses AI generation, and provides a clear benchmark for evaluating outputs.
:::

## Overview

The Intent Spec (Intent Specification) is a foundational artifact in the GenAI Project Lifecycle. It articulates _what_ needs to be achieved and _why_ it matters, without dictating _how_ it should be implemented. By clearly stating the purpose, desired outcome, and measurable success criteria, the Intent Spec acts as a compass for AI and a clear objective for human review.

**Goal**: Define a clear, measurable, and testable statement of purpose for an AI-assisted task.
**Anti-pattern**: Vague objectives like "make it better" or "improve performance," which lead to AI guessing at the underlying problem.

---

## Template

```markdown
# Intent Spec: [Name of Feature/Task]

**Purpose:** 
(A single, concise sentence describing the primary goal of the task. What problem are you solving, or what value are you creating?)

**Desired Outcome:**
(Describe the specific, observable result you want from the AI's work. What will be different after this task is completed?)

**Success Criteria:**
(How will you know the task is successful? These should be quantitative or qualitative metrics that can be verified.)
-   Criterion 1: ...
-   Criterion 2: ...
-   ...

**Explicit Exclusions/Non-Goals:**
(What is explicitly *not* part of this task? This prevents scope creep and focuses the AI.)
-   Exclusion 1: ...
-   Exclusion 2: ...
-   ...
```

---
## Practical Example: Intent Spec for a User Profile Microservice

**Objective**: Create a new user profile microservice.

**Intent Spec:**

```markdown
**Purpose:** To provide a dedicated, scalable service for managing user profile information.

**Desired Outcome:**
A new microservice exposing a RESTful API for CRUD operations on user profiles. This service will store user-specific data (e.g., name, email, avatar URL, preferences) and be accessible by other internal services.

**Success Criteria:**
-   The microservice API must expose endpoints for creating, retrieving, updating, and deleting user profiles.
-   Each operation must return appropriate HTTP status codes (2xx for success, 4xx for client errors, 5xx for server errors).
-   User profiles must be uniquely identifiable by a UUID.
-   The service must integrate with our existing authentication gateway for secure access.
-   Response times for profile retrieval should be under 100ms (p95).

**Explicit Exclusions/Non-Goals:**
-   User authentication (handled by separate service).
-   User registration flow.
-   Integration with external social media profiles.
-   Real-time notifications on profile changes.
```

---

## Common Pitfalls

| Pitfall                       | Impact                                   | Correction                                     |
| :---------------------------- | :--------------------------------------- | :--------------------------------------------- |
| **Vague Intent**              | AI generates generic or irrelevant outputs. | Use specific, measurable language.             |
| **Mixing Intent with Implementation** | AI makes technical decisions based on assumptions. | Focus solely on *what* to achieve, not *how*. |
| **Implicit Exclusions**       | AI performs work you didn't want.        | Explicitly state what is out of scope.         |

---

## Next Step

Proceed to defining the **Constraint Spec**.

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0