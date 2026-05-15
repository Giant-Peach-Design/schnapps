import { test, expect } from '@playwright/test';

test('homepage has title and meta description', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.+/);
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  expect(description?.length).toBeGreaterThan(10);
});

test('homepage has Open Graph tags', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
});

test('robots.txt is accessible', async ({ request }) => {
  const res = await request.get('/robots.txt');
  expect(
    res.ok(),
    `Got ${res.status()} ${res.statusText()} from ${res.url()}`,
  ).toBeTruthy();
});

test('sitemap.xml is accessible', async ({ request }) => {
  const res = await request.get('/sitemap.xml');
  expect(res.ok()).toBeTruthy();
});
