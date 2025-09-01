const { loginPage } = require('../page_objects/loginPage');

/**
 * Logs in using the provided username and password.
 * @param {import('@playwright/test').Page} page - Playwright page object.
 * @param {string} username - Username to fill.
 * @param {string} password - Password to fill.
 * @param {object} [selectors] - Optional selectors for username, password, and login button.
 */
async function login(page, username, password) {
    const login = new loginPage(page);
    await login.fillUsername(username);
    await login.fillPassword(password);
    await login.clickLogin();
}

module.exports = { login };