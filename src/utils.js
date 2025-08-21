const { showInventoryNames } = require("./inventory");
const {
  playerName,
  playerHealth,
  playerGold,
  gameRunning,
  currentLocation,
  battleWin,
} = require("./gameState");

const readline = require("readline-sync");

/** 
Update player health if damaged of healed
* @param {number} healthPoints health or damage value
*/
function updateHealth(healthPoints) {
  if (healthPoints < 0 && playerHealth > 0) {
    playerHealth = playerHealth + healthPoints;
    console.log("Player health is " + playerHealth);
  } else if (healthPoints > 0 && playerHealth < 100) {
    let remainingHealth = 100 - playerHealth;
    if (remainingHealth > healthPoints) {
      playerHealth = playerHealth + healthPoints;
      console.log("Player health is " + playerHealth);
    } else {
      playerHealth = 100;
      console.log("Player health is " + playerHealth);
    }
  } else if (healthPoints > 0 && playerHealth >= 100) {
    console.log("The player health is maximum");
  }
}

/*
Checks the player health and out if died
*/
function outIfDied() {
  if (playerHealth <= 0) {
    console.log("\nGame Over! Your health reached 0!");
    gameRunning = false;
  }
}

/**
 * Quit the game
 */
function quit() {
  gameRunning = false;
  console.log("\nThanks for playing!");
}

/*
Open the help menu
*/
function showHelp() {
  console.log("\n=== AVAILABLE COMMANDS ===");

  console.log("\nMovement Commands:");
  console.log("- In the village, choose 1-3 to travel to different locations");
  console.log(
    "- In other locations, choose the return option to go back to the village"
  );

  console.log("\nBattle Information:");
  console.log("- You need a sword to win battles");
  console.log("- Monsters appear in the forest");
  console.log("- Without a weapon, you'll lose health when retreating");

  console.log("\nItem Usage:");
  console.log("- Health potions restore 30 health");
  console.log("- You can buy potions at the market for 5 gold");
  console.log("- You can buy a sword at the blacksmith for 10 gold");

  console.log("\nOther Commands:");
  console.log("- Choose the status option to see your health and gold");
  console.log("- Choose the help option to see this message again");
  console.log("- Choose the quit option to end the game");

  console.log("\nTips:");
  console.log("- Keep healing potions for dangerous areas");
  console.log("- Defeat monsters to earn gold");
  console.log("- Health can't go above 100");
}

/**
 * Shows the player's current stats
 * Displays health, gold, and location
 */
function showStatus() {
  console.log("\n=== " + playerName + "'s Status ===");
  console.log("❤️  Health: " + playerHealth);
  console.log("💰 Gold: " + playerGold);
  console.log("📍 Location: " + currentLocation);
  showInventoryNames();
}

/**
 * Asks player to choose the action option according to the current location.
 * Loop run untill the valid input is made.
 */
function askForChoise() {
  while (true) {
    let choice = readline.question("\nEnter choice (number): ");
    choice = choice.trim().toLowerCase();
    if (choice === "quit" || choice === "q" || choice === "exit") {
      quit();
      return null;
    }
    if (choice === "help") {
      showHelp();
      continue;
    }
    let validChoice = playerChoiseValidation(choice);
    if (validChoice !== null) {
      return validChoice;
    }
  }
}
/*
Parse player choice to number and validate it
*/
function playerChoiseValidation(choice) {
  try {
    let choiceNum;
    choiceNum = parseInt(choice);

    if (isNaN(choiceNum)) {
      throw new Error("Error:This is not a number " + choice);
    }
    if (currentLocation === "village" && (choiceNum < 1 || choiceNum > 10)) {
      throw new Error(
        "Error:This is not a valid input for village " + choiceNum
      );
    }
    if (currentLocation === "blacksmith" && (choiceNum < 1 || choiceNum > 11)) {
      throw new Error(
        "Error:This is not a valid input for blacksmith " + choiceNum
      );
    }
    if (currentLocation === "market" && (choiceNum < 1 || choiceNum > 9)) {
      throw new Error(
        "Error:This is not a valid input for market " + choiceNum
      );
    }
    if (
      currentLocation === "forest" &&
      battleWin &&
      (choiceNum < 1 || choiceNum > 10)
    ) {
      throw new Error(
        "Error:This is not a valid input for forest " + choiceNum
      );
    }
    if (
      currentLocation === "forest" &&
      battleWin === false &&
      (choiceNum < 1 || choiceNum > 9)
    ) {
      throw new Error(
        "Error:This is not a valid input for forest " + choiceNum
      );
    }
    if (currentLocation === "dragon nest" && (choiceNum < 1 || choiceNum > 9)) {
      throw new Error(
        "Error:This is not a valid input for dragon nest " + choiceNum
      );
    } else {
      //  console.log("Youre choise is " + choiceNum);
      return choiceNum;
    }
  } catch (error) {
    console.log("Smth went wrong " + error.message);
    return null;
  }
}

module.exports = {
  updateHealth,
  outIfDied,
  quit,
  showHelp,
  showStatus,
  askForChoise,
  playerChoiseValidation,
};
