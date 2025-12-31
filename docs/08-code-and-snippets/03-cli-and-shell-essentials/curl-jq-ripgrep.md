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

This guide introduces three essential command-line interface (CLI) tools that, when combined, create a powerful workflow for interacting with APIs, processing data, and searching code.

:::info[The Holy Trinity of CLI Tools]
- **`curl`**: A tool for transferring data with URLs, most commonly used for making HTTP requests.
- **`jq`**: A lightweight and flexible command-line JSON processor. Think of it as `sed` or `awk` for JSON.
- **`ripgrep` (`rg`)**: A line-oriented search tool that recursively searches your current directory for a regex pattern, with a focus on speed.
:::

---

## Installation

On macOS, you can install all three using Homebrew. On other systems, use your respective package manager.

```bash
brew install curl jq ripgrep
```

---

## 1. `curl`: Making API Requests

`curl` is your go-to tool for testing any API endpoint directly from the terminal. Here's a basic example of hitting a local Ollama server.

```bash
# -X POST: Specifies the HTTP method
# -H: Sets a header
# -d: Sends the specified data in the request body
curl -X POST http://localhost:11434/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "phi3",
    "messages": [{"role": "user", "content": "Why is the sky blue?"}],
    "stream": false
  }'
```

The raw output will be a JSON object printed directly to your terminal.

---

## 2. `jq`: Processing JSON

The JSON output from `curl` is often large and hard to read. `jq` lets you parse, filter, and extract the exact information you need.

Let's pipe the output from the previous `curl` command into `jq` to extract just the assistant's message content.

```bash
# The pipe symbol | sends the output of curl to the input of jq
# The jq filter '.message.content' navigates the JSON object
curl -s -X POST http://localhost:11434/api/chat -d '{...}' | \
  jq '.message.content'
```
*(Note: `curl -s` is used for "silent mode" to hide the progress meter)*

**Output:**
```json
"The sky appears blue because of a phenomenon called Rayleigh scattering..."
```
`jq` can do much more, including filtering arrays, creating new objects, and performing calculations.

---

## 3. `ripgrep` (`rg`): Searching Code

`ripgrep` is an incredibly fast and intuitive tool for searching files. It respects your `.gitignore` rules by default and provides human-readable output.

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