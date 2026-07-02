# Publication runbook

The connected repository is `TusharMicro135/customer-portal-api`. Use this sequence only from a machine with Git 2.45+, Node 22, pnpm 9, `gh`, and authenticated push access.

```bash
git clone https://github.com/TusharMicro135/customer-portal-api.git
cd customer-portal-api
corepack enable
pnpm install
pnpm lint && pnpm typecheck && pnpm test && pnpm build
git checkout -b devops-modernization-2026-07-02
git add .github/workflows/ci-modernized.yml .github/workflows/reusable-build.yml .github/workflows/security.yml docs
git commit -m "Modernize CI and repository security checks"
git push -u origin devops-modernization-2026-07-02
gh pr create --title "DevOps Modernization for customer-portal-api" --base main --head devops-modernization-2026-07-02 --body-file docs/pull-request-body.md
```
