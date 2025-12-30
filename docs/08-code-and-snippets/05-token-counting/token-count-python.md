# Token Count (Python)

Estimate prompt/context size to avoid overflows.

## Install
```bash
pip install transformers
```

## Code (count_tokens.py)
```python
from transformers import AutoTokenizer

text = "Paste your prompt or context here."
tok = AutoTokenizer.from_pretrained("gpt2")
ids = tok.encode(text)
print("Tokens:", len(ids))

limit = 2048
if len(ids) > limit:
    print("Too long: trim or summarize.")
```

## Run
```bash
python count_tokens.py
```

Use a tokenizer close to your target model for better estimates.***
