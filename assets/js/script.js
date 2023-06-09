document.getElementById('taskForm').addEventListener('submit', handleFormSubmit);
document.getElementById('pendingTasks').addEventListener('click', handleListClick);
document.getElementById('inProgressTasks').addEventListener('click', handleListClick);
document.getElementById('completedTasks').addEventListener('click', handleListClick);

let tasks = [];

// Cargar las tareas al cargar la página
loadTasks();

function handleFormSubmit(event) {
  event.preventDefault();

  const taskInput = document.getElementById('taskInput');
  const task = taskInput.value.trim();

  if (task !== '') {
    addTask(task, 'pendiente'); // Agregar estado inicial 'pendiente'
    taskInput.value = '';
  }
}

function handleListClick(event) {
  debugger
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.dataset.index;
    const state = event.target.dataset.state;
    deleteTask(index, state);
  } else if (event.target.classList.contains('state-btn')) {
    const index = event.target.dataset.index;
    const currentState = event.target.dataset.state;
    changeTaskState(index, currentState);
  }
}

function displayTasks(tasks) {
  const pendingTasksList = document.getElementById('pendingTasks');
  const inProgressTasksList = document.getElementById('inProgressTasks');
  const completedTasksList = document.getElementById('completedTasks');

  pendingTasksList.innerHTML = '';
  inProgressTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.innerHTML = `
      <span>${task.name}</span>
      <div class="task-actions">
        ${getTaskStateButtons(index, task.state)}
        <button class="btn btn-danger btn-sm delete-btn" data-index="${index}" data-state="${task.state}">Eliminar</button>
      </div>
    `;

    switch (task.state) {
      case 'pendiente':
        pendingTasksList.appendChild(listItem);
        break;
      case 'en_ejecucion':
        inProgressTasksList.appendChild(listItem);
        break;
      case 'finalizada':
        completedTasksList.appendChild(listItem);
        break;
    }
  });
}

function getTaskStateButtons(index, currentState) {
  let buttonsHTML = '';

  if (currentState === 'pendiente') {
    buttonsHTML += `<button class="btn btn-success btn-sm state-btn" data-index="${index}" data-state="en_ejecucion">En Ejecución</button>`;
  } else if (currentState === 'en_ejecucion') {
    buttonsHTML += `<button class="btn btn-success btn-sm state-btn" data-index="${index}" data-state="finalizada">Finalizar</button>`;
  } else if (currentState === 'finalizada') {
    buttonsHTML += `<button class="btn btn-secondary btn-sm state-btn" data-index="${index}" data-state="pendiente">Pendiente</button>`;
  }

  return buttonsHTML;
}

function addTask(name, state) {
  const task = { name, state };
  tasks.push(task);
  displayTasks(tasks);
}

function deleteTask(index, state) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'La tarea será eliminada.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#64b5f6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      tasks.splice(index, 1);
      displayTasks(tasks);
      showSuccessMessage('Tarea eliminada exitosamente');
    }
  });
}

function changeTaskState(index, nextState) {

  tasks[index].state = nextState;
  displayTasks(tasks);
}


function showSuccessMessage(message) {
  Swal.fire({
    icon: 'success',
    text: message,
    showConfirmButton: false,
    timer: 2000,
    position: 'top-end',
    toast: true,
  });
}

function loadTasks() {
  // Aca un ejemplo con tareas predefinidas:
  tasks = [
    { name: 'lo que tengo que hacer', state: 'pendiente' },
    { name: 'lo que estoy haciendo', state: 'en_ejecucion' },
    { name: 'lo que ya hice', state: 'finalizada' },
  ];
  displayTasks(tasks);
}

const userAgentData = navigator.userAgentData;

if (userAgentData) {
  const userAgent = userAgentData.userAgent;
  const platform = userAgentData.platform;

  // Utiliza userAgent y platform en lugar de navigator.userAgent y navigator.platform
} else {
  // Realiza una estrategia alternativa para obtener la información necesaria en navegadores que no admiten userAgentData
}


function loadTasks() {
  // se puede realizar una solicitud AJAX o cargar las tareas desde el almacenamiento local
  // Ejemplo con tareas predefinidas:
  tasks = [
    { name: 'lo que tengo que hacer', state: 'pendiente' },
    { name: 'lo que estoy haciendo', state: 'en_ejecucion' },
    { name: 'lo que ya hice', state: 'finalizada' },
  ];
  displayTasks(tasks);
}
