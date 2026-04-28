# ShortCircuit Monorepo

URL shortener project organized as a pnpm workspace monorepo.

## Workspace Structure

```text
.
├── apps/
│   ├── backend/        # Express + TypeScript API
│   └── web/            # React + Vite frontend
├── packages/
│   ├── tsconfig/       # Shared TypeScript config
│   └── eslint-config/  # Shared ESLint scaffold
├── package.json        # Root scripts and tooling
└── pnpm-workspace.yaml
```

## Requirements

- Node.js: `v24` (see `.nvmrc`)
- pnpm: `7.2.1` (see `packageManager` in `package.json`)

Recommended:

```bash
nvm use
pnpm -v
```

## Install

From repo root:

```bash
pnpm install
```

## Run

Run all app dev servers:

```bash
pnpm dev
```

Run a single app:

```bash
pnpm dev:backend
pnpm dev:web
```

## Scripts

Root-level commands:

- `pnpm dev` - run app dev scripts in parallel
- `pnpm build` - build workspace apps
- `pnpm test` - run app test scripts
- `pnpm lint` - run app lint scripts
- `pnpm format` - format repo with Biome
- `pnpm check` - run Biome checks

## Tooling

- Workspace management: pnpm workspaces
- Lint/format: Biome
- Git hooks: Husky
- Commit message linting: Commitlint

## Environment Variables

See `.env.example` for required environment variables:

- `DATABASE_URL` (backend)
- `VITE_BACKEND_URL` (web, points to backend base URL)
- `VITE_SUPABASE_URL` (web)
- `VITE_SUPABASE_ANON_KEY` (web)

## Railway Deployment (Two Services)

Deploy `apps/backend` and `apps/web` as two separate Railway services.

- **Backend service root:** `apps/backend`
- **Web service root:** `apps/web`
- Set `VITE_BACKEND_URL` in the web service to your backend Railway public URL (for example `https://your-backend.up.railway.app`).
- Backend listens on `PORT` from Railway automatically.
