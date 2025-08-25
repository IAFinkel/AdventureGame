const { combat } = require("./combat");
const { inventory, inventoryCheck, useItem, buyItems } = require("./inventory");
const { quit, showHelp, showStatus, askForChoise } = require("./utils");
const { saveGame, loadGame, startDialog, outIfDied } = require("./saveLoad");
const {
  sword,
  steelSword,
  woodenShield,
  healthPotion,
  goblin,
  orc,
  dragon,
} = require("./instanses");
const gameState = require("./gameState");

// ===========================================
// The Dragon's Quest - Text Adventure Game
// A progression-based learning project
// ===========================================

// =========================================
// START GAME. INRODUCTION
// =========================================

console.log("=================================");
console.log("       The Dragon's Quest        ");
console.log("=================================");
console.log("\nYour quest: Defeat the dragon in the mountains!\n");

// =========================================
// MAIN LOOP
// =========================================

startDialog();

while (gameState.getgameRunning()) {
  showLocation();
  let choiceNum = askForChoise();
  if (choiceNum === null) {
    break;
  }
  playerMove(choiceNum);
  outIfDied();
}

// ========================================================
// FUNCTIONS: DISPLAY GAME AND PLAYER INFO, PLAYER MOVEMENT
// ========================================================

/**
 * Shows the current location's description and available choices
 */
function showLocation() {
  if (gameState.getfirstVisit()) {
    console.log(
      "\nVillager: 'Welcome, adventurer! Rumor has it there's a dragon in the mountains...'"
    );
    gameState.setfirstVisit(false);
  }

  console.log("\n=== " + gameState.getcurrentLocation().toUpperCase() + " ===");

  if (gameState.getcurrentLocation() === "village") {
    console.log(
      "You're in a bustling village. The blacksmith and market are nearby."
    );
    console.log("\nWhat would you like to do?");
    console.log("1: Go to blacksmith");
    console.log("2: Go to market");
    console.log("3: Enter forest");
    console.log("4: Check status");
    console.log("5: Check inventory");
    console.log("6: Use item");
    console.log("7: Show help menu");
    console.log("8: Quit game");
    console.log("9: Save game");
    console.log("10: Load game");
  } else if (gameState.getcurrentLocation() === "blacksmith") {
    console.log(
      "The heat from the forge fills the air. Weapons and armor line the walls."
    );
    console.log("\nWhat would you like to do?");
    console.log("1: Return to village");
    console.log(`2: Buy ${sword.name} for ${sword.value} gold`);
    console.log(`3: Buy ${steelSword.name} for ${steelSword.value} gold`);
    console.log(`4: Buy ${woodenShield.name} for ${woodenShield.value} gold`);
    console.log("5: Check status");
    console.log("6: Check inventory");
    console.log("7: Use item");
    console.log("8: Show help menu");
    console.log("9: Quit game");
    console.log("10: Save game");
    console.log("11: Load game");
  } else if (gameState.getcurrentLocation() === "market") {
    console.log(
      "Merchants sell their wares from colorful stalls. A potion seller catches your eye."
    );
    console.log("\nWhat would you like to do?");
    console.log("1: Return to village");
    console.log(`2: Buy potion for ${healthPotion.value} gold`);
    console.log("3: Check status");
    console.log("4: Check inventory");
    console.log("5: Use item");
    console.log("6: Show help menu");
    console.log("7: Quit game");
    console.log("8: Save game");
    console.log("9: Load game");
  } else if (
    gameState.getcurrentLocation() === "forest" &&
    gameState.getbattleWin()
  ) {
    console.log("A dark forest surrounds you. You hear strange noises...");
    console.log("You faced the monster " + orc.name);
    console.log(
      `\nMonster stat: \nHealth - ${orc.health}\nDefense - ${orc.defense}\nDamage - ${orc.damage}`
    );
    console.log("\nWhat would you like to do?");
    console.log("1: Check status");
    console.log("2: Check inventory");
    console.log("3: Use item");
    console.log("4: Fight the monster");
    console.log("5: Run");
    console.log("6: Show help menu");
    console.log("7: Quit game");
    console.log("8: Go to Dragon nest");
    console.log("9: Save game");
    console.log("10: Load game");
  } else if (
    gameState.getcurrentLocation() === "forest" &&
    gameState.getbattleWin() === false
  ) {
    console.log("A dark forest surrounds you. You hear strange noises...");
    console.log("You faced the monster " + goblin.name);
    console.log(
      `\nMonster stat: \nHealth - ${goblin.health}\nDefense - ${goblin.defense}\nDamage - ${goblin.damage}`
    );
    console.log("\nWhat would you like to do?");
    console.log("1: Check status");
    console.log("2: Check inventory");
    console.log("3: Use item");
    console.log("4: Fight the monster");
    console.log("5: Run");
    console.log("6: Show help menu");
    console.log("7: Quit game");
    console.log("8: Save game");
    console.log("9: Load game");
  } else if (gameState.getcurrentLocation() === "dragon nest") {
    console.log("You in the dragon nest");
    console.log("You faced the monster " + dragon.name);
    console.log(
      `\nMonster stat: \nHealth - ${dragon.health}\nDefense - ${dragon.defense}\nDamage - ${dragon.damage}`
    );
    console.log("\nWhat would you like to do?");
    console.log("1: Check status");
    console.log("2: Check inventory");
    console.log("3: Use item");
    console.log("4: Fight the monster");
    console.log("5: Run");
    console.log("6: Show help menu");
    console.log("7: Quit game");
    console.log("8: Save game");
    console.log("9: Load game");
  }
}

/**
 * Handles movement between locations
 * @param {number} num The chosen option number
 * @returns {boolean} True if movement was successful
 */
function playerMove(num) {
  if (gameState.getcurrentLocation() === "village") {
    if (num === 1) {
      gameState.setcurrentLocation("blacksmith");
      console.log("\nYou enter the blacksmith's shop.");
      return true;
    } else if (num === 2) {
      gameState.setcurrentLocation("market");
      console.log("\nYou enter the market.");
      return true;
    } else if (num === 3) {
      gameState.setcurrentLocation("forest");
      console.log("\nYou venture into the forest...");
      return true;
    } else if (num === 4) {
      showStatus();
      return true;
    } else if (num === 5) {
      inventoryCheck();
      return true;
    } else if (num === 6) {
      useItem();
      return true;
    } else if (num === 7) {
      showHelp();
      return true;
    } else if (num === 8) {
      quit();
      return true;
    } else if (num === 9) {
      saveGame();
      return true;
    } else if (num === 10) {
      loadGame();
      return true;
    } else {
      console.log("\nInvalid choice! Please enter a number between 1 and 10.");
      return true;
    }
  } else if (gameState.getcurrentLocation() === "blacksmith") {
    if (num === 1) {
      gameState.setcurrentLocation("village");
      console.log("\nYou return to the village center.");
      return true;
    } else if (num === 2) {
      buyItems(sword);
      return true;
    } else if (num === 3) {
      buyItems(steelSword);
      return true;
    } else if (num === 4) {
      buyItems(woodenShield);
      return true;
    } else if (num === 5) {
      showStatus();
      return true;
    } else if (num === 6) {
      inventoryCheck();
      return true;
    } else if (num === 7) {
      useItem();
      return true;
    } else if (num === 8) {
      showHelp();
      return true;
    } else if (num === 9) {
      quit();
      return true;
    } else if (num === 10) {
      saveGame();
      return true;
    } else if (num === 11) {
      loadGame();
      return true;
    } else {
      console.log("\nInvalid choice! Please enter a number between 1 and 11.");
      return true;
    }
  } else if (gameState.getcurrentLocation() === "market") {
    if (num === 1) {
      gameState.setcurrentLocation("village");
      console.log("\nYou return to the village center.");
      return true;
    } else if (num === 2) {
      buyItems(healthPotion);
      return true;
    } else if (num === 3) {
      showStatus();
      return true;
    } else if (num === 4) {
      inventoryCheck();
      return true;
    } else if (num === 5) {
      useItem();
      return true;
    } else if (num === 6) {
      showHelp();
      return true;
    } else if (num === 7) {
      quit();
      return true;
    } else if (num === 8) {
      saveGame();
      return true;
    } else if (num === 9) {
      loadGame();
      return true;
    } else {
      console.log("\nInvalid choice! Please enter a number between 1 and 9.");
      return true;
    }
  } else if (gameState.getcurrentLocation() === "forest") {
    if (num === 1) {
      showStatus();
      return true;
    } else if (num === 2) {
      inventoryCheck();
      return true;
    } else if (num === 3) {
      useItem();
      return true;
    } else if (num === 4 && !gameState.getbattleWin()) {
      combat(goblin);
      return true;
    } else if (num === 4 && gameState.getbattleWin()) {
      combat(orc);
      return true;
    } else if (num === 5) {
      gameState.setcurrentLocation("village");
      console.log("\nYou return to the village center.");
      return true;
    } else if (num === 6) {
      showHelp();
      return true;
    } else if (num === 7) {
      quit();
      return true;
    } else if (num === 8 && gameState.getbattleWin()) {
      gameState.setcurrentLocation("dragon nest");
      console.log(
        "\nYou entered the Dragon Nest. Prepare for the final battle"
      );
      return true;
    } else if (num === 8 && !gameState.getbattleWin()) {
      saveGame();
      return true;
    } else if (num === 9 && gameState.getbattleWin()) {
      saveGame();
      return true;
    } else if (num === 9 && !gameState.getbattleWin()) {
      loadGame();
      return true;
    } else if (num === 10 && gameState.getbattleWin()) {
      loadGame();
      return true;
    }
  } else if (gameState.getcurrentLocation() === "dragon nest") {
    if (num === 1) {
      showStatus();
      return true;
    } else if (num === 2) {
      inventoryCheck();
      return true;
    } else if (num === 3) {
      useItem();
      return true;
    } else if (num === 4) {
      combat(dragon);
      return true;
    } else if (num === 5) {
      gameState.setcurrentLocation("forest");
      console.log("\nYou return to the forest.");
      return true;
    } else if (num === 6) {
      showHelp();
      return true;
    } else if (num === 7) {
      quit();
      return true;
    } else if (num === 8) {
      saveGame();
      return true;
    } else if (num === 9) {
      loadGame();
      return true;
    }
  } else {
    console.log("\nInvalid choice! Please enter a number between 1 and 7.");
    return true;
  }
  return false;
}
