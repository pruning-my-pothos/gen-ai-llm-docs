---
title: "File, Folder, and Search Essentials"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["cli", "shell", "files", "search", "essentials"]
last_reviewed: "2025-12-31"
---

# File, Folder, and Search Essentials

This guide covers the fundamental shell commands for navigating and managing files and directories, and for finding what you're looking for. Mastering these is a prerequisite for effective command-line work.

:::info[The Building Blocks of CLI]
These commands are the "verbs" of your command-line environment. They allow you to move around, create and manage things, and inspect your surroundings.
:::

---

## Navigating and Inspecting

```bash
pwd             # where am I
ls -la          # list files (long, include hidden)
cd docs         # go into docs
cd ..           # up one level
cd -            # back to previous
```

## Create, copy, move, delete

```bash
mkdir -p notes/archive
touch notes/todo.md
cp notes/todo.md notes/todo-copy.md
mv notes/todo.md notes/inbox.md
rm notes/todo-copy.md          # delete file
rm -rf notes/archive           # delete folder (careful!)
```

## Viewing File Contents

-   **`cat` (Concatenate)**: Prints the entire content of a file to the screen. Best for small files.
    ```bash
    cat package.json
    ```
-   **`less`**: A pager that lets you view large files interactively. Use arrow keys to scroll; press `q` to quit.
    ```bash
    less very_large_log_file.log
    ```
-   **`head` / `tail`**: Show the first (`head`) or last (`tail`) 10 lines of a file.
    ```bash
    tail -n 20 error.log # Show the last 20 lines
    head -n 50 data.csv  # Show the first 50 lines
    ```

---

## Finding Files and Content

-   **`find`**: A powerful tool for finding files and directories based on criteria like name, type, or size.
    ```bash
    # Find all Python files in the current directory and subdirectories
    find . -type f -name "*.py"

    # Find all directories named 'src'
    find . -type d -name "src"
    ```
-   **`grep` (Global Regular Expression Print)**: Searches for a pattern within files.
    ```bash
    grep "import" my_script.py
    ```

:::tip[Use `ripgrep` (`rg`) for a better search experience]
While `grep` is classic, `ripgrep` (`rg`) is a modern, faster, and more user-friendly alternative that automatically respects your `.gitignore` file.

```bash
# This is often faster and provides nicer output than grep
rg "import"
```
See the [CLI Power Tools](./curl-jq-ripgrep.md) guide for more on `ripgrep`.
:::
