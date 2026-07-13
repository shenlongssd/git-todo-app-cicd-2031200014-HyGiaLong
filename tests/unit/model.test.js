const { TodoService } = require('../../js/model');

describe('TodoService Unit Tests', () => {
    let service;

    beforeEach(() => {
        // Create a new service instance for each test to ensure isolation
        service = new TodoService();
        // This is a bit of a hack to reset the singleton for testing purposes
        service.todos = [];
        
    });
    

    test('should add a new todo', () => {
        // TODO: Call the addTodo method with some text.
        // Then, assert that the service's todos array has a length of 1.
        // Assert that the text of the first todo matches the input text.
        //-----------
        const todoText = 'Learn CICD';
        
        // 1. Gọi phương thức addTodo với một đoạn văn bản
        service.addTodo(todoText);
        
        // Lấy danh sách todos ra để thực hiện kiểm tra (assertions)
        const todos = service.getTodos();
        
        // 2. Kiểm tra service's todos array có độ dài là 1 
        expect(todos).toHaveLength(1);
        
        // 3. Kiểm tra text của phần tử đầu tiên khớp với text nhập vào
        expect(todos[0].text).toBe(todoText);
        
        // Kiểm tra thêm trạng thái mặc định phải là false 
        expect(todos[0].completed).toBe(false);
        //----------
    });

    test('should toggle the completed state of a todo', () => {
        // TODO: First, add a todo.
        // Then, get its ID and call the toggleTodoComplete method.
        // Assert that the 'completed' property of that todo is now true.
        // Call toggleTodoComplete again and assert that it's false.
        //--------------
        // 1. Đầu tiên, thêm một công việc mới
        service.addTodo('Test Toggle Logic');
        
        // Lấy danh sách việc ra để tìm ID của việc vừa thêm
        const todos = service.getTodos();
        const todoId = todos[0].id;

        // 2. Gọi hàm toggleTodoComplete lần 1 (Đổi từ false -> true)
        service.toggleTodoComplete(todoId);

        // 3. Kiểm tra xem trạng thái 'completed' đã là true chưa 
        expect(todos[0].completed).toBe(true);

        // 4. Gọi hàm toggleTodoComplete lần 2 (Đổi từ true -> false)
        service.toggleTodoComplete(todoId);

        // Kiểm tra xem trạng thái đã quay về false chưa
        expect(todos[0].completed).toBe(false);
        //--------------
    });

    test('should remove a todo', () => {
        // TODO: Add a todo.
        // Get its ID and call the removeTodo method.
        // Assert that the service's todos array is now empty (length of 0).
        //----------
        // 1. Đầu tiên, thêm một công việc mới
        service.addTodo('Test Delete Logic');
        
        // Lấy danh sách việc ra để lấy ID của việc vừa thêm
        const todos = service.getTodos();
        const todoId = todos[0].id;

        // 2. Gọi hàm removeTodo với ID vừa lấy để xóa công việc đó đi
        service.removeTodo(todoId);

        // 3. Kiểm tra xem mảng todos đã trống rỗng (độ dài bằng 0) chưa
        expect(service.getTodos()).toHaveLength(0);
        //----------
    });

    test('should not add a todo if text is empty', () => {
        // TODO: Call addTodo with an empty string.
        // Assert that the todos array still has a length of 0.
        //--------
        // 1. Gọi hàm addTodo với một chuỗi rỗng
        service.addTodo('');
        
        // 2. Kiểm tra xem mảng todos vẫn có độ dài bằng 0
        expect(service.getTodos()).toHaveLength(0);
        //--------
    });
});
