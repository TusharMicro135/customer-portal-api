import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e', use: { baseURL: 'http://127.0.0.1:3000' },
  webServer: { command: 'pnpm --filter @portal/customer-web dev', port: 3000, reuseExistingServer: true }
});
