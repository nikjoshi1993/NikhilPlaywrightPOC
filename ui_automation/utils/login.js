const { expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');



/**
 * Logs in using the provided username and password.
 * @param {import('@playwright/test').Page} page - Playwright page object.
 * @param {string} username - Username to fill.
 * @param {string} password - Password to fill.
 * @param {object} [selectors] - Optional selectors for username, password, and login button.
 */
async function login(page, username, password) {
    const login = new LoginPage(page);
    await login.fillUsername(username);
    await login.fillPassword(password);
}

module.exports = { login };