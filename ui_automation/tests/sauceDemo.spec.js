// UI Automation Test Suite for SauceDemo using Page Object Model
const { test, expect, describe } = require('@playwright/test');
const { SauceDemoPage } = require('../page_objects/sauceDemoPage');
const { verifyCardCount } = require('../utils/verifyCount');
const AddItems = require('../utils/addItems');

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

describe('SauceDemo (Swag Labs) UI Automation', () => {
  test.describe.configure({ mode: 'serial' });
  
  test('should login successfully with valid credentials', async ({ page }) => {
    const sauce = new SauceDemoPage(page);
    await sauce.goto();
    await sauce.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('should add an item to the cart', async ({ page }) => {
    const sauce = new SauceDemoPage(page);
    await sauce.goto();
    await sauce.login(USERNAME, PASSWORD);
    const addItems = new AddItems(page);
    await addItems.addItemToCart('.inventory_item', 'button.btn_inventory');
    await sauce.goToCart();
    await verifyCardCount(page, '.cart_item', 1);
  });

  test('should complete checkout process', async ({ page }) => {
    const sauce = new SauceDemoPage(page);
    await sauce.goto();
    await sauce.login(USERNAME, PASSWORD);
    await sauce.addItemToCart(0);
    await sauce.goToCart();
    await sauce.checkout('John', 'Doe', '12345');
    expect(await sauce.isOrderComplete()).toBe(true);
  });

  test('should show error for locked out user', async ({ page }) => {
    const sauce = new SauceDemoPage(page);
    await sauce.goto();
    await sauce.login('locked_out_user', PASSWORD);
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('should add multiple items to cart and verify', async ({ page }) => {
    const sauce = new SauceDemoPage(page);
    await sauce.goto();
    await sauce.login(USERNAME, PASSWORD);
    const addItems = new AddItems(page);
    // Add first item
    await addItems.addMultipleItemsToCart([
      '.inventory_item:nth-child(1) button.btn_inventory',
      '.inventory_item:nth-child(2) button.btn_inventory'
    ]);
    // Add second item
    await sauce.goToCart();
    await verifyCardCount(page, '.cart_item', 1);
  });
});
