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
//************************************************** */
//Main game loop
main();
function main() {
    setTimeout(function onTick() {
        clearCanvas();
        drawSnake();
        moveSnake();
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
document.addEventListener("keydown", changeDirection)
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
