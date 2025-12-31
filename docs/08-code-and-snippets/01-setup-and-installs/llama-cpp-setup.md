# llama.cpp Setup (summary)

Build/run the core engine locally if you need maximum control.

:::info[Why llama.cpp?]
Bare-metal control, performance, and flexibility for local inference.
:::

## Prereqs
- Build tools (gcc/clang), CMake.
- Python (optional) for bindings.

## Build (typical)
```bash
git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp
cmake -B build
cmake --build build -j
```

## Convert/download a model
- Follow llama.cpp docs to convert GGUF or download a GGUF directly.

## Run (example)
```bash
./build/bin/llama-cli -m /path/to/model.gguf -p "Say hello in one sentence."
```

## Notes
- Use smaller GGUF quantizations for local hardware.
- For server mode, see llama.cpp `--server` options (OpenAI-compatible endpoints).
