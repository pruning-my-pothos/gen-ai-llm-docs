---
title: "LLM API Configuration Example"
archetype: "template"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["configuration", "llm-api", "template", "yaml"]
last_reviewed: "2025-12-31"
slug: /08-code-and-snippets/config-examples/llm-api-config
---

# LLM API Configuration Example

This template provides a standardized way to define the configuration for various LLM API endpoints (local, cloud, custom). Using a configuration file separates environmental details from your code, making your application more flexible and portable.

:::info[The Goal: Flexible LLM Backend Selection]
The objective is to allow seamless switching between different LLM providers (e.g., OpenAI, Ollama, custom local models) and configurations (e.g., production vs. development endpoints, different model versions) without modifying application code.
:::

---

## Template: `llm_config.yaml`

```yaml
# llm_config.yaml

# --- Default LLM Configuration ---
default_llm:
  provider: "openai" # Options: "openai", "ollama", "lm_studio", "custom"
  model: "gpt-3.5-turbo"
  temperature: 0.7
  max_tokens: 500
  stream: true
  # Optional: seed for deterministic output (if supported by provider)
  seed: 42 

# --- Provider-Specific Configurations ---

openai_config:
  api_key_env_var: "OPENAI_API_KEY" # Environment variable to load API key from
  base_url: "https://api.openai.com/v1"
  # Optional: model_map to alias generic names to specific deployment names
  model_map:
    gpt-3.5-turbo: "gpt-3.5-turbo-1106"
    gpt-4: "gpt-4-0125-preview"

ollama_config:
  base_url: "http://localhost:11434/v1"
  model: "llama3" # Default model if not specified in default_llm
  # Optional: custom headers, e.g., for authentication if Ollama API is exposed externally

lm_studio_config:
  base_url: "http://localhost:1234/v1"
  model: "local-model" # LM Studio often uses a generic name like "local-model"
  # Optional: specific headers for LM Studio if needed

custom_llm_config:
  base_url: "http://my-custom-llm-service:8080/api/chat"
  model: "my-finetuned-model"
  api_key_env_var: "CUSTOM_LLM_API_KEY"
  # Add any other custom parameters your LLM expects

# --- Example Usage (Python conceptual) ---
# import yaml
# from openai import OpenAI # Assuming client is OpenAI-compatible

# with open("llm_config.yaml", 'r') as f:
#     config = yaml.safe_load(f)

# current_provider = config['default_llm']['provider']
# if current_provider == "ollama":
#     llm_settings = config['ollama_config']
# elif current_provider == "lm_studio":
#     llm_settings = config['lm_studio_config']
# # ... extend for other providers

# client = OpenAI(base_url=llm_settings['base_url'], api_key=os.getenv(llm_settings.get('api_key_env_var', '')))
# # Then use client.chat.completions.create(...) with config['default_llm']['model'] and other params
```

---

## How to Use

1.  **Save**: Save this content as `llm_config.yaml` (or similar name) in your project.
2.  **Customize**: Fill in `default_llm`, `openai_config`, `ollama_config`, etc., with your actual API keys (from environment variables) and preferred models.
3.  **Load in Code**: In your application code, load this YAML file using a library like `PyYAML` and use its values to configure your LLM client.
4.  **`secrets-and-env-hygiene.md`**: Remember to manage your API keys securely using environment variables, not directly in this file.

---

:::tip[Environment Overrides]
For different deployment environments (e.g., development, staging, production), consider having multiple config files (e.g., `llm_config_dev.yaml`, `llm_config_prod.yaml`) or using environment variables to override specific settings in a single config file.
:::

:::warning[Do Not Commit API Keys]
This configuration file should contain references to environment variables for API keys (e.g., `OPENAI_API_KEY`), not the keys themselves. Ensure your `llm_config.yaml` is never exposed publicly and that sensitive values are loaded securely at runtime.
:::
