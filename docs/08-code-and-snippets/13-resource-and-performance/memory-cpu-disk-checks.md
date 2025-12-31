---
title: "Memory, CPU, and Disk Checks for LLMs"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["performance", "memory", "cpu", "disk", "resources"]
last_reviewed: "2025-12-31"
---

# Memory, CPU, and Disk Checks for LLMs

Running Large Language Models (LLMs) locally, especially larger ones, is highly resource-intensive. Monitoring your system's Random Access Memory (RAM), Central Processing Unit (CPU), and disk space is crucial for stability, performance, and preventing Out-Of-Memory (OOM) errors.

:::info[The Goal: Adequate Resources for Smooth Operation]
The objective is to ensure your system possesses the minimum required resources to load and run your chosen LLM efficiently, avoiding bottlenecks and crashes.
:::

---

## 1. Memory (RAM) Checks

RAM is often the most critical resource for LLMs. The entire model (or its significant portions, depending on the framework) needs to be loaded into RAM (or VRAM on GPU) to operate.

- **Relevance to LLMs**: Model size directly correlates with RAM/VRAM requirements. For example, a 7B parameter model quantized to 4-bit (`Q4_K_M`) still requires around 4-5 GB of RAM/VRAM.

### Linux

```bash
# Display total, used, and free memory in human-readable format
free -h

# Interactive process viewer, showing memory usage per process
htop
```

### macOS

```bash
# Activity Monitor (GUI): Navigate to the 'Memory' tab.
# Command Line:
top -l 1 | head -n 10 | grep PhysMem
# or
sysctl -n hw.memsize # Total RAM in bytes
```

### Windows

- **Task Manager (GUI)**: Open Task Manager (Ctrl+Shift+Esc), go to the 'Performance' tab, and select 'Memory'.

---

## 2. CPU Usage Checks

While GPUs/NPUs accelerate inference, the CPU is still involved in orchestration, preprocessing prompts, and post-processing responses. It becomes the primary inference device if no GPU is available or utilized.

### Linux/macOS

```bash
# Interactive process viewer, showing CPU usage per process
top
# or
htop
```

### Windows

- **Task Manager (GUI)**: Go to the 'Performance' tab and select 'CPU'.

---

## 3. Disk Space Checks

LLM files (the model weights themselves) can be very large (tens to hundreds of gigabytes). You need enough disk space to download and store them.

### Linux/macOS

```bash
# Display disk usage of mounted filesystems in human-readable format
df -h
```

### Windows

- **File Explorer (GUI)**: Right-click on your drive (e.g., C:), then select 'Properties' to see free space.

---

## 4. Programmatic Resource Check (Python)

The `psutil` library provides a cross-platform way to get system utilization information in Python.

### Installation

```bash
pip install psutil
```

### Code

```python
import psutil
import platform

def get_system_resources():
    """Returns a dictionary of current system resource usage."""
    mem = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    
    return {
        "platform": platform.system(),
        "cpu_count": psutil.cpu_count(logical=True),
        "cpu_percent": psutil.cpu_percent(interval=1), # % CPU usage over 1 second
        "total_ram_gb": round(mem.total / (1024**3), 2),
        "available_ram_gb": round(mem.available / (1024**3), 2),
        "used_ram_percent": mem.percent,
        "total_disk_gb": round(disk.total / (1024**3), 2),
        "free_disk_gb": round(disk.free / (1024**3), 2),
        "used_disk_percent": disk.percent
    }

# --- Example Usage ---
resources = get_system_resources()
print(json.dumps(resources, indent=2))

# Check for specific thresholds
if resources["available_ram_gb"] < 8: # e.g., require at least 8GB free RAM
    print("\nWARNING: Low available RAM. May struggle with larger models.")
if resources["free_disk_gb"] < 50: # e.g., require at least 50GB free disk
    print("\nWARNING: Low free disk space. Consider freeing up storage.")
```

---

:::tip[Monitor During Inference]
Continuously monitor your system resources (especially RAM/VRAM) while an LLM is running. This helps identify bottlenecks and determine if your hardware can comfortably handle the model. A sudden spike in CPU usage with low GPU utilization might indicate the LLM is running on CPU.
:::

:::warning[The Cost of Swapping]
If your system runs out of physical RAM and starts using "swap memory" (disk space used as temporary RAM), LLM performance will degrade drastically, becoming extremely slow. Ensure you have sufficient physical RAM for your chosen model. (See [OOM Debug Playbook](./oom-debug-playbook.md)).
:::