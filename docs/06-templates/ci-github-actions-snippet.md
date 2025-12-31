---
title: "CI GitHub Actions Snippet"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["ci", "github-actions", "template"]
last_reviewed: "2025-12-28"
---

:::info[Value Proposition]
Drop-in CI workflow to run install, lint, test, and build on pushes/PRs.
:::

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
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

- Save as `.github/workflows/ci.yml` and adjust commands for your stack (e.g., `pytest` or `pnpm`).
- For monorepos, add `working-directory` per package or matrix.
- Keep commands aligned with your README and local-dev scripts.

## Quick Links

- Local Dev Setup: [Template](/docs/06-templates/local-dev-setup-template)
- Code Change Request: [Template](/docs/06-templates/code-change-request-template)
- Test Request: [Template](/docs/06-templates/test-request-template)

## Next Step

Wire this CI to your branch protection rules; ensure lint/test/build must pass before merge.