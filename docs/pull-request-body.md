## What’s changing

This PR gives the repository one CI path we can reason about: lint, type-check, unit tests, integration tests, coverage, and security checks run in parallel; a single production build is published once and reused by Playwright; and stale PR runs are cancelled. It also adds CodeQL, PR dependency/license review, a production dependency audit, and Gitleaks.

The coverage job sets an 80% floor for branches, functions, lines, and statements. That is the intended quality bar, not a claim about current coverage: the default branch has not produced a complete report, the API and worker Jest configs only declare 61% and 48% package floors, and both web apps still pass with no tests.

## What the review found

This is a small TypeScript monorepo, not a set of independently managed repositories. It has two Next.js apps, an Express API, a BullMQ worker, shared contracts/utilities, and PostgreSQL/Redis development infrastructure. The service boundaries are useful, but several runtime links are still placeholders: the API uses an in-memory repository even though `pg` and PostgreSQL are present, the frontends render local sample data instead of calling the API, and the worker consumes Redis jobs without a queue producer in the API.

The two existing workflows install dependencies three times, lint twice, serialize validation, and rebuild before e2e. They do not share a pnpm/Turbo cache, reuse artifacts, gate coverage, or run security checks. There is also no committed pnpm lockfile. The first reviewed run reached a concrete NodeNext/Jest configuration conflict after about 21 seconds. The branch now gives shared libraries package-level build outputs, keeps test files out of production declaration builds, and maps the monorepo’s ESM imports correctly in Jest; the final lint, type, unit, integration, build and e2e jobs pass.

On the requested five-control security score, `main` is 4/10 today: Dependabot and an ESLint check are present; secret detection, static analysis, and PR license review are not.

## Expected impact

- Measured baseline: 2m21s for a full green validate + e2e run. Measured modern workflow: 3m02s wall-clock on the first full run (about 2m25s of actual critical-path job time, plus runner scheduling). The modern run carries substantially more coverage/security feedback, but it is not faster yet.
- Expected steady state: about 2m30s after a pnpm lockfile enables deterministic lockfile-keyed caching and the two legacy workflows are removed. Keep that as a target until ten comparable runs provide a median and p95.
- Security checks now run as normal PR feedback: CodeQL, Gitleaks, dependency/license review and the production audit all passed on the final branch head.
- Coverage and failing Playwright evidence are retained as artifacts instead of requiring a full local reproduction.

## Files and checks

- `.github/workflows/reusable-build.yml`: whitelisted reusable setup, pnpm/Turbo caching, task timeout, and build-artifact publication.
- `.github/workflows/ci-modernized.yml`: parallel lint/type/unit/integration/coverage jobs, an 80% floor, artifact reuse, browser caching, and stale-run cancellation.
- `.github/workflows/security.yml`: CodeQL, dependency/license review, production dependency audit, and Gitleaks.
- `playwright.config.ts` and `apps/customer-web/package.json`: run `next start` from the downloaded production artifact in CI.
- Package/service TypeScript and Jest configs plus small API/worker typing fixes: make the workspace buildable and testable under the repo’s NodeNext/ts-jest combination.
- `docs/devops-modernization-blueprint.md`: branch, architecture, test, security, and migration findings with evidence-backed estimates.

A limitation worth addressing right away: this repo has no `pnpm-lock.yaml`, so the workflow temporarily keys pnpm cache entries from package manifests and uses `--no-frozen-lockfile`. The next dependency-management ticket should commit a pnpm 9.15.4 lockfile and flip every install to `--frozen-lockfile`.

## Rollout

Keep the original workflows during the first green observations so the results are easy to compare. Once the modern path is stable, remove `ci.yml` and `lint.yml`; otherwise every PR will keep paying for the old installs/build and the duplicate lint job.

Recommended rules for `main` and `develop`:

- PRs only, resolved conversations, and one approval for normal code; two plus CODEOWNERS review for `.github/**` or `infrastructure/**`.
- Required lint, type-check, unit, integration, coverage, build, Playwright, CodeQL, dependency/license, dependency-audit, and Gitleaks checks. Turn on the 80% required check after the missing test suites are filled so the rule does not strand every PR.
- Up-to-date branches, linear history, no force-push/delete, and admin coverage except a documented break-glass path.

## Validation status

The final branch run is conclusive: lint, type-check, unit tests, integration tests, build artifact publication, Playwright against that artifact, CodeQL, Gitleaks, dependency/license review and the production dependency audit all passed. The sole failure is the 80% coverage job, which reports 0% branches for an untested package and is the intended signal behind the Test Coverage Improvements ticket.
