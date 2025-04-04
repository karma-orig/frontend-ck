const tasks = [];

function addTask() {
  const newTask = $('#new-task').val();
  if (newTask.trim() !== '') {
    tasks.push({ text: newTask, completed: false });
    renderTasks();
    $('#new-task').val('');
  }
}

function renderTasks() {
  $('#todo-list').empty();
  tasks.forEach((task, index) => {
    const listItem = $('<li class="todo-item"></li>');
    const taskText = $('<span></span>').text(task.text);
    
    const deleteBtn = $('<button class="delete-btn">❌</button>');
    const editBtn = $('<button class="edit-btn">✏</button>');
    const buttonsContainer = $('<div class="buttons-container"></div>');
    
    buttonsContainer.append(editBtn, deleteBtn);
    listItem.append(taskText, buttonsContainer);
    
    if (task.completed) {
      listItem.addClass('completed');
    }
    
    // Обработчик выполнения задачи
    listItem.on('click', function (e) {
      if (!$(e.target).is('button')) {
        task.completed = !task.completed;
        $(this).toggleClass('completed');
      }
    });
    
    // Обработчик удаления задачи
    deleteBtn.on('click', function (e) {
      e.stopPropagation();
      tasks.splice(index, 1);
      renderTasks();
    });
    
    // Обработчик редактирования задачи
    editBtn.on('click', function (e) {
      e.stopPropagation();
      const newText = prompt('Введите новое название задачи:', task.text);
      if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        renderTasks();
      }
    });
    
    $('#todo-list').append(listItem);
  });
}

$('form').on('submit', function (e) {
  e.preventDefault();
  addTask();
});