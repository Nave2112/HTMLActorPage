class InventoryPage {
    constructor(page) {
      this.page = page;
      this.sortDropdown = page.locator("select.product_sort_container");
      this.cartLink = page.locator("a.shopping_cart_link");
    }
  
    async selectSortOption(option) {
      await this.sortDropdown.selectOption(option);
    }
  
    async getItemNames() {
      const itemNameElements = await this.page.$$(".inventory_item_name");
      return Promise.all(itemNameElements.map(el => el.innerText()));
    }
  
    async getItemPrices() {
      const priceElements = await this.page.$$(".inventory_item_price");
      const priceTexts = await Promise.all(priceElements.map(el => el.innerText()));
      return priceTexts.map(text => parseFloat(text.replace("$", "")));
    }
  
    async addItemToCart(itemName) {
      await this.page.click(
        `xpath=//div[contains(@class, 'inventory_item') and .//div[text()='${itemName}']]//button`
      );
    }
  
    async goToCart() {
      await this.cartLink.click();
    }
  }
  
  module.exports = { InventoryPage };