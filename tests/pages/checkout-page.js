class CheckoutPage {
    constructor(page) {
      this.page = page;
      this.firstNameInput = page.locator('[data-test="firstName"]');
      this.lastNameInput = page.locator('[data-test="lastName"]');
      this.postalCodeInput = page.locator('[data-test="postalCode"]');
      this.continueButton = page.locator('[data-test="continue"]');
    }
  
    async fillUserDetails(details) {
      await this.firstNameInput.fill(details.firstName);
      await this.lastNameInput.fill(details.lastName);
      await this.postalCodeInput.fill(details.postalCode);
    }
  
    async continueToOverview() {
      await this.continueButton.click();
    }
  
    async getItemPrices() {
      const priceElements = await this.page.$$(".inventory_item_price");
      const priceTexts = await Promise.all(priceElements.map(el => el.innerText()));
      return priceTexts.map(text => parseFloat(text.replace("$", "")));
    }
  
    async getSubtotal() {
      return this.page.locator(".summary_subtotal_label").innerText();
    }
  }
  
  module.exports = { CheckoutPage };