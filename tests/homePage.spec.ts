
import { test, expect } from '@playwright/test';

test('nav workflow', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('link', { name: 'Explore Categories' }).click();
  await expect(page).toHaveURL(/categories/);

  });