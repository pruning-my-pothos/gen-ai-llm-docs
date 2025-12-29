---
title: "Style Guide"
archetype: "standard"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["documentation", "style-guide", "consistency"]
last_reviewed: "2025-12-28"
---

# Style Guide

:::info[Consistency is key]
This document defines the visual and structural standards for the GenAI & LLM Documentation repository. Use it to maintain consistency across all documentation.
:::

## Overview

GenAI & LLM Documentation is written to be **executable** by humans. This means it prioritizes clarity, precision, and structure over informal prose. This style guide ensures all contributions adhere to a common standard, making the documentation easier to read, understand, and apply.

**Goal**: Ensure all GenAI & LLM Documentation is consistent, clear, and actionable.
**Anti-pattern**: Free-form documentation that lacks structure or introduces ambiguous terminology.

---

## Language & Tone

### Precision

-   Use clear, unambiguous language. Avoid jargon where simpler terms suffice, or define jargon clearly.
-   Be explicit. Avoid implied meanings.
-   Prefer active voice.

### Tone

-   **Terse and professional**: Focus on conveying information efficiently.
-   **Action-oriented**: Guide the reader on what to do.
-   **Objective**: Avoid subjective opinions or marketing fluff.

GenAI & LLM Documentation is for people who want speed without giving up control.

---

## Formatting

### Headings

-   Use `#` for main title, `##` for sections, `###` for sub-sections.
-   Ensure headings are descriptive and reflect content.

### Code Blocks

-   Use triple backticks (```` ``` ````) for code blocks.
-   Specify the language for syntax highlighting (e.g., ```` ```typescript ````).
-   Inline code: use single backticks (`` `code` ``).

### Lists

-   Use ordered lists for sequential steps (e.g., `1. Step one`).
-   Use unordered lists for itemized points (e.g., `- Item one`).

### Emphasis

-   Use `**bold**` for strong emphasis or key terms.
-   Use `*italic*` for minor emphasis or technical terms that might not be in the glossary.

---

## Docusaurus Specifics

### Info Boxes

Use Docusaurus admonitions for structured information:

-   `:::info[Title]` for general information or value propositions.
-   `:::warning[Title]` for important warnings or prerequisites.
-   `:::danger[Title]` for critical risks or things to avoid.
-   `:::tip[Title]` for helpful tips or pro-tips.

### Internal Links

-   Use relative paths for links within the `docs` directory (e.g., `[Link Text](/docs/path/to/doc)`).
-   Use `Link` component from `@docusaurus/Link` for internal JSX links.

---

## Terminology

-   Use terms from the [Glossary](/docs/00-introduction/glossary).
-   Be consistent with capitalization (e.g., "Intent Spec" not "Intent spec").

---

## Code Examples

-   Keep code examples concise and focused on the illustrated point.
-   Ensure code examples are correct and executable.
-   Highlight changes or relevant lines where necessary.

---

## Diagrams

-   Use Mermaid for flowcharts and sequence diagrams.
-   Provide a text description for accessibility (e.g., `aria-hidden="true" class="sr-only"`).

---

## Review Process

-   All documentation updates **MUST** be reviewed for clarity, accuracy, and adherence to this style guide.
-   Focus on whether the documentation is **executable**—can a human (or AI) follow the instructions to achieve the stated goal?

---

## Visual Styling

-   **Styling**: Use the standard GenAI & LLM Documentation class definitions for consistency.

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0
