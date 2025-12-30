# Ollama Setup (local models)

Run small models locally for demos and tests.

## Install

macOS:
```bash
brew install ollama/tap/ollama
ollama --version
```

Linux: see https://ollama.com/download for the install script, then:
```bash
ollama --version
```

## Pull a model

```bash
ollama pull mistral
```

## Quick chat

```bash
ollama run mistral "Write a 1-line safety reminder for RAG."
```

## List / stop

```bash
ollama list
ollama ps
```

Use small models for snippets; keep larger pulls optional to avoid long downloads.
