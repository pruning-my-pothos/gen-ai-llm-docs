---
sidebar_label: 'Fine-Tuning Walkthrough'
title: 'Fine-Tuning Walkthrough'
---

# Fine-Tuning Walkthrough

Fine-tuning is the process of taking a pre-trained Large Language Model and training it further on a smaller, domain-specific dataset. This adapts the model to excel at a particular task or to learn a specific style, tone, or knowledge base.

For a basic overview of related concepts, refer to the [Core Skills Introduction](/docs/01-handbook-method/core-skills) and the guide on [LLM Training and Datasets](/docs/foundations/02-llm-deep-dive/training-and-datasets).

## When to Fine-Tune vs. When to Use RAG

Fine-tuning and RAG are both powerful techniques, but they solve different problems.

-   **Use RAG** when your primary need is to **provide the model with external, up-to-date, or proprietary knowledge**. RAG is about augmenting the *input* to the model.
-   **Use Fine-Tuning** when your primary need is to **change the model's behavior, style, or to teach it a new, complex skill** that can't be easily described in a prompt. Fine-tuning is about changing the *weights* of the model itself.

| Scenario | Better Choice | Why? |
| :--- | :--- | :--- |
| Answering questions about today's company documents | **RAG** | The knowledge is external and changes frequently. |
| Making a chatbot adopt a specific persona (e.g., a sarcastic pirate) | **Fine-Tuning** | You are teaching the model a *style*, which is part of its core behavior. |
| Generating SQL queries based on your company's database schema | **Fine-Tuning** | This is a new, complex skill that requires the model to learn your specific schema. |
| Summarizing a provided legal document | **RAG (or just prompting)** | The knowledge is contained in the input; you just need the model to act on it. |

## The Fine-Tuning Process

### 1. Data Preparation

This is the most critical step. Your fine-tuning dataset must be a collection of high-quality examples of the behavior you want the model to learn. For instruction fine-tuning, this usually takes the form of a `prompt` and a `completion`.

**Example: A dataset for a support chatbot**
```json
[
  {
    "prompt": "How do I reset my password?",
    "completion": "You can reset your password by going to the 'Account' page and clicking 'Forgot Password'."
  },
  {
    "prompt": "What is your return policy?",
    "completion": "Our return policy allows for returns within 30 days of purchase, provided the item is in its original condition."
  }
]
```
The quality and diversity of your dataset will directly determine the quality of your fine-tuned model. You typically need at least a few hundred high-quality examples.

### 2. Choosing a Fine-Tuning Method

There are two primary approaches to fine-tuning, with vastly different resource requirements.

```mermaid
graph TD
    subgraph Full Fine-Tuning
        A(Base Model - 14GB) --> B{Training};
        C(Dataset) --> B;
        B --> D(New, Full Model - 14GB);
    end

    subgraph PEFT (LoRA)
        E(Base Model - 14GB) --> F{Training};
        G(Dataset) --> F;
        F --> H(New LoRA Adapter - 20MB);
    end

    style B fill:#cde4ff
    style F fill:#cde4ff
```

#### a) Full Fine-Tuning
In this approach, all the weights of the pre-trained model are updated during training.
- **Pros:** Can lead to the highest possible quality on the target task.
- **Cons:** Extremely computationally expensive. It requires a lot of memory (VRAM) and time, and it results in a full-sized new model for every task.

#### b) Parameter-Efficient Fine-Tuning (PEFT)
PEFT methods freeze the vast majority of the base model's parameters and only train a small number of new, added parameters. The most popular PEFT method is **LoRA (Low-Rank Adaptation)**.

LoRA involves adding small, "adapter" layers to the model and only training those. At inference time, these adapter weights can be merged with the base model weights.

- **Pros:**
    - **Drastically reduces compute requirements:** Can often be done on consumer-grade GPUs.
    - **Faster training:** Fewer weights to update means faster training.
    - **Portable results:** The output is a small file containing only the trained adapter weights, not a full copy of the model. You can have many LoRA adapters for one base model.
- **Cons:** May result in slightly lower quality than a full fine-tune for some very complex tasks, but it is often comparable.

### 3. Training
The fine-tuning process is then run on the prepared dataset using the chosen method. This involves selecting hyperparameters like the learning rate and the number of training epochs.

### 4. Evaluation
After training, the model must be rigorously evaluated to ensure it has learned the desired behavior without a decrease in safety alignment or performance on other tasks.

:::warning[Catastrophic Forgetting]
When you fine-tune a model on a very narrow task, you risk damaging its general capabilities. This is called "catastrophic forgetting." For example, if you fine-tune a model exclusively on generating JSON, it might become very bad at creative writing. It's important to have a broad evaluation set to ensure your fine-tuned model hasn't lost important skills.
:::

For most use cases, PEFT methods like LoRA offer the best balance of performance, cost, and efficiency.

## Next Steps

A fine-tuned model can be a powerful "brain" for an autonomous agent that needs to perform a specialized task.

- **[Building LLM Agents](./building-llm-agents.md):** Learn how to give your model tools and the ability to take action.
