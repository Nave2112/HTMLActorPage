// tests/saucedemo-with-pages.spec.js
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login-page");
const { InventoryPage } = require("../pages/inventory-page");
const { CartPage } = require("../pages/cart-page");
const { CheckoutPage } = require("../pages/checkout-page");

// Test data
const TEST_USER = {
    username: "standard_user",
    password: "secret_sauce"
  };
  
  const CUSTOMER_INFO = {
    firstName: "John",
    lastName: "Doe",
    postalCode: "12345"
  };
  
  const PRODUCTS_TO_ADD = [
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Bike Light"
  ];
  
  test.describe("SauceDemo E2E Tests", () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      await loginPage.login(TEST_USER.username, TEST_USER.password);
      await expect(page).toHaveURL(/inventory.html/);
    });
  
    test("Verify Z-A product sorting", async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      
      await inventoryPage.sortProducts("za");
      const productNames = await inventoryPage.getProductNames();
      const sortedNames = [...productNames].sort().reverse();
      
      expect(productNames).toEqual(sortedNames);
    });
  
    test("Verify price high-to-low sorting", async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      
      await inventoryPage.sortProducts("hilo");
      const prices = await inventoryPage.getProductPrices();
      const sortedPrices = [...prices].sort((a, b) => b - a);
      
      expect(prices).toEqual(sortedPrices);
    });
  
    test("Complete checkout flow", async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);
  
      // Add products to cart
      for (const product of PRODUCTS_TO_ADD) {
        await inventoryPage.addToCart(product);
      }
  
      // Verify cart and proceed to checkout
      await inventoryPage.openCart();
      expect(await cartPage.getCartItemsCount()).toBe(PRODUCTS_TO_ADD.length);
      await cartPage.proceedToCheckout();
  
      // Fill customer information
      await checkoutPage.fillCustomerDetails(CUSTOMER_INFO);
      await checkoutPage.continueToOverview();
  
      // Verify order summary
      const itemTotal = await checkoutPage.calculateItemsTotal();
      expect(await checkoutPage.getSubtotal()).toBe(itemTotal);
  
      // Complete order
      await checkoutPage.finishOrder();
      await expect(page.getByText("Thank you for your order!")).toBeVisible();
    });
  
    // BONUS: Visual test
    test("Visual regression - inventory page", async ({ page }) => {
      await expect(page).toHaveScreenshot("inventory-page.png", {
        threshold: 0.1,
        maxDiffPixels: 100
      });
    });
  
    // BONUS: Accessibility test
    test("Accessibility scan - inventory page", async ({ page }) => {
      const accessibilityScanResults = await page.accessibility.snapshot();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });