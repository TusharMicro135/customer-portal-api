# CI modernization notes

## Baseline

The latest successful `main` run completed in 77 seconds. Linting took about three seconds and tests took about three seconds, but each job spent roughly 16 seconds reinstalling the same dependencies. The test job also waited for lint even though neither job consumes output from the other.

The old workflow ran only on pushes to `main`, used `npm install` without a lockfile or cache, and exercised only the legacy npm workspaces. It did not validate pull requests, build deployable output, publish reusable artifacts, run the Python worker tests, enforce coverage, or include security checks.

## New job layout

The core CI workflow runs quality checks, five Node test suites, the Python worker tests, and the application build in parallel. Every test suite has a 60% coverage floor. pnpm and pip caches are keyed from committed dependency files. The build runs once and publishes one artifact for downstream consumers; the artifact validation job downloads that output rather than rebuilding it.

On a warm cache, the core feedback lane should land around 45–60 seconds. The CodeQL jobs are intentionally separate and run in parallel with dependency and secret review; a full security result will usually take about 2–4 minutes for a repository this size. Those are planning estimates, so the first several runs should be measured before tightening any performance target.

## Branch protection recommendations

1. Require pull requests for `main`, at least one approving review, dismissal of stale approvals, and resolution of review conversations.
2. Require the `CI gate` and `Security gate` checks, require branches to be current before merge, block force pushes and deletions, and allow only squash or rebase merges.

## Follow-up coverage work

The repository has two partially overlapping application layouts. The new workflow covers every existing Node test suite plus the Python reconciliation tests, but the Next.js apps, scheduled cleanup job, payment routes, and Redis-backed worker lifecycle still need focused tests. Those gaps should be closed before raising the floor above 60%.
