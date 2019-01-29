const canvasBackground = "black";

//Get canvas element
var gameCanvas = document.getElementById('gameCanvas');

//Drawing object
var ctx = gameCanvas.getContext('2d');

//Draw the background
ctx.fillRect(0, 0, 600, 600);