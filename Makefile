SHELL := /bin/bash

.PHONY: install dev build serve push status clean pages-build pages-serve pages-deploy

# Install site deps
install:
	cd website && npm install

# Run dev server
dev:
	cd website && npm run start

# Build static site
build:
	cd website && npm run build

# Serve built site
serve:
	cd website && npm run serve

# Build static site for GitHub Pages
pages-build:
	cd website && npm run build

# Serve the built site locally (after pages-build)
pages-serve:
	cd website && npm run serve

# Deploy to GitHub Pages (configure repo in docusaurus.config.ts before using)
pages-deploy:
	cd website && GIT_USER=git USE_SSH=1 npm run deploy

# Show git status
status:
	@git status -sb

# Push current branch safely (add, fetch, rebase, push)
push:
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "Working tree is dirty. Commit or stash before pushing."; \
		exit 1; \
	fi
	@if ! git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then \
		echo "No upstream set. Set it with: git branch --set-upstream-to origin/$$(git branch --show-current)"; exit 1; \
	fi
	git fetch --prune origin
	git rebase --rebase-merges @{u}
	git push origin $$(git branch --show-current)

# Clean docusaurus cache/build
clean:
	cd website && npm run clean
