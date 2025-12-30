---
title: "Vue/Nuxt Local Dev Snippets"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["vue", "nuxt", "dev-setup", "template"]
last_reviewed: "2025-12-28"
---

## Vue/Nuxt Local Dev Snippets

:::info[Value Proposition]
Standardize Vue/Nuxt setup with install, lint, test, and build commands.
:::

### Install & Scripts (package.json excerpt)

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "lint": "eslint \"**/*.{ts,js,vue}\"",
    "test": "vitest run",
    "build": "nuxt build",
    "start": "nuxt start"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Dependency Install

```bash
npm install
npm install --save-dev eslint vitest @vitejs/plugin-vue
```

### Recommended Files

- `.nvmrc` (e.g., `18.19.0`)
- `.env.example` with non-secret placeholders
- `eslint` + `vitest` configs as needed

## Quick Links

- Local Dev Setup: [Template](/docs/06-templates/local-dev-setup-template)
- Code Change Request: [Template](/docs/06-templates/code-change-request-template)
- Test Request: [Template](/docs/06-templates/test-request-template)

## Next Step

Add these scripts to `package.json`, keep README in sync, and ensure CI runs lint + test + build.
