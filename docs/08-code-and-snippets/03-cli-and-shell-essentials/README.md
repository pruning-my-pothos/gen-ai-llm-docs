---
title: "CLI & Shell Essentials"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["cli", "shell", "tools", "index"]
last_reviewed: "2025-12-31"
---

# CLI & Shell Essentials

The command-line interface (CLI) is a developer's most powerful tool. This section provides guides and snippets for the essential shell commands and utilities that form the bedrock of a productive development environment.

:::info[Goal: Command-Line Fluency]
The goal is to equip you with the tools and concepts needed to navigate, search, process data, and automate tasks directly from your terminal.
:::

---

## Core Skills and Guides

-   [**File, Folder, and Search Essentials**](./files-folders-search.md): The absolute starting point. Learn how to create, view, move, and delete files and directories, and how to find things using `find` and `grep`/`rg`.

-   [**CLI Power Tools: `curl`, `jq`, and `ripgrep`**](./curl-jq-ripgrep.md): Meet the "holy trinity" of modern CLI work. This guide shows you how to use `curl` for API requests, `jq` for processing JSON, and `ripgrep` (`rg`) for high-speed code search.

-   [**HTTP Basics for Local APIs**](./http-basics-for-local-apis.md): Understand what's actually happening when you use `curl` to talk to a local Ollama or LM Studio server. This guide demystifies the concepts of HTTP requests, responses, headers, and bodies.

-   [**Task Runners: `Makefile` & `Justfile` Basics**](./makefile-justfile-basics.md): Stop typing long commands. Learn how to use `make` or the more modern `just` to create simple, memorable shortcuts for your project's common tasks like `install`, `test`, or `run`.

-   [**Paths, `PATH`, and Environment Variables**](./paths-env-vars.md): (Coming soon) A guide to understanding how your shell finds programs (`$PATH`) and how to manage secrets and configuration with environment variables (`.env` files).

:::tip[The CLI is a Superpower]
Investing time in mastering these tools has a massive return. A fluent command-line user can debug, automate, and develop far more efficiently than one who relies solely on graphical interfaces.
:::