class CartPage {
    constructor(page) {
      this.page = page;
      this.checkoutButton = page.locator('[data-test="checkout"]');
    }
  
    async getCartItemNames() {
      const itemNameElements = await this.page.$$(".inventory_item_name");
      return Promise.all(itemNameElements.map(el => el.innerText()));
    }
  
    async startCheckout() {
      await this.checkoutButton.click();
    }
  }
  
  module.exports = { CartPage };