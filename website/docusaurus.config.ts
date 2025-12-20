import type {Config} from '@docusaurus/types';
import type {Preset} from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'NNLP',
  tagline: 'Nuanced Natural Language Programming',
  favicon: 'img/favicon-autorenew.svg',
  url: 'https://pruning-my-pothos.github.io',
  baseUrl: '/NNLP/',
  trailingSlash: false,
  organizationName: 'nnlp',
  projectName: 'nnlp',
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
      {name: 'keywords', content: 'nnlp, genai, llm, documentation, method, systems'},
    ],
    navbar: {
      title: 'NNLP',
      logo: {
        alt: 'NNLP Logo',
        src: 'img/nnlp-logo.svg',
      },
      items: [
        {type: 'doc', docId: '00-start-here/00-what-is-nnlp', label: 'Start Here', position: 'left'},
        {type: 'doc', docId: '01-core-skills/00-core-skills-overview', label: 'Core Skills', position: 'left'},
        {type: 'doc', docId: '03-nnlp-method/00-the-nnlp-loop', label: 'NNLP Method', position: 'left'},
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
      copyright: `NNLP · ${new Date().getFullYear()}`,
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
