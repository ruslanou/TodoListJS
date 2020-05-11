const form = document.getElementById('task-form');
const todoList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const todoInput = document.getElementById('task');

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTodos);
    form.addEventListener('submit', addTask);
    todoList.addEventListener('click', removeTodo);
    clearBtn.addEventListener('click', clearTodos);
    filter.addEventListener('keyup', filterTodo);
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(todo));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        todoList.appendChild(li);
    })
}

function addTask(e) {
    if (todoInput.value === ''){
        alert('Add a todo');
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(todoInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    todoList.appendChild(li);

    storeTodoInLocalStorage(todoInput.value);

    todoInput.value = '';

    e.preventDefault();
}

function storeTodoInLocalStorage(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo)

    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodo(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            removeTodoFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTodoFromLocalStorage(todoItem) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach((todo, index) => {
        if(todoItem.textContent === todo){
            todos.splice(index, 1);
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function clearTodos(e) {
    while(todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
    clearTodoFromLocalStorage();
}

function clearTodoFromLocalStorage() {
    localStorage.clear();
}

function filterTodo(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(task => {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}