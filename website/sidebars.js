/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    {
      type: 'category',
      label: 'Generative AI & Large Language Models', // Top-level overview
      collapsed: false,
      link: {
        type: 'doc',
        id: '00-introduction/what-is-genai-llm', // New conceptual file
      },
      items: [
        '00-introduction/what-is-genai-llm', // New conceptual file
        '00-introduction/who-this-is-for',
        '00-introduction/how-to-use-this-repo',
        '00-introduction/genai-llm-map', // New conceptual file
        '00-introduction/glossary',
        '00-introduction/style-guide',
        '00-introduction/scope-and-applicability',
        '00-introduction/prerequisites-and-entry-criteria',
        '00-introduction/standard-core',
      ],
    },
    {
      type: 'category',
      label: 'Natural Language Processing',
      collapsed: true,
      link: {
        type: 'doc',
        id: '01-natural-language-processing/introduction-to-nlp', // Placeholder
      },
      items: [
        '01-natural-language-processing/introduction-to-nlp',
        '01-natural-language-processing/applications-of-nlp',
        '01-natural-language-processing/nlp-pipeline',
        '01-natural-language-processing/word-embeddings',
        '01-natural-language-processing/properties-and-visualisation-of-word-embedding',
        '01-natural-language-processing/embedding-matrix',
        '01-natural-language-processing/embedding-classification-demo',
      ],
    },
    {
      type: 'category',
      label: 'Sequential Data, RNNs, Encoder-Decoder',
      collapsed: true,
      link: {
        type: 'doc',
        id: '02-sequential-models/introduction-to-sequential-data-and-rnn', // Placeholder
      },
      items: [
        '02-sequential-models/introduction-to-sequential-data-and-rnn',
        '02-sequential-models/types-of-rnn-cardinality',
        '02-sequential-models/training-rnns-bptt',
        '02-sequential-models/types-of-rnns',
        '02-sequential-models/encoder-decoder-model',
        '02-sequential-models/beam-search-and-bleu-evaluation-matrices',
      ],
    },
    {
      type: 'category',
      label: 'Attention Mechanism & Transformers',
      collapsed: true,
      link: {
        type: 'doc',
        id: '03-attention-and-transformers/attention-mechanism', // Placeholder
      },
      items: [
        '03-attention-and-transformers/attention-mechanism',
        '03-attention-and-transformers/transformer-model-architecture',
        '03-attention-and-transformers/embeddings-from-language-model',
        '03-attention-and-transformers/universal-language-model-finetuning-for-text-classification',
        '03-attention-and-transformers/generative-pre-training-model-architecture',
        '03-attention-and-transformers/sub-word-tokenization-bpe-wordpiece',
        '03-attention-and-transformers/bert-model-architecture',
      ],
    },
    {
      type: 'category',
      label: 'Introduction to Generative AI',
      collapsed: true,
      link: {
        type: 'doc',
        id: '04-generative-ai-introduction/introduction', // Placeholder
      },
      items: [
        '04-generative-ai-introduction/introduction',
        '04-generative-ai-introduction/why-is-so-prominent',
        '04-generative-ai-introduction/ani-vs-agi',
        '04-generative-ai-introduction/ai-ml-dl-genai',
        '04-generative-ai-introduction/discriminative-vs-generative',
        '04-generative-ai-introduction/core-principle-representation-learning',
        '04-generative-ai-introduction/applications-case-studies',
      ],
    },
    {
      type: 'category',
      label: 'Introduction to Large Language Models',
      collapsed: true,
      link: {
        type: 'doc',
        id: '05-large-language-models-deep-dive/00-index', // Existing file, but content needs update
      },
      items: [
        '05-large-language-models-deep-dive/00-index', // Existing
        '05-large-language-models-deep-dive/01-what-are-llms', // Existing
        '05-large-language-models-deep-dive/transformer-architecture', // Placeholder
        '05-large-language-models-deep-dive/why-transformer-models-trending', // Placeholder
        '05-large-language-models-deep-dive/gpt-decoder-only-models', // Placeholder
        '05-large-language-models-deep-dive/list-of-foundation-models', // Placeholder
        '05-large-language-models-deep-dive/llm-characteristics', // Placeholder
        '05-large-language-models-deep-dive/emergent-abilities', // Placeholder
        '05-large-language-models-deep-dive/openai-playground', // Placeholder
        '05-large-language-models-deep-dive/parameters', // Placeholder
        '05-large-language-models-deep-dive/06-context-windows-and-tokens', // Existing
        '05-large-language-models-deep-dive/parameter-top-k-vs-top-p-sampling', // Placeholder
        '05-large-language-models-deep-dive/temperature', // Placeholder
        '05-large-language-models-deep-dive/copilots', // Placeholder (can link to cli-agents later)
      ],
    },
    {
      type: 'category',
      label: 'Generative AI Project Lifecycle',
      collapsed: true,
      link: {
        type: 'doc',
        id: '06-genai-project-lifecycle-and-method/01-overview', // Existing
      },
      items: [
        '06-genai-project-lifecycle-and-method/01-overview', // Existing
        '06-genai-project-lifecycle-and-method/02-ideation-and-use-case', // Existing
        '06-genai-project-lifecycle-and-method/03-model-selection', // Existing
        '06-genai-project-lifecycle-and-method/cheat-sheet', // Placeholder
        '06-genai-project-lifecycle-and-method/prompt-engineering', // Existing (was 04-prompt-engineering)
        '06-genai-project-lifecycle-and-method/instruction-tuning', // Placeholder
        '06-genai-project-lifecycle-and-method/fine-tuning', // Placeholder
        '06-genai-project-lifecycle-and-method/05-rag', // Existing
        '06-genai-project-lifecycle-and-method/peft', // Placeholder
        '06-genai-project-lifecycle-and-method/cost-intuition', // Placeholder
        '06-genai-project-lifecycle-and-method/07-tool-use-and-agents', // Existing
        '06-genai-project-lifecycle-and-method/evaluation', // Placeholder (can link to 08-evaluation)
        '06-genai-project-lifecycle-and-method/risks-production-challenges', // Placeholder (can link to 07-guardrails-and-governance)
        '06-genai-project-lifecycle-and-method/testing-tools', // Placeholder (can link to 08-evaluation)
      ],
    },
    {
      type: 'category',
      label: 'Responsible AI',
      collapsed: true,
      link: {
        type: 'doc',
        id: '07-responsible-ai-and-governance/01-accountability-and-delegation', // Existing
      },
      items: [
        '07-responsible-ai-and-governance/bias', // Placeholder
        '07-responsible-ai-and-governance/02-hallucinations', // Existing
        '07-responsible-ai-and-governance/ethical-ai', // Placeholder
        '07-responsible-ai-and-governance/environmental-ai', // Placeholder
        '07-responsible-ai-and-governance/explainable-ai', // Placeholder
        '07-responsible-ai-and-governance/01-security-privacy', // Existing (moved from guardrails)
        '07-responsible-ai-and-governance/02-licensing-and-copyright', // Existing (moved from guardrails)
        '07-responsible-ai-and-governance/04-dependency-risk', // Existing (moved from guardrails)
        '07-responsible-ai-and-governance/06-red-team-cases', // Existing (moved from guardrails)
        '07-responsible-ai-and-governance/accountability-model', // Existing (moved from guardrails)
        '07-responsible-ai-and-governance/data-boundaries', // Existing (moved from guardrails)
        '07-responsible-ai-and-governance/guardrails-index', // Existing (moved from guardrails)
        '07-responsible-ai-and-governance/threat-model-lite', // Existing (moved from guardrails)
      ],
    },
    {
      type: 'category',
      label: 'Execution Patterns',
      collapsed: true,
      items: [
        {
          type: 'autogenerated',
          dirName: '04-execution-patterns',
        },
      ],
    },
    {
      type: 'category',
      label: 'Professional Scenarios', // Re-evaluate placement
      collapsed: true,
      items: [
        {
          type: 'autogenerated',
          dirName: '05-professional-scenarios',
        },
      ],
    },
    {
      type: 'category',
      label: 'Tooling & Frameworks',
      collapsed: true,
      items: [
        {
          type: 'autogenerated',
          dirName: '06-frameworks-and-tooling',
        },
      ],
    },
    {
      type: 'category',
      label: 'Templates',
      collapsed: true,
      items: [
        {
          type: 'autogenerated',
          dirName: '09-templates',
        },
      ],
    },
    {
      type: 'doc',
      id: 'AGENTS',
      label: 'CLI Agents (General)', // Renaming to be more descriptive
    },
    {
      type: 'doc',
      id: 'CHANGELOG',
      label: 'Changelog',
    },
    {
      type: 'doc',
      id: 'LICENSE',
      label: 'License',
    },
  ],
};

module.exports = sidebars;