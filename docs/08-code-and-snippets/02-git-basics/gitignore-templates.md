---
title: ".gitignore Templates"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["git", "gitignore", "template", "hygiene"]
last_reviewed: "2025-12-31"
---

# .gitignore Templates

A `.gitignore` file tells Git which files and directories to ignore in a project. This is critical for keeping your repository clean, small, and focused on source code.

:::info[Why is `.gitignore` so important?]
Without a `.gitignore` file, you risk committing large data files, model weights, environment variables with secrets, and editor-specific settings. This bloats the repository, compromises security, and creates noise for everyone working on the project.
:::

---

## Template 1: General Python Project

This is a solid foundation for any Python-based project. It ignores virtual environments, compiled files, environment variables, and common IDE metadata.

```gitignore
# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
pip-wheel-metadata/
share/python-wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# Virtual Environments
.venv/
venv/
env/
.env/

# Environment variables
.env
.env.*
!.env.example

# IDE / Editor Folders
.vscode/
.idea/
.project
.pydevproject
.settings/

# OS-specific
.DS_Store
Thumbs.db
```

---

## Template 2: GenAI & Machine Learning Project

This template builds on the Python one, adding ignores for files specific to data science, machine learning, and Generative AI workflows.

:::warning[Always Ignore Data and Models]
Your Git repository is for code, not data. Use a dedicated data store (like an S3 bucket or a local network drive) for large files.
:::

```gitignore
# Add this to your base Python .gitignore

# Datasets
*.csv
*.json
*.jsonl
*.parquet
*.db
*.sqlite3

# Model Files
*.gguf
*.safetensors
*.onnx
*.pt
*.pth
*.h5
*.joblib
*.pkl
*.model

# Notebooks
.ipynb_checkpoints/

# Caches and Logs
.cache/
logs/
wandb/
mlruns/

# Large files managed by Git LFS (if used)
*.bin

# Cloud provider credentials
.aws/
.gcp/
```

---

## Template 3: Node.js / Frontend Project

For projects that include a web interface (e.g., using React, Vue, or Svelte), use this template to ignore Node.js dependencies and build artifacts.

```gitignore
# Dependencies
node_modules/

# Build outputs
dist/
build/
.next/
.output/
.svelte-kit/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
!.env.example

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# OS-specific
.DS_Store
```

---

:::tip[I already committed a file I want to ignore!]
If you accidentally committed a file (like `.env`), you need to remove it from Git's history.

1.  Add the file path to your `.gitignore` file.
2.  Run the following command to remove the file from Git's tracking, but **not** from your local disk:
    ```bash
    git rm --cached path/to/your/file.env
    ```
3.  Commit the changes:
    ```bash
    git commit -m "chore: Stop tracking .env file"
    ```
The file is now ignored, and the old version is no longer in the latest commit's history.
:::