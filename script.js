// ELEMENTS
const addButton = document.getElementById("add-btn");
const addInput = document.querySelector("#add-input");
const todoList = document.querySelector(".todo-list");
const alertText = document.querySelector(".alert-text");
const editButton = document.getElementById("edit-btn");
const deleteButton = document.getElementById("delete-btn");

const todos = [];

// UPDATE TODOS
const updateTodos = () => {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const todoItem = `
        <li class="todo-item">
          <span class="todo-text">${todo}</span>

          <button class="todo-btn" id="edit-btn">
            <i class="fa fa-edit"></i>
          </button>
          <button class="todo-btn" id="delete-btn" data-index=${index} onclick="deleteTodo(this)">
            <i class="fa fa-trash"></i>
          </button>
        </li>
        `;
    todoList.innerHTML += todoItem;
  });
};

// ADD NEW TODO
addButton.addEventListener("click", (e) => {
  e.preventDefault();
  alertText.classList.remove("show-alert-text");
  alertText.classList.remove("animation-alert-text");
  const value = addInput.value.trim();
  // IF VALUE WAS CORRRCT ADD NEW TODO INTO TODOLIST
  if (value !== "") {
    // ADD NEW TODO VALUE INTO TODO ARRAY
    todos.push(value);
    // GET ALL TODOS FROM TODOS ARRAY AND SHOW IT
    updateTodos();
  } else {
    alertText.classList.add("show-alert-text");
    alertText.classList.add("animation-alert-text");
  }
  // RESET TODO INPUT VALUE
  addInput.value = "";
});

// DELETE TODO
const deleteTodo = (btn) => {
  const index = btn.dataset.index;
  todos.splice(index, 1);
  updateTodos();
};
