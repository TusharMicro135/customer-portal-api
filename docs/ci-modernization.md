# CI modernization notes

## Baseline

The latest successful `main` run completed in 77 seconds. Recent successful main-branch runs ranged from 60 to 81 seconds, with a 67-second median. Linting took about three seconds and tests took about three seconds, but each job spent roughly 16 seconds reinstalling the same dependencies. The test job also waited for lint even though neither job consumes output from the other.

The old workflow ran only on pushes to `main`, used `npm install` without a lockfile or cache, and exercised only the legacy npm workspaces. It did not validate pull requests, build deployable output, publish reusable artifacts, run the Python worker tests, enforce coverage, or include security checks.

## New job layout

The core CI workflow runs quality checks, five Node test suites, the Python worker tests, and the application build in parallel. Every test suite has a 60% coverage floor. pnpm and pip caches are keyed from committed dependency files, Python code is linted, and third-party GitHub Actions are pinned to reviewed commit SHAs. The build runs once and publishes one artifact for downstream consumers; the artifact validation job downloads that output rather than rebuilding it.

On a warm cache, the comparable lint/test feedback lane should land around 45â€“60 seconds. Earlier complete runs of the broader, fully validated workflow landed between 88 and 109 seconds, so budget roughly 90â€“120 seconds for the full CI gate. Security runs in parallel and adds dependency audits, PR dependency review, secret scanning, and CodeQL for GitHub Actions, JavaScript/TypeScript, and Python. The wider gate is not directly comparable with the old two-job workflow because it covers substantially more code.

## Branch protection recommendations

1. Require pull requests for `main`, at least one approving review, dismissal of stale approvals, and resolution of review conversations.
2. Require the `CI gate` and `Security gate` checks, require branches to be current before merge, block force pushes and deletions, and allow only squash or rebase merges. Wait until the exact checks have appeared successfully before marking them as required.

## Follow-up coverage work

The repository has two partially overlapping application layouts. The new workflow covers every existing Node test suite plus the Python reconciliation tests, but the Next.js apps, scheduled cleanup job, payment routes, and Redis-backed worker lifecycle still need focused tests. Those gaps should be closed before raising the floor above 60%.
