const readline = require("readline-sync");
/*
This is a block comment sdfhshdf
*/

//Display the game title
console.log("Welcome to the Game");

//Add a welcome message
console.log("Prepare for the jorney");

//Get player name using readline-sync
let playerName = "";

//Create variables for player stats
let playerHealth = 100;
let playerGold = 20;
let currentLocation = "village";
let gameRunning = true;
let inventory = [];

playerName = readline.question("What is youre name?");
console.log("Hello " + playerName);
console.log("Yore starting gold ammount is " + playerGold);
