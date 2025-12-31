---
title: "Regex Guards for LLM Output"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["validation", "regex", "guardrails", "python"]
last_reviewed: "2025-12-31"
---

# Regex Guards for LLM Output

While JSON Schema validation is powerful for structured data, sometimes you need simpler, lightweight checks for free-form text or specific patterns within it. Regular expressions (regex) can serve as effective "guards" to ensure LLM output adheres to basic formatting rules, contains required keywords, or avoids forbidden content.

:::info[The Goal: Pattern Compliance]
The objective is to quickly verify that an LLM's text output matches expected patterns or avoids undesirable ones, providing a quick sanity check without needing complex parsing.
:::

---

## Use Case 1: Enforcing Specific Keywords or Phrases

Ensure the LLM's output includes (or excludes) certain terms. This is useful for disclaimers, required calls to action, or safety checks.

```python
import re

def validate_keyword_presence(text: str, required_keyword: str) -> bool:
    """Checks if a required keyword is present in the text (case-insensitive)."""
    return bool(re.search(re.escape(required_keyword), text, re.IGNORECASE))

def validate_keyword_absence(text: str, forbidden_keyword: str) -> bool:
    """Checks if a forbidden keyword is absent from the text (case-insensitive)."""
    return not bool(re.search(re.escape(forbidden_keyword), text, re.IGNORECASE))

# --- Example Usage ---
llm_response = "Visit our website for more details! Terms and conditions apply."

print(f"Contains 'terms': {validate_keyword_presence(llm_response, 'Terms and conditions')}")
print(f"Does NOT contain 'secret': {validate_keyword_absence(llm_response, 'secret')}")
```

---

## Use Case 2: Validating Formats (e.g., Email, IDs)

Regex is excellent for validating if a string matches a specific format, such as email addresses, phone numbers, product IDs, or dates.

```python
import re

def validate_email_format(text: str) -> bool:
    """Checks if the text is a valid email address."""
    # A basic email regex. More robust patterns exist.
    email_pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return bool(re.fullmatch(email_pattern, text))

def extract_product_id(text: str) -> Optional[str]:
    """Extracts a specific product ID pattern (e.g., PROD-XXXX) from text."""
    id_pattern = r"PROD-\d{4}"
    match = re.search(id_pattern, text)
    return match.group(0) if match else None

# --- Example Usage ---
email_output = "my_email@example.com"
invalid_email_output = "not-an-email"
text_with_id = "Your order reference is PROD-8765. Thank you."

print(f"'{email_output}' is valid email: {validate_email_format(email_output)}")
print(f"'{invalid_email_output}' is valid email: {validate_email_format(invalid_email_output)}")
print(f"Extracted ID: {extract_product_id(text_with_id)}")
```

---

## Use Case 3: Preventing Unwanted Content

Beyond specific keywords, regex can be used to scan for patterns associated with harmful, offensive, or otherwise unwanted content.

```python
import re

def contains_profanity(text: str, profanity_list: List[str]) -> bool:
    """Checks if the text contains any word from a given profanity list."""
    # Build a regex pattern to match whole words from the list
    pattern = r"\b(" + "|".join(map(re.escape, profanity_list)) + r")\b"
    return bool(re.search(pattern, text, re.IGNORECASE))

# --- Example Usage ---
forbidden_words = ["damn", "hell", "crap"]
llm_chat_output = "This is a damn good idea!"
clean_chat_output = "This is a great idea!"

print(f"'{llm_chat_output}' contains profanity: {contains_profanity(llm_chat_output, forbidden_words)}")
print(f"'{clean_chat_output}' contains profanity: {contains_profanity(clean_chat_output, forbidden_words)}")
```

---

:::warning[Limitations of Regex Guards]
-   **Brittle**: LLM output can be creative. Small variations might bypass your regex.
-   **Limited Semantics**: Regex can't understand meaning or context, only patterns. It won't detect subtle nuances or cleverly disguised harmful content.
-   **Maintenance**: Large lists of patterns can be hard to manage.

For complex content moderation, consider using dedicated content safety APIs or smaller, fine-tuned LLMs.
:::

:::tip[Combine with Prompt Engineering]
Regex guards are most effective when combined with strong prompt engineering. Explicitly tell the LLM the desired format or content constraints in your system prompt to increase the likelihood it adheres to them, then use regex as a final verification step.
:::