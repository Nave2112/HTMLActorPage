import { test, expect } from '@playwright/test';
//import { login, sortItemsBy, addItemsToCart, checkout, validateOrderCompletion } from '../tests/utils/helpers';
import { CREDENTIALS, ITEMS, CHECKOUT_INFO } from '../tests/utils/constants';



test.describe('SauceDemo E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await login(page, CREDENTIALS.STANDARD_USER);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Sort items (Z-A & High-Low)', async ({ page }) => {
    await sortItemsBy(page, 'za');
    const items = await page.locator('.inventory_item_name').allTextContents();
    const sortedItems = [...items].sort().reverse();
    expect(items).toEqual(sortedItems);

    await sortItemsBy(page, 'hilo');
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...priceValues].sort((a, b) => b - a);
    expect(priceValues).toEqual(sortedPrices);
  });

  test('Add items to cart & complete checkout', async ({ page }) => {
    await addItemsToCart(page, [ITEMS.BACKPACK, ITEMS.BIKE_LIGHT]);
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(2);

    await checkout(page);
    await validateOrderCompletion(page);
  });


  test('Edge Case: Locked user login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await login(page, CREDENTIALS.LOCKED_USER);
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out');
  });
})