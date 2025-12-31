# Sanity Checks

Quick commands to confirm your setup works.

:::info[Goal]
Verify installs quickly before debugging deeper.
:::

## Python libs
```bash
python - <<'PY'
import sentence_transformers, chromadb
print("sentence-transformers:", sentence_transformers.__version__)
print("chromadb:", chromadb.__version__)
PY
```

## Ollama running?
```bash
ollama list
```

## LM Studio server?
```bash
curl -s http://localhost:1234/v1/models || echo "Server not running"
```

If these return versions/models (no errors), your basic setup is good to go.
