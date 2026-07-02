## What’s changing

This PR gives the repository one CI path we can reason about: lint, type-check, unit tests, integration tests, coverage, and security checks run in parallel; a single production build is published once and reused by Playwright; and stale PR runs are cancelled. It also adds CodeQL, PR dependency/license review, a production dependency audit, and Gitleaks.

The coverage job sets an 80% floor for branches, functions, lines, and statements. That is the intended quality bar, not a claim about current coverage: the default branch has not produced a complete report, the API and worker Jest configs only declare 61% and 48% package floors, and both web apps still pass with no tests.

## What the review found

This is a small TypeScript monorepo, not a set of independently managed repositories. It has two Next.js apps, an Express API, a BullMQ worker, shared contracts/utilities, and PostgreSQL/Redis development infrastructure. The service boundaries are useful, but several runtime links are still placeholders: the API uses an in-memory repository even though `pg` and PostgreSQL are present, the frontends render local sample data instead of calling the API, and the worker consumes Redis jobs without a queue producer in the API.

The two existing workflows install dependencies three times, lint twice, serialize validation, and rebuild before e2e. They do not share a pnpm/Turbo cache, reuse artifacts, gate coverage, or run security checks. There is also no committed pnpm lockfile. The last PR run reached a concrete NodeNext failure after about 21 seconds—the shared-utils validation test imported `./validation` without the required `.js` extension—so tests and builds were skipped. This branch fixes that import.

On the requested five-control security score, `main` is 4/10 today: Dependabot and an ESLint check are present; secret detection, static analysis, and PR license review are not.

## Expected impact

- Based on the observed setup/lint timings and the build/browser stages that currently never run, the baseline full path is roughly 3–4 minutes on this small repository. A warm modernized run should land around 1.5–2.5 minutes because independent checks fan out, pnpm/Turbo/Playwright caches are available, and Playwright consumes the build artifact instead of rebuilding.
- Security checks become normal PR feedback: CodeQL (~55 seconds in the observed run), Gitleaks (~6 seconds), and dependency/license review (~4 seconds) run alongside CI instead of extending the build critical path.
- CI failures will carry reusable coverage output and a Playwright report instead of requiring a full local reproduction to see what failed.

The estimates are deliberately conservative and should be replaced with the median and p95 from ten green PR runs once the current test/build issues are resolved.

## Files and checks

- `.github/workflows/reusable-build.yml`: whitelisted reusable setup, pnpm/Turbo caching, task timeout, and build-artifact publication.
- `.github/workflows/ci-modernized.yml`: parallel lint/type/unit/integration/coverage jobs, an 80% floor, artifact reuse, browser caching, and stale-run cancellation.
- `.github/workflows/security.yml`: CodeQL, dependency/license review, production dependency audit, and Gitleaks.
- `playwright.config.ts` and `apps/customer-web/package.json`: run `next start` from the downloaded production artifact in CI.
- `packages/shared-utils/src/validation.test.ts`: fix the NodeNext import that currently blocks type-check and all test/build-dependent jobs.
- `docs/devops-modernization-blueprint.md`: branch, architecture, test, security, and migration findings with evidence-backed estimates.

A limitation worth addressing right away: this repo has no `pnpm-lock.yaml`, so the workflow temporarily keys pnpm cache entries from package manifests and uses `--no-frozen-lockfile`. The next dependency-management ticket should commit a pnpm 9.15.4 lockfile and flip every install to `--frozen-lockfile`.

## Rollout

Keep the original workflows during the first green observations so the results are easy to compare. Once the modern path is stable, remove `ci.yml` and `lint.yml`; otherwise every PR will keep paying for the old installs/build and the duplicate lint job.

Recommended rules for `main` and `develop`:

- PRs only, resolved conversations, and one approval for normal code; two plus CODEOWNERS review for `.github/**` or `infrastructure/**`.
- Required lint, type-check, unit, integration, coverage, build, Playwright, CodeQL, dependency/license, dependency-audit, and Gitleaks checks. Turn on the 80% required check after the missing test suites are filled so the rule does not strand every PR.
- Up-to-date branches, linear history, no force-push/delete, and admin coverage except a documented break-glass path.

## Validation status

The live Actions history confirms the security jobs run successfully. The CI jobs currently fail before their intended assertions because of the NodeNext import issue fixed here. Since this desktop runtime has no local Git/Node/pnpm toolchain, the next Actions run is the authoritative validation step for the corrected CI path.
