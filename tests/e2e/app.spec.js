const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    // Launch the Electron app
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();

    // 💡 THÊM DÒNG NÀY: Đợi giao diện HTML/DOM load xong hoàn toàn
    await window.waitForLoadState('domcontentloaded');

    const taskText = 'My new E2E test task';

    // --- Task 1: Add a new todo item ---
    const todoInput = window.locator('#todo-input');
    await todoInput.fill(taskText);
    
    const addButton = window.locator('#add-button');
    await addButton.click();


    // --- Task 2: Verify the todo item was added ---
    const todoItem = window.locator('.todo-item').filter({ hasText: taskText });
    await expect(todoItem).toContainText(taskText);
    

    // --- Task 3: Mark the todo item as complete ---
    const checkbox = todoItem.locator('input[type="checkbox"]');
    await checkbox.click();
    await expect(todoItem).toHaveClass(/completed/);


    // --- Task 4: Delete the todo item ---
    const deleteBtn = todoItem.locator('.delete-btn');
    await deleteBtn.click();
    await expect(todoItem).not.toBeVisible();


    // Close the app
    await electronApp.close();
});