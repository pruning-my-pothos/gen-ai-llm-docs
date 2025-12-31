---
title: "Local Dev Setup Template"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["dev-setup", "scripts", "tooling", "template"]
last_reviewed: "2025-12-28"
---

:::info[Value Proposition]
Copy/paste starter commands to get a project running quickly with install, lint, test, and build. Keep this alongside your code so new contributors can ramp fast.
:::

## Template (bash)

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Installing dependencies..."
npm install

echo "Linting..."
npm run lint || { echo "Lint failed"; exit 1; }

echo "Running tests..."
npm test || { echo "Tests failed"; exit 1; }

echo "Building site/app..."
npm run build

echo "Done. Serve locally with:"
echo "npm run start"
```

## How to Use

- Save as `scripts/local-dev-setup.sh` (or similar), mark executable (`chmod +x`).
- Adjust commands to your stack if needed (e.g., `yarn`, `pnpm`, `pytest`, `make test`).
- Keep it short; avoid environment-specific steps that break on fresh machines.

## Quick Links

- Tooling Index: [Docs](/docs/04-tooling-and-frameworks/00-tooling-index)
- CLI Agents: [Docs](/docs/04-tooling-and-frameworks/02-cli-agents)
- Testing Tools: [Handbook](/docs/01-handbook-method/testing-tools)
- Write Tests Pattern: [Execution Pattern](/docs/02-execution-patterns/07-write-tests)

## Next Step

Drop this script into your repo, then pair it with your project’s README and CI so contributors have one source of truth for setup and checks.