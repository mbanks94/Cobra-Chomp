//*********** */
// Constants //
//********* */
const gameSpeed = 100;
const canvasBackground = "black";
const snakeColor = 'lightgreen';
const snakeBorder = 'darkgreen';

//******************************* */
//Sets starting position of snake//
//***************************** */
let snake = [
    {x:300, y:300},
    {x:290, y:300},
    {x:280, y:300},
    {x:270, y:300},
    {x:260, y:300}
];
// Payer score
let score = 0;
//Food x-coordinate
let foodX;
//Food y-coordinate
let foodY;
// horizontal velocity
let dx = 10;
// vertical velocity
let dy = 0;

//****************** */
//Get canvas element//
//**************** */
var gameCanvas = document.getElementById('gameCanvas');
//Sets the drawing object
var ctx = gameCanvas.getContext('2d');

//********** */
//Start game//
//******** */
main();
// Create first food location
createFood();
// Call changeDirection when a key is pressed
document.addEventListener("keydown", changeDirection)

//************** */
//Main game loop//
//************ */
function main() {

    if (endGame()) return;

    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();

        //call main again to create game loop
        main();
    }, gameSpeed);
}

//**************** */
//Reset the canvas//
//************** */
function clearCanvas() {
    //Select background color
    ctx.fillStyle = canvasBackground;
    //Draw the background
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
}

//**************************************** */
// Returns true if head of snake touched  //
// itself or any of the walls            //
//************************************* */ 
function endGame() {
    //i starts at 4 bc if it starts at 0, the game would end immediately
    // Also its impossible for the first three snake parts to touch each other
    for (let i = 4; i < snake.length; i++) {
        const didCollide = snake[i].x === snake[0].x &&
            snake[i].y === snake[0].y;
        
        if (didCollide) return true
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height -10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall 
}

//******************************** */
// Function to draw food on canvas//
//****************************** */
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred';
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

//************** */
//Move the snake//
//************ */
function moveSnake() {
    //Create new head for snake
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    //Add new head to beginning of snake
    snake.unshift(head);

    const didEatFood = snake[0].x === foodX && snake[0].y == foodY;
    if (didEatFood) {
        score += 10;
        document.getElementById("score").innerHTML = score;
        //Create new food if snake eats food
        createFood();
    } else {
        //Remove the last element of snake  
        snake.pop();
    }
}

//******************************************** */
// Generates a random number thats a multiple //
// of 10 given a min and max number          //
//***************************************** */
function randomNum(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}
//******************************************************************* */
// Creates food  with a random x & y coordinate                      //
// Also makes sure the food won't spawn where the snake is currently//
//**************************************************************** */
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

//********************** */
//Prints snake to canvas//
//******************** */
function drawSnake() {
    //Loops thru snake body and draws each to canvas
    snake.forEach(drawSnakeBody);
}

//************** */
//Draw the snake//
//************ */
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

//************************************************* */
// Change snake direction when arrow key is pressed//
//*********************************************** */
function changeDirection(event) {
    //Key codes for the arrow keys
    const leftKey = 37;
    const rightKey = 39;
    const upKey = 38;
    const downKey = 40;
    
    //keyPressed is the value of the pressed key
    const keyPressed = event.keyCode;
    const up = dy === -10;
    const down = dy === 10;
    const right = dx === 10;
    const left = dx === -10;
    //**************************************************** */
    // Changes the vertical and horizontal velocity       //
    // according to the key that was pressed.            //
    // The direction cannot be switched to the opposite // 
    // direction to prevent the snake from reversing   //
    //*********************************************** */
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