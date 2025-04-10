const todos = [];
const TodoFilter = {
  ALL: "all",
  DONE: "done",
  PENDING: "pending",
};

const todoInput = document.getElementById("todo");
const addButton = document.getElementById("btn");
const allFilter = document.getElementById("all");
const doneFilter = document.getElementById("done");
const pendingFilter = document.getElementById("pending");
const todoList = document.getElementById("todo-list");

function addTodo() {
  const todoText = todoInput.value.trim();
  
  if (todoText) {
    const newTodo = {
      id: Date.now(),
      text: todoText,
      done: false
    };
    todos.push(newTodo);
    todoInput.value = "";
    renderTodos();
  }
}

function toggleTodoStatus(todoId) {
  const todo = todos.find(todo => todo.id === todoId);
  if (todo) {
      todo.done = !todo.done;
      renderTodos();
  }
}

function renderTodos(filter = TodoFilter.ALL) {
  todoList.innerHTML = "";
  const filteredTodos = todos.filter(todo => {
    if (filter === TodoFilter.ALL) return true;
    if (filter === TodoFilter.DONE) return todo.done;
    if (filter === TodoFilter.PENDING) return !todo.done;
  });
  if (filteredTodos.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "Nenhuma tarefa encontrada";
    todoList.appendChild(emptyMessage);
    return;
  }
  filteredTodos.forEach(todo => {
    const todoItem = document.createElement("li");
    
    const todoText = document.createElement("span");
    todoText.textContent = todo.text;
    if (todo.done) {
      todoText.style.textDecoration = "line-through";
      todoText.style.color = "#888";
    }
    todoItem.appendChild(todoText);

    const statusButton = document.createElement("button");
    statusButton.textContent = todo.done ? "Desfazer" : "Concluir";
    statusButton.onclick = () => toggleTodoStatus(todo.id);
    todoItem.appendChild(statusButton);
    todoList.appendChild(todoItem);
  });
}

addButton.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

allFilter.addEventListener("click", (e) => {
  e.preventDefault();
  renderTodos(TodoFilter.ALL);
});

doneFilter.addEventListener("click", (e) => {
  e.preventDefault();
  renderTodos(TodoFilter.DONE);
});

pendingFilter.addEventListener("click", (e) => {
  e.preventDefault();
  renderTodos(TodoFilter.PENDING);
});

document.addEventListener("DOMContentLoaded", () => {
  renderTodos();
});

document.querySelectorAll('.filters a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('.filters a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});