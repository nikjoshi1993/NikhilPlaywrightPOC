const { test, expect } = require('@playwright/test');
const loginUtils = require('../utils/login');

test.describe('Sauce Demo - Add Items to Cart and Verify', () => {
  test.describe.configure({ mode: 'serial' });

  let context, page;

  test('Login', async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');
    // Login using page object and utils
    await loginUtils.login(page, 'standard_user', 'secret_sauce');

  });

  test('Add Items to Cart and verify count on cart icon', async () => {
    // Add first item to cart
    
  });

  test('Go to cart and veriofy that items are added or not', async () => {
    // Add second item to cart
    
  });



});