---
title: "Node.js LLM Project Skeleton"
archetype: "template"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["project-skeleton", "nodejs", "typescript", "llm"]
last_reviewed: "2025-12-31"
---

# Node.js LLM Project Skeleton

This project skeleton provides a ready-to-use Node.js/TypeScript environment for quickly getting started with Large Language Models (LLMs), particularly those that support the OpenAI API specification (including local servers like Ollama or LM Studio). It includes essential configurations for development, building, and running your LLM applications.

:::info[The Goal: Rapid LLM Development Startup]
The objective is to provide a minimal, yet fully functional, boilerplate that streamlines the setup process, allowing you to focus immediately on your LLM application logic.
:::

---

## Included Files and Their Purpose

-   `src/index.ts`: The main TypeScript entry point, demonstrating a basic LLM chat completion call (including streaming).
-   `package.json`: Defines project metadata, scripts (`dev`, `build`, `start`, `lint`), and dependencies (`openai`, `dotenv`, `typescript`, `ts-node`, `eslint`).
-   `tsconfig.json`: TypeScript compiler configuration.
-   `.env.example`: An example file for managing environment variables (API keys, LLM endpoints) securely.
-   `.gitignore`: Standard exclusions for Node.js projects (e.g., `node_modules`, `dist`, `.env`).

---

## Getting Started

Follow these steps to set up and run your Node.js LLM project:

### 1. Prerequisites

-   **Node.js**: Version 18.0.0 or higher.
-   **Local LLM Server (Optional but Recommended)**:
    -   Install [Ollama](https://ollama.com/) and pull a model (e.g., `ollama pull llama3`).
    -   Or, install [LM Studio](https://lmstudio.ai/) and start a local server.
    -   *Related Guide: [OpenAI-Compatible Local LLM Servers](../../16-local-api-patterns/openai-compatible-servers.md)*

### 2. Clone or Copy the Skeleton

Copy the contents of this `project-skeleton-node` directory into your new project folder.

### 3. Install Dependencies

Navigate to your project folder in the terminal and install the required Node.js packages:

```bash
npm install # or pnpm install, yarn install
```

### 4. Configure Environment Variables

Create a `.env` file in the root of your project based on the `.env.example` file.

```ini
# .env (DO NOT COMMIT THIS TO GIT!)
# Replace with your actual API key if using OpenAI directly.
# For local servers, a dummy value like 'ollama' is often sufficient.
OPENAI_API_KEY="ollama" 

# Set this to your local LLM server endpoint.
# Ollama: http://localhost:11434/v1
# LM Studio: http://localhost:1234/v1
LOCAL_LLM_ENDPOINT="http://localhost:11434/v1" 
```
*Related Guide: [Secrets and Environment Variable Hygiene](../../15-safety-and-privacy/secrets-and-env-hygiene.md)*

### 5. Run the Application

You can run the application directly in development mode (TypeScript without explicit compilation) or build and run the compiled JavaScript.

```bash
# Development mode (with ts-node-esm)
npm run dev

# Build and run compiled JavaScript
npm run build
npm start
```

### 6. Linting

Check your TypeScript code for style and errors:

```bash
npm run lint
npm run lint:fix # To automatically fix fixable issues
```

---

:::tip[Adapt to Your Needs]
This skeleton provides a basic chat completion example. Extend `src/index.ts` to implement more complex LLM interactions, integrate with RAG, or build agents. Remember to adapt the `LOCAL_LLM_ENDPOINT` and model names in `.env` and `src/index.ts` as needed.
:::

:::warning[Security Considerations]
Always ensure that sensitive information like API keys is managed securely via environment variables and never committed to version control. If deploying to production, follow best practices for secret management.
:::
