const { expect } = require('@playwright/test');

class CartPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.cartItemSelector = '.cart_item';
        this.cartQuantitySelector = '.cart_quantity';
        this.itemNameSelector = '.inventory_item_name';
    }

    /**
     * Verifies the quantity for a specific item in the cart by item name.
     * @param {string} itemName - The name of the item to verify.
     * @param {number} expectedQuantity - The expected quantity for the item.
     */
    async verifyItemQuantity(itemName, expectedQuantity) {
        const cartItems = await this.page.$$(this.cartItemSelector);
        for (const item of cartItems) {
            const name = await item.$eval(this.itemNameSelector, el => el.textContent.trim());
            if (name === itemName) {
                const quantity = await item.$eval(this.cartQuantitySelector, el => Number(el.textContent.trim()));
                expect(quantity).toBe(expectedQuantity);
                return;
            }
        }
        throw new Error(`Item "${itemName}" not found in cart`);
    }

    /**
     * Verifies the quantity for all items in the cart.
     * @param {Object} expectedQuantities - Object with item names as keys and expected quantities as values.
     * Example: { "Sauce Labs Backpack": 1, "Sauce Labs Bike Light": 2 }
     */
    async verifyAllItemQuantities(expectedQuantities) {
        const cartItems = await this.page.$$(this.cartItemSelector);
        for (const item of cartItems) {
            const name = await item.$eval(this.itemNameSelector, el => el.textContent.trim());
            const quantity = await item.$eval(this.cartQuantitySelector, el => Number(el.textContent.trim()));
            if (expectedQuantities.hasOwnProperty(name)) {
                expect(quantity).toBe(expectedQuantities[name]);
            }
        }
    }
}

module.exports = { CartPage };