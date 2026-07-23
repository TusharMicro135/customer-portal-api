# customer-portal-api

customer-portal-api is a customer account and billing portal. The repository contains the portal UI, REST API, payment reconciliation worker, shared TypeScript contracts, a scheduled maintenance job, and the PostgreSQL schema used by the application.

## Architecture

The React frontend calls the backend REST API for customer and payment data. The Express backend reads and writes PostgreSQL through the schema managed in db/migrations. A Python worker continuously consumes the payment-reconciliation queue, reconciles pending payment retries, and writes its results back through the same PostgreSQL schema. The standalone jobs/cleanup-expired-sessions.py script runs on a schedule against that database to purge expired sessions. The shared workspace holds Customer and Payment TypeScript types imported by both the frontend and backend.

The local docker-compose.yml starts frontend, backend, worker, and PostgreSQL together. Database connection settings and the payment queue name are supplied through environment variables.

## Local development

Start PostgreSQL and the application processes with Docker Compose, or install the root npm workspaces and run the frontend and backend scripts separately. The Python worker dependencies are listed in worker/requirements.txt. Apply the SQL files in db/migrations in numeric order before exercising the API or worker.
