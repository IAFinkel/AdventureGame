const { showInventoryNames } = require("./inventory");
const gameState = require("./gameState");
const readline = require("readline-sync");

/** 
Update player health if damaged of healed
* @param {number} healthPoints health or damage value
*/
function updateHealth(healthPoints) {
  if (healthPoints < 0 && gameState.getplayerHealth() > 0) {
    gameState.setplayerHealth(gameState.getplayerHealth() + healthPoints);
    console.log("Player health is " + gameState.getplayerHealth());
  } else if (healthPoints > 0 && gameState.getplayerHealth() < 100) {
    let remainingHealth = 100 - gameState.getplayerHealth();
    if (remainingHealth > healthPoints) {
      gameState.setplayerHealth(gameState.getplayerHealth() + healthPoints);
      console.log("Player health is " + gameState.getplayerHealth());
    } else {
      gameState.setplayerHealth(100);
      console.log("Player health is " + gameState.getplayerHealth());
    }
  } else if (healthPoints > 0 && gameState.getplayerHealth() >= 100) {
    console.log("The player health is maximum");
  }
}

/*
Checks the player health and out if died
*/
function outIfDied() {
  if (gameState.getplayerHealth() <= 0) {
    console.log("\nGame Over! Your health reached 0!");
    gameState.setgameRunning(false);
  }
}

/**
 * Quit the game
 */
function quit() {
  gameState.setgameRunning(false);
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
  console.log("\n=== " + gameState.getplayerName() + "'s Status ===");
  console.log("❤️  Health: " + gameState.getplayerHealth());
  console.log("💰 Gold: " + gameState.getplayerGold());
  console.log("📍 Location: " + gameState.getcurrentLocation());
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
    if (
      gameState.getcurrentLocation() === "village" &&
      (choiceNum < 1 || choiceNum > 10)
    ) {
      throw new Error(
        "Error:This is not a valid input for village " + choiceNum
      );
    }
    if (
      gameState.getcurrentLocation() === "blacksmith" &&
      (choiceNum < 1 || choiceNum > 11)
    ) {
      throw new Error(
        "Error:This is not a valid input for blacksmith " + choiceNum
      );
    }
    if (
      gameState.getcurrentLocation() === "market" &&
      (choiceNum < 1 || choiceNum > 9)
    ) {
      throw new Error(
        "Error:This is not a valid input for market " + choiceNum
      );
    }
    if (
      gameState.getcurrentLocation() === "forest" &&
      gameState.getbattleWin() &&
      (choiceNum < 1 || choiceNum > 10)
    ) {
      throw new Error(
        "Error:This is not a valid input for forest " + choiceNum
      );
    }
    if (
      gameState.getcurrentLocation() === "forest" &&
      gameState.getbattleWin() === false &&
      (choiceNum < 1 || choiceNum > 9)
    ) {
      throw new Error(
        "Error:This is not a valid input for forest " + choiceNum
      );
    }
    if (
      gameState.getcurrentLocation() === "dragon nest" &&
      (choiceNum < 1 || choiceNum > 9)
    ) {
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
