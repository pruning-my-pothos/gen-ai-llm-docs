---
title: "Node/React Local Dev Snippets"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["node", "react", "dev-setup", "template"]
last_reviewed: "2025-12-28"
---

:::info[Value Proposition]
Copy/paste snippets to standardize Node/React project setup with installs, lint, test, and build commands.
:::

### Install & Scripts (package.json excerpt)

```json
{
  "scripts": {
    "dev": "npm run start",
    "lint": "eslint \"src/**/*.{ts,tsx,js,jsx}\"",
    "test": "jest --runInBand",
    "build": "npm run lint && npm run test && react-scripts build"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Dependency Install

```bash
npm install
npm install --save-dev eslint prettier jest @types/jest ts-jest
```

### Recommended Files

- `.nvmrc` with your Node version (e.g., `18.19.0`)
- `.env.example` with non-secret placeholders
- `README.md` with setup commands (copy from scripts above)

## Quick Links

- Local Dev Setup: [Template](/docs/06-templates/local-dev-setup-template)
- Code Change Request: [Template](/docs/06-templates/code-change-request-template)
- Test Request: [Template](/docs/06-templates/test-request-template)

## Next Step

Add these snippets to your project, commit `package.json` scripts, and document the commands in your README so contributors can run dev, lint, test, and build consistently.