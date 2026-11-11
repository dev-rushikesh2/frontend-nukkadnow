import { test, expect } from '@playwright/test';

test.describe('Customer PWA Journey', () => {
  test('should load home page and display locality', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/NukkadNow/);
  });
});
