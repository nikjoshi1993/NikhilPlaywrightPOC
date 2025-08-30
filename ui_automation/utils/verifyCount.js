/**
 * Utility function to verify the count of card elements on a page.
 * @param {import('@playwright/test').Page} page - Playwright page object.
 * @param {string} cardSelector - CSS selector for the card elements.
 * @param {number} expectedCount - Expected number of cards.
 * @returns {Promise<void>}
 */
async function verifyCardCount(page, cardSelector, expectedCount) {
    const cards = await page.$$(cardSelector);
    if (cards.length !== expectedCount) {
        throw new Error(
            `Expected ${expectedCount} cards, but found ${cards.length}.`
        );
    }
}

module.exports = { verifyCardCount };