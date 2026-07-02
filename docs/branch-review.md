# Branch review

Review date: 2 July 2026

| Branch | Classification | Rationale / policy |
|---|---|---|
| `main` | Default | Production-ready release line. Protected and updated only through PRs. |
| `develop` | Active | Integration branch for the next release; ongoing features should target this line. |
| `feature/customer-search` | Active | Planned customer-facing search development off `develop`. |
| `feature/billing-api` | Active | Planned billing service/API development off `develop`. |
| `hotfix/auth-token-fix` | Stale | Created to represent a completed/abandoned emergency fix with no unique follow-up commit. With no activity or delta from the current release line, retaining it suggests live work where none exists; archive/delete after confirming any external references. |
| `devops-modernization-2026-07-02` | Active review | CI/security modernization and assessment documentation; merge by PR only. |

The three feature/integration branches are marked active because they name currently planned delivery work and share the initialized project baseline. The hotfix branch is explicitly marked stale because it has no unique changes or continuing incident context; after its GitHub discussion and incident references are checked, it should be deleted to reduce branch noise.
