---
title: "Docker Compose Snippets"
archetype: "template"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["docker", "compose", "dev-setup", "template"]
last_reviewed: "2025-12-28"
---

:::info[Value Proposition]
Drop-in compose examples for local development: app + db + env placeholders.
:::

### Basic Web + DB

```yaml
version: "3.9"
services:
  app:
    build: .
    command: npm run dev
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: app
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
volumes:
  db_data:
```

### How to Use

- Save as `docker-compose.yml`; adjust ports, image, and command to your stack.
- Keep secrets out of compose; use `.env` for local non-secret placeholders.
- For tests, add a separate service/command or reuse the app container with a test command.

## Quick Links

- Local Dev Setup: [Template](/docs/06-templates/local-dev-setup-template)
- CI GitHub Actions: [Template](/docs/06-templates/ci-github-actions-snippet)
- Code Change Request: [Template](/docs/06-templates/code-change-request-template)

## Next Step

Wire compose into your README and CI (if needed) so contributors can run `docker compose up` to get a working stack locally.