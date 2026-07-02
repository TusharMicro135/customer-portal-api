# Customer Portal API

A reviewable TypeScript monorepo for a customer self-service platform. Two Next.js frontends use an Express API backed by PostgreSQL; asynchronous jobs are processed by a BullMQ worker over Redis. Shared contracts and utility packages keep service boundaries consistent.

## Prerequisites

- Node.js 22
- pnpm 9 (`corepack enable`)
- Docker with Compose

## Start locally

```bash
cp .env.example .env
docker compose -f infrastructure/docker/docker-compose.yml up -d
pnpm install
pnpm dev
```

Customer UI: `http://localhost:3000`; admin UI: `http://localhost:3001`; API: `http://localhost:4000`.

## Commands

`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:integration`, `pnpm test:e2e`, and `pnpm build` run through Turborepo. The modernization workflow combines per-package coverage and enforces an 80% global target; the baseline assessment in `docs/devops-modernization-blueprint.md` records the intentional starting gaps.

## Delivery model

`main` is the protected release branch. Daily work lands through `develop`; feature branches merge to `develop` and validated release changes are promoted to `main`. Emergency `hotfix/*` branches start from `main` and must merge back to both release lines.

See [the modernization blueprint](docs/devops-modernization-blueprint.md), [branch review](docs/branch-review.md), and [publication runbook](docs/publication-runbook.md).
