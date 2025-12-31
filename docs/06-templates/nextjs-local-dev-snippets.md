---
title: "Next.js Local Dev Snippets"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["nextjs", "react", "dev-setup", "template"]
last_reviewed: "2025-12-28"
---

:::info[Value Proposition]
Standardize Next.js setup with install, lint, test, and build commands.
:::

### Install & Scripts (package.json excerpt)

```json
{
  "scripts": {
    "dev": "next dev",
    "lint": "next lint",
    "test": "jest --runInBand",
    "build": "next build",
    "start": "next start"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Dependency Install

```bash
npm install
npm install --save-dev eslint jest @types/jest ts-jest babel-jest
```

### Recommended Files

- `.nvmrc` (e.g., `18.19.0`)
- `.env.local.example` with non-secret placeholders
- `jest.config.js` (if using Jest) and `next.config.js` as needed

## Quick Links

- Local Dev Setup: [Template](/docs/06-templates/local-dev-setup-template)
- Code Change Request: [Template](/docs/06-templates/code-change-request-template)
- Test Request: [Template](/docs/06-templates/test-request-template)

## Next Step

Add these scripts to `package.json`, keep the README in sync, and ensure CI runs lint + test + build.