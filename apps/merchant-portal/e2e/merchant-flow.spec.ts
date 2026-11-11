import { test, expect } from '@playwright/test';

test.describe('Merchant Portal Flow', () => {
  test('should display dashboard', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Merchant/);
  });
});
