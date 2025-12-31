# Node / nvm / pnpm

Manage Node versions with `nvm` and install deps with a fast package manager.

:::info[Why nvm + pnpm?]
nvm lets you match Node versions per project; pnpm is fast and space-efficient.
:::

## Install nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# restart shell or:
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Install Node (LTS)
```bash
nvm install --lts
nvm use --lts
nvm alias default 'lts/*'
node -v
npm -v
```

## Install pnpm (optional, fast)
```bash
npm install -g pnpm
pnpm -v
```

## Init and install
```bash
npm init -y        # or pnpm init
npm install        # or pnpm install
```

Keep `.nvmrc` (e.g., `18.19.0`) in your repo so teammates match Node versions.
