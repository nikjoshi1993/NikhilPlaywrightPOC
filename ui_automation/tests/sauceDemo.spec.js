const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');
const InventoryPage = require('../pageObjects/InventoryPage');
const CartPage = require('../pageObjects/CartPage');
const utils = require('../utils/utils');

test.describe('Sauce Demo - Add Items to Cart and Verify', () => {
  test('Add backpack and bike light, verify cart quantities and icon count', async ({ page }) => {
    // Navigate to Sauce Demo
    await page.goto('https://www.saucedemo.com/');

    // Login using page object and utils
    const loginPage = new LoginPage(page);
    await utils.login(loginPage, 'standard_user', 'secret_sauce');


  });
});