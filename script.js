// ELEMENTS
const addButton = document.getElementById("add-btn");
const addInput = document.querySelector("#add-input");
const todoList = document.querySelector(".todo-list");
const alertText = document.querySelector(".alert-text");

const todos = [];

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  alertText.classList.remove("show-alert-text");
  alertText.classList.remove("animation-alert-text");
  const value = addInput.value.trim();
  if (value !== "") {
    todos.push(value);
    todoList.innerHTML = "";

    todos.forEach((todo) => {
      const todoItem = `
        <li class="todo-item">
          <span class="todo-text">${todo}</span>

          <button class="todo-btn" id="edit-btn">
            <i class="fa fa-edit"></i>
          </button>
          <button class="todo-btn" id="delete-btn">
            <i class="fa fa-trash"></i>
          </button>
        </li>
        `;
      todoList.innerHTML += todoItem;
    });
  } else {
    alertText.classList.add("show-alert-text");
    alertText.classList.add("animation-alert-text");
  }
  addInput.value = "";
});
