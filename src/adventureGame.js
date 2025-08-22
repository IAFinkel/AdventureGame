const { combat } = require("./combat");
const {
  inventory,
  inventoryCheck,
  showInventoryNames,
  useItem,
  hasItemType,
  getItemsByType,
  getBestItem,
  hasGoodEquip,
  buyItems,
  chooseWeaponForBattle,
} = require("./inventory");
const {
  updateHealth,
  outIfDied,
  quit,
  showHelp,
  showStatus,
  askForChoise,
  playerChoiseValidation,
} = require("./utils");
const { saveGame, loadGame, startDialog } = require("./saveLoad");
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

// Include readline for player input
const readline = require("readline-sync");

// ===========================================
// GAME STATE VARIABLES
// ===========================================

// let healingPotionValue = 30; // How much health is restored
// let weaponDamage = 0; // Will increase to 10 when player gets a sword
// let playerName = "";
// let playerHealth = 100;
// let playerGold = 200; // Starting gold
// let playerDefense = 0;
// let playerAttack = 0;
// //let inventory = []; //Array will store weapon, armor and heath potions
// let gameRunning = true;
// let currentLocation = "village";
// let firstVisit = true;
// let battleWin = false;

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

// =========================================
// FUNCTIONS: DISPLAY GAME AND PLAYER INFO
// =========================================

// /**
//  * Shows the player's current stats
//  * Displays health, gold, and location
//  */
// function showStatus() {
//   console.log("\n=== " + playerName + "'s Status ===");
//   console.log("❤️  Health: " + playerHealth);
//   console.log("💰 Gold: " + playerGold);
//   console.log("📍 Location: " + currentLocation);
//   showInventoryNames();
// }

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

// /**
//  * Inventory check
//  */
// function inventoryCheck() {
//   if (inventory.length === 0) {
//     console.log("Inventory is empty");
//   } else {
//     console.log("Inventory:");
//     inventory.forEach((item, i) => {
//       console.log("\nItem " + (i + 1));
//       console.log(
//         `${item.name} \neffect: ${item.effect} \ndescription: ${item.description}`
//       );
//     });
//   }
// }

// function showInventoryNames() {
//   if (inventory.length === 0) {
//     console.log("Inventory is empty");
//   } else {
//     let itemNames = inventory.map((item) => item.name).join(", ");
//     console.log("Inventory: " + itemNames);
//   }
// }

// /*
// Open the help menu
// */
// function showHelp() {
//   console.log("\n=== AVAILABLE COMMANDS ===");

//   console.log("\nMovement Commands:");
//   console.log("- In the village, choose 1-3 to travel to different locations");
//   console.log(
//     "- In other locations, choose the return option to go back to the village"
//   );

//   console.log("\nBattle Information:");
//   console.log("- You need a sword to win battles");
//   console.log("- Monsters appear in the forest");
//   console.log("- Without a weapon, you'll lose health when retreating");

//   console.log("\nItem Usage:");
//   console.log("- Health potions restore 30 health");
//   console.log("- You can buy potions at the market for 5 gold");
//   console.log("- You can buy a sword at the blacksmith for 10 gold");

//   console.log("\nOther Commands:");
//   console.log("- Choose the status option to see your health and gold");
//   console.log("- Choose the help option to see this message again");
//   console.log("- Choose the quit option to end the game");

//   console.log("\nTips:");
//   console.log("- Keep healing potions for dangerous areas");
//   console.log("- Defeat monsters to earn gold");
//   console.log("- Health can't go above 100");
// }

// =========================================
// FUNCTIONS: MANAGE PLAYER CHOISES
// =========================================

// /**
//  * Asks player to choose the action option according to the current location.
//  * Loop run untill the valid input is made.
//  */
// function askForChoise() {
//   while (true) {
//     let choice = readline.question("\nEnter choice (number): ");
//     choice = choice.trim().toLowerCase();
//     if (choice === "quit" || choice === "q" || choice === "exit") {
//       quit();
//       return null;
//     }
//     if (choice === "help") {
//       showHelp();
//       continue;
//     }
//     let validChoice = playerChoiseValidation(choice);
//     if (validChoice !== null) {
//       return validChoice;
//     }
//   }
// }
// /*
// Parse player choice to number and validate it
// */
// function playerChoiseValidation(choice) {
//   try {
//     let choiceNum;
//     choiceNum = parseInt(choice);

//     if (isNaN(choiceNum)) {
//       throw new Error("Error:This is not a number " + choice);
//     }
//     if (currentLocation === "village" && (choiceNum < 1 || choiceNum > 10)) {
//       throw new Error(
//         "Error:This is not a valid input for village " + choiceNum
//       );
//     }
//     if (currentLocation === "blacksmith" && (choiceNum < 1 || choiceNum > 11)) {
//       throw new Error(
//         "Error:This is not a valid input for blacksmith " + choiceNum
//       );
//     }
//     if (currentLocation === "market" && (choiceNum < 1 || choiceNum > 9)) {
//       throw new Error(
//         "Error:This is not a valid input for market " + choiceNum
//       );
//     }
//     if (
//       currentLocation === "forest" &&
//       battleWin &&
//       (choiceNum < 1 || choiceNum > 10)
//     ) {
//       throw new Error(
//         "Error:This is not a valid input for forest " + choiceNum
//       );
//     }
//     if (
//       currentLocation === "forest" &&
//       battleWin === false &&
//       (choiceNum < 1 || choiceNum > 9)
//     ) {
//       throw new Error(
//         "Error:This is not a valid input for forest " + choiceNum
//       );
//     }
//     if (currentLocation === "dragon nest" && (choiceNum < 1 || choiceNum > 9)) {
//       throw new Error(
//         "Error:This is not a valid input for dragon nest " + choiceNum
//       );
//     } else {
//       //  console.log("Youre choise is " + choiceNum);
//       return choiceNum;
//     }
//   } catch (error) {
//     console.log("Smth went wrong " + error.message);
//     return null;
//   }
// }

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
      // Show status
      showStatus();
      return true;
    } else if (num === 5) {
      // Simple inventory check
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

// /**
//  * Quit the game
//  */
// function quit() {
//   gameRunning = false;
//   console.log("\nThanks for playing!");
// }

// =========================================
// FUNCTIONS: MANAGE PLAYER STATS
// =========================================

// /**
// Update player health if damaged of healed
// * @param {number} healthPoints health or damage value
// */
// function updateHealth(healthPoints) {
//   if (healthPoints < 0 && playerHealth > 0) {
//     playerHealth = playerHealth + healthPoints;
//     console.log("Player health is " + playerHealth);
//   } else if (healthPoints > 0 && playerHealth < 100) {
//     let remainingHealth = 100 - playerHealth;
//     if (remainingHealth > healthPoints) {
//       playerHealth = playerHealth + healthPoints;
//       console.log("Player health is " + playerHealth);
//     } else {
//       playerHealth = 100;
//       console.log("Player health is " + playerHealth);
//     }
//   } else if (healthPoints > 0 && playerHealth >= 100) {
//     console.log("The player health is maximum");
//   }
// }

// /**
//  * Handles using items like potions
//  * @returns {boolean} true if item was used successfully, false if not
//  */
// function useItem() {
//   if (inventory.length === 0) {
//     console.log("No items to be used!");
//     return false;
//   }

//   inventoryCheck();
//   let choise = readline.question(
//     "What item you want to use? Insert the number"
//   );
//   let itemPosition = Number(choise) - 1;
//   if (!inventory[itemPosition]) {
//     console.log("Invalid choise!");
//     return false;
//   }

//   if (typeof inventory[itemPosition].use === "function") {
//     let usedSuccessfully = inventory[itemPosition].use();
//     if (inventory[itemPosition].type === "potion" && usedSuccessfully) {
//       inventory.splice(itemPosition, 1);
//     }
//     return usedSuccessfully;
//   } else {
//     console.log("You can not use it now");
//     return false;
//   }
// }

// /*
// Check the item type
// */
// function hasItemType(type) {
//   return inventory.some((item) => item.type === type);
// }

// /*
// Checks the player health and out if died
// */
// function outIfDied() {
//   if (playerHealth <= 0) {
//     console.log("\nGame Over! Your health reached 0!");
//     gameRunning = false;
//   }
// }

// /**
// Returns an array of all items matching type
// * @param {string} type type of item: weapon, armor, potion
//  * @returns {Object[]}  array of all objects matching the given type
// */
// function getItemsByType(type) {
//   let itemsByType = inventory.filter((item) => item.type === type);
//   return itemsByType;
// }

// /**
// Finds the item with the highest effect value
// * @param {string} type type of item: weapon, armor, potion
//  * @returns {Object[]}  the first object from the array of all objects matching the given type
// */
// function getBestItem(type) {
//   let newInventory = getItemsByType(type);
//   if (newInventory.length === 0) {
//     console.log(`the ${type} is empty`);
//     return { name: "", type, effect: 0 };
//   }
//   let sortedInventory = [...newInventory].sort((a, b) => b.effect - a.effect);
//   return sortedInventory[0];
// }

// /*
// Checks if the player has good enough equipment
// */
// function hasGoodEquip() {
//   let bestWeapon = getBestItem("weapon");
//   let bestArmor = getBestItem("armor");
//   if (bestWeapon.effect >= 10 && bestArmor.effect >= 5) {
//     return true;
//   }
//   return false;
// }

// /*
// If player does not want to use automatic weapon/armor choise when in battle, he can use it manually
// */
// function chooseWeaponForBattle(type) {
//   let allWeapon = getItemsByType(type);
//   if (allWeapon.length != 0) {
//     allWeapon.forEach((item, i) => {
//       console.log("\nItem " + (i + 1));
//       console.log(
//         `${item.name} \neffect: ${item.effect} \ndescription: ${item.description}`
//       );
//     });
//     while (true) {
//       try {
//         let choise = readline.question(
//           `\nWhat ${type} do you choose?\nEnter the number or type "quit" to continue without any: `
//         );

//         if (choise.trim().toLowerCase() === "quit") {
//           return {
//             name: "",
//             type,
//             effect: 0,
//             use: function () {
//               return 0;
//             },
//           };
//         } else if (
//           choise.trim().toLowerCase() != "quit" &&
//           !allWeapon[choise - 1]
//         ) {
//           throw new Error("Invalid choise: " + choise);
//         } else {
//           let item = allWeapon[choise - 1];
//           return item;
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//   } else {
//     console.log(`\nYou do not have any ${type}`);
//     return {
//       name: "",
//       type,
//       effect: 0,
//       use: function () {
//         return 0;
//       },
//     };
//   }
// }

// ===========================
// Shopping Functions
// Functions that handle buying items
// ===========================

// function buyItems(item) {
//   const ItemClass = item.constructor;

//   if (playerGold >= item.value) {
//     playerGold -= item.value;
//     inventory.push(
//       new ItemClass(
//         item.name,
//         item.type,
//         item.value,
//         item.effect,
//         item.description
//       )
//     );
//     console.log(`You bought a ${item.name} for ${item.value} gold!`);
//     console.log("Gold remaining: " + playerGold);
//   } else {
//     console.log("\n'Come back when you have more gold!'");
//   }
// }

// =========================================
// FUNCTIONS: BATTLE
// =========================================

// /**
//  * Battle: receives enemy object
//  * Checks if player has weapon and armor: if no -> back to the village, if yes - fight.
//  * for boss battle checks if player has proper wepon and armor
//  * Player loses health on every attack.
//  */
// function combat(enemy) {
//   let inBattle = true;
//   //to be able to use not the original enemy oblect, but its clone
//   //need to create new Object - Object.create where prototype is enemy - Object.getPrototypeOf(enemy)
//   //and then assign to the empty new object the values of enemy
//   let enemyClone = Object.assign(
//     Object.create(Object.getPrototypeOf(enemy)),
//     enemy
//   );
//   if (
//     (enemyClone.type === "boss" && hasGoodEquip()) ||
//     (enemyClone.type !== "boss" && hasItemType("weapon"))
//   ) {
//     let weapon = chooseWeaponForBattle("weapon");
//     let armor = chooseWeaponForBattle("armor");
//     playerDefense = armor.use();
//     playerAttack = weapon.use();

//     console.log(`\nYou started the battle!\n`);
//     while (inBattle) {
//       console.log("\nYou attack!");

//       if (enemyClone.defense > 0) {
//         let leftoverDamage = Math.max(0, playerAttack - enemyClone.defense);
//         if (leftoverDamage > 0) {
//           enemyClone.defense = 0;
//           enemyClone.health -= leftoverDamage;
//         } else {
//           enemyClone.defense -= playerAttack;
//         }
//       } else {
//         enemyClone.health -= playerAttack;
//       }

//       console.log(
//         `\nMonster stat: \nHealth - ${enemyClone.health}\nDefense - ${enemyClone.defense}\nDamage - ${enemyClone.damage}`
//       );
//       console.log(`${enemyClone.name} strikes back!`);
//       enemyClone.attack();

//       if (enemyClone.health <= 0 && playerHealth <= 0) {
//         console.log("Both you and the monster fall in battle");
//         inBattle = false;
//       } else if (enemyClone.health <= 0 && enemyClone.type === "easy") {
//         console.log("Monster defeated!");
//         console.log("You found 10 gold!");
//         playerGold += 10;
//         inBattle = false;
//         battleWin = true;
//         currentLocation = "village"; // Return to village after battle
//         console.log("\nYou return to the safety of the village.");
//       } else if (enemyClone.health <= 0 && enemyClone.type === "hard") {
//         console.log("Monster defeated!");
//         console.log("You found 30 gold!");
//         playerGold += 30;
//         inBattle = false;
//         battleWin = true;
//         currentLocation = "village"; // Return to village after battle
//         console.log("\nYou return to the safety of the village.");
//       } else if (enemyClone.health <= 0 && enemyClone.type === "boss") {
//         console.log("You killed the Dragon!");
//         console.log("Game Over");
//         quit();
//       } else if (playerHealth <= 0) {
//         inBattle = false;
//       }
//     }
//   } else {
//     console.log("\nWithout proper equipment you must retreat");
//     updateHealth(-20);
//     currentLocation = "village"; // Return to village after battle
//   }
// }

// // =========================================
// // FUNCTIONS: SAVE AND LOAD THE GAME
// // =========================================

// function saveGame() {
//   const gameState = {
//     health: playerHealth,
//     gold: playerGold,
//     playerName: playerName,
//     location: currentLocation,
//     firstVisit: firstVisit,
//     battleWin: battleWin,
//     inventory: inventory.map((item) => ({
//       ...item,
//       classType: item.constructor.name,
//     })),
//     //...item - this creates a copy of the item object
//     // classType - additional field that we added to the item object
//     // item.constructor.name - method that will return the type of the class instance of witch the item is (ex: Potion)
//   };

//   try {
//     fs.writeFileSync("savegame.json", JSON.stringify(gameState, null, 2));
//     console.log("Game saved");
//   } catch (error) {
//     console.log("Failed to save the game: " + error.message);
//   }
// }

// function loadGame() {
//   try {
//     const gameData = fs.readFileSync("savegame.json", "utf8");
//     const parsedData = JSON.parse(gameData);

//     playerGold = parsedData.gold;
//     playerName = parsedData.playerName;
//     playerHealth = parsedData.health;
//     currentLocation = parsedData.location;
//     firstVisit = parsedData.firstVisit;
//     battleWin = parsedData.battleWin;

//     inventory = parsedData.inventory.map((item) => {
//       switch (item.classType) {
//         case "Potion":
//           return new Potion(
//             item.name,
//             item.type,
//             item.value,
//             item.effect,
//             item.description
//           );
//         case "Weapon":
//           return new Weapon(
//             item.name,
//             item.type,
//             item.value,
//             item.effect,
//             item.description
//           );
//         case "Armor":
//           return new Armor(
//             item.name,
//             item.type,
//             item.value,
//             item.effect,
//             item.description
//           );

//         default:
//           return new Item(
//             item.name,
//             item.type,
//             item.value,
//             item.effect,
//             item.description
//           );
//       }
//     });

//     console.log("Game loaded");
//   } catch (error) {
//     console.log("Failed to load the game: " + error.message);
//   }
// }

// function startDialog() {
//   try {
//     let choise = readline.question("Dowload saved game: Y/N\n");
//     if (choise.trim().toLowerCase() === "y") {
//       loadGame();
//     } else if (choise.trim().toLowerCase() === "n") {
//       // Get player's name
//       playerName = readline.question("\nWhat is your name, brave adventurer? ");
//       console.log("\nWelcome, " + playerName + "!");
//       // Weapon damage (starts at 0 until player buys a sword)

//       console.log("Starting weapon damage: " + weaponDamage);
//       console.log("When you buy a weapon, weapon damage will increase!");
//       console.log("Healing potion value: " + healingPotionValue);
//       console.log("A potion will restore 30 health!");
//       console.log("You start with " + playerGold + " gold.");
//     } else {
//       throw new Error("Invalid choise: " + choise);
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// }
