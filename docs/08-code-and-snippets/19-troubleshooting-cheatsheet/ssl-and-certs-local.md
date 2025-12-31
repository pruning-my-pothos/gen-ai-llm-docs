---
title: "SSL/TLS and Certificates (Local Troubleshooting)"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["troubleshooting", "ssl", "tls", "certificates", "networking"]
last_reviewed: "2025-12-31"
---

# SSL/TLS and Certificates (Local Troubleshooting)

When interacting with web services, especially LLM APIs, SSL/TLS (Secure Sockets Layer/Transport Layer Security) certificates are crucial for establishing secure, encrypted communication. In local development environments, you might encounter `SSLError`s or `CERTIFICATE_VERIFY_FAILED` issues, particularly when dealing with self-signed certificates or corporate proxies.

:::info[The Goal: Secure and Trusted Connections]
The objective is to understand common local SSL/TLS certificate errors and implement solutions that allow your client applications to securely connect to LLM APIs without compromising security best practices.
:::

---

## The Problem: Untrusted Connections

-   `SSLError: [SSL: CERTIFICATE_VERIFY_FAILED]`
-   "self-signed certificate in certificate chain"
-   "Local issuer certificate"

These errors mean your client application doesn't trust the certificate presented by the server, preventing a secure connection from being established.

---

## 1. What are SSL/TLS Certificates?

Certificates are digital documents that verify the identity of a server and establish an encrypted connection. They are issued by trusted Certificate Authorities (CAs). When your client connects to an HTTPS server, it checks if the server's certificate is valid and issued by a CA it trusts.

---

## 2. Common Causes of Local SSL Errors

-   **Self-Signed Certificates**: Local development servers, internal tools, or some local LLM APIs might use certificates that are not issued by a public CA. Your system doesn't trust these by default.
-   **Corporate Proxies/Firewalls**: Many corporate networks intercept HTTPS traffic (SSL inspection) for security purposes. They replace the original server's certificate with their own, self-signed certificate, which your client might not trust.
-   **Incorrect URL Scheme**: Attempting to connect to an `https://` endpoint when the local server only supports `http://` (non-encrypted).

---

## 3. Troubleshooting Steps & Fixes

### a. Verify the URL Scheme (HTTPS vs. HTTP)

Many local LLM servers run over plain `HTTP`, not `HTTPS`. Ensure your client's URL matches.

-   **Fix**: If your local server is `http://localhost:11434`, ensure your client's `base_url` is also `http://localhost:11434` and not `https://localhost:11434`.

### b. Temporarily Disable SSL Verification (USE WITH EXTREME CAUTION)

This is a **security risk** as it bypasses certificate validation entirely. Use this **ONLY for local development and debugging**, and **NEVER in production or with sensitive data**.

#### Python `requests`

```python
import requests

try:
    # This will suppress the InsecureRequestWarning
    requests.packages.urllib3.disable_warnings(requests.packages.urllib3.exceptions.InsecureRequestWarning)
    
    response = requests.get("https://untrusted-local-server.com/api", verify=False)
    print("Successfully connected (SSL verification disabled).")
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
```

#### `curl`

```bash
curl --insecure https://untrusted-local-server.com/api
# or
curl -k https://untrusted-local-server.com/api
```

### c. Trusting Specific Self-Signed Certificates

If you regularly interact with a local server using a self-signed certificate, the secure way is to add its certificate to your system's (or Python's) trusted certificate store.

-   **Python `requests` with a specific CA bundle**:
    ```python
    import requests

    # Assume 'local_server_cert.pem' is the PEM-encoded public certificate of your local server
    try:
        response = requests.get("https://your-local-server.com/api", verify='path/to/local_server_cert.pem')
        print("Successfully connected using custom CA bundle.")
    except requests.exceptions.RequestException as e:
        print(f"Request failed with custom CA: {e}")
    ```

-   **Finding Python's default CA bundle (via `certifi`)**:
    ```python
    import certifi
    print(certifi.where()) # This path points to the default CA bundle used by requests
    ```
    You might need to append your custom certificate to this bundle (though this is generally discouraged as it modifies a system-wide resource).

### d. Environment Variable for Requests

You can set the `REQUESTS_CA_BUNDLE` environment variable to point to a custom CA bundle that `requests` will use.

```bash
export REQUESTS_CA_BUNDLE=/path/to/my/custom/certs.pem
python your_script.py
```

---

:::tip[Local HTTP for Dev]
For purely local development where no sensitive data is involved, consider configuring your local LLM server and client to communicate over plain `HTTP` (if the server supports it) to avoid SSL issues entirely.
:::

:::warning[Security Best Practices]
Never compromise security in production environments. Always use properly issued, trusted SSL/TLS certificates for public-facing services. Only use `verify=False` or `--insecure` for isolated development/testing purposes.
:::