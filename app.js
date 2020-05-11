const form = document.getElementById('task-form');
const todoList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const todoInput = document.getElementById('task');

loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    todoList.addEventListener('click', removeTodo);
    clearBtn.addEventListener('click', clearTodos);
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

    todoInput.value = '';

    e.preventDefault();
}

function removeTodo(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

function clearTodos(e) {
    while(todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
}