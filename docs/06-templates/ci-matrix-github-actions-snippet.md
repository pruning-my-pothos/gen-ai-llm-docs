---
title: "CI Matrix GitHub Actions Snippet"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["ci", "github-actions", "matrix", "template"]
last_reviewed: "2025-12-28"
---

## CI Matrix GitHub Actions Snippet

:::info[Value Proposition]
Run lint/test/build across multiple Node versions (or OSes) with a single workflow.
:::

```yaml
name: CI Matrix

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        node: [18, 20]
    name: Node ${{ matrix.node }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
          cache: npm
      - name: Install
        run: npm install
      - name: Lint
        run: npm run lint
      - name: Test
        run: npm test -- --runInBand
      - name: Build
        run: npm run build
```

## How to Use

- Save as `.github/workflows/ci-matrix.yml`; adjust matrix (Node/OS) and commands for your stack.
- For Python, swap in `setup-python` and `pip install -r requirements.txt`, `pytest`.
- Keep commands aligned with your README and local scripts to avoid drift.

## Quick Links

- CI (single): [Template](/docs/06-templates/ci-github-actions-snippet)
- Local Dev Setup: [Template](/docs/06-templates/local-dev-setup-template)
- Code Change Request: [Template](/docs/06-templates/code-change-request-template)
- Test Request: [Template](/docs/06-templates/test-request-template)

## Next Step

Apply branch protection to require this workflow to pass before merges.
