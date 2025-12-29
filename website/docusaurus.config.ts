import type {Config} from '@docusaurus/types';
import type {Preset} from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'GenAI & LLM Documentation',
  tagline: 'Documentation for Generative AI and LLMs',
  favicon: 'img/favicon-genai.svg',
  url: 'https://pruning-my-pothos.github.io',
  baseUrl: '/gen-ai-llm-docs/',
  trailingSlash: false,
  organizationName: 'pruning-my-pothos',
  projectName: 'gen-ai-llm-docs',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  staticDirectories: ['static'],
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  presets: [
    [
      'classic',
      {
        docs: {
          path: '../docs',
          routeBasePath: '/docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: undefined,
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          numberPrefixParser: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    algolia: {
      // The application ID provided by Algolia
      appId: 'YOUR_APP_ID',

      // Public API key: it is safe to commit it
      apiKey: 'YOUR_SEARCH_API_KEY',

      indexName: 'YOUR_INDEX_NAME',

      // Optional: see docsearch options for more details
      contextualSearch: true,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    metadata: [
      {name: 'keywords', content: 'genai, llm, documentation, programming, development'},
    ],
    navbar: {
      title: 'GenAI & LLM Documentation',
      items: [
        {type: 'doc', docId: '00-introduction/scope-and-applicability', label: 'Start Here', position: 'left'},
        {
          href: 'https://github.com/pruning-my-pothos/NNLP',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `GenAI & LLM Documentation · ${new Date().getFullYear()}`,
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [
    async function tailwindPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
  ],
};

export default config;
