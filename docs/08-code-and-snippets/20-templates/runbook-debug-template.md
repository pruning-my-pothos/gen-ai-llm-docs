---
title: "LLM Debug Runbook Template"
archetype: "template"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["troubleshooting", "debugging", "runbook", "template"]
last_reviewed: "2025-12-31"
---

# LLM Debug Runbook Template

When an LLM-powered application encounters issues in production, rapid diagnosis and resolution are critical. A debug runbook provides a structured, step-by-step guide to help on-call engineers quickly identify, troubleshoot, and fix common problems, minimizing Mean Time To Resolution (MTTR).

:::info[The Goal: Efficient Incident Response]
The objective is to standardize the debugging process for LLM applications, enabling quick and effective responses to incidents by providing clear procedures and checks.
:::

---

## 1. Incident Details

-   **Incident ID**: [Unique ID for this incident, e.g., `INC-20251231-001`]
-   **Date/Time Reported**: YYYY-MM-DD HH:MM UTC
-   **Reported By**: [Name/System]
-   **Impact**: [e.g., X% of users affected, Feature Y is down, High latency observed]
-   **Observed Symptoms**: [e.g., "Chatbot returns generic error", "No response from RAG", "Application crashes on specific queries"]

---

## 2. Problem Statement

A concise description of the problem as currently understood.

> [e.g., "The customer support chatbot is consistently returning 'I cannot answer at this time' for all queries related to billing since 10:00 UTC."]

---

## 3. Initial Triage / Symptom Checklist

Start with high-level checks, then drill down.

-   **[ ] Is the LLM API reachable?**
    -   Run `ping <LLM_API_HOSTNAME>` (e.g., `ping api.openai.com`)
    -   Run `curl -I <LLM_API_ENDPOINT>` (e.g., `curl -I http://localhost:11434/v1/models`)
    -   *Expected*: HTTP 200/401 (if API key needed). *Problem*: Connection refused, timeout.
    -   *Action*: Check network connectivity, VPN, firewall. (See [Networking, Ports, Firewalls](./../19-troubleshooting-cheatsheet/networking-ports-firewalls.md)).
-   **[ ] Are Local LLM Servers Running (if applicable)?**
    -   Ollama: `ollama ps` or `pgrep ollama`
    -   LM Studio: Check UI.
    -   *Expected*: Server process active. *Problem*: Process not found.
    -   *Action*: Restart server (`ollama serve`).
-   **[ ] Any Out-Of-Memory (OOM) Errors?**
    -   Check system logs (`dmesg -T` on Linux, Event Viewer on Windows, Console.app on macOS).
    -   Check GPU memory: `nvidia-smi` (NVIDIA) or Activity Monitor (macOS).
    -   *Expected*: Sufficient free memory. *Problem*: OOM messages.
    -   *Action*: Reduce model size/quantization, free RAM. (See [OOM Debug Playbook](./../13-resource-and-performance/oom-debug-playbook.md)).
-   **[ ] Are Application Logs showing Errors?**
    -   Filter logs for `ERROR` or `CRITICAL` levels for the relevant time window.
    -   Look for `LLM API call failed`, `JSONDecodeError`, `ValidationError`.
    -   *Action*: Analyze error messages to guide further debugging. (See [Logging & Tracing](./../14-logging-and-tracing/README.md)).

---

## 4. Step-by-Step Debugging Checklist

Follow these steps based on the symptoms.

### a. Verify LLM Configuration

-   **[ ] Correct API Keys/Credentials?**
    -   Check `OPENAI_API_KEY` or similar environment variables.
    -   *Action*: Ensure keys are valid and properly loaded. (See [Secrets and Env Hygiene](./../15-safety-and-privacy/secrets-and-env-hygiene.md)).
-   **[ ] Model Name and Availability?**
    -   Does the `model` parameter in your code match what's available on the server?
    -   *Action*: Check `ollama list` or server UI. (See [Common LLM Errors](../19-troubleshooting-cheatsheet/common-errors-and-fixes.md)).

### b. Inspect the Prompt

-   **[ ] Is the prompt token count within limit?**
    -   Log the full prompt and its token count.
    -   *Action*: If too long, review [Prompt Size Budgeting](./../05-token-counting/prompt-size-budgeting.md).
-   **[ ] Is the prompt structure correct?**
    -   Are system messages, user messages, RAG context, etc., correctly formatted and delimited?
    -   *Action*: Review [Message Priority and Ordering](./../06-context-hygiene/message-priority-and-ordering.md).
-   **[ ] Is there any unintentional PII or prompt injection attempt?**
    -   Review logged user input.
    -   *Action*: Implement [PII Redaction](./../14-logging-and-tracing/pii-redaction-basics.md) and [Prompt Injection Defense](./../15-safety-and-privacy/prompt-injection-defense.md).

### c. Check LLM Output

-   **[ ] Is the LLM output malformed (e.g., invalid JSON)?**
    -   *Action*: Implement [Partial Output Repair](./../08-structured-output/partial-output-repair.md) or [Retry on Invalid Output](./../09-output-validation-and-guards/retry-on-invalid.md).
-   **[ ] Is the output content incorrect or hallucinated (for RAG)?**
    -   *Action*: Check retrieved documents. Review [Common RAG Failure Modes](./../10-rag-mini/rag-failure-modes.md).
-   **[ ] Does the output violate any guardrails?**
    -   *Action*: Review [Output Validation & Guardrails](./../09-output-validation-and-guards/README.md).

### d. Check Dependencies (RAG Specific)

-   **[ ] Is the Vector Database accessible and populated?**
    -   *Action*: Verify vector DB server status. Check collection count.
-   **[ ] Is the Embedding Model working correctly?**
    -   *Action*: Test embedding generation in isolation.

---

## 5. Resolution Steps Taken

-   [e.g., Restarted Ollama server.]
-   [e.g., Corrected typo in API key environment variable.]
-   [e.g., Adjusted `max_tokens` for prompt.]

---

## 6. Root Cause Analysis

What was the underlying reason for the incident?

> [e.g., "The `rag_pipeline_config.json` was updated to use a new embedding model, but the `ingest` job was not rerun, leading to mismatched embeddings and poor retrieval."]

---

## 7. Follow-up Actions

What steps will be taken to prevent recurrence or improve future incident response?

-   [ ] Implement automated health checks for LLM servers.
-   [ ] Add a validation step in CI to ensure RAG ingestion runs after config changes.
-   [ ] Improve logging for vector DB connectivity issues.

---

:::tip[Keep it Living]
A runbook is a living document. Update it after every incident to include new learnings, specific error messages, and effective resolution steps.
:::

:::warning[Don't Guess, Verify]
Avoid making assumptions during debugging. Systematically verify each component and check logs at every step.
:::
