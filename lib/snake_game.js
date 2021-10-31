const boardBorder = '#191919';
const boardBackground = '#5a7de6';
const snakeCol = '#232323';
const snakeBorder = '#232323';
const foodBackground = '#fd1115';

let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200}
]

let score = 0;
// True if changing direction
let changingDirection = false;
// Horizontal velocity
let foodX;
let foodY;
let dx = 10;
// Vertical velocity
let dy = 0;

// Get the canvas element
const snakeboard = document.getElementById("snakeboard");
// Return a two dimensional drawing context
const snakeboardCtx = snakeboard.getContext("2d");

// Start game
main();

genFood();

document.addEventListener("keydown", changeDirection);

// main function called repeatedly to keep the game running
function main() {

    if (hasGameEnded()) return;

    changingDirection = false;
    setTimeout(function onTick() {
    clearBoard();
    drawFood();
    moveSnake();
    drawSnake();
    // Repeat
    main();
  }, 100)
}

// draw a border around the canvas
function clearBoard() {
  //  Select the colour to fill the drawing
  snakeboardCtx.fillStyle = boardBackground;
  //  Select the colour for the border of the canvas
  snakeboardCtx.strokestyle = boardBorder;
  // Draw a "filled" rectangle to cover the entire canvas
  snakeboardCtx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  // Draw a "border" around the entire canvas
  snakeboardCtx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart)
}

function drawFood() {
  snakeboardCtx.fillStyle = foodBackground;
  snakeboardCtx.strokestyle = '#f8f8f8';
  snakeboardCtx.fillRect(foodX, foodY, 10, 10);
  snakeboardCtx.strokeRect(foodX, foodY, 10, 10);
}

// Draw one snake part
function drawSnakePart(snakePart) {

  // Set the colour of the snake part
  snakeboardCtx.fillStyle = snakeCol;
  // Set the border colour of the snake part
  snakeboardCtx.strokestyle = snakeBorder;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  snakeboardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
  // Draw a border around the snake part
  snakeboardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function hasGameEnded() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function randomFood(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function genFood() {
  // Generate a random number the food x-coordinate
  foodX = randomFood(0, snakeboard.width - 10);
  // Generate a random number for the food y-coordinate
  foodY = randomFood(0, snakeboard.height - 10);
  // if the new food location is where the snake currently is, generate a new food location
  snake.forEach(function hasSnakeEatenFood(part) {
    const has_eaten = part.x == foodX && part.y == foodY;
    if (has_eaten) genFood();
  });
}

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

// Prevent the snake from reversing

  if (changingDirection) return;
  changingDirection = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function moveSnake() {
  // Create the new Snake's head
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;
  if (hasEatenFood) {
    // Increase score
    score += 10;
    // Display score on screen
    document.getElementById('score').innerHTML = `Score: ${score}`;
    // Generate new food location
    genFood();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}
