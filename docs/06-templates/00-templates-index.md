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

## Overview

:::info[Value Proposition]
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
| **2. Intent**      | [`intent-spec-template.md`](./intent-spec-template.md)                                      | Define success without implementation details. |
| **3. Constraints** | [`constraint-spec-template.md`](./constraint-spec-template.md)                                  | Set the boundaries (tech stack, security).     |
| **4. Delegation**  | [`delegation-contract-template.md`](./delegation-contract-template.md)                              | Define the AI's role and permissions.          |
| **5. Generation**  | [`generation-request-template.md`](./generation-request-template.md)                               | The actual prompt structure.                   |
| **6. Review**      | [`review-and-interrogation-template.md`](./review-and-interrogation-template.md)                         | Checklist for verifying output.                |
| **7. Acceptance**  | [`acceptance-criteria-template.md`](./acceptance-criteria-template.md)                              | Definition of "Done".                          |
| **8. Iteration**   | [`iteration-log-template.md`](./iteration-log-template.md)                                    | Track fixes to specs, not just code.           |

---

## Governance & Evaluation

Tools for managing risk and quality.

| Template                         | Use Case                                   |
| :------------------------------- | :----------------------------------------- |
| [`working-agreements-template.md`](./working-agreements-template.md) | Aligning a team on AI usage rules.         |
| [`threat-model-lite-template.md`](./threat-model-lite-template.md)  | Quick security assessment for AI features. |
| [`quality-rubric-template.md`](./quality-rubric-template.md)     | Grading a specific artifact (1-3 scale).   |
| [`scenario-scorecard-template.md`](./scenario-scorecard-template.md) | Grading an end-to-end session.             |

---

## Prompt Patterns

Fast, reusable prompt building blocks.

| Template | Use Case |
| :-- | :-- |
| [`prompt-skeleton-template.md`](./prompt-skeleton-template.md) | Spec-style prompt with intent, context, constraints, and quality gates. |
| [`prompt-safety-addons.md`](./prompt-safety-addons.md) | Drop-in safety, scope, and compliance clauses for any prompt. |

---

## Ops & Dev Helpers

Starter scripts and checklists for local setup and delivery.

| Template | Use Case |
| :-- | :-- |
| [`local-dev-setup-template.md`](./local-dev-setup-template.md) | Copy/paste dev bootstrap commands (install, lint, test, build) to get running quickly. |
| [`code-change-request-template.md`](./code-change-request-template.md) | Prompt for safe, scoped code changes with tests and self-checks. |
| [`test-request-template.md`](./test-request-template.md) | Prompt to propose/author tests for a change, with commands to run. |
| [`node-local-dev-snippets.md`](./node-local-dev-snippets.md) | Node/React install + lint/test/build script snippets. |
| [`python-local-dev-snippets.md`](./python-local-dev-snippets.md) | Python venv + install + lint/test snippets (pytest/black/flake8). |
| [`fastapi-local-dev-snippets.md`](./fastapi-local-dev-snippets.md) | FastAPI setup with uvicorn, pytest, lint/format, and Makefile tips. |
| [`nextjs-local-dev-snippets.md`](./nextjs-local-dev-snippets.md) | Next.js install + lint/test/build scripts and env tips. |
| [`ci-github-actions-snippet.md`](./ci-github-actions-snippet.md) | GitHub Actions workflow for install/lint/test/build on pushes/PRs. |
| [`ci-matrix-github-actions-snippet.md`](./ci-matrix-github-actions-snippet.md) | GitHub Actions matrix (e.g., Node 18/20) for install/lint/test/build. |
| [`docker-compose-snippets.md`](./docker-compose-snippets.md) | Docker compose examples for app + DB local stacks. |
| [`vue-nuxt-local-dev-snippets.md`](./vue-nuxt-local-dev-snippets.md) | Vue/Nuxt install + lint/test/build scripts and env tips. |

---

## Meta Templates

Use these to extend the GenAI & LLM Documentation repository itself.

- [`pattern-template.md`](./pattern-template.md): Create a new Execution Pattern.
- [`scenario-template.md`](./scenario-template.md): Document a Professional Scenario.

---

## Quick Links

- Handbook Method: [Overview](/docs/01-handbook-method/01-overview)
- Scenario Template: [Template](/docs/06-templates/scenario-template)
- Pattern Template: [Template](/docs/06-templates/pattern-template)

## Next Step

Explore individual templates, starting with the [Discovery Brief Template](/docs/06-templates/discovery-brief-template).

---

## How to Use These Templates

1. **Copy**: Copy the raw markdown.
2. **Paste**: Create a new file in your project (e.g., `specs/feature-x/intent.md`).
3. **Fill**: Replace bracketed text `[Like This]` with your content.
4. **Commit**: Check it into version control alongside your code.

### Template Quality Checklist

- Each template should state: **Value Proposition**, **How to Use**, **Common Pitfalls**, **Quick Links/Next Step**.
- Keep prompts and specs short; move long context into linked snippets or attachments.
- Add citations/sources in your filled template where claims rely on upstream docs or code.

### How to Pick a Template

- **New work?** Start with Discovery Brief → Intent Spec → Constraint Spec → Generation Request.
- **Review/ship?** Use Review & Interrogation → Acceptance Criteria → Iteration Log.
- **Hands-on dev setup?** Use Local Dev Setup (below) to get running fast, then apply the Method templates.

:::warning[Do Not Edit In Place]
Treat the `docs/06-templates/` folder as a library. Do not modify these files for your specific task. Copy them out first.
:::
