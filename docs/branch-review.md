# Branch review

Review date: 2 July 2026 (Asia/Kolkata)

| Branch | Delta against `main` at review | Classification and next step |
|---|---|---|
| `main` | Default branch | Release line and PR target. |
| `develop` | 0 unique commits; 3 behind | Inactive placeholder. Rebase it before accepting new work, or delete it if the team does not intend to use a release-integration branch. |
| `feature/customer-search` | 0 unique commits; 3 behind | Stale placeholder. No customer-search code is present; delete or recreate from the current integration branch when the work starts. |
| `feature/billing-api` | 0 unique commits; 3 behind | Stale placeholder. No billing delta is present; delete or recreate from the current integration branch when the work starts. |
| `hotfix/auth-token-fix` | 0 unique commits; 3 behind | Stale. Delete after checking for external incident links. |
| `devops-modernization-2026-07-02` | Active modernization delta | The only human-authored non-default branch with substantive code/workflow changes. Review through PR #5. |
| `dependabot/npm_and_yarn/production-dependencies-7b50e36493` | 1 ahead | Active automated dependency update. Review after the modernization PR because it overlaps package manifests. |
| `dependabot/npm_and_yarn/development-dependencies-4e21ff397b` | 1 ahead | Active automated dependency update. Review after the modernization PR because it overlaps package manifests. |
| `dependabot/github_actions/actions/checkout-7` | 1 ahead, 2 behind | Active but needs a rebase; Checkout 7 is already used in the modernization workflows. |
| `dependabot/github_actions/actions/setup-node-6` | 1 ahead, 1 behind | Active but needs a rebase; Setup Node 6 is already used in the modernization workflows. |
| `dependabot/github_actions/pnpm/action-setup-6` | 1 ahead, 1 behind | Active but needs a rebase; pnpm/action-setup 6 is already used in the modernization workflows. |

Only the modernization and current Dependabot branches contain commits that are not on `main`. The named feature, hotfix and development branches should not be described as active delivery work until they contain a unique, current change.
