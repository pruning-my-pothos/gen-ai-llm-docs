# 03 · Knowledge Graph (Shailesh's Notes)

I’m building a lightweight Knowledge Graph from my docs, then querying it directly. Goal: capture entities/relations that RAG might miss and keep it all local/OSS.

## What I’m Building

- Goal: Extract entities/relations from text, store in a local graph (Neo4j or LiteGraph), and answer simple graph queries.
- Stack (local/OSS options):
  - Graph DB: Neo4j (community, local), or a lite Python graph (networkx) for demo.
  - Extraction: simple regex/heuristics to start; you can swap in an LLM later to parse triples.
- Why: Graph queries can give precise relational answers (e.g., “Who owns what?”) that RAG alone might fuzz.

## Setup (ELI12)

Python + networkx for a minimal demo (no DB install needed):

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install networkx
```

If you want Neo4j locally, install it separately and swap the storage layer.

## Data

Put a small text/markdown file in `data/` describing entities and relationships, e.g.:
```
Alice works at Acme.
Bob manages Alice at Acme.
Acme is a software company in Seattle.
```

## Code (kg_demo.py)

```python
import re
import networkx as nx
import glob, os

DATA_DIR = "data"

def load_sentences():
    sents = []
    for path in glob.glob(os.path.join(DATA_DIR, "**/*.*"), recursive=True):
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    sents.append(line)
    return sents

# Very naive extractor (demo). Swap with an LLM or spaCy for better NER/relations.
def extract_triplets(sentence: str):
    m = re.match(r\"(\\w+)\\s+(works at|manages)\\s+(\\w+)\", sentence, re.IGNORECASE)
    if m:
        subj, rel, obj = m.groups()
        return [(subj, rel.lower(), obj)]
    m = re.match(r\"(\\w+)\\s+is a\\s+(.+?)\\s+in\\s+(\\w+)\", sentence, re.IGNORECASE)
    if m:
        subj, attr, loc = m.groups()
        return [(subj, \"type\", attr.lower()), (subj, \"location\", loc)]
    return []

def build_graph():
    G = nx.MultiDiGraph()
    for sent in load_sentences():
        for (s, r, o) in extract_triplets(sent):
            G.add_node(s)
            G.add_node(o)
            G.add_edge(s, o, label=r, sentence=sent)
    return G

def query_who_works_at(G, company):
    results = []
    for u, v, data in G.edges(data=True):
        if data.get(\"label\") == \"works at\" and v.lower() == company.lower():
            results.append((u, v, data.get(\"sentence\")))
    return results

if __name__ == \"__main__\":
    G = build_graph()
    print(\"Employees at Acme:\")
    for who, _, sent in query_who_works_at(G, \"Acme\" or \"acme\"):
        print(f\"- {who} (from: {sent})\")
```

## Run It

```bash
python kg_demo.py
```

You should see extracted entities/relations and a simple query result.

## Validation (quick)

- Seed `data/` with a few sentences; confirm extracted edges look right.
- Try another relation (e.g., “owns”, “reports to”) by extending `extract_triplets`.
- If you want more accuracy, plug in spaCy or an LLM-based extractor to produce triples, then load them into the graph.

## Options & Reasoning

- Storage: start with networkx for zero setup; switch to Neo4j locally when you want Cypher queries and persistence.
- Extraction: the regex is a placeholder—replace with spaCy patterns or an LLM that outputs `(subject, relation, object)` triples, then load them into your graph.
- Hybrid: you can feed graph-derived facts into your RAG context later for hybrid answers.

## What I Learned Here

Graphs give crisp relational answers. Even a naive extractor plus a small graph helps spot where RAG alone might be fuzzy. Once extraction is reliable, querying with Cypher (Neo4j) or Gremlin becomes a powerful complement to text search.
