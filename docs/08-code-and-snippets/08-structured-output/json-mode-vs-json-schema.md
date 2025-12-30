# JSON Mode vs JSON Schema (quick guide)

Keep outputs predictable and validate before use.

## JSON mode (prompt-only)

Prompt snippet:
```text
Return JSON only with keys: title (string), summary (string), sources (array of strings).
If unsure, set summary to "unsure" and sources to [].
```

Validate (Python):
```python
import json
resp = '{"title":"Safety","summary":"Use RAG","sources":["demo.txt"]}'
data = json.loads(resp)
required = {"title","summary","sources"}
if not required.issubset(data): raise ValueError("Missing keys")
if not isinstance(data["sources"], list): raise ValueError("sources must be a list")
print("Valid:", data)
```

## JSON Schema (stricter)

Schema example:
```json
{
  "type": "object",
  "required": ["title", "summary", "sources"],
  "properties": {
    "title": {"type": "string"},
    "summary": {"type": "string"},
    "sources": {"type": "array", "items": {"type": "string"}}
  }
}
```

You can instruct the model to follow this shape, then validate with `jsonschema` if needed.

## When to choose which

- JSON mode: lightweight, good for quick protos.
- JSON schema: when downstream consumers must rely on strict shapes.

Always validate before using model output.***
