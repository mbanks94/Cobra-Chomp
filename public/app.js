//************************************************** */
// Constants //
const canvasBackground = "black";
const snakeColor = 'lightgreen';
const snakeBorder = 'darkgreen';
//************************************************** */
//Sets starting position of snake
let snake = [
    {x:300, y:300},
    {x:290, y:300},
    {x:280, y:300},
    {x:270, y:300},
    {x:260, y:300}
];
//
// horizontal velocity
let dx = 10;
//
// vertical velocity
let dy = 0;
//************************************************** */
//Main game loop
//createFood();
main();
// Call changeDirection when a key is pressed
document.addEventListener("keydown", changeDirection)
function main() {
    setTimeout(function onTick() {
        clearCanvas();
        //drawFood();
        moveSnake();
        drawSnake();

        //call main again to create game loop
        main();
    }, 100);
}
//************************************************** */
//Get canvas element
var gameCanvas = document.getElementById('gameCanvas');
//Sets the drawing object
var ctx = gameCanvas.getContext('2d');
//************************************************** */
//Reset the canvas
function clearCanvas() {
    //Select background color
    ctx.fillStyle = canvasBackground;
    //Draw the background
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
}
//************************************************** */
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
//************************************************** */
//Prints snake to canvas
function drawSnake() {
    //Loops thru snake body and draws each to canvas
    snake.forEach(drawSnakeBody);
}
//************************************************** */
//Move the snake
function moveSnake() {
    //Create new head for snake
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    //Add new head to beginning of snake
    snake.unshift(head);
    //Remove the last element of snake
    snake.pop();
}
//*************************************************** */
// Change snake direction when arrow key is pressed
function changeDirection(event) {
    //Key codes for the arrow keys
    const leftKey = 37;
    const rightKey = 39;
    const upKey = 38;
    const downKey = 40;
    //******************************************** */
    //keyPressed is the value of the pressed key
    const keyPressed = event.keyCode;
    const up = dy = -10;
    const down = dy = 10;
    const right = dx = 10;
    const left = dx = -10;
    //******************************************** */
    // If key pressed matches one of the arrow keys, 
    // change the vertical and horizontal velocity as described.
    // Also checks if the snake is moving in the opposite direction
    // of the new intended direction
    if (keyPressed === leftKey && !right) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === upKey && !down) { 
        dx = 0;
        dy = -10;
    }
    if (keyPressed === rightKey && !left) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === downKey && !up) {
        dx = 0;
        dy = 10;
    }
}
//***************************************************************** */
// Helper function to produce random number
function randomNum(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}
//
// Creates food  with a random x & y coordinate
// Also makes sure the food won't spawn where the snake is currently
function createFood() {
    foodX = randomNum(0, gameCanvas.width - 10);
    foodY = randomNum(0, gameCanvas.height - 10);

    snake.forEach(function isFoodOnSnake(bodyPart) {
        const foodIsOnSnake = bodyPart.x == foodX && bodyPart.y == foodY;
        if (foodIsOnSnake) {
            createFood();
        }
    });
}
//
// Function to draw food on canvas
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred';
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
} 