import { expect, test } from '@playwright/test';
test('customer can see their account dashboard', async ({ page }) => { await page.goto('/'); await expect(page.getByRole('heading', { name: /Welcome back, Ada Lovelace/i })).toBeVisible(); await expect(page.getByText('Account status')).toBeVisible(); await expect(page.getByText('active', { exact: true })).toBeVisible(); });
