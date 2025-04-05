const BOARD_SIZE = 30;
const gameBoard = document.getElementById('game-board');
const cells = [];
const scoreElement = document.getElementById('score');

let snake = [{x: 5, y: 5}];
let direction = 'right';
let nextDirection = 'right';
let food = null;
let score = 0;
let gameSpeed = 200;
let gameInterval;
let gameActive = true;

function initGame() {
  // Очищаем поле
  gameBoard.innerHTML = '';
  cells.length = 0;
  
  // Создаем клетки поля
  gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 30px)`;
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cells.push(cell);
    gameBoard.appendChild(cell);
  }
  
  // Сбрасываем состояние игры
  snake = [{x: 5, y: 5}];
  direction = 'right';
  nextDirection = 'right';
  score = 0;
  gameActive = true;
  generateFood();
  scoreElement.textContent = score;
  
  // Запускаем игровой цикл
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, gameSpeed);
}

function gameLoop() {
  if (!gameActive) return;
  
  direction = nextDirection;
  moveSnake();
  render();
}

function moveSnake() {
  const head = {...snake[0]};
  
  // Двигаем голову с учетом прохождения через стены
  switch(direction) {
    case 'up': 
      head.y = head.y <= 0 ? BOARD_SIZE - 1 : head.y - 1;
      break;
    case 'down': 
      head.y = head.y >= BOARD_SIZE - 1 ? 0 : head.y + 1;
      break;
    case 'left': 
      head.x = head.x <= 0 ? BOARD_SIZE - 1 : head.x - 1;
      break;
    case 'right': 
      head.x = head.x >= BOARD_SIZE - 1 ? 0 : head.x + 1;
      break;
  }
  
  // Проверка столкновения с собой
  if (isSelfCollision(head)) {
    gameOver();
    return;
  }
  
  // Добавляем новую голову
  snake.unshift(head);
  
  // Проверяем, съели ли еду
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreElement.textContent = score;
    generateFood();
  } else {
    // Удаляем хвост только если не съели еду
    snake.pop();
  }
}

function isSelfCollision(head) {
  return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

function generateFood() {
  let newFood;
  let attempts = 0;
  const maxAttempts = BOARD_SIZE * BOARD_SIZE;
  
  do {
    newFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE)
    };
    attempts++;
    
    // Защита от бесконечного цикла
    if (attempts > maxAttempts) {
      console.error("Не удалось найти место для еды!");
      gameOver();
      return;
    }
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  
  food = newFood;
}

function gameOver() {
  gameActive = false;
  alert(`Игра окончена! Ваш счет: ${score}`);
  initGame();
}

function render() {
  // Очищаем поле
  cells.forEach(cell => cell.className = 'cell');
  
  // Рисуем змейку
  snake.forEach((segment, index) => {
    const cellIndex = segment.y * BOARD_SIZE + segment.x;
    if (cells[cellIndex]) {
      cells[cellIndex].classList.add('snake');
      if (index === 0) cells[cellIndex].classList.add('head');
    }
  });
  
  // Рисуем еду
  if (food) {
    const foodIndex = food.y * BOARD_SIZE + food.x;
    if (cells[foodIndex]) cells[foodIndex].classList.add('food');
  }
}

// Управление
document.addEventListener('keydown', e => {
  if (!gameActive) return;
  
  switch(e.key) {
    case 'ArrowUp': if (direction !== 'down') nextDirection = 'up'; break;
    case 'ArrowDown': if (direction !== 'up') nextDirection = 'down'; break;
    case 'ArrowLeft': if (direction !== 'right') nextDirection = 'left'; break;
    case 'ArrowRight': if (direction !== 'left') nextDirection = 'right'; break;
    case 'r': case 'R': initGame(); break;
  }
});

// Кнопки управления
document.querySelector('.up')?.addEventListener('click', () => {
  if (direction !== 'down') nextDirection = 'up';
});
document.querySelector('.down')?.addEventListener('click', () => {
  if (direction !== 'up') nextDirection = 'down';
});
document.querySelector('.left')?.addEventListener('click', () => {
  if (direction !== 'right') nextDirection = 'left';
});
document.querySelector('.right')?.addEventListener('click', () => {
  if (direction !== 'left') nextDirection = 'right';
});
document.getElementById('reset-btn')?.addEventListener('click', initGame);

// Управление скоростью
const SPEED_LEVELS = [300, 200, 150, 100, 50];
let currentSpeedLevel = 1;

document.getElementById('speed')?.addEventListener('input', e => {
  currentSpeedLevel = parseInt(e.target.value);
  gameSpeed = SPEED_LEVELS[currentSpeedLevel];
  const speeds = ['Очень медленно', 'Медленно', 'Средне', 'Быстро', 'Очень быстро'];
  document.getElementById('speed-value').textContent = speeds[currentSpeedLevel];
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, gameSpeed);
});

// Запуск игры
initGame();