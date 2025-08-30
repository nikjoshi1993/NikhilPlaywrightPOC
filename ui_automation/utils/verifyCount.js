/**
 * Common utility to verify item quantities in the cart using methods from cartPage and sauceDemoPage.
 * @param {Object} cartPage - Instance of cartPage with verifyItemQuantity method.
 * @param {Object} sauceDemoPage - Instance of sauceDemoPage with verifyCartCount method.
 * @param {Array<{item: string, quantity: number}>} items - Array of items and their expected quantities.
 */
async function verifyAllItemQuantities(cartPage, sauceDemoPage, items) {
    for (const { item, quantity } of items) {
        // Verify individual item quantity in the cart
        await cartPage.verifyItemQuantity(item, quantity);
    }
    // Verify total cart count matches sum of quantities
    const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
    await sauceDemoPage.verifyCartCount(totalQuantity);
}

module.exports = { verifyAllItemQuantities };