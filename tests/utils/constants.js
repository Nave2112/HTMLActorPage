export const CREDENTIALS = {
    STANDARD_USER: {
      username: 'standard_user',
      password: 'secret_sauce'
    },
    LOCKED_USER: {
      username: 'locked_out_user',
      password: 'secret_sauce'
    }
  };
  
  export const ITEMS = {
    BIKE_LIGHT: 'Sauce Labs Bike Light',
    BACKPACK: 'Sauce Labs Backpack',
    BOLT_TSHIRT: 'Sauce Labs Bolt T-Shirt'
  };
  
  export const CHECKOUT_INFO = {
    FIRST_NAME: 'John',
    LAST_NAME: 'Doe',
    ZIP_CODE: '12345'
  };

  
// test.describe('SauceDemo Tests', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');
//     await login(page, CREDENTIALS.STANDARD_USER);
//   //  await login(page, 'standard_user', 'secret_sauce');
//   });

//   test('Add items to cart and checkout', async ({ page }) => {
    
//     await sortByDescendAndPriceHighToLow(page);
//     await addItemsToCart(page, [ITEMS.BACKPACK,ITEMS.BIKE_LIGHT,ITEMS.BOLT_TSHIRT]);
//     await goToCart(page);
//   //  await checkout(page, 'John', 'Doe', '12345');
//     await checkout(page)
//     await addInventory(page)
    
//     await validateSubtotal(page); 
//     await completeOrder(page)
    
    
//   });