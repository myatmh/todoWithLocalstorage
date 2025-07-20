let todoListArray = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

// console.log(todoListArray);

const inputText = document.querySelector(".input_box");
const addBtn = document.querySelector(".add_btn");
const todoListContainer = document.querySelector(".todo_list_container");

const handleTodoList = () => {
  const textValue = inputText.value.trim();

  if (textValue === "") {
    alert("enter a task...");
  } else {
    todoListArray.push({
      task: textValue,
      completed: false,
    });
    localStorage.setItem("todos", JSON.stringify(todoListArray));

    inputText.value = "";

    renderTodoList();
  }
};

inputText.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleTodoList();
  }
});

addBtn.addEventListener("click", () => {
  handleTodoList();
});

function renderTodoList() {
  todoListContainer.innerHTML = "";

  todoListArray.forEach((item, index) => {
    const todoItem = document.createElement("div");
    todoItem.className = "todo_list";
    todoItem.dataset.index = index;

    if (item.completed) {
      todoItem.style.backgroundColor = "#51cf84ff";
    }

    todoItem.innerHTML = `<div class="task" data-index="${index}">
                              <input type="checkbox" class="check_box" ${
                                item.completed ? "checked" : ""
                              } data-index="${index}" />
                              <div class="content_wrap">
                                <p>${item.task}</p>
                                <i class="fa-solid fa-circle-minus delete_btn" data-index="${index}"></i>
                              </div>
                          </div>`;

    todoListContainer.appendChild(todoItem);
  });

  listenerForCheckAndDelete();
}

const listenerForCheckAndDelete = () => {
  const checkBoxs = document.querySelectorAll(".check_box");
  const deleteBtn = document.querySelectorAll(".delete_btn");

  checkBoxs.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const index = e.target.dataset.index;
      // console.log(e.target.checked);
      todoListArray[index].completed = e.target.checked;

      localStorage.setItem("todos", JSON.stringify(todoListArray));

      const parentDiv = e.target.closest(".todo_list");
      if (e.target.checked) {
        parentDiv.style.backgroundColor = "#51cf84ff";
      } else {
        parentDiv.style.backgroundColor = "#f2ffff";
      }
    });
  });

  deleteBtn.forEach((del) => {
    del.addEventListener("click", (e) => {
      const index = e.target.dataset.index;

      if (confirm("Are you sure to Delete?")) {
        todoListArray.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todoListArray));
        renderTodoList();
      } else {
        return;
      }
    });
  });
};

window.onload = () => {
  renderTodoList();
};
