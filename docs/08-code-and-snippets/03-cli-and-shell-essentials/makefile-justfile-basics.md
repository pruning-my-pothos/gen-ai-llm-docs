---
title: "Task Runners: Makefile & Justfile Basics"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["cli", "shell", "makefile", "justfile", "automation"]
last_reviewed: "2025-12-31"
---

# Task Runners: `Makefile` & `Justfile` Basics

As a project grows, you'll find yourself repeatedly typing the same complex commands. Task runners like `make` and `just` let you create simple, memorable shortcuts for these common tasks.

:::info[What is a Task Runner?]
A task runner is a tool that runs a predefined set of commands (a "recipe") when you give it a short name (a "target"). Instead of remembering `python3 -m venv .venv && source .venv/bin/activate`, you can just type `make install` or `just setup`.
:::

---

## `make` and `Makefile`

`make` is a classic build automation tool that is pre-installed on nearly all Linux and macOS systems. While powerful, it can be used as a very simple task runner by creating a file named `Makefile` in your project root.

### Example `Makefile`

A `Makefile` consists of `targets` (the names of your commands) followed by the shell commands to be executed.

**Important**: The command lines **must** be indented with a Tab character, not spaces.

```makefile
# Makefile - remember to use tabs for indentation!

.PHONY: install setup run clean

# Target to set up the Python virtual environment and install dependencies
install:
	python3 -m venv .venv
	@echo "Virtual environment created. Activate with 'source .venv/bin/activate'"

# Target to install dependencies using uv
setup:
	uv pip install -r requirements.txt
	@echo "Dependencies installed."

# Target to run a local development server
run:
	uvicorn main:app --reload

# Target to clean up python cache files
clean:
	find . -type f -name '*.pyc' -delete
	find . -type d -name '__pycache__' -delete
```

### Usage

You run a target by typing `make` followed by the target name.

```bash
# Create the venv
make install

# Install packages
make setup

# Run the server
make run
```

---

## `just` and `justfile`

`just` is a modern command runner designed specifically for this purpose. It has a simpler syntax, better error messages, and is not sensitive to tabs vs. spaces.

### Installation

```bash
# macOS
brew install just

# Windows
scoop install just

# From source (if you have Rust)
cargo install just
```

### Example `justfile`

Create a file named `justfile` or `Justfile` in your project root.

```justfile
# justfile - a modern command runner

# Create the python virtual environment
install:
    python3 -m venv .venv
    @echo "Virtual environment created. Activate with 'source .venv/bin/activate'"

# Install dependencies from requirements.txt
setup:
    uv pip install -r requirements.txt
    @echo "Dependencies installed."

# Run the development server
run:
    uvicorn main:app --reload

# Clean up python cache files
clean:
    find . -type f -name '*.pyc' -delete
    find . -type d -name '__pycache__' -delete

# You can also list available commands
list:
    @just --list
```

### Usage

The usage is very similar to `make`.

```bash
just setup
just run
just list
```

---

:::tip[`make` vs. `just`: Which to Choose?]
-   **Use `make`** if you need a zero-dependency solution, as it's almost universally available on Unix-like systems. Its syntax is quirky (the Tab requirement is a common pain point), but it gets the job done.
-   **Use `just`** for new projects where you can choose your tooling. Its syntax is cleaner, it provides better error messages, and it's explicitly designed to be a command runner, making it a more pleasant tool to work with.
:::