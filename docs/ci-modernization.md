# CI modernization notes

## What the merge gate covers

`CI` runs on pull requests targeting `main`, pushes to `main`, and manual dispatch. Node quality, Node coverage tests, Python quality/coverage tests, the build, and dependency auditing start independently. The build is produced once and uploaded as `build-output`; a downstream job downloads and inspects that archive instead of running the build again. A stable `CI merge gate` job folds the applicable results into one branch-protection target. `CodeQL` separately analyzes Actions, JavaScript/TypeScript, and Python on PRs, `main`, and a weekly schedule.

The npm cache is keyed from the committed `package-lock.json`; `npm ci` makes the install deterministic. Python's pip cache uses the worker requirement files. Caches hold package-manager download data, not a copied `node_modules` tree. Coverage reports and the build handoff expire after seven days.

The 60% floor is enforced for frontend Vitest branches/functions/lines/statements, backend Jest branches/functions/lines/statements, and the Python worker total. The Node coverage configuration excludes only startup and infrastructure wiring (`frontend/src/main.tsx`, `backend/src/server.ts`, and `backend/src/db/pool.ts`). The Python configuration omits test files and the `__main__` guard. Review these boundaries as the service grows; do not add broad exclusions merely to make a check green.

## Baseline and timing assumptions

The latest full-fixture `main` run, [30993772161](https://github.com/TusharMicro135/customer-portal-api/actions/runs/30993772161), took 77 seconds from run start to final update. Its lint job occupied 28 seconds, the test job 29 seconds, and there was about a 17-second scheduling gap between them. Each job spent 16 seconds in `npm install`. Thirteen successful push runs in the same seed window ranged from 60 to 81 seconds, with a median of 67 seconds. That is the observed baseline, not the earlier generic 5â€“8 minute estimate.

For equivalent lint/test work, caching and parallel execution should reduce a warm-cache critical path to roughly 45â€“60 seconds, subject to runner queue time. The complete proposed merge gate is deliberately broader: it also builds, tests Python, audits dependencies, and validates the artifact. Budget roughly 2â€“4 minutes for that full CI gate at first, and 2â€“5 minutes for the separately parallel CodeQL workflow. Measure at least ten PR runs after merge, split cold and warm caches, and replace these ranges with p50/p95 data. Faster feedback and broader assurance are separate outcomes; the expanded pipeline is not promised to be shorter than the old minimal check.

## Branch protection recommendations

1. Protect `main` with pull requests, at least one approving review, stale-review dismissal after new commits, and conversation resolution. Apply the rule to administrators if your operating model permits it; block force pushes and deletion.
2. Require the uniquely named `CI merge gate` and the three `CodeQL / Analyze (...)` checks after they have run successfully on the default branch. Require branches to be up to date before merge. Add CODEOWNERS review for `.github/workflows/`, dependency manifests, and deployment configuration once the owning team is agreed.

Do not configure required checks until their exact names are visible in GitHub. A renamed or skipped required job can strand PRs. Consider a repository ruleset if the same policy will be shared across several branches or repositories.

## Migration boundary

The current root manifest and `main` workflow use npm workspaces `frontend`, `backend`, and `shared`. The repository also retains a separate pnpm/Turbo `apps`, `services`, and `packages` tree, an infrastructure Dockerfile that expects pnpm, and `.nvmrc` set to Node 22. This change makes the active npm path reproducible and tests the Python worker; it does not claim the legacy tree is covered. Decide which layout is authoritative, remove or migrate the other path deliberately, then extend CI to integration, database-migration, Docker, Terraform, and end-to-end tests. The deleted legacy e2e and API integration fixtures mean those layers are not currently present on `main`.

