import { sauceDemoPage } from '../page_objects/sauceDemoPage';

/**
 * Adds multiple items to the cart using their names.
 * @param {object} page - Playwright page object.
 * @param {string[]} itemNames - Array of item names to add to cart.
 */
async function addItemsToCart(page, itemNames) {
    const saucePage = new sauceDemoPage(page);
    for (const name of itemNames) {
        await saucePage.addItemByName(name);
    }
}

module.exports = { addItemsToCart };