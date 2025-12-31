# MLX Setup (Apple Silicon)

Run models using Apple’s MLX for M-series chips.

:::info[Why MLX?]
Apple Silicon–optimized inference with good performance on M-series Macs.
:::

## Install
```bash
pip install mlx-lm
```

## Run a model (example)
```bash
python -m mlx_lm.generate \
  --model mlx-community/Mistral-7B-Instruct-v0.2 \
  --prompt "Give one sentence on safe RAG."
```

## Notes
- MLX is optimized for Apple Silicon; performance is best on M-series Macs.
- Use smaller models/quantizations if you see slowdowns or OOM.
