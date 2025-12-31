---
title: "Troubleshooting Cheatsheet"
archetype: "index"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["troubleshooting", "debugging", "errors", "fixes", "index"]
last_reviewed: "2025-12-31"
---

# Troubleshooting Cheatsheet

Developing with Large Language Models, especially in local environments, often presents unique technical challenges. This section provides a practical cheatsheet for diagnosing and resolving common issues, from connection failures and dependency conflicts to encoding problems and SSL errors.

:::info[Goal: Rapid Problem Solving]
The objective is to equip you with quick diagnostic steps and proven fixes for frequent roadblocks, enabling you to spend less time debugging and more time building your LLM applications.
:::

## Guides and Snippets

-   [**Common LLM Errors and Quick Fixes**](./common-errors-and-fixes.md): A comprehensive guide to common API connection errors, model loading failures, context window exceeded issues, and invalid JSON outputs, along with their solutions.

-   [**Dependency Hell Playbook for Python**](./dependency-hell-playbook.md): A structured approach to diagnose and resolve Python package conflicts, ensuring stable and isolated development environments.

-   [**Networking, Ports, and Firewalls for Local LLMs**](./networking-ports-firewalls.md): Troubleshoot connectivity issues with local LLM servers by checking port usage, configuring firewall rules, and verifying server status.

-   [**Encoding and Unicode Troubleshooting**](./encoding-and-unicode.md): Diagnose and fix subtle `UnicodeDecodeError`s and "mojibake" by understanding text encodings and applying Python solutions like `UTF-8` and `chardet`.

-   [**SSL/TLS and Certificates (Local Troubleshooting)**](./ssl-and-certs-local.md): Address `SSLError`s and `CERTIFICATE_VERIFY_FAILED` messages that arise in local development environments, particularly with self-signed certificates or corporate proxies.

:::tip[Systematic Debugging Approach]
When encountering an issue, start by checking the most obvious culprits: is the server running? Is the port correct? Then move to more specific areas like dependencies, encoding, or network configurations. Always check your logs!
:::