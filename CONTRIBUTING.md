# Contributing to the GenAI & LLM Handbook

Thanks for helping improve the GenAI & LLM Handbook. This project emphasizes clear intent, small diffs, and evidence-backed changes.

## Ways to contribute
- Fix or improve docs (clarity, accuracy, navigation).
- Add or refine patterns, scenarios, or templates.
- Improve the website experience (Docusaurus).
- File issues for bugs, broken links, or missing coverage.

## Ground rules
- Keep changes small and reviewable.
- Follow the existing frontmatter and section structure in `docs/`.
- Avoid adding dependencies without discussion.
- No secrets or proprietary data in issues, PRs, or docs.
- Match the brand: “GenAI & LLM Handbook.”

## Getting started
1. Fork and branch from `main`.
2. For doc changes, run `npm run build` inside `website/` if you touch navigation or markdown structure.
3. Write clear commit messages; group related changes.

## Pull requests
- Include a short summary of intent, scope, and validation.
- Link to any related issue.
- Prefer updates to existing sections over new top-level sections.

## Docs style
- Keep tone concise and instructional.
- Use tables and diagrams (Mermaid) where they aid scanability.
- Ensure internal links use the correct slug (e.g., `/docs/02-execution-patterns/00-pattern-index`).

## Testing
- Docs-only: ensure `npm run build` (from `website/`) succeeds when nav or slugs change.
- Code snippets/experiments: include minimal run instructions and a quick validation step.

## License
By contributing, you agree your contributions are licensed under MIT.
