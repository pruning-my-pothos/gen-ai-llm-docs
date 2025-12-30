# 05 · Fine-tune / Adapters (Shailesh's Notes)

I want a lightweight adapter/LoRA pass to specialize a small open model for my domain. Keep it local and small; compare before/after on a tiny eval set.

## What I’m Building

- Goal: Train a small adapter on domain examples and see if answers improve on my eval set.
- Stack: Python, `peft` + `transformers` on a small base (e.g., 7B). Stay light.
- Why: Quick domain lift without full retraining.

## Setup (ELI12)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install torch transformers peft datasets
```

## Data: tiny instruction set

Create `train.jsonl`:
```
{"instruction": "What does Acme build?", "input": "", "output": "Acme builds developer tools for workflows."}
{"instruction": "Who manages Alice at Acme?", "input": "", "output": "Bob manages Alice at Acme."}
```

## Code (fine_tune.py) — minimal sketch

```python
from datasets import load_dataset
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments, Trainer
from peft import LoraConfig, get_peft_model

BASE = "HuggingFaceH4/zephyr-7b-beta"  # pick a small, permissive base

ds = load_dataset("json", data_files={"train": "train.jsonl"})["train"]

tok = AutoTokenizer.from_pretrained(BASE)
tok.pad_token = tok.eos_token

def fmt(example):
    prompt = f"Instruction: {example['instruction']}\n\n{example['input']}\nAnswer:"
    out = example["output"]
    tokens = tok(prompt, truncation=True)
    labels = tok(out, truncation=True)
    tokens["labels"] = labels["input_ids"]
    return tokens

ds = ds.map(fmt, remove_columns=ds.column_names)

model = AutoModelForCausalLM.from_pretrained(BASE)
lora = LoraConfig(r=8, lora_alpha=16, lora_dropout=0.05, bias="none", task_type="CAUSAL_LM")
model = get_peft_model(model, lora)

args = TrainingArguments(
    output_dir="out",
    per_device_train_batch_size=1,
    gradient_accumulation_steps=4,
    num_train_epochs=1,
    learning_rate=1e-4,
    logging_steps=1,
    save_steps=50,
)

trainer = Trainer(model=model, args=args, train_dataset=ds)
trainer.train()

model.save_pretrained("out/lora-adapter")
tok.save_pretrained("out/lora-adapter")
```

## Run It

```bash
python fine_tune.py
```

Expect a short run; this is a minimal demo. For real use, add validation splits and more data.

## Validation (quick)

- Re-run your eval set (from 04-evaluation) with and without the adapter. Did recall/answers improve?
- Check that the model still refuses when context is missing (safety).
- Keep an eye on overfitting; tiny data can memorize. Add more examples if it hallucinates.

## Options & Reasoning

- Base model: pick a small, permissive one so it fits local hardware.
- LoRA params: keep r/alpha modest for quick runs; tune if you need more capacity.
- Data: quality matters more than quantity here; 20–100 good examples beat noisy data.

## What I Learned Here

Adapters give a quick domain lift if you already fixed retrieval. Always compare pre/post on a small eval set to avoid chasing gains that aren’t real.
