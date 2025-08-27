// Page Object Model for SauceDemo (Swag Labs)
class SauceDemoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.inventoryItems = page.locator('.inventory_item');
    this.addToCartButtons = page.locator('button.btn_inventory');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async addItemToCart(index = 0) {
    await this.addToCartButtons.nth(index).click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async checkout(firstName, lastName, postalCode) {
    await this.checkoutButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
    await this.finishButton.click();
  }

  async isOrderComplete() {
    return await this.completeHeader.isVisible();
  }
}

module.exports = { SauceDemoPage };
