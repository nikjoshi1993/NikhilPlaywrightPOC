// Page Object Models for UI Automation
class loginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async fillUsername(username) {
    await this.username.fill(username);
  }

  async fillPassword(password) {
    await this.password.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}

module.exports = { loginPage };
