---
title: "HTTP Basics for Local APIs"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["cli", "http", "api", "curl", "networking"]
last_reviewed: "2025-12-31"
---

# HTTP Basics for Local APIs

When you run a tool like Ollama or LM Studio, it starts a web server on your local machine. To communicate with it, you send it HTTP requests. This guide explains the basic anatomy of these requests.

:::info[It's All Just a Conversation]
Think of an HTTP request as a structured message you send to a server, and the response is the server's reply. Understanding the structure of this conversation is key to debugging and building on top of these local APIs.
:::

---

## The Anatomy of an API Request

Let's break down a typical `curl` command used to interact with a local LLM server.

```bash
curl -X POST "http://localhost:1234/v1/chat/completions" \
-H "Content-Type: application/json" \
-d '{
  "model": "local-model",
  "messages": [{"role": "user", "content": "Hi!"}]
}'
```

This command is sending an HTTP request with four main parts:

### 1. The Endpoint (URL)

The URL tells the client where to send the request.
`http://localhost:1234/v1/chat/completions`

-   **Scheme (`http://`)**: The protocol to use. For local services, this is almost always `http`.
-   **Hostname (`localhost`)**: A special name that always points to your own machine (its IP address is `127.0.0.1`).
-   **Port (`:1234`)**: The specific "door" on your machine where the server application is listening. LM Studio defaults to `1234`, while Ollama defaults to `11434`.
-   **Path (`/v1/chat/completions`)**: The specific "address" on the server that handles this type of request.

### 2. The Method

This defines the *action* you want to perform. In `curl`, this is set with the `-X` flag.

-   **`POST`**: Used to **send data** to a server to create a resource or, in our case, to ask a question and get a response. This is the most common method you'll use for LLM inference.
-   **`GET`**: Used to **retrieve data** from a server. You might use this to fetch a server's status or a list of available models.

### 3. The Headers

Headers provide metadata about the request. They are key-value pairs set with the `-H` flag in `curl`.

-   **`Content-Type: application/json`**: This is the most important header for our use case. It tells the server that the data we are sending in the request body is formatted as JSON. Without this, the server wouldn't know how to interpret the data.

### 4. The Body

The body contains the actual data payload you are sending to the server. For a `POST` request, this is specified with the `-d` flag in `curl`.

-   `'{"model": "local-model", ...}'`: This JSON object is the body of our request. It contains the prompt, model name, and other parameters the LLM needs to generate a response.

---

## The Anatomy of an API Response

When the server replies, its response also has a structure.

### 1. The Status Code

This is a three-digit number indicating the result of the request.
-   `200 OK`: Success! The request was received and processed correctly.
-   `404 Not Found`: The server couldn't find the requested URL. You might have a typo in the path.
-   `400 Bad Request`: The server couldn't understand your request. This often happens if your JSON is malformed.
-   `500 Internal Server Error`: Something went wrong on the server's end.

### 2. The Headers

Requests and responses both carry headers. The key one here is `Content-Type: application/json`, which tells the server/client how to parse the body.

### 3. The Body

For a successful request, this contains the payload from the server—in our case, the JSON object with the LLM's reply.

:::tip[Connecting Theory to Practice]
Look again at the [CLI Power Tools](./curl-jq-ripgrep.md) guide. You can now see exactly how `curl` assembles the HTTP request and how `jq` processes the **body** of the HTTP response. This client-server model is the foundation of almost all modern web and API development.
:::
