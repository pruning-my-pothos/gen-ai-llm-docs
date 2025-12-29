---
title: "Pattern: Debug with Evidence"
archetype: "pattern"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["pattern", "debugging", "troubleshooting", "observability"]
last_reviewed: "2025-12-28"
---

# Pattern: Debug with Evidence

:::info[Value Proposition]
Use this pattern to systematically diagnose and resolve bugs by providing AI with concrete, observable evidence. This minimizes speculative debugging and leverages AI's ability to correlate information and suggest solutions based on actual system behavior.
:::

## Overview

Debugging can be a time-consuming and frustrating process. This pattern advocates for a data-driven approach, where the AI is not asked to "fix the bug" directly, but rather to analyze logs, stack traces, variable states, and other contextual information to pinpoint the root cause and propose targeted solutions. It turns AI into a powerful diagnostic co-pilot.

**Goal**: Accurately identify the root cause of a software defect and propose a fix based on concrete evidence.
**Anti-pattern**: Describing a bug vaguely to the AI ("My code doesn't work"), leading to generic, unhelpful suggestions.

---

## When to Use

| ✅ Use This Pattern When...           | 🚫 Do Not Use When...                     |
| :------------------------------------ | :---------------------------------------- |
| Encountering unexpected application behavior | The problem is purely conceptual and doesn't manifest in code execution |
| Analyzing complex system logs or traces | The issue is a known, simple syntax error that an IDE would catch |
| Dealing with intermittent or hard-to-reproduce issues | You lack any observable evidence (logs, stack traces, etc.) |

---

## Prerequisites

:::warning[Before you start]
You must have access to observable evidence related to the bug: error messages, stack traces, relevant log entries, input data that triggers the bug, and system context (e.g., OS, dependencies).
:::

- **Artifacts**: Stack trace, error message, relevant log snippets, input data that reproduces the bug.
- **Context**: Codebase context where the bug occurs, knowledge of recent changes, system environment details.

---

## The Pattern (Step-by-Step)

### Step 1: Collect All Evidence

Gather every piece of information related to the bug. The more context, the better. This includes:
-   Exact error messages and stack traces.
-   Relevant log lines (before, during, and after the error).
-   Input data or user actions that trigger the bug.
-   Environment details (OS, language version, dependencies).
-   Recent code changes in the affected area.

> **Practical Insight**: Provide the AI with raw, unfiltered data. Let the AI process it. Don't try to summarize or interpret too much yourself initially.

### Step 2: Formulate a Hypothesis (or ask AI to)

Based on the evidence, either form a preliminary hypothesis about the bug's cause or ask the AI to generate several hypotheses.

> "Given the attached stack trace and log entries, what are the top 3 most likely root causes for this `NullPointerException`?"

### Step 3: Propose Diagnostic Steps

Ask the AI to suggest further diagnostic steps to validate or invalidate the hypotheses. This might involve adding logging, setting breakpoints, or inspecting specific variables.

> "To verify the hypothesis that `userService.getUser()` is returning null unexpectedly, what additional logging statements should I add around the call site in `AuthController.java`?"

### Step 4: Analyze Proposed Fixes

Once a root cause is identified, ask the AI to propose a fix, and critically, ask for its rationale and potential side effects.

> "If the `NullPointerException` is caused by `userService.getUser()` returning null, propose a fix. Explain why this fix is appropriate and list any potential side effects or alternative solutions."

```mermaid
flowchart LR
    A[Collect Evidence] --> B[Formulate Hypotheses]
    B --> C[Propose Diagnostic Steps]
    C --> D{Root Cause Found?}
    D --> |No| C
    D --> |Yes| E[Analyze Proposed Fixes]

    classDef step fill:#E6F7FF,stroke:#1B75BB,color:#0F1F2E;
    class A,B,C,E step;
    class D junction;
```

### Practical Example: Diagnosing a "TypeError: Cannot read property 'name' of undefined"

**Objective**: Debug a `TypeError` in a React component caused by missing user data.

**Task Definition for AI (Iterative):**

1.  **Initial Evidence (Prompt):**
    ```markdown
    "I'm getting the following error in my React application. The page renders a `UserProfile` component.

    **Error Message:**
    ```
    TypeError: Cannot read property 'name' of undefined
        at UserProfile (UserProfile.jsx:15:27)
        at renderWithHooks (react-dom.development.js:16301:18)
        at mountIndeterminateComponent (react-dom.development.js:19240:13)
        ...
    ```

    **Relevant Code (UserProfile.jsx line 15-18):**
    ```javascript
    // UserProfile.jsx
    // ...
    function UserProfile({ user }) {
        // ...
        return (
            <div>
                <h1>Welcome, {user.name}!</h1> {/* Line 15 */}
                <p>Email: {user.email}</p>
            </div>
        );
    }
    // ...
    ```

    **Question**: What is the most likely cause of this error, and what's a simple diagnostic step I can take?"
    ```

    **AI Response (Example):**
    ```markdown
    **Most Likely Cause:**
    The `TypeError: Cannot read property 'name' of undefined` at `UserProfile.jsx:15` strongly suggests that the `user` prop passed to the `UserProfile` component is `undefined` when the component tries to access `user.name`. This often happens when data is being fetched asynchronously, and the component renders before the data is available.

    **Simple Diagnostic Step:**
    Add a `console.log` statement to inspect the `user` prop directly at the beginning of the `UserProfile` component.

    ```javascript
    // UserProfile.jsx
    function UserProfile({ user }) {
        console.log("User prop:", user); // Add this line
        // ...
        return (
            <div>
                <h1>Welcome, {user.name}!</h1>
                <p>Email: {user.email}</p>
            </div>
        );
    }
    ```
    ```
    *(Developer runs the app, observes `console.log("User prop:", undefined)`.)*

2.  **Proposed Fix (Prompt to AI):**
    ```markdown
    "The `console.log` confirmed that the `user` prop is `undefined` when `UserProfile` first renders. How can I fix `UserProfile.jsx` to prevent this error and show a loading state or a message if `user` is not yet available?"
    ```

    **AI Response (Example):**
    ```markdown
    **Proposed Fix:**
    You can add a conditional rendering check for the `user` prop. If `user` is `undefined` or `null`, you can render a loading indicator or a message.

    ```javascript
    // UserProfile.jsx
    import React from 'react'; // Ensure React is imported if JSX is used

    function UserProfile({ user }) {
        console.log("User prop:", user);

        if (!user) {
            return <div>Loading user profile...</div>; // Or render a spinner
        }

        return (
            <div>
                <h1>Welcome, {user.name}!</h1>
                <p>Email: {user.email}</p>
            </div>
        );
    }
    ```

    **Rationale:**
    This fix addresses the `TypeError` by ensuring that `user.name` is only accessed when `user` is a defined object. It gracefully handles the asynchronous nature of data loading, providing a better user experience by showing a loading state instead of crashing.

    **Potential Side Effects:**
    -   If the `user` data never resolves, the "Loading" message will persist indefinitely. Consider adding a timeout or error handling for the data fetching mechanism upstream.
    -   If `user` could potentially be an empty object `{}` but still `truthy`, you might need more specific checks (e.g., `if (!user || !user.name)`).
    ```

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Omitting Context**      | AI provides generic, unhelpful debugging advice. | Always provide full stack traces, relevant code, and exact error messages. |
| **Assuming AI Comprehension** | AI might miss nuances of your specific codebase or environment. | Explicitly state environment details, recent changes, and any known system quirks. |
| **Skipping Validation**   | Implementing AI's suggested fix without verifying the root cause. | Always confirm the hypothesis with further diagnostics before applying a fix. |

:::danger[Critical Risk]
Never apply AI-suggested fixes directly to production without thorough testing and understanding. Debugging AI is a partnership: you provide the evidence, AI provides hypotheses, but *you* are responsible for validation.
:::
