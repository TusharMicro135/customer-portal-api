# customer-portal-api

A customer account and billing portal for viewing account details, tracking payments, and reconciling payment activity.

## Architecture

The React frontend calls the backend's REST API for customer accounts and payment status. The Express backend reads and writes PostgreSQL using the schema defined in `db/migrations`. A Python worker continuously consumes a payment-reconciliation queue and writes reconciliation results back through the same PostgreSQL schema. The standalone `jobs/cleanup-expired-sessions.py` job runs on a schedule against that same database to remove expired sessions. The `shared` workspace holds TypeScript customer and payment types imported by both the frontend and backend.

## Local development

Start the connected processes with `docker compose up`. The frontend is available at `http://localhost:5173` and the backend API is available at `http://localhost:3000`. All database values in the local compose file are disposable fixture placeholders.

## CI checks

Use Node 22 and the committed npm lockfile:

```sh
npm ci
npm run lint
npm run test:coverage
npm run build
```

For the Python worker, install `worker/requirements-dev.txt`, run `python -m ruff check worker jobs`, and from `worker/` run `python -m pytest tests --cov=. --cov-fail-under=60`. See [CI modernization notes](docs/ci-modernization.md) for the merge gate, artifact handoff, coverage boundaries, timing assumptions, and branch-protection recommendations.

