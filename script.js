// ELEMENTS
const addButton = document.getElementById("add-btn");
const addInput = document.querySelector("#add-input");
const todoList = document.querySelector(".todo-list");
const alertText = document.querySelector(".alert-text");
const editButton = document.getElementById("edit-btn");
const deleteButton = document.getElementById("delete-btn");
const editFormWrapper = document.querySelector("#edit-form-wrapper");
const editInput = document.querySelector("#edit-input");
const editForm = document.querySelector("#edit-form");

// ALL TODOS TO SHOW
const todos = JSON.parse(localStorage.getItem("todo")) || [];

// SAVE TODOS INTO LOCAL STORAGE
const saveTOLocalStorage = () => {
  localStorage.setItem("todo", JSON.stringify(todos));
};


// UPDATE TODOS
const updateTodos = () => {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const todoItem = `
        <li class="todo-item">
          <span class="todo-text">${todo}</span>

          <button class="todo-btn" id="edit-btn" data-index=${index} onclick="editTodo(this)">
            <i class="fa fa-edit"></i>
          </button>
          <button class="todo-btn" id="delete-btn" data-index=${index} onclick="deleteTodo(this)">
            <i class="fa fa-trash"></i>
          </button>
        </li>
        `;
    todoList.innerHTML += todoItem;
  });
  if (todos.length === 0) {
    alertText.textContent = "Todo list is empty!";
    alertText.classList.add("show-alert-text");
  }
};

updateTodos();

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
    // Save current todos array to localStorage after adding a new todo
    saveTOLocalStorage();
    // GET ALL TODOS FROM TODOS ARRAY AND SHOW THEM
    updateTodos();
  }
  //SHOW A WARNING IF THE EDIT INPUT IS EMPTY
  else {
    alertText.textContent = "Please write something!";
    alertText.classList.add("show-alert-text");
    alertText.classList.add("animation-alert-text");
    alertText.addEventListener("animationend", () => {
      alertText.classList.remove("animation-alert-text");
    });
  }
  // RESET TODO INPUT VALUE
  addInput.value = "";
});

// DELETE TODO
const deleteTodo = (btn) => {
  const index = btn.dataset.index;
  todos.splice(index, 1);
  // SAVE CURRENT TODOS ARRAY TO LOCALSTORAGE AFTER DELETING A TODO
  saveTOLocalStorage();
  // GET ALL TODOS FROM TODOS ARRAY AFTER DELETIND A TODO AND SHOW THEM
  updateTodos();
};

// EDIT TODO
const editTodo = (btn) => {
  const index = btn.dataset.index;
  editFormWrapper.classList.add("show-form");
  editInput.value = todos[index];
  editInput.dataset.index = index;
  editInput.focus();
};

// CLOSE EDIT FORM WHEN CLICKING OUTSIDE OF IT
editFormWrapper.addEventListener("click", () => {
  editFormWrapper.classList.remove("show-form");
});

// PREVENT CLOSING THE FORM WHEN CLICKING ON THE EDIT INPUT
editForm.addEventListener("click", (e) => {
  e.stopPropagation();
});

// UPDATE TODO WITH EDITED VALUE
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  editFormWrapper.classList.remove("show-form");
  if (editInput.value.trim()) {
    const todoIndex = editInput.dataset.index;
    todos[todoIndex] = editInput.value;
    // SAVE CURRENT TODOS ARRAY TO LOCALSTORAGE AFTER EDITING A TODO
    saveTOLocalStorage();
  // GET ALL TODOS FROM TODOS ARRAY AFTER EDITING A TODO AND SHOW THEM
    updateTodos();
  }
  //SHOW A WARNING IF THE EDIT INPUT IS EMPTY
  else {
    alertText.textContent = "Todo cannot be empty!";
    alertText.classList.add("show-alert-text");
    alertText.classList.add("animation-alert-text");
  }
});
