---
title: "Templates"
archetype: "foundation"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "templates", "artifacts", "resources"]
last_reviewed: "2025-12-20"
---

# Templates

:::info[Purpose]
Don't start from a blank page. These templates provide the structure you need to execute GenAI & LLM Documentation effectively. Copy them, fill them out, and treat them as source code.
:::

## Overview

In GenAI & LLM Documentation, **structure is safety**.
Using a template ensures you don't forget critical sections like "Non-Goals" in a brief or "Security" in a constraint spec.

These templates are designed to be:

- **Copy-pasteable**: Markdown format ready for your IDE or wiki.
- **Minimal**: Only the fields that matter.
- **Executable**: Designed to be read by both humans and LLMs.

---

## The Core Loop Artifacts

These templates correspond directly to the 8 steps of the GenAI & LLM Documentation Method.

| Step               | Template                                                       | Purpose                                        |
| :----------------- | :------------------------------------------------------------- | :--------------------------------------------- |
| **1. Discovery**   | [`discovery-brief-template.md`](./discovery-brief-template.md) | Define the problem before solving it.          |
| **2. Intent**      | `intent-spec-template.md`                                      | Define success without implementation details. |
| **3. Constraints** | `constraint-spec-template.md`                                  | Set the boundaries (tech stack, security).     |
| **4. Delegation**  | `delegation-contract-template.md`                              | Define the AI's role and permissions.          |
| **5. Generation**  | `generation-request-template.md`                               | The actual prompt structure.                   |
| **6. Review**      | `review-and-interrogation-template.md`                         | Checklist for verifying output.                |
| **7. Acceptance**  | `acceptance-criteria-template.md`                              | Definition of "Done".                          |
| **8. Iteration**   | `iteration-log-template.md`                                    | Track fixes to specs, not just code.           |

---

## Governance & Evaluation

Tools for managing risk and quality.

| Template                         | Use Case                                   |
| :------------------------------- | :----------------------------------------- |
| `working-agreements-template.md` | Aligning a team on AI usage rules.         |
| `threat-model-lite-template.md`  | Quick security assessment for AI features. |
| `quality-rubric-template.md`     | Grading a specific artifact (1-3 scale).   |
| `scenario-scorecard-template.md` | Grading an end-to-end session.             |

---

## Meta Templates

Use these to extend the GenAI & LLM Documentation repository itself.

- `pattern-template.md`: Create a new Execution Pattern.
- `scenario-template.md`: Document a Professional Scenario.

---

## How to Use These Templates

1. **Copy**: Copy the raw markdown.
2. **Paste**: Create a new file in your project (e.g., `specs/feature-x/intent.md`).
3. **Fill**: Replace bracketed text `[Like This]` with your content.
4. **Commit**: Check it into version control alongside your code.

:::warning[Do Not Edit In Place]
Treat the `docs/09-templates/` folder as a library. Do not modify these files for your specific task. Copy them out first.
:::

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-20
- Version: 0.1.0
