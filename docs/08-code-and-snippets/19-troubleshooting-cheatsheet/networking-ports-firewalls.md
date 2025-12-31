---
title: "Networking, Ports, and Firewalls for Local LLMs"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["troubleshooting", "networking", "firewall", "ports", "local-llm"]
last_reviewed: "2025-12-31"
---

# Networking, Ports, and Firewalls for Local LLMs

Local LLM servers (like Ollama or LM Studio) typically expose an API over a specific network port (e.g., `11434` or `1234`) on your machine. Connectivity issues often arise when this port is already in use by another application, or when your system's firewall blocks incoming connections. This guide helps you diagnose and resolve these common networking problems.

:::info[The Goal: Accessible Local Services]
The objective is to ensure your local LLM server is properly running, listening on its designated port, and accessible to your client applications, unhindered by conflicts or firewall rules.
:::

---

## The Problem: "Connection Refused" or "Host Unreachable"

These errors usually point to one of three issues:
1.  The LLM server is not actually running.
2.  The LLM server is running, but on a different port than your client expects.
3.  Another process is blocking the port, or a firewall is preventing connections.

---

## Troubleshooting Steps

### Step 1: Verify LLM Server Status

Ensure your LLM server application is actually running and initialized.

-   **Ollama**: Open your terminal and ensure `ollama serve` is running. You should see output indicating it's listening.
-   **LM Studio**: Open the LM Studio application. Go to the "Local Server" tab and ensure the server is toggled "ON" and has a model loaded.
-   **vLLM/TGI**: Verify the server process is active in your terminal.

### Step 2: Check if the Port is Actively Listening

Confirm that the LLM server is listening on its expected port.

-   **Ollama Default Port**: `11434`
-   **LM Studio Default Port**: `1234`
-   **vLLM/TGI Default Port**: `8000`

#### Linux/macOS

```bash
# Check if anything is listening on port 11434
sudo lsof -i :11434
# or
netstat -tulnp | grep 11434 # On Linux, requires root for process names
```
**Expected Output**: You should see the LLM server's process (e.g., `ollama`, `node`) listed.
**If nothing appears**: The server is not listening on that port, or not running.

#### Windows (Command Prompt/PowerShell)

```cmd
netstat -ano | findstr :11434
```
**Expected Output**: Look for a line with `LISTENING` next to your port. The last column shows the PID (Process ID). You can then use `tasklist | findstr <PID>` to identify the process.

**Fix**: If another process is listening, you can either terminate that process or, preferably, configure your LLM server to use a different, free port (if the server supports it).

### Step 3: Test Connectivity with `curl`

Use `curl` to directly test the LLM server. This isolates the problem from your client-side code.

```bash
# For Ollama
curl http://localhost:11434/v1/models

# For LM Studio
curl http://localhost:1234/v1/models
```
**Expected Output**: A JSON list of models available on the server.
**If "Connection refused"**: The server is not running or not listening on that port.
**If "Host unreachable" / timeout**: Network issue, possibly firewall.

### Step 4: Check Firewall Rules

Firewalls can silently block connections, even those originating from your own machine (localhost) if not configured correctly.

#### Windows Defender Firewall

-   **Temporarily Disable for Testing**: Go to `Windows Security > Firewall & network protection > Private network` and toggle "Microsoft Defender Firewall" to "Off". **Remember to turn it back on!**
-   **Create Inbound Rule**: For a permanent solution, add an "inbound rule" for the specific port (e.g., `11434`) or for the LLM server application.

#### macOS Firewall

-   **Temporarily Disable for Testing**: Go to `System Settings > Network > Firewall` and toggle it "Off". **Remember to turn it back on!**
-   **Allow specific applications**: Ensure your LLM server application is allowed in the firewall settings.

#### Linux (`ufw` - Uncomplicated Firewall)

```bash
# Check status
sudo ufw status

# Allow a specific port (e.g., Ollama's 11434)
sudo ufw allow 11434/tcp

# Reload firewall rules
sudo ufw reload
```

---

:::tip[Use `localhost` consistently]
Always use `localhost` (or `127.0.0.1`) when referring to services running on your own machine. Avoid using your external IP address unless explicitly required for external access.
:::

:::warning[Security Risk: Opening Ports]
Only open firewall ports that are absolutely necessary. Opening ports to the internet can expose your local LLM server to external attacks. If you need remote access, use secure methods like VPNs or reverse proxies.
:::