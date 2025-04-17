// import { CREDENTIALS, ITEMS, CHECKOUT_INFO } from './constants';

// import { expect } from '@playwright/test';

// // --- LOGIN ---

// export async function login(page, user) {
//     await page.fill('#user-name', user.username);
//     await page.fill('#password', user.password);
//     await page.screenshot({ path: 'screenshots/login.png', fullPage: true });
//    // await expect(page).toHaveScreenshot('login.png');
//     await page.click('#login-button');
//   }
  

// export async function sortByDescendAndPriceHighToLow(page) {
//       await page.waitForSelector('select')
//       await page.locator('select').selectOption('za');
//       await page.locator('select').selectOption('za');
//       await expect(page.locator('select')).toHaveValue('za');
//       await page.screenshot({ path: 'screenshots/descending.png', fullPage: true });
//   //    await expect(page).toHaveScreenshot({ fullPage: true });
  
    
//       const items = await page.locator('.inventory_item_name').allTextContents();
//       const sortedItems = items.sort().reverse();
//       expect(items).toEqual(sortedItems);

//       await page.selectOption('.product_sort_container', 'hilo');
//           const prices = await page.locator('.inventory_item_price').allTextContents();
//           const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
//           const sortedPrices = [...priceValues].sort((a, b) => b - a);
//           expect(priceValues).toEqual(sortedPrices);
//           await page.screenshot({ path: 'screenshots/hightoLow.png', fullPage: true });
//       //    await expect(page).toHaveScreenshot({ fullPage: true });
      
//         }

//   export async function addItemsToCart(page, items) {
//       for (const itemName of items) {
        
//         const item = page.locator(`.inventory_item:has-text("${itemName}")`);
//         await item.locator('button:text("Add to cart")').click();
//       }
//         await page.screenshot({ path: 'screenshots/addItemsToCart.png', fullPage: true });
//      //   await expect(page).toHaveScreenshot({ fullPage: true });
//     }

//   export async function goToCart(page) {
        
//         await page.click('.shopping_cart_link');
//         await expect(page).toHaveURL(/cart.html/);
//         await page.screenshot({ path: 'screenshots/cartSection.png', fullPage: true });
//      //   await expect(page).toHaveScreenshot({ fullPage: true });
    
//       }
//   export async function checkout(page, userInfo = CHECKOUT_INFO) {
//         await page.click('#checkout');
//         await page.fill('#first-name', userInfo.FIRST_NAME);
//         await page.fill('#last-name', userInfo.LAST_NAME);
//         await page.fill('#postal-code', userInfo.ZIP_CODE);
//         await page.click('#continue');
        
//         await page.screenshot({ path: 'screenshots/checkout.png', fullPage: true });
//         //await expect(page).toHaveScreenshot({ fullPage: true });
    
//       }

    
//       let sum = 0;
    
//   export async function addInventory(page) {
//       const prices = await page.locator('.inventory_item_price').allTextContents();
//       for (const price of prices) {
//         const modifyPrice = price.split('$')[1].trim();
//         sum += Number(modifyPrice);
//       }
//       await page.screenshot({ path: 'screenshots/inventory_item_price.png', fullPage: true });
//     }
    
//   export async function validateSubtotal(page) {
         
//       const subtotalText = await page.locator('.summary_subtotal_label').textContent();
//       const subtotal = Number(subtotalText.split('$')[1].trim());
//       expect(subtotal).toBe(sum);
//       await page.screenshot({ path: 'screenshots/validateSubtotal.png', fullPage: true });
      
//     } 
    
//   export async function completeOrder(page){
//       await page.click("#finish")
//       await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
//       await page.screenshot({ path: 'screenshots/finish.png', fullPage: true });
       
//     }

//d start
//main
import { CREDENTIALS, ITEMS, CHECKOUT_INFO } from './constants';
import { expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

// --- ACCESSIBILITY HELPER ---
async function checkAccessibility(page, context = null) {
  const builder = new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
    .disableRules(['color-contrast']); // Temporarily disable color contrast checks

  if (context) {
    builder.include(context);
  }

  const results = await builder.analyze();
  
  if (results.violations.length > 0) {
    await page.screenshot({ path: `screenshots/a11y-violation-${Date.now()}.png` });
    console.error('Accessibility violations:', JSON.stringify(results.violations, null, 2));
  }
}

// --- LOGIN ---
export async function login(page, user) {
  await page.fill('#user-name', user.username);
  await page.fill('#password', user.password);
  await page.screenshot({ path: 'screenshots/login.png', fullPage: true });
  await page.click('#login-button');
  await checkAccessibility(page, '.inventory_container');
}

// --- SORTING ---
export async function sortByDescendAndPriceHighToLow(page) {
  await page.waitForSelector('select');
  await page.locator('select').selectOption('za');
  await expect(page.locator('select')).toHaveValue('za');
  await page.screenshot({ path: 'screenshots/descending.png', fullPage: true });

  const items = await page.locator('.inventory_item_name').allTextContents();
  const sortedItems = items.sort().reverse();
  expect(items).toEqual(sortedItems);

  await page.selectOption('.product_sort_container', 'hilo');
  const prices = await page.locator('.inventory_item_price').allTextContents();
  const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
  const sortedPrices = [...priceValues].sort((a, b) => b - a);
  expect(priceValues).toEqual(sortedPrices);
  await page.screenshot({ path: 'screenshots/hightoLow.png', fullPage: true });
  await checkAccessibility(page, '.inventory_list');
}

// --- CART OPERATIONS ---
export async function addItemsToCart(page, items) {
  for (const itemName of items) {
    const item = page.locator(`.inventory_item:has-text("${itemName}")`);
    await item.locator('button:text("Add to cart")').click();
  }
  await page.screenshot({ path: 'screenshots/addItemsToCart.png', fullPage: true });
  await checkAccessibility(page, '.inventory_list');
}

export async function goToCart(page) {
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart.html/);
  await page.screenshot({ path: 'screenshots/cartSection.png', fullPage: true });
  await checkAccessibility(page, '#cart_contents_container');
}

// --- CHECKOUT ---
export async function checkout(page, userInfo = CHECKOUT_INFO) {
  await page.click('#checkout');
  await checkAccessibility(page, '.checkout_info_wrapper');
  
  await page.fill('#first-name', userInfo.FIRST_NAME);
  await page.fill('#last-name', userInfo.LAST_NAME);
  await page.fill('#postal-code', userInfo.ZIP_CODE);
  await page.screenshot({ path: 'screenshots/checkout.png', fullPage: true });
  
  await checkAccessibility(page, '.checkout_buttons');
  await page.click('#continue');
}

// --- ORDER VALIDATION ---
let sum = 0;

export async function addInventory(page) {
  const prices = await page.locator('.inventory_item_price').allTextContents();
  for (const price of prices) {
    const modifyPrice = price.split('$')[1].trim();
    sum += Number(modifyPrice);
  }
  await page.screenshot({ path: 'screenshots/inventory_item_price.png', fullPage: true });
}

export async function validateSubtotal(page) {
  const subtotalText = await page.locator('.summary_subtotal_label').textContent();
  const subtotal = Number(subtotalText.split('$')[1].trim());
  expect(subtotal).toBe(sum);
  await page.screenshot({ path: 'screenshots/validateSubtotal.png', fullPage: true });
  await checkAccessibility(page, '.summary_info');
}

export async function completeOrder(page) {
  await page.click("#finish");
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  await page.screenshot({ path: 'screenshots/finish.png', fullPage: true });
  await checkAccessibility(page, '#checkout_complete_container');
}
//d end