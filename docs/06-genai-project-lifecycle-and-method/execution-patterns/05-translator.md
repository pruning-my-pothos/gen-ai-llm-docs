---
title: "Pattern: The Translator"
archetype: "pattern"
status: "active"
owner: "Shailesh (Shaily)"
maintainer: "Shailesh (Shaily)"
version: "0.1.0"
tags: ["pattern", "translation", "migration", "polyglot"]
last_reviewed: "2025-12-28"
---

# Pattern: The Translator

:::info[Value Proposition]
Use this pattern to convert code, data, or schemas from one format to another with high fidelity. It treats translation as a structural mapping problem, not a creative writing task.
:::

## Overview

AI is excellent at translation (e.g., Python to Go, SQL to JSON), but it often hallucinates idiomatic differences or tries to translate line-by-line, resulting in non-idiomatic code.

**Goal**: Port logic and structure while respecting the destination language's idioms.
**Anti-pattern**: "Rewrite this in Rust." (Result: Pythonic Rust that fights the borrow checker).

---

## When to Use

| ✅ Use This Pattern When...             | 🚫 Do Not Use When...                     |
| :-------------------------------------- | :---------------------------------------- |
| Porting a class from Java to TypeScript | You don't know the target language at all |
| Converting SQL schemas to Pydantic/Zod  | The source code is buggy (fix it first)   |
| Migrating CI pipelines (Jenkins to GHA) | You want to refactor logic simultaneously |

---

## Prerequisites

:::warning[Before you start]
You must have a **Constraint Spec** for the _target_ language. If you don't define the target style, the AI will write "accented" code (e.g., Java-style Python).
:::

- **Input**: Source file(s).
- **Target**: Definition of the destination format/language.

---

## The Pattern (Step-by-Step)

### Step 1: Source Analysis (The "AST")

Don't translate yet. Ask the AI to describe the _structure_ and _intent_ of the source.

> "Analyze `User.java`. List the public methods, the state invariants, and any side effects. Do not generate code."

### Step 2: The Mapping Strategy

Ask the AI to map concepts from Source to Target.

> "We are porting this to TypeScript. How should we handle the Java `AbstractFactory` pattern in idiomatic TypeScript? Propose a mapping."

_Why? This catches 'False Friends'—concepts that look similar but behave differently._

### Step 3: The Translation

Execute the translation using the agreed mapping.

> "Generate the TypeScript code. Use the mapping from Step 2. Adhere to the Constraint Spec (Functional style, no classes)."

### Step 4: Parity Check

Ask the AI to verify its own work.

> "Compare the Java source and the TypeScript output. List any logic that was lost or changed."

```mermaid
flowchart LR
    Source[Source Code] --> Analyze[Analyze Logic]
    Analyze --> Map[Map Concepts]
    Map --> Target[Target Code]
    Target --> Verify{Parity Check}

    classDef step fill:#E6F7FF,stroke:#1B75BB,color:#0F1F2E;
    class Source,Analyze,Map,Target,Verify step;
```

---

## Example Scenario

-   **Context**: Migrating a raw SQL schema to Pydantic models.
-   **Input**: `CREATE TABLE users (id SERIAL PRIMARY KEY, metadata JSONB);`
-   **Mapping**: `SERIAL` -> `int`, `JSONB` -> `Dict[str, Any]`.
-   **Output**: `class User(BaseModel): id: int, metadata: Dict[str, Any]`

### Practical Example: Migrating SQL Schema to Pydantic

Let's illustrate the translation of a SQL `CREATE TABLE` statement into a Pydantic model.

**Step 1: Source Analysis (The "AST")**

Given the SQL schema for a `products` table:

```sql
CREATE TABLE products (
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**AI's Analysis (Internal thought process/response to a prompt like "Analyze `products` table schema"):**
-   **Table Name**: `products`
-   **Columns**:
    -   `product_id`: UUID, Primary Key, default generated UUID.
    -   `name`: VARCHAR(255), Not Null.
    -   `description`: TEXT, Nullable.
    -   `price`: NUMERIC(10, 2), Not Null.
    -   `is_available`: BOOLEAN, default TRUE.
    -   `created_at`: TIMESTAMP WITH TIME ZONE, default NOW().

**Step 2: The Mapping Strategy**

Prompt the AI:
> "Map the above PostgreSQL `products` table schema to a Pydantic V2 `BaseModel` for Python. Ensure UUIDs are `UUID` type, NUMERIC is `Decimal`, and timestamps are `datetime` with timezone awareness. Use `Field` for default values."

**AI's Proposed Mapping (Internal thought process/response):**
-   `UUID PRIMARY KEY DEFAULT gen_random_uuid()` -> `product_id: UUID = Field(default_factory=uuid4)`
-   `VARCHAR(255) NOT NULL` -> `str`
-   `TEXT` -> `Optional[str]`
-   `NUMERIC(10, 2) NOT NULL` -> `Decimal`
-   `BOOLEAN DEFAULT TRUE` -> `bool = Field(default=True)`
-   `TIMESTAMP WITH TIME ZONE DEFAULT NOW()` -> `datetime = Field(default_factory=lambda: datetime.now(timezone.utc))`

**Step 3: The Translation**

```python
from datetime import datetime, timezone
from decimal import Decimal
from typing import Optional
from uuid import UUID, uuid4

from pydantic import BaseModel, Field

class Product(BaseModel):
    product_id: UUID = Field(default_factory=uuid4)
    name: str
    description: Optional[str] = None # Pydantic handles Optional[str] and default None for nullable fields
    price: Decimal
    is_available: bool = Field(default=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Config:
        json_encoders = {
            UUID: str, # For JSON serialization
            datetime: lambda dt: dt.isoformat(),
            Decimal: float,
        }
        from_attributes = True # Pydantic V2: previously `orm_mode`
```

**Step 4: Parity Check**

A human review confirms the mapping correctly translates types and default behaviors, and an initial test ensures object creation and serialization work as expected.
For instance, a `Product(name="Test", price=10.99)` should automatically get a `product_id` and `created_at`.

---

## Common Pitfalls

| Pitfall                   | Impact                                            | Correction                                      |
| :------------------------ | :------------------------------------------------ | :---------------------------------------------- |
| **Line-by-Line Porting**  | Unidiomatic code (e.g., `for` loops in SQL).      | Ask for "Idiomatic translation," not "Rewrite". |
| **Library Hallucination** | Inventing a target library to match a source one. | Constraint: "Only use standard library."        |

:::danger[Critical Risk]
Regex and Date formats rarely translate 1:1. Always write unit tests for these specific edge cases in the new language.
:::

---

## Last Reviewed / Last Updated

- Last reviewed: 2025-12-28
- Version: 0.1.0