//
// Constants //
const canvasBackground = "black";
const snakeColor = 'lightgreen';
const snakeBorder = 'darkgreen';
//
//Sets starting position of snake
let snake = [
    {x:300, y:300},
    {x:290, y:300},
    {x:280, y:300},
    {x:270, y:300},
    {x:260, y:300}
];
//
//Horizontal velocity
let dx = +10
//
//Vertical velocity
let dy = 0;
//
//Get canvas element
var gameCanvas = document.getElementById('gameCanvas');
//
//Drawing object
var ctx = gameCanvas.getContext('2d');
function clearCanvas() {
    //Select background color
    ctx.fillStyle = canvasBackground;
    //Draw the background
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
}
//
//
moveSnake();
dx = 0;
dy = -10;
moveSnake();
drawSnake();
//
//Draw the snake
function drawSnakeBody(bodyPart) {
    //Sets color of body part
    ctx.fillStyle = 'lightgreen';
    //Sets border color of body part
    ctx.strokeStyle = 'darkgreen';
    //fills snake body with color
    ctx.fillRect(bodyPart.x, bodyPart.y, 10, 10);
    //draws border around snake body
    ctx.strokeRect(bodyPart.x, bodyPart.y, 10, 10);
};
//
//Prints snake to canvas
function drawSnake() {
    //Loops thru snake body and draws each to canvas
    snake.forEach(drawSnakeBody);
}
//
//Move the snake
function moveSnake() {
    //Create new head for snake
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    //Add new head to beginning of snake
    snake.unshift(head);
    //Remove the last element of snake
    snake.pop();
}