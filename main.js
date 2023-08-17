const form = document.getElementById("new-task-form");
const taskForm = document.getElementById("new-task");
const todoListUl = document.getElementById("todo-list");
const deleteDetect = document.querySelectorAll(".task-trash");

//Declaro array de objetos
let tasks;

const readTasks = () => {
  const tasksString = localStorage.getItem("tasksTodoList");
  if (tasksString) {
    tasks = JSON.parse(tasksString);
  } else {
    tasks = [];
  }
};

const writeTasks = () => {
  let innerUl = "";
  tasks.forEach((task) => {
    innerUl =
      innerUl +
      `<li class="todo-item">
          <span class="task-title">${task.task}</span>
          <span class="task-trash"><i class="bi bi-trash" data-id="${task.id}"></i></span>
        </li>`;
  });
  todoListUl.innerHTML = innerUl;
  localStorage.setItem("tasksTodoList", JSON.stringify(tasks));
};

function addTask(e) {
  //Leer form y mandar datos a array de objetos
  e.preventDefault();
  const task = { id: Date.now(), task: taskForm.value };
  tasks.push(task);
  taskForm.innerText = "";

  //Guardo en localStorage
  writeTasks();
}

//deleteTask
const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id != id); //usar uno que remueva
  writeTasks();
};

//detectTask
const detectTask = (e) => {
  e.preventDefault();
  const idToDelete = e.target.dataset.id;
  deleteTask(idToDelete);
};

function init() {
  //Si existe lista de tareas en localStorage, leerla y meterla en tasks
  readTasks();
  writeTasks();

  //Capturar formulario
  form.addEventListener("submit", addTask);
  todoListUl.addEventListener("click", detectTask);
}

init();
