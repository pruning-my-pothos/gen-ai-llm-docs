# Website (Docusaurus) README

This folder hosts the Docusaurus front-end for the GenAI & LLM Handbook.

## Prereqs
- Node 18+

## Install
```bash
cd website
npm install
```

## Local dev
```bash
npm run start
```
Launches the dev server with hot reload.

## Build
```bash
npm run build
```
Creates the production bundle in `build/`.

## Preview production build
```bash
npm run serve
```

## Search
- Uses the local search plugin `@easyops-cn/docusaurus-search-local` (no external index). No Algolia configuration is required.
