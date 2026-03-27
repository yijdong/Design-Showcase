# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 20
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React 19 + Vite 7 + Tailwind CSS + shadcn/ui

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── portfolio/          # React/Vite frontend (port 5000)
│   └── api-server/         # Express API server (port 8000)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── attached_assets/        # Static assets
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Development Workflows

- **Portfolio (frontend)**: `PORT=5000 BASE_PATH=/ pnpm --filter @workspace/portfolio run dev`
- **API Server (backend)**: `PORT=8000 pnpm --filter @workspace/api-server run dev`

Frontend proxies `/api/*` → `http://localhost:8000` via Vite proxy.

## Database

PostgreSQL via Replit's built-in DB. `DATABASE_URL` is set automatically.

Push schema changes: `pnpm --filter @workspace/db run push`

## API

- Health: `GET /api/healthz`
- API spec: `lib/api-spec/openapi.yaml`

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. Always typecheck from the root:
```bash
pnpm run typecheck
```

## Root Scripts

- `pnpm run build` — typecheck + build all packages
- `pnpm run typecheck` — `tsc --build --emitDeclarationOnly`
