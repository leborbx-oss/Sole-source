import { test, expect } from '@playwright/test';

test('navbar accessibility', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Check ARIA labels
  const searchBtn = page.getByLabel('Search products');
  await expect(searchBtn).toBeVisible();

  const cartBtn = page.getByLabel(/Shopping cart/);
  await expect(cartBtn).toBeVisible();

  // Check active state
  const homeLink = page.getByRole('link', { name: 'HOME' });
  await expect(homeLink).toHaveAttribute('aria-current', 'page');

  // Check mobile menu attributes
  await page.setViewportSize({ width: 375, height: 667 });
  const menuBtn = page.getByLabel('Open menu');
  await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
  await menuBtn.click();
  await expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-menu')).toBeVisible();

  // Take screenshot of mobile menu
  await page.screenshot({ path: 'navbar_mobile_menu.png' });
});
