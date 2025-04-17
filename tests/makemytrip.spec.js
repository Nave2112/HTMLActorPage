
// import { test, expect } from '@playwright/test';
// const AxeBuilder = require('@axe-core/playwright').default; 
// import { CHECKOUT_INFO, CREDENTIALS, ITEMS } from './utils/constants';
// import {
//   login,
//   sortByDescendAndPriceHighToLow,
//   addItemsToCart,
//   goToCart,
//   checkout,
//   addInventory,
//   validateSubtotal,
//   completeOrder,
// } from './utils/helperss';

// test.describe('SauceDemo Tests', () => {
//   test.beforeEach(async ({ page }) => { 
//   await page.goto('https://www.saucedemo.com/'); 
//   const accessibilityScanResults = await new AxeBuilder({ page })
//       .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
//       .analyze();

      

//   expect(accessibilityScanResults.violations).toEqual([]);
//   });

 
//   test('Add items to cart and checkout with visual and accessibility checks', async ({ page }) => {
    
//     // 1. Authentication
//     await test.step('Login and verify inventory page', async () => {
//       await login(page, CREDENTIALS.STANDARD_USER);    
//       await expectNoAxeViolations(page);
//     });

//     // 2. Sorting and Verification
//     await test.step('Sort products and verify', async () => {
//       await sortByDescendAndPriceHighToLow(page); 
//     });

//     // 3. Cart Operations
//     await test.step('Add items and proceed to checkout', async () => {
//       await addItemsToCart(page, [ITEMS.BACKPACK, ITEMS.BIKE_LIGHT, ITEMS.BOLT_TSHIRT]);
//       await goToCart(page);
//       await checkout(page);
//     });

//     // 4. Order Validation
//     await test.step('Complete and verify order', async () => {
//       await addInventory(page);
//       await validateSubtotal(page);
//       await completeOrder(page);
//       await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    
//     });
//   });

// });


//d start
// main test file
import { test, expect } from '@playwright/test';
import { CHECKOUT_INFO, CREDENTIALS, ITEMS } from './utils/constants';
import {
  login,
  sortByDescendAndPriceHighToLow,
  addItemsToCart,
  goToCart,
  checkout,
  addInventory,
  validateSubtotal,
  completeOrder,
} from './utils/helperss';

test.describe('SauceDemo Tests', () => {
  test.beforeEach(async ({ page }) => { 
    await page.goto('https://www.saucedemo.com/');
    // Removed standalone accessibility check - now handled in login()
  });

  test('Add items to cart and checkout', async ({ page }) => {
    // 1. Authentication
    await test.step('Login', async () => {
      await login(page, CREDENTIALS.STANDARD_USER); // Accessibility check built in
    });

    // 2. Sorting
    await test.step('Sort products', async () => {
      await sortByDescendAndPriceHighToLow(page); // Accessibility check built in
    });

    // 3. Cart Operations
    await test.step('Add items and checkout', async () => {
      await addItemsToCart(page, [ITEMS.BACKPACK, ITEMS.BIKE_LIGHT, ITEMS.BOLT_TSHIRT]);
      await goToCart(page);
      await checkout(page);
    });

    // 4. Order Completion
    await test.step('Complete order', async () => {
      await addInventory(page);
      await validateSubtotal(page);
      await completeOrder(page);
    });
  });
});
// d end




// test.describe('SauceDemo Tests', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');
//   //  await login(page, 'standard_user', 'secret_sauce');
//   });

//   test('Add items to cart and checkout', async ({ page }) => {
//     await login(page, CREDENTIALS.STANDARD_USER);
//     await sortByDescendAndPriceHighToLow(page);
//     await addItemsToCart(page, [ITEMS.BACKPACK,ITEMS.BIKE_LIGHT,ITEMS.BOLT_TSHIRT]);
//     await goToCart(page);
//   //  await checkout(page, 'John', 'Doe', '12345');
//     await checkout(page)
//     await addInventory(page)
    
//     await validateSubtotal(page); 
//     await completeOrder(page)
    
    
//   });




  // --- Helper Functions (in the same file) ---
//   async function login(page, username, password) {
//     await page.fill('#user-name', username);
//     await page.fill('#password', password);
//     await page.screenshot({ path: 'screenshots/login.png', fullPage: true });
//     await expect(page).toHaveScreenshot('login.png');
//     await page.click('#login-button');
//    // await page.screenshot({ path: 'homepage.png', fullPage: true });
    
//   //  await expect(page).toHaveScreenshot('homepage-expected.png', { fullPage: true });
//   }

//   async function sortByDescendAndPriceHighToLow(page) {
//     await page.waitForSelector('select')
//     await page.locator('select').selectOption('za');
//     await page.locator('select').selectOption('za');
//     await expect(page.locator('select')).toHaveValue('za');
//     await page.screenshot({ path: 'screenshots/descending.png', fullPage: true });
//     await expect(page).toHaveScreenshot({ fullPage: true });

//     // Verify items are sorted
//     // Wait for inventory list to reflect sorting
//     // ensure items are visible
//     const items = await page.locator('.inventory_item_name').allTextContents();
//     const sortedItems = items.sort().reverse();
//     expect(items).toEqual(sortedItems);
     
   
//     await page.selectOption('.product_sort_container', 'hilo');
//     const prices = await page.locator('.inventory_item_price').allTextContents();
//     const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
//     const sortedPrices = [...priceValues].sort((a, b) => b - a);
//     expect(priceValues).toEqual(sortedPrices);
//     await page.screenshot({ path: 'screenshots/hightoLow.png', fullPage: true });
//     await expect(page).toHaveScreenshot({ fullPage: true });

//   }

//   async function addItemsToCart(page, items) {
//     for (const itemName of items) {
      
//       const item = page.locator(`.inventory_item:has-text("${itemName}")`);
//       await item.locator('button:text("Add to cart")').click();
//       await page.screenshot({ path: 'screenshots/addItemsToCart.png', fullPage: true });
//       await expect(page).toHaveScreenshot({ fullPage: true });


//     }
//   }

//   async function goToCart(page) {
    
//     await page.click('.shopping_cart_link');
//     await expect(page).toHaveURL(/cart.html/);
//     await page.screenshot({ path: 'screenshots/cartSection.png', fullPage: true });
//     await expect(page).toHaveScreenshot({ fullPage: true });

//   }
//   async function checkout(page, firstName, lastName, zipCode) {
//     await page.click('#checkout');
//     await page.fill('#first-name', firstName);
//     await page.fill('#last-name', lastName);
//     await page.fill('#postal-code', zipCode);
//     await page.click('#continue');
    
//     await page.screenshot({ path: 'screenshots/checkout.png', fullPage: true });
//     //await expect(page).toHaveScreenshot({ fullPage: true });

//   }

//   let sum = 0;

// async function addInventory(page) {
//   const prices = await page.locator('.inventory_item_price').allTextContents();
//   for (const price of prices) {
//     const modifyPrice = price.split('$')[1].trim();
//     sum += Number(modifyPrice);
//   }
//   await page.screenshot({ path: 'screenshots/inventory_item_price.png', fullPage: true });
// }

// async function validateSubtotal(page) {
     
//   const subtotalText = await page.locator('.summary_subtotal_label').textContent();
//   const subtotal = Number(subtotalText.split('$')[1].trim());
//   expect(subtotal).toBe(sum);
//   await page.screenshot({ path: 'screenshots/validateSubtotal.png', fullPage: true });
  
// }

// async function completeOrder(page){
//   await page.click("#finish")
//   await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
//   await page.screenshot({ path: 'screenshots/finish.png', fullPage: true });
   
// }

