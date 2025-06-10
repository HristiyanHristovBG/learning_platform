document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('snake-canvas');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');
  const startButton = document.getElementById('start-game');

  const gridSize = 20;
  const tileCount = canvas.width / gridSize;
  let snake = [
    { x: 10, y: 10 },
  ];
  let food = { x: 15, y: 15 };
  let dx = 0;
  let dy = 0;
  let score = 0;
  let gameLoop;

  function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = '#1a73e8';
    snake.forEach(segment => {
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    // Draw food
    ctx.fillStyle = '#d32f2f';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      scoreElement.textContent = score;
      generateFood();
    } else {
      snake.pop();
    }

    // Check wall or self collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
      endGame();
    }
  }

  function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    // Ensure food doesn't spawn on snake
    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
      generateFood();
    }
  }

  function endGame() {
    clearInterval(gameLoop);
    alert(`Game Over! Your score: ${score}`);
    startButton.disabled = false;
  }

  function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    startButton.disabled = true;
    gameLoop = setInterval(drawGame, 100);
  }

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (dy !== 1) { dx = 0; dy = -1; }
        break;
      case 'ArrowDown':
        if (dy !== -1) { dx = 0; dy = 1; }
        break;
      case 'ArrowLeft':
        if (dx !== 1) { dx = -1; dy = 0; }
        break;
      case 'ArrowRight':
        if (dx !== -1) { dx = 1; dy = 0; }
        break;
    }
  });

  startButton.addEventListener('click', resetGame);
});