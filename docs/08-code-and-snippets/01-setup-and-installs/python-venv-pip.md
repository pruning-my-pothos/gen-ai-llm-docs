# Python venv with pip

Create an isolated environment and install common GenAI libs (local-friendly).

## Create & Activate

```bash
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install --upgrade pip
```

## Install common libs

Small, local-friendly stack:
```bash
pip install sentence-transformers chromadb langchain-text-splitters transformers
# Optional: faiss CPU build
pip install faiss-cpu
```

## Sanity check

```bash
python - <<'PY'
import sentence_transformers, chromadb
print("sentence-transformers:", sentence_transformers.__version__)
print("chromadb:", chromadb.__version__)
PY
```

You should see versions, not errors. Stay in the venv (`source .venv/bin/activate`) when running snippets.
