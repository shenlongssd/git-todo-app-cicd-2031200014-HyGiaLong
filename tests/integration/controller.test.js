const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

// Mock the View because we are not testing the UI, only Controller-Model interaction.
const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = new TodoService();
        service.todos = []; // Reset singleton for tests
        controller = new Controller(service, mockView);
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        // 1. Gọi phương thức handleAddTodo của controller với chuỗi văn bản test
        const todoText = 'Test Integration Task';
        controller.handleAddTodo(todoText);

        // 2. Lấy danh sách todos trực tiếp từ service
        const todos = service.getTodos();

        // 3. Khẳng định (Assert) mảng todos của service có độ dài là 1
        expect(todos.length).toBe(1);

        // 4. Khẳng định text của todo đầu tiên trùng khớp với input
        expect(todos[0].text || todos[0].title).toBe(todoText);
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        // 1. Thêm trực tiếp một todo vào service
        service.addTodo('Task to be removed');
        
        // 2. Lấy ID của todo vừa tạo
        const todosBefore = service.getTodos();
        const todoId = todosBefore[0].id;

        // 3. Gọi phương thức handleRemoveTodo của controller với ID đó
        controller.handleRemoveTodo(todoId);

        // 4. Khẳng định mảng todos của service giờ đây đã trống (độ dài bằng 0)
        const todosAfter = service.getTodos();
        expect(todosAfter.length).toBe(0);
    });
});