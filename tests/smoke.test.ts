import { test, expect } from '@playwright/test';

test.describe('smoke', () => {
  test('homepage returns 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
  });

  test('homepage has no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors, errors.join('\n')).toHaveLength(0);
  });

  test('homepage has no broken assets', async ({ page }) => {
    const failed: string[] = [];
    page.on('response', (res) => {
      if (res.status() >= 400) failed.push(`${res.status()} ${res.url()}`);
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(failed, failed.join('\n')).toHaveLength(0);
  });

  test('404 page renders', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist-9876');
    expect(response?.status()).toBe(404);
    await expect(page.locator('body')).toContainText(/not found|404/i);
  });
});
