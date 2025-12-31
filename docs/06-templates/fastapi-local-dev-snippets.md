---
title: "FastAPI Local Dev Snippets"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["python", "fastapi", "dev-setup", "template"]
last_reviewed: "2025-12-28"
---

:::info[Value Proposition]
Bootstrap a FastAPI service quickly with install, lint, test, and run commands.
:::

### Setup & Install

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### Run & Dev

```bash
uvicorn app.main:app --reload --port 8000
```

### Tests (pytest)

```bash
pytest -q --disable-warnings --maxfail=1
```

### Lint/Format (optional)

```bash
pip install black flake8 mypy
black app
flake8 app
mypy app
```

### Recommended Files

- `requirements.txt` (pin versions, include fastapi, uvicorn[standard], pytest)
- `.env.example` with placeholders
- `Makefile` targets: `install`, `lint`, `test`, `run`

## Quick Links

- Local Dev Setup: [Template](/docs/06-templates/local-dev-setup-template)
- Test Request: [Template](/docs/06-templates/test-request-template)
- Prompt Safety Add-ons: [Template](/docs/06-templates/prompt-safety-addons)

## Next Step

Add these commands to your README/Makefile and ensure CI runs lint + tests before deploy.