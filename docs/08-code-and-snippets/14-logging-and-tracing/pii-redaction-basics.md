---
title: "PII Redaction Basics for LLM Logs"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["security", "privacy", "pii", "redaction", "logging"]
last_reviewed: "2025-12-31"
---

# PII Redaction Basics for LLM Logs

When logging LLM prompts, outputs, and associated metadata, there's a significant risk of inadvertently capturing Personally Identifiable Information (PII) or other sensitive data. Storing PII in logs can lead to privacy violations, data breaches, and non-compliance with regulations like GDPR or CCPA. Implementing PII redaction is a critical security and privacy measure.

:::info[The Goal: Secure and Compliant Logging]
The objective is to remove or mask sensitive information from your LLM logs *before* storage, protecting user privacy and ensuring your application adheres to data protection regulations.
:::

---

## What is PII?

PII includes any information that can be used to directly or indirectly identify an individual. Common examples relevant to LLM interactions:

-   **Direct Identifiers**: Full names, email addresses, phone numbers, social security numbers, credit card numbers, IP addresses.
-   **Indirect Identifiers**: User IDs (if linkable to an individual), physical addresses, dates of birth.

---

## Why Redact PII from Logs?

-   **Privacy Compliance**: Meet legal and regulatory requirements (GDPR, CCPA, HIPAA).
-   **Data Breach Mitigation**: Reduce the impact and scope of a data breach if logs are compromised.
-   **Reduced Risk**: Minimizes the attack surface for adversaries seeking sensitive data.
-   **Ethical Responsibility**: Respect user privacy.

---

## Basic Redaction Techniques (Python)

These methods provide a first line of defense for common PII patterns.

### 1. Simple Keyword/Pattern Replacement

For known sensitive keywords or easily identifiable patterns like email addresses or phone numbers.

```python
import re
from typing import List

def redact_email_addresses(text: str, replacement: str = "[EMAIL_REDACTED]") -> str:
    """Redacts email addresses from a string."""
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    return re.sub(email_pattern, replacement, text)

def redact_phone_numbers(text: str, replacement: str = "[PHONE_REDACTED]") -> str:
    """Redacts common phone number formats."""
    # This regex is simplified; real-world phone number regex can be very complex
    phone_pattern = r'\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b'
    return re.sub(phone_pattern, replacement, text)

def redact_keywords(text: str, keywords: List[str], replacement: str = "[REDACTED]") -> str:
    """Redacts a list of specific keywords."""
    for keyword in keywords:
        text = re.sub(r'\b' + re.escape(keyword) + r'\b', replacement, text, flags=re.IGNORECASE)
    return text

# --- Example Usage ---
user_input_with_pii = "My name is Jane Doe, my email is jane.doe@example.com, and my number is (123) 456-7890. My address is 123 Main St."
sensitive_keywords = ["Jane Doe", "123 Main St"]

redacted_text = redact_email_addresses(user_input_with_pii)
redacted_text = redact_phone_numbers(redacted_text)
redacted_text = redact_keywords(redacted_text, sensitive_keywords)

print("Original:", user_input_with_pii)
print("Redacted:", redacted_text)
# Expected: Redacted: My name is [REDACTED], my email is [EMAIL_REDACTED], and my number is [PHONE_REDACTED]. My address is [REDACTED].
```

### 2. Masking PII

Instead of full replacement, you can mask parts of the PII, which can be useful for debugging while retaining some identifier.

```python
def mask_email_partially(email: str) -> str:
    """Masks the local part of an email address."""
    parts = email.split('@')
    if len(parts) == 2:
        username = parts[0]
        domain = parts[1]
        masked_username = username[0] + '*' * (len(username) - 2) + username[-1]
        return f"{masked_username}@{domain}"
    return email # Return original if not a valid email format

# --- Example Usage ---
email = "jane.doe@example.com"
masked_email = mask_email_partially(email)
print("Masked email:", masked_email) # Expected: j****e@example.com
```

---

## When to Redact: Before Logging

The golden rule for PII redaction is to perform it as early as possible in your data pipeline, *before* the data is written to any persistent storage like logs, databases, or analytics systems.

---

## Advanced Redaction Techniques (Briefly)

For robust, production-grade PII redaction, especially across diverse data and languages, consider:

-   **Named Entity Recognition (NER) Models**: Fine-tuned models that can identify and classify PII entities (names, locations, organizations). Libraries like spaCy or NLTK, or dedicated PII models from Hugging Face.
-   **Dedicated PII Redaction Libraries/APIs**: Services like Microsoft Presidio, Google Cloud Data Loss Prevention (DLP), or AWS Comprehend can provide sophisticated PII detection and redaction.

---

:::warning[Full Redaction is Hard]
PII redaction is a complex problem. Basic regex and keyword matching will not catch all PII, especially if it's disguised or in an unexpected format. Always consider the level of risk and the requirements for your application.
:::

:::tip[Anonymize User IDs]
If you log user IDs, ensure they are anonymized or hashed to prevent direct linkage to an individual. Never log raw user IDs that could be used to identify a person.
:::