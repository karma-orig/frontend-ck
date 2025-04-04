const tasks = [];

function renderTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    if (task.completed) {
      listItem.classList.add('completed');
    }

    const taskNameElement = document.createElement('span');
    taskNameElement.innerText = task.task;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';

    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.innerHTML = '✏';
    editButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const newText = prompt('Введите новое название задачи:', task.task);
      if (newText !== null && newText.trim() !== '') {
        task.task = newText.trim();
        renderTasks();
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerHTML = '❌';
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      renderTasks();
    });

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    listItem.appendChild(taskNameElement);
    listItem.appendChild(buttonsContainer);

    listItem.addEventListener('click', () => {
      task.completed = !task.completed;
      listItem.classList.toggle('completed');
    });

    todoList.appendChild(listItem);
  });
}

function addTask() {
  const newTaskInput = document.getElementById('new-task');
  const newTask = newTaskInput.value.trim();
  
  if (newTask !== '') {
    tasks.push({ task: newTask, completed: false });
    newTaskInput.value = '';
    renderTasks();
  }
}

document.getElementById('add-button').addEventListener('click', addTask);

// Добавляем возможность добавлять задачи по нажатию Enter
document.getElementById('new-task').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});