---
title: "Python Local Dev Snippets"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["python", "dev-setup", "template"]
last_reviewed: "2025-12-28"
---

## Python Local Dev Snippets

:::info[Value Proposition]
Standardize Python project setup with a simple venv, install, and test flow.
:::

### Setup & Install

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### Tests (pytest)

```bash
pytest -q --disable-warnings --maxfail=1
```

### Lint/Format (optional)

```bash
pip install black flake8
black .
flake8 .
```

### Recommended Files

- `requirements.txt` (pin versions)
- `.env.example` with non-secret placeholders
- `Makefile` (optional) with targets: `install`, `lint`, `test`, `fmt`

## Quick Links

- Local Dev Setup: [Template](/docs/06-templates/local-dev-setup-template)
- Code Change Request: [Template](/docs/06-templates/code-change-request-template)
- Test Request: [Template](/docs/06-templates/test-request-template)

## Next Step

Add these commands to your project README or Makefile; keep them the single source of truth for setup, lint, and test.
