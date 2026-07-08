import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.locator('body').click();
  await page.getByRole('button', { name: 'Search (Command+K)' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('annotations');
  await page.getByRole('option', { name: 'Annotations', exact: true }).getByRole('link').click();
  await expect(page.locator('h1')).toContainText('Annotations');
  await page.getByRole('link', { name: 'Next Command line »' }).click();
  await expect(page.locator('h1')).toContainText('Command line');
});