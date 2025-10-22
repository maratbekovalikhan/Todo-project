
const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const calendar = document.getElementById("calendar");

window.addEventListener("load", loadTasks);

addButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const date = calendar.value;

  if (taskText === "") {
    alert("Введите задачу!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = date ? `${taskText} (${date})` : taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.style.marginLeft = "10px";

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  taskInput.value = "";

  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) li.classList.add("completed");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

