let todos = []; // tarefas

document.getElementById("btn").addEventListener("click", addTodo);

document.getElementById("todo").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const input = document.getElementById("todo");
  const todoContent = input.value.trim();
  
  if (todoContent) {
    const todo = {
      id: todos.length + 1, 
      content: todoContent,
      completed: false
    };

    todos.push(todo);
    updateTodos();
    input.value = "";
  }
}

function checkTodo(todoId) {
  const todo = todos.find(todo => todo.id === todoId);
  
  if (todo) {
      todo.completed = !todo.completed;
      updateTodos();
  }
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  updateTodos();
}

function updateTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  todos.forEach(todo => {
    const item = document.createElement("li");
    item.id = todo.id;
    
    const todoText = document.createElement("span");
    todoText.textContent = todo.content;
    
    if (todo.completed) {
      todoText.style.textDecoration = "line-through";
    } else {
      todoText.style.textDecoration = "none";
    }

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.onclick = () => deleteTodo(todo.id);

    const completeButton = document.createElement("button");
    completeButton.textContent = todo.completed ? "Desfazer" : "Concluir";
    completeButton.onclick = () => checkTodo(todo.id);

    item.appendChild(todoText);
    item.appendChild(completeButton);
    item.appendChild(removeButton);
    
    list.appendChild(item);
  });
}