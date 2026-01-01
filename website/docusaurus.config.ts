import type {Config} from '@docusaurus/types';
import type {Preset} from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'GenAI & LLM Handbook',
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
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    metadata: [
      {name: 'keywords', content: 'genai, llm, documentation, programming, development'},
    ],
    navbar: {
      title: 'GenAI & LLM Handbook',
      items: [
        {type: 'doc', docId: '00-handbook-introduction/scope-and-applicability', label: 'Start Here', position: 'left'},
        {type: 'doc', docId: 'experiments/00-index', label: 'Experiments', position: 'left'},
        {type: 'doc', docId: '08-code-and-snippets/README', label: 'Code & Snippets', position: 'left'},
        {
          label: 'Shailesh Rawat · sans_serif_sentiments',
          href: 'https://www.linkedin.com/in/shailesh-rawat/',
          position: 'right',
        },
        {
          href: 'https://github.com/pruning-my-pothos/gen-ai-llm-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `GenAI & LLM Handbook · ${new Date().getFullYear()}`,
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/docs/01-handbook-method/execution-patterns/00-index',
            to: '/docs/02-execution-patterns/00-pattern-index',
          },
          {
            from: '/docs/01-handbook-method/execution-patterns',
            to: '/docs/02-execution-patterns/00-pattern-index',
          },
          {
            from: '/docs/05-responsible-ai/index',
            to: '/docs/05-responsible-ai',
          },
        ],
      },
    ],
    require.resolve('@easyops-cn/docusaurus-search-local'),
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
