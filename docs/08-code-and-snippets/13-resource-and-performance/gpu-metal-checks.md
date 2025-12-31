---
title: "GPU and Metal Hardware Checks"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["performance", "gpu", "metal", "hardware", "setup"]
last_reviewed: "2025-12-31"
---

# GPU and Metal Hardware Checks

Harnessing the power of GPUs (Graphics Processing Units) or Apple Silicon's Metal framework is crucial for accelerating Large Language Model (LLM) inference. Without proper hardware acceleration, running LLMs locally can be extremely slow. This guide provides commands to verify your hardware setup and ensure your LLM tools are utilizing it.

:::info[The Goal: Maximize Inference Speed]
The objective is to confirm that your system's dedicated hardware (GPU or Apple Silicon's Neural Engine via Metal) is detected and configured correctly to provide the fastest possible LLM inference.
:::

---

## 1. NVIDIA GPUs (Windows/Linux)

NVIDIA GPUs are the most common choice for accelerating LLM inference.

### Check GPU Status: `nvidia-smi`

The `nvidia-smi` command-line utility provides real-time information about your NVIDIA GPUs.

```bash
nvidia-smi
```

**Expected Output**:
You should see a table showing:
-   **Driver Version**: Make sure it's up to date.
-   **CUDA Version**: Indicates CUDA support.
-   **GPU Name**: e.g., `NVIDIA GeForce RTX 4090`.
-   **Memory Usage**: `Volatile GPU-Util` (usage percentage) and `Memory-Usage` (used / total VRAM). When running an LLM, you should see this increase.

**Troubleshooting**: If `nvidia-smi` is not found or shows no GPUs, ensure your NVIDIA drivers are installed correctly and up to date.

---

## 2. Apple Silicon (M1/M2/M3 Macs)

Apple Silicon Macs use their integrated Neural Engine (via the Metal framework) for accelerating LLM workloads.

### Check Activity Monitor

-   Open **Activity Monitor** (you can search for it with Spotlight).
-   Go to the **GPU** tab.
-   When running an LLM (e.g., in Ollama or LM Studio), you should see activity on the "Neural Engine" or "GPU" graphs.

### Verify Metal Support (for Python frameworks)

Some Python-based LLM frameworks (e.g., PyTorch, MLX) can leverage Metal.

```python
import torch

if torch.backends.mps.is_available():
    print("PyTorch with MPS (Metal Performance Shaders) is available!")
    print(f"Current device: {torch.mps.current_device()}")
else:
    print("MPS is not available on this system.")
```

**Expected Output**:
`PyTorch with MPS (Metal Performance Shaders) is available!`

**Troubleshooting**: If MPS is not available, ensure you have PyTorch installed with Metal support (e.g., `pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/mps`) and your macOS version is compatible.

---

## 3. Ollama (All Platforms)

Ollama automatically detects and utilizes supported hardware accelerators (NVIDIA GPUs, Apple Silicon).

### Verify Ollama is Using Hardware

You can set an environment variable to force Ollama to report which backend it's using.

```bash
# For NVIDIA GPU (Linux/Windows)
OLLAMA_DEBUG=1 ollama run llama3:8b-instruct # Look for 'cuda' or 'gpu' in the logs

# For Apple Silicon (macOS)
OLLAMA_DEBUG=1 ollama run llama3:8b-instruct # Look for 'metal' or 'gpu' in the logs
```

**Expected Output**:
You should see log messages indicating that Ollama is loading the model onto a "GPU" or "Metal" device, e.g.: `INFO [gpu] DynamicLib::Open: found library cuda.dylib` or similar.

---

## 4. LM Studio (Windows/macOS)

LM Studio provides a GUI to manage hardware acceleration.

### Check Settings in UI

-   Open LM Studio.
-   Go to **Settings** (gear icon).
-   Look for **"Hardware Acceleration"** or **"GPU Acceleration"** options. Ensure your GPU (if detected) is selected and enabled.
-   When loading a model, you should see VRAM usage increase in your system's GPU monitor (`nvidia-smi` or Activity Monitor).

---

:::tip[Update Your Drivers]
Keeping your GPU drivers up to date is critical for performance and stability with LLM workloads. Check your GPU manufacturer's website regularly.
:::