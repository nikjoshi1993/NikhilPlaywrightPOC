const sauceDemoPage = require('../pages/sauceDemoPage');

/**
 * Adds multiple items to the cart using their names.
 * @param {object} page - Playwright page object.
 * @param {string[]} itemNames - Array of item names to add to cart.
 */
async function addItemsToCart(page, itemNames) {
    for (const name of itemNames) {
        await sauceDemoPage.addItemByName(page, name);
    }
}

module.exports = { addItemsToCart };