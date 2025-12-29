---
title: "Template: Threat Model Lite"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["genai-llm", "template", "security", "risk"]
last_reviewed: "2025-12-20"
---

# Threat Model Lite: [Feature Name]

:::info[Instructions]
Fill this out for any feature that uses an LLM. If you answer "Yes" to any High Risk item, you must have a specific mitigation listed.
:::

## 1. Data Context (Input Risk)

**What does the model see?**

- [ ] **PII / User Data**: Names, emails, phone numbers.
- [ ] **Internal IP**: Codebase, docs, strategy.
- [ ] **Secrets**: API keys, credentials (🚫 STOP if checked).

> **Mitigation**: [e.g., Data masking middleware, PII stripper]

---

## 2. Execution Authority (Output Risk)

**What can the model do?**

- [ ] **Write Code**: Generates SQL, Python, Shell.
- [ ] **Render Content**: Generates HTML, Markdown, CSS.
- [ ] **Trigger Actions**: Calls APIs, sends emails, modifies DB.

> **Mitigation**: [e.g., Sandboxed execution, Human-in-the-loop approval, HTML sanitization]

---

## 3. Adversarial Surface (Injection Risk)

**Who controls the prompt?**

- [ ] **Internal Only**: Only devs/admins trigger it.
- [ ] **Indirect User Input**: Summarizing user emails/docs.
- [ ] **Direct User Input**: Chatbot or open text field.

:::danger[Critical Check]
If "Direct User Input" is checked, assume the user _will_ try to jailbreak it.
:::

---

## 4. Failure Modes

**What happens if the model lies or fails?**

| Scenario          | Impact                         | Fallback                      |
| :---------------- | :----------------------------- | :---------------------------- |
| **Hallucination** | _User gets wrong info_         | Disclaimer + Source citations |
| **Refusal**       | _Model triggers safety filter_ | Generic error message         |
| **Timeout**       | _Latency spike_                | Fallback to non-AI logic      |

---

## 5. Approval

- [ ] **Risk Level**: [Low / Medium / High]
- [ ] **Security Reviewer**: [Name]
- [ ] **Date**: YYYY-MM-DD
