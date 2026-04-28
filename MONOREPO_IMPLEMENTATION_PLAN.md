# ShortCircuit Monorepo Implementation Plan (Turborepo + pnpm)

## 1) Objectives and Success Criteria

### Primary Goals
- Establish **ShortCircuit** as the canonical product/app name across codebase, docs, and environments.
- Establish a clean monorepo powered by **pnpm workspaces** and **Turborepo**.
- Standardize the toolchain on **Node.js 24** and **pnpm** across all apps/packages.
- Keep `apps/backend` as the API service and make it first-class in the workspace.
- Add a new `apps/web` application using **React 19 + Vite + React Router**.
- Use **Prisma ORM** as the primary database access layer.
- Enable consistent local development, test execution, and production builds from the repo root.

### Definition of Done
- Root workspace can run all app tasks (`dev`, `build`, `test`, `lint`) via `pnpm` and `turbo`.
- `apps/backend` runs independently and through top-level filtered commands.
- `apps/web` boots with React 19, Vite, React Router, Tailwind CSS, TanStack Query, and React Hook Form.
- Prisma connectivity is integrated through backend and validated via frontend API flows.
- Shared config, scripts, and conventions are documented for future scaling.

---

## 2) Proposed Final Repository Structure

```text
shortcircuit/
├── apps/
│   ├── backend/                     # Existing API app
│   │   ├── src/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── ...
│   └── web/                         # New React 19 + Vite app
│       ├── src/
│       │   ├── main.tsx
│       │   ├── App.tsx
│       │   ├── routes/
│       │   │   ├── index.tsx
│       │   │   └── NotFound.tsx
│       │   └── ...
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       └── ...
├── packages/                        # Shared libraries/configs (future-ready)
│   ├── eslint-config/               # Optional shared lint config
│   ├── tsconfig/                    # Optional shared TS base config
│   └── ui/                          # Optional shared React components
├── package.json                     # Root scripts and dev tooling
├── pnpm-workspace.yaml              # Workspace package globs
├── turbo.json                       # Turborepo task pipeline
├── .gitignore
├── .npmrc                           # Optional workspace defaults
└── README.md
```

---

## 3) Technology and Tooling Decisions

### Package Manager and Workspace
- **pnpm** as the single package manager for deterministic and efficient installs.
- Workspace globs:
  - `apps/*`
  - `packages/*`

### Runtime and Version Policy
- **Node.js 24** as the required runtime for local dev, CI, and production parity.
- Add `engines.node` in root/app package manifests and pin `packageManager` to pnpm in root.
- Add `.nvmrc` (or `.node-version`) set to Node 24 for fast onboarding consistency.
- Current local convention in this repo: `.nvmrc` uses `v24`.

### Build System
- **Turborepo** for task orchestration and task caching.
- Core tasks:
  - `build` (cacheable)
  - `test` (cacheable, depends on `build` when needed)
  - `lint` (cacheable)
  - `dev` (non-cacheable, persistent)

### Code Quality and Formatting
- **Biome** as the default linter and formatter for the monorepo.
- Centralized config at repo root to enforce consistent style/rules across apps/packages.
- Biome config should stay framework-agnostic for this repo (remove Next.js-specific ignore patterns).
- Root quality scripts should include:
  - `lint` (Biome checks)
  - `format` (Biome write)
  - `check` (combined quality gate, optional)

### Commit Workflow Enforcement
- **Husky** for local Git hooks.
- **Commitlint** to enforce conventional commit messages and maintain clean history.
- Hook policy:
  - `pre-commit`: run fast quality checks (Biome + optional staged tests)
  - `commit-msg`: validate message with Commitlint

### Frontend Stack
- **React 19** with **Vite**.
- **React Router** using data-router style (`createBrowserRouter`) or route object setup.
- **Tailwind CSS** for utility-first styling and scalable design tokens.
- **shadcn/ui** component primitives for consistent, accessible UI composition.
- **TanStack Query** for server-state management and API request orchestration.
- **TanStack React Table** (`@tanstack/react-table`) for scalable, typed data table rendering.
- **React Hook Form** for performant, typed form handling and validation integration.
- **Zod** for schema validation and typed form/domain contracts.
- **Supabase client SDKs** (`@supabase/supabase-js`, `@supabase/ssr`) for auth/session-capable client/server workflows.
- TypeScript-first setup.

### Backend Stack (Current + Monorepo Alignment)
- Keep existing TypeScript + Express backend.
- Integrate **Prisma** through backend service modules and environment-driven credentials.
- Normalize scripts for monorepo conventions:
  - `dev`, `build`, `start`, `test`, and optionally `lint`.

### Database and Data Access
- **Prisma ORM** for typed, schema-driven database access.
- Default database target: **PostgreSQL** (recommended for production).
- Backend-first data access policy:
  - Web app calls `apps/backend` API.
  - Backend communicates with the database through Prisma Client.
- Supabase SDK policy in this repo:
  - Use `@supabase/supabase-js` for platform features such as auth/session/token-aware client interactions.
  - Use `@supabase/ssr` when server-side session handling/helpers are needed.
  - Keep Prisma as the canonical ORM for primary relational data models.
- Environment variable strategy:
  - Backend: `DATABASE_URL`
  - Web: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (only for allowed public client usage)

---

## 4) Execution Plan (Phased)

## Phase 0: Baseline Audit and Branch Setup
- Create a feature branch for the monorepo setup.
- Record current backend scripts and runtime assumptions.
- Lock project runtime and package manager:
  - Node.js 24
  - pnpm (declared in root `packageManager`)

## Phase 1: Root Monorepo Bootstrapping
- Add root `package.json` with workspace-level scripts.
- Add `pnpm-workspace.yaml`.
- Add `turbo.json` pipeline config.
- Add `.nvmrc` (or `.node-version`) with Node 24.
- Add Biome root config (`biome.json` or `biome.jsonc`) and root scripts.
- Install and initialize Husky + Commitlint at root.
- Add root `.gitignore` updates for Turborepo and Vite artifacts.

### Root script strategy (example)
- `dev`: run all long-running dev tasks
- `build`: run build across apps/packages
- `test`: run tests across workspace
- `lint`: run Biome lint/check across workspace
- `format`: run Biome formatter across workspace
- `commitlint`: validate commit messages
- `dev:web`: filtered run for frontend only
- `dev:backend`: filtered run for backend only

## Phase 2: Backend Alignment (`apps/backend`)
- Keep API location as requested: `apps/backend`.
- Rename package to a scoped workspace name (example: `@apps/backend`).
- Ensure scripts are monorepo-friendly:
  - `dev` for local development
  - `build` output to `dist`
  - `start` for built output
- Add Prisma integration layer:
  - initialize Prisma schema and generated client
  - create a reusable Prisma client module in `src/lib/prisma`
  - add data access modules/repositories for URL entities
  - keep all DB credentials server-side only
- Optional hardening:
  - Add `lint` and `typecheck`
  - Add `tsconfig` references to shared base config

## Phase 3: Frontend App Creation (`apps/web`)
- Scaffold with Vite + React + TypeScript.
- Upgrade/install React 19 and React DOM 19.
- Add React Router and initialize route layout:
  - `/` (home/landing)
  - catch-all `*` for not found
- Install and wire frontend platform libraries:
  - Tailwind CSS + PostCSS + Autoprefixer
  - shadcn/ui setup (`components.json`, utility setup, base styles)
  - `@tanstack/react-query` + QueryClient provider
  - `@tanstack/react-table` for URL list/history tables
  - `react-hook-form` for forms
  - `zod` + `@hookform/resolvers` for schema-driven form validation
  - `@supabase/supabase-js` and `@supabase/ssr` for auth/session tooling
- Introduce standard app structure:
  - `src/routes`
  - `src/components`
  - `src/features` (optional)
  - `src/lib/api` (request helpers/query keys)
  - `src/lib/forms` (shared form schemas/hooks)

## Phase 3.1: Frontend Foundations and Conventions
- Tailwind setup:
  - initialize `tailwind.config` and `postcss.config`
  - include Tailwind directives in global stylesheet
  - define base theme tokens (colors/spacing/radius)
- shadcn/ui setup:
  - initialize shadcn in `apps/web`
  - align theme tokens with branding and Tailwind config
  - compose form UIs with shadcn primitives + React Hook Form adapters
- TanStack Query setup:
  - initialize shared `QueryClient`
  - wire `QueryClientProvider` at app root
  - define query key factory and API error normalization for backend endpoints backed by Prisma-managed data
- TanStack React Table setup:
  - define typed table column configs for URL entities
  - integrate sorting/filtering/pagination state with table model
  - compose table UI with shadcn table primitives
- React Hook Form setup:
  - standardize on **Form + Controller** pattern style
  - create reusable field abstractions (Input, Select, ErrorMessage)
  - establish validation with **Zod-first** schemas via resolver
  - document async submit flow with API + query invalidation

## Phase 3.2: Data Layer and Environment Management
- Add root and app-specific `.env.example` files documenting Prisma/DB variables.
- Implement API client utilities in web (`src/lib/api`) that call backend routes.
- Add Supabase client helpers in web (`src/lib/supabase`) using `@supabase/supabase-js`/`@supabase/ssr`.
- Document security boundaries:
  - no database credentials in frontend bundles
  - backend is the trust boundary for all privileged DB operations
  - only public Supabase keys are exposed in frontend env (`VITE_*`)
- Add a starter ShortCircuit core flow (URL creation and retrieval):
  - form submit with React Hook Form
  - mutation with TanStack Query
  - list/read query invalidation and optimistic UI where appropriate

## Phase 4: Shared Packages (Optional but Recommended)
- Add `packages/tsconfig` for shared TS base.
- Add `packages/eslint-config` for unified lint rules.
- Keep `packages/ui` optional until shared component needs emerge.

## Phase 5: Turborepo Pipeline and Dependency Graph
- Configure `turbo.json` to:
  - cache `build`, `test`, `lint`, and optional `check`
  - avoid caching `dev`
  - define outputs for build artifacts (e.g., `dist/**`)
- Use `dependsOn` to ensure transitive package builds when needed.

## Phase 6: Developer Experience and Quality Gates
- Add top-level README command matrix.
- Add CI entrypoint commands (ex: `pnpm build`, `pnpm test`).
- Ensure lockfile and workspace install are reproducible.

---

## 5) Concrete File-Level Plan

## Root
- `package.json`
  - add `private: true`
  - add `packageManager` (pnpm)
  - add `engines.node` set to Node 24
  - add scripts delegated to `turbo`
  - add Biome scripts (`lint`, `format`, optional `check`)
  - add commit quality scripts (`commitlint`, optional `prepare`)
  - add dev dependency: `turbo`
  - add dev dependency: `@biomejs/biome`
  - add dev dependencies: `husky`, `@commitlint/cli`, `@commitlint/config-conventional`
- `pnpm-workspace.yaml`
  - include `apps/*` and `packages/*`
- `turbo.json`
  - define pipeline for `build`, `dev`, `test`, `lint`, `format` (non-cacheable), optional `check`, and optional `typecheck`
- `biome.json` or `biome.jsonc` (new)
  - root lint/format rules, ignore patterns, and file scopes
  - remove Next.js-specific entries that do not apply to this repo
- `commitlint.config.cjs` (new)
  - extends `@commitlint/config-conventional`
- `.husky/pre-commit` (new)
  - run Biome checks (and optional targeted tests)
- `.husky/commit-msg` (new)
  - run `commitlint --edit "$1"`
- `.gitignore`
  - include `.turbo`, `node_modules`, Vite build artifacts
- `.nvmrc` (new)
  - set Node version to `24`
- `.env.example` (new)
  - define shared docs for required env vars and where they are consumed

## `apps/backend`
- `package.json`
  - rename package to workspace-safe naming
  - standardize scripts (`dev`, `build`, `start`, `test`)
  - keep existing dependencies unless migration is intentional
- `prisma/schema.prisma` (new)
  - Prisma schema for URL/domain data models
- `src/lib/prisma/client.ts` (new)
  - central Prisma client initialization with singleton pattern
- `src/modules/*/repository.ts` (new pattern)
  - Prisma-backed repository/data access layer per domain module
- Optional
  - align `tsconfig` with shared base
  - add `lint` scripts

## `apps/web` (new)
- `package.json`
  - React 19, React DOM 19, React Router, Vite, TS
  - Tailwind CSS toolchain
  - TanStack Query
  - TanStack React Table
  - React Hook Form
  - `@supabase/supabase-js`
  - `@supabase/ssr`
  - optional `engines.node` set to Node 24
- `src/main.tsx`
  - React root render + router provider + QueryClient provider
- `src/lib/api/client.ts` (new)
  - typed fetch wrapper for backend API routes
- `src/lib/supabase/client.ts` (new)
  - browser/client-side Supabase initialization
- `src/lib/supabase/server.ts` (new, optional based on SSR needs)
  - server-compatible Supabase helpers using `@supabase/ssr`
- `src/features/shortener/hooks/*.ts` (new)
  - TanStack Query hooks for create/list/get operations
- `src/features/shortener/table/columns.tsx` (new)
  - typed TanStack Table column definitions for URL rows
- `src/features/shortener/table/ShortUrlsTable.tsx` (new)
  - reusable table component powered by `@tanstack/react-table`
- `src/features/shortener/components/*.tsx` (new)
  - React Hook Form-powered submission components
- `src/features/**/forms/*FormSchema.ts` (new pattern)
  - Zod schemas for each form
- `src/features/**/forms/*FormDefaults.ts` (new pattern)
  - default values/constants for each form
- `src/routes/index.tsx`
  - route definitions and layout
- `src/styles/index.css`
  - Tailwind directives and app globals
- `src/components/ui/*` (new)
  - shadcn-generated primitives used by forms and data views
- `tailwind.config.ts`
  - content globs and theme extensions
- `postcss.config.js` (or `.cjs`)
  - Tailwind and Autoprefixer plugins
- `vite.config.ts`
  - standard Vite config, optional aliasing

---

## 6) Command Blueprint

### One-time Setup
```bash
pnpm install
pnpm husky init
```

### Development
```bash
pnpm dev
pnpm dev:web
pnpm dev:backend
```

### Build/Test/Lint
```bash
pnpm build
pnpm test
pnpm lint
pnpm format
pnpm commitlint --from HEAD~1 --to HEAD
```

### Targeted App Execution
```bash
pnpm --filter @apps/backend dev
pnpm --filter @apps/web dev
```

### Runtime Verification
```bash
node -v
pnpm -v
```

### shadcn/ui Setup (in `apps/web`)
```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button input label textarea card form
```

### Environment Verification
```bash
# backend
echo $DATABASE_URL

# web/public
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

---

## 7) Risk Register and Mitigations

### Risk: Script naming mismatch
- **Issue**: Existing backend uses `start` for dev behavior.
- **Mitigation**: Normalize to `dev` for watch mode, keep `start` for production start.

### Risk: TypeScript config drift between apps
- **Issue**: Different TS defaults can cause hard-to-debug compile differences.
- **Mitigation**: Introduce shared base config in `packages/tsconfig`.

### Risk: Inconsistent formatting/linting across apps
- **Issue**: mixed tooling can create noisy diffs and style conflicts.
- **Mitigation**: standardize all lint/format workflows on Biome at repo root.

### Risk: Poor commit hygiene and unclear history
- **Issue**: inconsistent commit messages reduce traceability and release automation quality.
- **Mitigation**: enforce commit conventions using Commitlint + Husky `commit-msg` hook.

### Risk: Router version/setup mismatch
- **Issue**: React Router APIs vary by major version style.
- **Mitigation**: Lock explicit version and initialize with a minimal, tested route tree.

### Risk: Node version drift across machines
- **Issue**: Mismatched Node versions cause install/build inconsistencies.
- **Mitigation**: enforce Node 24 via engines + `.nvmrc` and validate in CI.

### Risk: API cache inconsistency in frontend
- **Issue**: ad-hoc fetch calls can diverge from query cache behavior.
- **Mitigation**: centralize server-state access through TanStack Query hooks.

### Risk: Database credential leakage
- **Issue**: `DATABASE_URL` accidentally exposed to client code or logs.
- **Mitigation**: keep DB credentials backend-only and redact sensitive values from logs/errors.

### Risk: Misuse of Supabase keys/client boundaries
- **Issue**: non-public keys or privileged operations accidentally placed in frontend code.
- **Mitigation**: expose only anon/public values via `VITE_*` vars and route privileged operations through backend.

### Risk: Environment misconfiguration
- **Issue**: missing/incorrect `DATABASE_URL` breaks runtime behavior.
- **Mitigation**: enforce startup env validation and maintain `.env.example` templates.

### Risk: Form validation duplication
- **Issue**: UI and submit validation can diverge.
- **Mitigation**: standardize React Hook Form patterns and shared validation strategy.

### Risk: CI instability from parallel orchestration
- **Issue**: Incorrect dependency graph may run tasks in wrong order.
- **Mitigation**: Set explicit `dependsOn` and verify cold CI runs.

---

## 8) Validation Checklist

### Workspace Integrity
- [ ] `pnpm install` completes from root without errors.
- [ ] `pnpm -r list` shows both apps in workspace.

### Backend
- [ ] `pnpm --filter @apps/backend dev` runs API.
- [ ] `pnpm --filter @apps/backend test` passes.
- [ ] `pnpm --filter @apps/backend build` produces expected output.
- [ ] Backend can reach database with configured `DATABASE_URL`.
- [ ] Prisma client initializes without runtime schema mismatch.

### Frontend
- [ ] `pnpm --filter @apps/web dev` runs Vite app.
- [ ] React 19 renders without peer dependency warnings.
- [ ] React Router routes load and fallback route works.
- [ ] Tailwind classes render correctly in baseline components.
- [ ] TanStack Query provider is mounted and at least one query resolves.
- [ ] TanStack React Table renders URL list/history with typed columns.
- [ ] React Hook Form `Form` + `Controller` pattern is consistently applied.
- [ ] Zod resolver validation runs and schema errors map correctly to UI fields.
- [ ] `@supabase/supabase-js` and `@supabase/ssr` initialize correctly for intended client/server usage.
- [ ] Form submission flow persists/fetches URL data through backend + Prisma.
- [ ] shadcn form components are styled and accessible in both light/dark themes (if enabled).

### Turborepo
- [ ] `pnpm build` runs through turbo pipeline.
- [ ] Subsequent build shows cache hits where expected.
- [ ] `pnpm test` and `pnpm lint` run from root successfully.
- [ ] `pnpm format` applies Biome formatting consistently.
- [ ] Biome config is honored by both `apps/backend` and `apps/web`.

### Git Hook and Commit Quality
- [ ] Husky hooks install correctly on clone/install.
- [ ] `pre-commit` runs Biome checks successfully.
- [ ] Invalid commit messages are blocked by Commitlint.
- [ ] Conventional commit messages pass via `commit-msg` hook.

### Runtime/Package Manager
- [ ] `node -v` reports Node 24.
- [ ] Root `packageManager` is set to pnpm.
- [ ] `pnpm install` creates and reuses a single workspace lockfile.

### Prisma/Database Configuration
- [ ] `.env.example` files document required Prisma/database variables.
- [ ] `DATABASE_URL` is configured only in backend runtime.
- [ ] `prisma generate` completes successfully.
- [ ] Local setup can complete a round-trip write/read against the database.

### Supabase SDK Configuration
- [ ] `.env.example` documents `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for frontend use.
- [ ] Supabase client helpers are isolated under `apps/web/src/lib/supabase`.
- [ ] Privileged operations remain backend-only and do not rely on client-side secrets.

---

## 9) Immediate Next-Step Implementation Order

1. Bootstrap root workspace files (`package.json`, `pnpm-workspace.yaml`, `turbo.json`).
2. Normalize `apps/backend` scripts/package naming and wire Prisma client/repositories.
3. Scaffold and wire `apps/web` with React 19 + React Router + Query/Form/Tailwind stack.
4. Validate full command matrix (`dev/build/test/lint/format`) at root and per-app levels.
5. Wire Husky + Commitlint hooks and verify commit policy enforcement.
6. Add Prisma env templates/docs, then README and optional shared packages for config reuse.

---

## 10) Deliverables from This Plan

- A production-ready monorepo foundation with minimal friction for adding more apps/packages.
- Independent-yet-integrated backend and frontend workflows.
- Predictable build/test behavior through Turborepo caching and pnpm workspace linking.
- A secure Prisma-backed data layer with clear backend/frontend responsibility boundaries.
- A reusable shadcn-based form and UI component system for rapid feature delivery.
- A scalable TanStack React Table-based data grid layer for URL management screens.
- A single Biome-based code quality standard across the full monorepo.
- A disciplined commit workflow enforced by Husky + Commitlint.
- Supabase SDK integration readiness (`@supabase/supabase-js`, `@supabase/ssr`) for auth/session workflows.
- Clear expansion path for shared tooling and libraries as the project grows.

---

## 11) Required shadcn Components for ShortCircuit (URL Shortener)

### Core Form and Input Components (Required)
- `form` - integrate React Hook Form with consistent field structure and error display.
- `input` - primary URL input (`longUrl`) and optional slug input (`customSlug`).
- `label` - accessible labeling for all form fields.
- `button` - submit/create-short-url and secondary actions.
- `textarea` - optional bulk/notes fields if expanded workflows are added.
- `checkbox` - optional features (e.g., enable expiration, password protection flags).
- `switch` - optional toggles for advanced URL options.
- `select` - optional expiration presets (1 day, 7 days, 30 days, never).

### Validation and Feedback Components (Required)
- `alert` - inline API failure/success messaging around submit operations.
- `toast` - non-blocking feedback for create/copy/update actions.
- `skeleton` - loading placeholders while URL history/list queries resolve.
- `badge` - URL status chips (active, expired, disabled).

### Data Display Components (Required)
- `card` - wrapper for create form and summary/stat sections.
- `table` - URL list/history with columns (short URL, destination, clicks, created at, status).
- `dropdown-menu` - row-level actions (copy, open, edit slug, disable, delete).
- `dialog` - confirmation and edit flows (delete confirm, edit URL metadata).
- `tooltip` - compact hints for icon-only actions (copy, analytics, open link).
- `separator` - visual grouping in form sections and dashboard panels.

### Navigation and UX Components (Recommended)
- `tabs` - switch between create, manage, and analytics views.
- `pagination` - paginate URL history for large datasets.
- `breadcrumb` - optional for deeper dashboard settings pages.
- `sheet` - optional mobile action panel/filter controls.

### Implementation Priority for MVP
1. `form`, `input`, `label`, `button`, `card`, `alert`, `toast`
2. `table`, `dropdown-menu`, `dialog`, `badge`, `skeleton`, `tooltip`
3. `select`, `checkbox`, `switch`, `tabs`, `pagination`, `sheet`

---

## 12) Form Architecture and Coding Guidelines

### Form Pattern Standard (Required)
- Use React Hook Form with **shadcn `Form` components + `Controller` pattern** as the default form architecture.
- Use **Zod** schemas for validation and form typing via resolver integration.
- Keep schema, defaults, and UI component split into separate files for maintainability.

### Required Form File Design
- `/my-component-form/MyComponentForm.tsx`
- `/my-component-form/MyComponentFormSchema.ts`
- `/my-component-form/MyComponentFormDefaults.ts`

### Naming and Responsibility Rules
- `MyComponentForm.tsx`
  - renders UI fields and submit behavior
  - uses `Controller` for controlled/complex fields
- `MyComponentFormSchema.ts`
  - exports Zod schema and inferred TS types
  - contains field validation rules and messages
- `MyComponentFormDefaults.ts`
  - exports `defaultValues` and any form initialization constants
  - contains no UI logic
