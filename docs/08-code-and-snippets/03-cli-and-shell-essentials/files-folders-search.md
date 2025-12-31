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

## Navigating and Inspecting Directories

-   **`pwd` (Print Working Directory)**: Shows you the absolute path of the directory you are currently in.
    ```bash
    pwd
    # /Users/shaily/Code/my-project
    ```
-   **`ls` (List)**: Lists the contents of a directory.
    ```bash
    ls -la
    # -l: long format (shows permissions, owner, size, date)
    # -a: all files (includes hidden files like .gitignore)
    ```
-   **`cd` (Change Directory)**: Moves you to another directory.
    ```bash
    cd docs/08-code-and-snippets # Move to a specific directory
    cd ..                        # Move up one level
    cd ~                         # Move to your home directory
    cd -                         # Move to the previous directory you were in
    ```

---

## Creating and Managing Files & Folders

-   **`mkdir` (Make Directory)**: Creates a new directory.
    ```bash
    mkdir my-new-folder
    mkdir -p path/to/nested/folder # -p creates parent directories if they don't exist
    ```
-   **`touch`**: Creates a new, empty file.
    ```bash
    touch new_file.md
    ```
-   **`cp` (Copy)**: Copies a file or directory.
    ```bash
    cp source.txt destination.txt
    cp -r source_directory/ destination_directory/ # -r for recursive copy (for directories)
    ```
-   **`mv` (Move)**: Moves or renames a file or directory.
    ```bash
    mv old_name.txt new_name.txt # Rename
    mv my_file.txt ../other_folder/ # Move
    ```
-   **`rm` (Remove)**: Deletes files or directories.

    :::danger[Be Careful with `rm`]
    The `rm` command is permanent and does not have a "trash bin". Be especially careful with the `-r` (recursive) and `-f` (force) flags.

    ```bash
    rm my_file.txt # Remove a file
    rm -i my_other_file.txt # -i prompts for confirmation
    
    # Use with caution: recursively and forcefully removes a directory and all its contents
    rm -rf my_folder/
    ```
    :::

---

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