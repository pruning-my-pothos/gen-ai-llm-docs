---
title: "Ollama Modelfile Basics"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["models", "ollama", "modelfile", "customization"]
last_reviewed: "2025-12-31"
---

# Ollama `Modelfile` Basics

An Ollama `Modelfile` is a blueprint for creating and customizing local models. It allows you to package a base model with a specific system prompt, parameters, and prompt template, ensuring consistent behavior every time you use it.

:::info[A `Dockerfile` for your LLM]
Think of a `Modelfile` as a `Dockerfile` for your language model. You start `FROM` a base model, add your custom `SYSTEM` prompt and `PARAMETER` settings, and then build a new, self-contained custom model.
:::

---

## Core `Modelfile` Instructions

A `Modelfile` is a text file (named `Modelfile` with no extension) that uses a few key instructions:

-   `FROM`: **(Required)** Specifies the base model to use. This can be any model you've already pulled from the Ollama library.
-   `SYSTEM`: Sets the system prompt for the model. This is where you give the model its persona and high-level instructions.
-   `PARAMETER`: Configures the model's runtime parameters, such as `temperature`, `top_k`, `top_p`, and `stop` sequences.
-   `TEMPLATE`: Defines the full prompt template. This is an advanced feature for controlling exactly how your system prompt, user prompt, and chat history are assembled.

:::warning[The Importance of `TEMPLATE`]
If you use a custom `TEMPLATE`, you **must** ensure it matches the format the base model was trained with. For example, Llama 3 uses a very specific template. If you get this wrong, the model's performance will be severely degraded. For basic customization, it's often safer to just set a `SYSTEM` prompt and let Ollama handle the default template.
:::

---

## Example: Creating a Python Coding Sidekick

Let's create a custom model that is fine-tuned to be a helpful Python coding assistant.

1.  **Create the `Modelfile`**: Create a new file named `Modelfile` and add the following content.

    ```modelfile
    # Start from the Llama 3 8B instruction-tuned model
    FROM llama3:8b-instruct

    # Set the system prompt to define the persona and task
    SYSTEM """
    You are an expert Python programming assistant named 'Sidekick'.
    - Your responses must be concise, accurate, and directly address the user's question.
    - When providing code, always use Python.
    - Explain the code in a brief, easy-to-understand summary.
    - Only provide code and explanations; do not engage in conversation.
    """

    # Set parameters for more deterministic and focused code generation
    PARAMETER temperature 0.1
    PARAMETER top_k 20

    # Define a stop sequence to prevent the model from rambling
    PARAMETER stop "<|eot_id|>"
    ```

2.  **Build the Custom Model**: Use the `ollama create` command to build a new model named `py-sidekick` from your `Modelfile`.

    ```bash
    # -n: name for the new model
    # -f: path to the Modelfile
    ollama create -n py-sidekick -f Modelfile
    ```
    Ollama will process the file and create the new model.

3.  **Run Your Custom Model**: You can now use your model just like any other Ollama model.

    ```bash
    ollama run py-sidekick "Write a python function to calculate a factorial"
    ```

    The model will respond according to the persona and parameters you defined, giving you a focused and consistent coding assistant.

---

:::tip[Learn from Existing Models]
You can see the `Modelfile` for any model you've already pulled by using the `ollama show` command. This is a great way to learn how different models are configured.

```bash
ollama show llama3
```
:::
