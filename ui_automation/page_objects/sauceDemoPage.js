// Page Object Model for SauceDemo (Swag Labs)
class sauceDemoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async clickCartIcon() {
    await this.cartIcon.click();
  }

  async addItemByName(itemName) {
    const itemLocator = this.page.locator(`#add-to-cart-${itemName}`);
    await itemLocator.click();
  }

  async verifyCartCount(expectedCount) {
    await this.cartBadge.waitFor({ state: 'visible' });
    const countText = await this.cartBadge.textContent();
    return countText === expectedCount.toString();
  }
}

module.exports = { sauceDemoPage };
