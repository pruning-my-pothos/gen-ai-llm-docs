---
title: "CLI Power Tools: curl, jq, and ripgrep"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["cli", "shell", "curl", "jq", "ripgrep", "tools"]
last_reviewed: "2025-12-31"
---

# CLI Power Tools: `curl`, `jq`, and `ripgrep`

:::info[Why these three?]
`curl` talks to APIs, `jq` shapes JSON, `rg` finds things fast—core tools for any LLM/dev workflow.
:::

Short, runnable examples for API calls, JSON parsing, and fast search.

## Install
```bash
# macOS
brew install curl jq ripgrep
# Debian/Ubuntu
sudo apt-get install curl jq ripgrep
```

## curl (HTTP request)
```bash
curl -X POST http://localhost:11434/api/chat \
  -H "Content-Type: application/json" \
  -d '{"model":"phi3","messages":[{"role":"user","content":"Hello"}],"stream":false}'
```

## jq (pretty-print / field)
```bash
curl -s http://localhost:8000/info | jq        # pretty
curl -s http://localhost:8000/info | jq '.status'  # single field
```

## ripgrep (rg) code search
```bash
rg "apiKey" src/
rg "vector" -g'*.md'
```

Keep these three installed; they cover most CLI probing, JSON handling, and code search needs.

**Basic Search:**
Find all instances of the word "rebase" in the current directory.

```bash
rg rebase
```

**Search within a specific file type:**
Only search for "rebase" in Markdown files.

```bash
rg rebase -g "*.md"
```

**Search for files containing a term and pipe to another command:**
Find all files containing the word "Ollama" and open them in `less`.

```bash
rg -l ollama | xargs less
```
*(`-l` or `--files-with-matches` lists the files containing matches, not the matching lines)*.

---

## Combining `curl` and `jq`

Here’s a more practical example: hitting the LM Studio server and extracting the first choice's message.

```bash
# 1. Use curl to POST to the local server
# 2. Pipe the JSON output to jq
# 3. Use jq to navigate to the content of the first message in the 'choices' array

curl -s -X POST "http://localhost:1234/v1/chat/completions" \
-H "Content-Type: application/json" \
-d '{
  "model": "local-model",
  "messages": [{"role": "user", "content": "What are the three laws of robotics?"}],
  "temperature": 0.7
}' | jq '.choices[0].message.content'
```

This workflow is invaluable for testing LLM outputs, debugging API responses, and scripting interactions with local or remote services.
