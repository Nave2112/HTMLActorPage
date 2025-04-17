
import { test, expect } from "@playwright/test";

test('saucelab testing', async({page}) => {
  await page.goto('https://www.saucedemo.com/');
  await page.type('#user-name', 'standard_user');
  await page.type('#password', 'secret_sauce');
  await page.click('#login-button');
  
  // Verify login was successful
  await expect(page).toHaveURL(/inventory.html/);

  // Select Z-A and verify dropdown value
  await page.selectOption('select', 'za');
  await expect(page.locator('select')).toHaveValue('za');

  // Verify item names are sorted Z to A
  const itemNameElements = await page.$$('.inventory_item_name');
  const names = await Promise.all(itemNameElements.map(el => el.innerText()));
  const sortedNames = [...names].sort().reverse();
  expect(names).toEqual(sortedNames);

  // Select Price: High to Low and verify dropdown value
  await page.selectOption('select', 'hilo');
  await expect(page.locator('select')).toHaveValue('hilo');

  // Verify prices are sorted from high to low
  let priceElements = await page.$$('.inventory_item_price');
  let prices = await Promise.all(priceElements.map(el =>
    el.innerText().then(text => parseFloat(text.replace('$', '')))
  ));
  const sortedPrices = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sortedPrices);

  // Add selected items to cart
  const itemsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt','Sauce Labs Bike Light'];
  for (const itemName of itemsToAdd) {
    await page.click(`xpath=//div[contains(@class, 'inventory_item') and .//div[text()='${itemName}']]//button`);
  }

  // Go to cart
  await expect(page).toHaveTitle(/Swag Labs/);
  await page.click('a[data-test="shopping-cart-link"]');

  // Click checkout
  await page.click('[data-test="checkout"]');

  // Fill user details
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.click('[data-test="continue"]');

  // Calculate item prices and validate subtotal
  const checkoutPriceElements = await page.$$('.inventory_item_price');
  const checkoutPrices = await Promise.all(
    checkoutPriceElements.map(el => el.innerText().then(text => parseFloat(text.replace('$', ''))))
  );
  const sum = checkoutPrices.reduce((acc, price) => acc + price, 0);

  const subtotalText = await page.locator('.summary_subtotal_label').innerText();
  const displayedSubtotal = parseFloat(subtotalText.replace('Item total: $', ''));
  expect(displayedSubtotal).toBeCloseTo(sum, 2);
});