//*********** */
// Constants //
//********* */
const gameSpeed = 100;
const canvasBackground = "rgb(118, 87, 81)";
const snakeColor = "rgb(97, 136, 125)";
const snakeBorder = "rgb(177, 195, 163)";
const foodColor = "rgb(177, 195, 163)";
const foodBorder = "rgb(243, 238, 186)";

//******************************* */
//Sets starting position of snake//
//***************************** */
let snake = [
    {x:200, y:200},
    {x:190, y:200},
    {x:180, y:200},
    {x:170, y:200},
    {x:160, y:200}
];
// Payer score
let score = 0;
let highScores = [];
//Food x-coordinate
let foodX;
//Food y-coordinate
let foodY;
// horizontal velocity
let dx = 10;
// vertical velocity
let dy = 0;
// Game Start Box
let gameStart = document.getElementById('gameStart');
// Game start / Name submit button
let startBtn = document.getElementById('start');
// Game Over Pop up box
let gameOver = document.getElementById('gameOver');
gameOver.style.display = "none";
// Reset Game Button
let reset = document.getElementById('btn');
//****************** */
//Get canvas element//
//**************** */
var gameCanvas = document.getElementById('gameCanvas');
//Sets the drawing object
var ctx = gameCanvas.getContext('2d');

//********** */
//Start game//
//******** */
startBtn.addEventListener("click", startGame);
function startGame() {
    //Remove game start box
    gameStart.style.display = "none";
    //Starts game loop
    main();
    // Create first food location
    createFood();
}

// Call changeDirection when a key is pressed
document.addEventListener("keydown", changeDirection)

//************** */
//Main game loop//
//************ */
function main() {

    gameOver.style.display = "none";

    if (endGame()) {
        gameOver.style.display = "block";
        return;
    }

    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();

        //call main again to create game loop
        main();
    }, gameSpeed);
}

//************ */
//Resets Score//
//********** */
function resetScore() {
    highScores.push(score);
    // console.log(highScores);
    score = 0;
    document.getElementById("playerScore").innerHTML = score;
}

//********************* */
//Resets Snake position//
//******************* */
function resetSnake() {
    snake = [
        {x:200, y:200},
        {x:190, y:200},
        {x:180, y:200},
        {x:170, y:200},
        {x:160, y:200}
    ];
    dx = 10;
    dy = 0;
}

//**************** */
//Draws the canvas//
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
    // i starts at 4 bc if it starts at 0, the game would end immediately
    // Also its impossible for the first three snake parts to touch each other
    for (let i = 4; i < snake.length; i++) {
        const didCollide = snake[i].x === snake[0].x &&
            snake[i].y === snake[0].y;
        
        if (didCollide) {
            return true
        } 
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height -10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall 
}

//****************** */
//Restarts the Game //
//**************** */
reset.addEventListener("click", resetGame);
function resetGame() {
    gameOver.style.display = "none";

    clearCanvas();
    resetScore();
    resetSnake();
    startGame();
}    
//******************************** */
// Function to draw food on canvas//
//****************************** */
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.strokeStyle = foodBorder;
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
        document.getElementById("playerScore").innerHTML = score;
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
    ctx.fillStyle = snakeColor;
    //Sets border color of body part
    ctx.strokeStyle = snakeBorder;
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