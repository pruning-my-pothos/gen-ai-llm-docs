import type {Config} from '@docusaurus/types';
import type {Preset} from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'GenAI & LLM Documentation',
  tagline: 'Practical guidance for GenAI and LLM work',
  favicon: 'img/favicon-genai.svg',
  url: 'https://pruning-my-pothos.github.io',
  baseUrl: '/NNLP/',
  trailingSlash: false,
  organizationName: 'pruning-my-pothos',
  projectName: 'NNLP',
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
      {name: 'keywords', content: 'genai, llm, documentation, method, systems, prompting, rag'},
    ],
    navbar: {
      title: 'GenAI & LLM',
      logo: {
        alt: 'GenAI Logo',
        src: 'img/favicon-genai.svg',
      },
      items: [
        {type: 'doc', docId: '00-start-here/00-introduction', label: 'Start Here', position: 'left'},
        {type: 'doc', docId: '01-core-skills/00-core-skills-overview', label: 'Core Skills', position: 'left'},
        {type: 'doc', docId: '03-nnlp-method/00-the-nnlp-loop', label: 'Method', position: 'left'},
        {type: 'doc', docId: '09-templates/00-templates-index', label: 'Templates', position: 'left'},
        {
          href: 'https://github.com/pruning-my-pothos/NNLP',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `GenAI & LLM · ${new Date().getFullYear()}`,
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [
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
