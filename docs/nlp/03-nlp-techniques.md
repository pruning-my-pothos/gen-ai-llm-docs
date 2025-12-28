---
title: "NLP Techniques & Approaches"
archetype: "foundation"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["nlp", "techniques", "models", "embeddings", "neural-networks", "transformers", "statistical"]
last_reviewed: "2025-12-28"
---

# NLP Techniques & Approaches

:::info[Purpose]
Provide an overview of the various methodologies and models employed in Natural Language Processing, from traditional statistical methods to modern deep learning architectures.
:::

## Evolution of NLP Approaches

The field of NLP has seen significant shifts in its dominant methodologies, moving from rule-based systems to statistical models, and more recently, to deep learning and neural network-based approaches.

## Traditional NLP Techniques

### 1. Rule-Based Systems

**What it is**: NLP systems built upon handcrafted rules, dictionaries, and patterns defined by linguists and domain experts.

**Characteristics**:
- **Pros**: Highly interpretable, can achieve high accuracy in narrow domains if rules are comprehensive.
- **Cons**: Difficult to scale, brittle to variations in language, time-consuming to build and maintain.

### 2. Statistical NLP

**What it is**: Uses mathematical and statistical models to learn patterns from large text corpora. Probability and inference play a key role.

**Key Concepts**:
- **N-gram Models**: Predict the next word based on the probability of previous `N-1` words.
- **Hidden Markov Models (HMMs)**: Used for sequence labeling tasks like Part-of-Speech tagging.
- **Support Vector Machines (SVMs)**, **Naive Bayes**: Popular for text classification.

**Characteristics**:
- **Pros**: More robust to variations than rule-based systems, can generalize better.
- **Cons**: Requires large labeled datasets, features often need manual engineering.

## Modern NLP: Neural Networks & Deep Learning

The advent of deep learning has revolutionized NLP, allowing models to learn complex features and representations directly from data.

### 1. Word Embeddings

**What it is**: Dense vector representations of words where words with similar meanings are located closer together in a continuous vector space.

**Conceptual Diagram**:
```mermaid
graph TD
    subgraph Vector Space
        A[king] --- B[man];
        A --- C[queen];
        C --- D[woman];
        B -- similar relationship --> D;
        A -- similar relationship --> C;
    end
    E[Word1] --> F(Vector [0.1, 0.5, ...]);
    G[Word2] --> H(Vector [0.2, 0.4, ...]);
```

**Key Models**:
- **Word2Vec (Mikolov et al., 2013)**: Learns word embeddings by predicting context words from a target word (Skip-gram) or vice-versa (CBOW).
- **GloVe (Pennington et al., 2014)**: Global Vectors for Word Representation, combining global matrix factorization and local context window methods.
- **FastText (Bojanowski et al., 2017)**: Learns embeddings for words and subword units (character n-grams), useful for rare words and morphology.

**Why it's important**: Overcomes the limitations of one-hot encoding by capturing semantic relationships between words.

**Why it's important**: Overcomes the limitations of one-hot encoding by capturing semantic relationships between words.

:::tip[Prerequisites]
The code example below utilizes the `gensim` library. If you don't have it installed, you can do so using pip:

```bash
pip install gensim
```
:::

**Code Example (Conceptual Word2Vec with Gensim)**:
```python
from gensim.models import Word2Vec
from nltk.tokenize import word_tokenize
import nltk

# Sample sentences
sentences = [
    "the quick brown fox jumps over the lazy dog",
    "never jump over the lazy dog again",
    "foxes are quick and cunning animals"
]

# Tokenize sentences
tokenized_sentences = [word_tokenize(s.lower()) for s in sentences]

# Train a Word2Vec model
# vector_size: Dimensionality of the word vectors.
# window: Maximum distance between the current and predicted word within a sentence.
# min_count: Ignores all words with total frequency lower than this.
model = Word2Vec(tokenized_sentences, vector_size=100, window=5, min_count=1, workers=4)

# Get the vector for a word
word_vector = model.wv['fox']
print(f"Vector for 'fox': {word_vector[:5]}...") # print first 5 elements

# Find most similar words
similar_words = model.wv.most_similar('quick')
print(f"Words similar to 'quick': {similar_words}")

# Calculate similarity between two words
similarity = model.wv.similarity('fox', 'dog')
print(f"Similarity between 'fox' and 'dog': {similarity}")
```

### 2. Recurrent Neural Networks (RNNs)

**What it is**: A class of neural networks designed to process sequential data, making them suitable for language where the order of words matters.

**Variations**:
- **Long Short-Term Memory (LSTM)**: Addresses the vanishing gradient problem of simple RNNs, allowing them to learn long-range dependencies.
- **Gated Recurrent Unit (GRU)**: A simplified version of LSTM with fewer parameters.

### 3. Convolutional Neural Networks (CNNs) for NLP

**What it is**: Primarily known for image processing, CNNs can also be applied to text to extract local features (e.g., n-gram features) by using convolutional filters.

**Use Cases**: Text classification, sentiment analysis.

### 4. Transformer Models

**What it is**: A novel architecture introduced by Vaswani et al. (2017) that relies entirely on "attention mechanisms" to draw global dependencies between input and output. It has become the dominant architecture in modern NLP.

**Conceptual Diagram (Simplified)**:
```mermaid
graph TD
    subgraph Encoder
        A[Input Embedding] --> B{Multi-Head Attention};
        B --> C{Feed Forward};
        C --> D[Encoder Output];
    end

    subgraph Decoder
        E[Output Embedding] --> F{Masked Multi-Head Attention};
        F --> G{Multi-Head Attention (Encoder-Decoder)};
        G --> H{Feed Forward};
        H --> I[Decoder Output];
    end

    D -- "K, V" --> G;
    I --> J[Output Probabilities];
```

**Key Features**:
- **Self-Attention**: Allows the model to weigh the importance of different words in the input sequence when processing each word.
- **Parallelization**: Unlike RNNs, transformers can process input sequences in parallel, leading to faster training.

**Prominent Models**:
- **BERT (Devlin et al., 2018)**: Bidirectional Encoder Representations from Transformers, pre-trained on masked language modeling and next sentence prediction.
- **GPT (Radford et al., 2018, 2019, 2020)**: Generative Pre-trained Transformer, pre-trained on a vast amount of text to generate human-like text.
- **T5 (Raffel et al., 2019)**: Text-to-Text Transfer Transformer, which frames all NLP tasks as a text-to-text problem.
- **LLaMA, Gemini, Claude, etc.** (Various labs): More recent, large-scale transformer models with billions of parameters, demonstrating advanced reasoning and generation capabilities.

**Why it's important**: Transformers have enabled state-of-the-art performance across nearly all NLP tasks due to their ability to capture long-range dependencies and massive scalability.
