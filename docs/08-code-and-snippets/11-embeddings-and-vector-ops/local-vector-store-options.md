---
title: "Local Vector Store Options"
---

# Local Vector Store Options

:::info[Goal]
Pick a local-first vector database for small RAG projects.
:::

- **Chroma**: Easiest Python-first option, good defaults, file-backed or server mode.
- **Qdrant**: Rust core, fast, great for re-ranking + metadata filters; offers local binary and Docker.
- **Weaviate (local)**: Feature-rich; heavier but solid filters and modules.
- **Lite options**: `sqlite+vec0`/`pgvector` for very small datasets inside existing DBs.

## Recommendations
- Prototype: start with **Chroma** (in-process) or **Qdrant** (Docker/local binary).
- Need filters and performance: **Qdrant**.
- Already on Postgres: try **pgvector** before adding new infra.
