# Documentation Restructure Plan

This document outlines the plan for restructuring the `docs` directory to align with the new content strategy.

## New Directory Structure

*   `docs/`
    *   `00-introduction/` (Previously `00-start-here`)
        *   Contains introductory materials about the project.
    *   `01-nlp-fundamentals/` (New Section)
        *   `01-introduction-to-nlp.md`
        *   `02-applications-of-nlp.md`
        *   `03-nlp-pipeline.md`
        *   `04-word-embeddings.md`
        *   `05-embedding-matrix-and-classification.md`
    *   `02-sequence-models/` (New Section)
        *   `01-sequential-data-and-rnns.md`
        *   `02-training-rnns.md`
        *   `03-encoder-decoder-models.md`
        *   `04-attention-mechanism.md`
    *   `03-transformer-models/` (New Section)
        *   `01-transformer-architecture.md`
        *   `02-sub-word-tokenization.md`
        *   `03-bert.md`
        *   `04-gpt.md`
    *   `04-introduction-to-genai/` (New Section)
        *   `01-what-is-genai.md`
        *   `02-discriminative-vs-generative.md`
        *   `03-applications-of-genai.md`
    *   `05-large-language-models/` (Previously `02-genai-llm-fundamentals`)
        *   `01-what-are-llms.md`
        *   `02-foundation-models.md`
        *   `03-llm-characteristics.md`
        *   `04-parameters-and-sampling.md`
        *   `05-temperature.md`
        *   `06-context-windows-and-tokens.md`
    *   `06-genai-project-lifecycle/` (Replaces `03-nnlp-method` and `04-execution-patterns`)
        *   `01-overview.md`
        *   `02-ideation-and-use-case.md`
        *   `03-model-selection.md`
        *   `04-prompt-engineering.md`
        *   `05-rag.md`
        *   `06-fine-tuning-and-peft.md`
        *   `07-tool-use-and-agents.md`
        *   `08-evaluation.md`
        *   `09-production-challenges.md`
    *   `07-responsible-ai/` (Previously `07-guardrails-and-governance`)
        *   `01-bias-and-fairness.md`
        *   `02-hallucinations.md`
        *   `03-ethical-ai.md`
        *   `04-explainable-ai.md`
        *   `05-security-and-privacy.md`
    *   `08-advanced-scenarios/` (Previously `05-professional-scenarios`)
    *   `09-templates/` (Existing)
    *   `10-tooling/` (Previously `06-frameworks-and-tooling`)

## Action Plan

1.  Create the new directories.
2.  Move existing files from the old structure to the new structure.
3.  Rename files as needed to fit the new naming convention.
4.  Delete old, now-empty directories and any redundant files.
5.  Create new placeholder files for the topics that don't have existing content.
6.  Update `website/sidebars.js` to reflect the new structure.
