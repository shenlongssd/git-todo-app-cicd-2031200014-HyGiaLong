# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.js >> End-to-end user workflow
- Location: tests/e2e/app.spec.js:3:1

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('#add-button')

```

# Test source

```ts
  1  | const { test, expect, _electron: electron } = require('@playwright/test');
  2  | 
  3  | test('End-to-end user workflow', async () => {
  4  |     // Launch the Electron app
  5  |     const electronApp = await electron.launch({ args: ['.'] });
  6  |     const window = await electronApp.firstWindow();
  7  | 
  8  |     // 💡 THÊM DÒNG NÀY: Đợi giao diện HTML/DOM load xong hoàn toàn
  9  |     await window.waitForLoadState('domcontentloaded');
  10 | 
  11 |     const taskText = 'My new E2E test task';
  12 | 
  13 |     // --- Task 1: Add a new todo item ---
  14 |     const todoInput = window.locator('#todo-input');
  15 |     await todoInput.fill(taskText);
  16 |     
  17 |     const addButton = window.locator('#add-button');
> 18 |     await addButton.click();
     |                     ^ Error: locator.click: Target page, context or browser has been closed
  19 | 
  20 | 
  21 |     // --- Task 2: Verify the todo item was added ---
  22 |     const todoItem = window.locator('.todo-item').filter({ hasText: taskText });
  23 |     await expect(todoItem).toContainText(taskText);
  24 |     
  25 | 
  26 |     // --- Task 3: Mark the todo item as complete ---
  27 |     const checkbox = todoItem.locator('input[type="checkbox"]');
  28 |     await checkbox.click();
  29 |     await expect(todoItem).toHaveClass(/completed/);
  30 | 
  31 | 
  32 |     // --- Task 4: Delete the todo item ---
  33 |     const deleteBtn = todoItem.locator('.delete-btn');
  34 |     await deleteBtn.click();
  35 |     await expect(todoItem).not.toBeVisible();
  36 | 
  37 | 
  38 |     // Close the app
  39 |     await electronApp.close();
  40 | });
```