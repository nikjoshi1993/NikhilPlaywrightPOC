// Page Object Models for UI Automation
class TodoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.newTodoInput = page.locator('.new-todo');
    this.todoItems = page.locator('.todo-list li');
    this.toggleAll = page.locator('.toggle-all');
    this.clearCompleted = page.locator('.clear-completed');
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(text) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async getTodos() {
    return await this.todoItems.allTextContents();
  }

  async toggleTodo(index) {
    await this.todoItems.nth(index).locator('.toggle').click();
  }

  async clearCompleted() {
    await this.clearCompleted.click();
  }
}

module.exports = { TodoPage };
