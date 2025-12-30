---
title: "Template: Working Agreements"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "template", "team", "governance", "agreements"]
last_reviewed: "2025-12-20"
---

## Working Agreements Template

:::info[Value Proposition]
Use this template to align your team on **how** AI tools will be used. These are not just rules; they are promises you make to each other to maintain quality and trust.
:::

---

## 1. The Golden Rule of Accountability

:::danger[Non-Negotiable]
**If you commit it, you own it.**
"The AI wrote it" is never a valid excuse for a bug, security hole, or outage.
:::

- [ ] We agree that the committer is fully responsible for every line of code, regardless of its origin.
- [ ] We agree to never merge code we do not understand.

---

## 2. "No-Go" Zones (Data & Context)

**Where is AI strictly forbidden?**

| Category            | Policy                   | Reason             |
| :------------------ | :----------------------- | :----------------- |
| **PII / Secrets**   | 🚫 Never paste into chat | Data leakage risk  |
| **Core Auth Logic** | ⚠️ Human-led only        | High security risk |
| **Customer Data**   | 🚫 No training/inference | Privacy compliance |

---

## 3. Review Standards

**How do we review AI-generated code?**

- [ ] **Disclosure**: PRs must state if AI was used for significant logic.
- [ ] **Skepticism**: Reviewers assume AI code contains subtle bugs until proven otherwise.
- [ ] **Artifacts**: Complex changes must include the _Intent Spec_ or _Constraint Spec_ in the PR description.

:::warning[Anti-Pattern]
Do not approve large AI-generated PRs without a walkthrough. If you can't explain it, reject it.
:::

---

## 4. Tooling & Environment

**What tools are approved for use?**

- **Approved**: [e.g., GitHub Copilot Enterprise, Cursor (Business Mode)]
- **Prohibited**: [e.g., Personal ChatGPT accounts, Unverified extensions]

---

## 5. Handling Disagreements

**What happens when the AI suggests X, but the team standard is Y?**

- [ ] **Team Standard Wins**: We enforce our patterns over AI defaults.
- [ ] **Update Constraints**: We will update our _Constraint Specs_ to prevent the AI from suggesting the wrong pattern again.

---

## Common Pitfalls

| Pitfall                   | Impact                                   | Correction                                     |
| :------------------------ | :--------------------------------------- | :--------------------------------------------- |
| **Ignoring Accountability** | Blaming AI for errors, lack of ownership. | Reinforce human responsibility for all committed code. |
| **Undefined "No-Go" Zones**| Data leakage, security breaches.         | Clearly define what data/tasks are off-limits for AI. |
| **Lack of Review Protocol** | Merging AI code without proper scrutiny. | Implement strict review processes for AI-generated code. |

---

## Quick Links

- Handbook Method: [Overview](/docs/01-handbook-method/01-overview)
- Accountability & Delegation: [Handbook Method](/docs/01-handbook-method/accountability-and-delegation)
- Delegation Contract Template: [Template](/docs/06-templates/delegation-contract-template)

## Next Step

Return to the [Templates Index](/docs/06-templates/00-templates-index) to explore more resources.
