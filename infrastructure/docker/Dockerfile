FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /workspace
COPY . .
RUN pnpm install --frozen-lockfile && pnpm build
FROM node:22-alpine
USER node
WORKDIR /app
COPY --from=base /workspace/services/api/dist ./dist
CMD ["node", "dist/server.js"]
