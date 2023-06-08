document.getElementById('taskForm').addEventListener('submit', handleFormSubmit);
document.getElementById('taskList').addEventListener('click', handleListClick);

// Cargar las tareas al cargar la página
loadTasks();

function handleFormSubmit(event) {
  event.preventDefault();

  const taskInput = document.getElementById('taskInput');
  const task = taskInput.value.trim();

  if (task !== '') {
    addTask(task);
    taskInput.value = '';
  }
}

function handleListClick(event) {
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.dataset.index;

    deleteTask(index);
  }
}

function displayTasks(tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.innerHTML = `
      <span>${task}</span>
      <button class="btn btn-danger btn-sm float-end delete-btn" data-index="${index}">Eliminar</button>
    `;
    taskList.appendChild(listItem);
  });
}

function loadTasks() {
  let tasks = [];

  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  displayTasks(tasks);
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(task) {
  let tasks = [];

  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  saveTasks(tasks);
  displayTasks(tasks);
}

function deleteTask(index) {
  let tasks = [];

  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.splice(index, 1);
  saveTasks(tasks);
  displayTasks(tasks);
}
