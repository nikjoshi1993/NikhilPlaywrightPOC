// UI Automation Test Suite using Page Object Model and Playwright standards
const { test, expect, describe } = require('@playwright/test');
const { TodoPage } = require('../page_objects/pages');

describe('TodoMVC UI Automation', () => {
  test('should add a new todo item', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await todo.addTodo('Learn Playwright');
    const todos = await todo.getTodos();
    expect(todos).toContain('Learn Playwright');
  });

  test('should toggle a todo item as completed', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await todo.addTodo('Complete this task');
    await todo.toggleTodo(0);
    // Check if the first todo item has completed class
    const firstItem = await page.locator('.todo-list li').first();
    await expect(firstItem).toHaveClass(/completed/);
  });

  test('should clear completed todos', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await todo.addTodo('Task to complete');
    await todo.toggleTodo(0);
    await todo.clearCompleted();
    const todos = await todo.getTodos();
    expect(todos).not.toContain('Task to complete');
  });

  test('should add multiple todos and verify count', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await todo.addTodo('Task 1');
    await todo.addTodo('Task 2');
    await todo.addTodo('Task 3');
    const todos = await todo.getTodos();
    expect(todos.length).toBeGreaterThanOrEqual(3);
  });

  test('should not add empty todo', async ({ page }) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await todo.addTodo('');
    const todos = await todo.getTodos();
    expect(todos).not.toContain('');
  });
});
