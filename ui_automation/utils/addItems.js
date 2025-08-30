class AddItems {
    constructor(page) {
        this.page = page;
    }

    async addItemToCart(itemSelector, addToCartButtonSelector) {
        await this.page.waitForSelector(addToCartButtonSelector);
        await this.page.click(itemSelector);

    }

    async addMultipleItemsToCart(items) {
        for (const { itemSelector, addToCartButtonSelector } of items) {
            await this.addItemToCart(itemSelector, addToCartButtonSelector);
        }
    }
}

module.exports = AddItems;