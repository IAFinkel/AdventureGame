// ===========================================
// The Dragon's Quest - Text Adventure Game
// A progression-based learning project
// ===========================================

// Include readline for player input
const readline = require("readline-sync");
const fs = require("fs");

// ===========================================
// GAME STATE VARIABLES
// ===========================================

let monsterDefense; // Monster's defense value
let monsterHealth; // Monster's health value
let monsterDamage; //Monster attack damage value
let healingPotionValue = 30; // How much health is restored
let weaponDamage = 0; // Will increase to 10 when player gets a sword
let playerName = "";
let playerHealth = 100;
let playerGold = 200; // Starting gold
let inventory = []; //Array will store weapon, armor and heath potions
let gameRunning = true;
let currentLocation = "village";
let firstVisit = true;
let battleWin = false;

// ===========================================
// GAME OBJECTS
// ===========================================
const helthPotion = {
  name: "Helth Potion",
  type: "potion",
  value: 5,
  effect: 30,
  description: "helth potion restore players helth",
  use: function () {
    if (playerHealth < 100) {
      console.log(`You drink the ${this.name}, + ${this.effect} to helth`);
      updateHelth(this.effect);

      return true;
    } else {
      console.log("You can not use it. The player helth is maximum");
      return false;
    }
  },
};

const sword = {
  name: "Sword",
  type: "weapon",
  value: 10,
  effect: 10,
  description: "weapon increase the damage",
  use: function () {
    console.log(`You took the ${this.name}, + ${this.effect} to attack`);
    return this.effect;
  },
};

const steelSword = {
  name: "Steel Sword",
  type: "weapon",
  value: 15,
  effect: 15,
  description: "weapon increase the damage",
  use: function () {
    console.log(`You took the ${this.name}, + ${this.effect} to attack`);
    return this.effect;
  },
};

const woodenShield = {
  name: "Wooden Shield",
  type: "armor",
  value: 8,
  effect: 5,
  description: "Reduces damage taken in combat",
  use: function () {
    console.log(`You took the ${this.name}, + ${this.effect} to defence`);
    return this.effect;
  },
};

const ironShield = {
  name: "Iron Shield",
  type: "armor",
  value: 10,
  effect: 8,
  description: "Reduces damage taken in combat",
  use: function () {
    console.log(`You took the ${this.name}, + ${this.effect} to defence`);
    return this.effect;
  },
};

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

while (gameRunning) {
  showLocation();
  let choiceNum = askForChoise();
  if (choiceNum === null) {
    break;
  }
  playerMove(choiceNum);
  outIfDied(playerHealth);
}

// =========================================
// FUNCTIONS: DISPLAY GAME AND PLAYER INFO
// =========================================

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
 * Shows the current location's description and available choices
 */
function showLocation() {
  if (firstVisit) {
    console.log(
      "\nVillager: 'Welcome, adventurer! Rumor has it there's a dragon in the mountains...'"
    );
    firstVisit = false;
  }

  console.log("\n=== " + currentLocation.toUpperCase() + " ===");

  if (currentLocation === "village") {
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
  } else if (currentLocation === "blacksmith") {
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
  } else if (currentLocation === "market") {
    console.log(
      "Merchants sell their wares from colorful stalls. A potion seller catches your eye."
    );
    console.log("\nWhat would you like to do?");
    console.log("1: Return to village");
    console.log(`2: Buy potion for ${helthPotion.value} gold`);
    console.log("3: Check status");
    console.log("4: Check inventory");
    console.log("5: Use item");
    console.log("6: Show help menu");
    console.log("7: Quit game");
    console.log("8: Save game");
    console.log("9: Load game");
  } else if (currentLocation === "forest" && battleWin) {
    monsterType("standart");
    console.log("A dark forest surrounds you. You hear strange noises...");
    console.log("You faced the monster");
    console.log("\nMonster helth level - " + monsterHealth);
    console.log("\nMonster defence level - " + monsterDefense);
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
  } else if (currentLocation === "forest" && battleWin === false) {
    monsterType("standart");
    console.log("A dark forest surrounds you. You hear strange noises...");
    console.log("You faced the monster");
    console.log("\nMonster helth level - " + monsterHealth);
    console.log("\nMonster defence level - " + monsterDefense);
    console.log("\nMonster damage level - " + monsterDamage);
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
  } else if (currentLocation === "dragon nest") {
    monsterType("dragon");
    console.log("You in the dragon nest");
    console.log("\nMonster helth level - " + monsterHealth);
    console.log("\nMonster defence level - " + monsterDefense);
    console.log("\nMonster damage level - " + monsterDamage);
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
 * Inventory check
 */
function inventoryCheck() {
  if (inventory.length === 0) {
    console.log("Inventory is empty");
  } else {
    console.log("Inventory:");
    inventory.forEach((item, i) => {
      console.log("\nItem " + (i + 1));
      console.log(
        `${item.name} \neffect: ${item.effect} \ndescription: ${item.description}`
      );
    });
  }
}

function showInventoryNames() {
  if (inventory.length === 0) {
    console.log("Inventory is empty");
  } else {
    let itemNames = inventory.map((item) => item.name).join(", ");
    console.log("Inventory: " + itemNames);
  }
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

// =========================================
// FUNCTIONS: MANAGE PLAYER CHOISES
// =========================================

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
      console.log("Youre choise is " + choiceNum);
      return choiceNum;
    }
  } catch (error) {
    console.log("Smth went wrong " + error.message);
    return null;
  }
}

/**
 * Handles movement between locations
 * @param {number} num The chosen option number
 * @returns {boolean} True if movement was successful
 */
function playerMove(num) {
  if (currentLocation === "village") {
    if (num === 1) {
      currentLocation = "blacksmith";
      console.log("\nYou enter the blacksmith's shop.");
      return true;
    } else if (num === 2) {
      currentLocation = "market";
      console.log("\nYou enter the market.");
      return true;
    } else if (num === 3) {
      currentLocation = "forest";
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
  } else if (currentLocation === "blacksmith") {
    if (num === 1) {
      currentLocation = "village";
      console.log("\nYou return to the village center.");
      return true;
    } else if (num === 2) {
      buyWeapon("Sword");
      return true;
    } else if (num === 3) {
      buyWeapon("Steel Sword");
      return true;
    } else if (num === 4) {
      buyWeapon("Wooden Shield");
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
  } else if (currentLocation === "market") {
    if (num === 1) {
      currentLocation = "village";
      console.log("\nYou return to the village center.");
      return true;
    } else if (num === 2) {
      buyPotion();
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
  } else if (currentLocation === "forest") {
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
      combat();
      return true;
    } else if (num === 5) {
      currentLocation = "village";
      console.log("\nYou return to the village center.");
      return true;
    } else if (num === 6) {
      showHelp();
      return true;
    } else if (num === 7) {
      quit();
      return true;
    } else if (num === 8 && battleWin) {
      currentLocation = "dragon nest";
      console.log(
        "\nYou entered the Dragon Nest. Prepare for the final battle"
      );
      return true;
    } else if (num === 8 && !battleWin) {
      saveGame();
      return true;
    } else if (num === 9 && battleWin) {
      saveGame();
      return true;
    } else if (num === 9 && !battleWin) {
      loadGame();
      return true;
    } else if (num === 10 && battleWin) {
      loadGame();
      return true;
    }
  } else if (currentLocation === "dragon nest") {
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
      combat(true);
      return true;
    } else if (num === 5) {
      currentLocation = "forest";
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

/**
 * Quit the game
 */
function quit() {
  gameRunning = false;
  console.log("\nThanks for playing!");
}

// =========================================
// FUNCTIONS: MANAGE PLAYER STATS
// =========================================

/** 
Update player helth if damaged of healed
* @param {number} helthPoints helth or damage value
*/
function updateHelth(helthPoints) {
  if (helthPoints < 0 && playerHealth > 0) {
    playerHealth = playerHealth + helthPoints;
    console.log("The player helth decreased by " + helthPoints + " points");
    console.log("Player helth is " + playerHealth);
  } else if (helthPoints > 0 && playerHealth < 100) {
    let remainingHelth = 100 - playerHealth;
    if (remainingHelth > helthPoints) {
      playerHealth = playerHealth + helthPoints;
      console.log("The player helth increased by " + helthPoints + " points");
      console.log("Player helth is " + playerHealth);
    } else {
      playerHealth = 100;
      console.log(
        "The player helth increased by " + remainingHelth + " points"
      );
      console.log("Player helth is " + playerHealth);
    }
  } else if (helthPoints > 0 && playerHealth >= 100) {
    console.log("The player helth is maximum");
  }
}

/**
 * Handles using items like potions
 * @returns {boolean} true if item was used successfully, false if not
 */
function useItem() {
  if (inventory.length === 0) {
    console.log("No items to be used!");
    return false;
  }

  inventoryCheck();
  let choise = readline.question(
    "What item you want to use? Insert the number"
  );
  let itemPosition = Number(choise) - 1;
  if (!inventory[itemPosition]) {
    console.log("Invalid choise!");
    return false;
  }

  if (typeof inventory[itemPosition].use === "function") {
    let usedSuccessfully = inventory[itemPosition].use();
    if (inventory[itemPosition].type === "potion" && usedSuccessfully) {
      inventory.splice(itemPosition, 1);
    }
    return usedSuccessfully;
  } else {
    console.log("You can not use it now");
    return false;
  }
}

/*
Check the item type
*/
function hasItemType(type) {
  return inventory.some((item) => item.type === type);
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
Returns an array of all items matching type
* @param {string} type type of item: weapon, armor, potion
 * @returns {Object[]}  array of all objects matching the given type
*/
function getItemsByType(type) {
  let itemsByType = inventory.filter((item) => item.type === type);
  return itemsByType;
}

/**
Finds the item with the highest effect value
* @param {string} type type of item: weapon, armor, potion
 * @returns {Object[]}  the first object from the array of all objects matching the given type
*/
function getBestItem(type) {
  let newInventory = getItemsByType(type);
  if (newInventory.length === 0) {
    console.log(`the ${type} is empty`);
    return { name: "", type, effect: 0 };
  }
  let sortedInventory = [...newInventory].sort((a, b) => b.effect - a.effect);
  return sortedInventory[0];
}

/*
Checks if the player has good enough equipment 
*/
function hasGoodEquip() {
  let bestWeapon = getBestItem("weapon");
  let bestArmor = getBestItem("armor");
  if (bestWeapon.effect >= 10 && bestArmor.effect >= 5) {
    return true;
  }
  return false;
}

/*
If player does not want to use automatic weapon/armour choise when in battle, he can use it manually
*/
function chooseWeaponForBattle(type) {
  let allWeapon = getItemsByType(type);
  if (allWeapon.length != 0) {
    allWeapon.forEach((item, i) => {
      console.log("\nItem " + (i + 1));
      console.log(
        `${item.name} \neffect: ${item.effect} \ndescription: ${item.description}`
      );
    });
    while (true) {
      try {
        let choise = readline.question(
          `What ${type} do you choose?\nEnter the number or type "quit" to continue without any\n`
        );

        if (choise.trim().toLowerCase() === "quit") {
          return {
            name: "",
            type,
            effect: 0,
            use: function () {
              return 0;
            },
          };
        } else if (
          choise.trim().toLowerCase() != "quit" &&
          !allWeapon[choise - 1]
        ) {
          throw new Error("Invalid choise: " + choise);
        } else {
          let item = allWeapon[choise - 1];
          return item;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  } else {
    console.log(`You do not have any ${type}`);
    return {
      name: "",
      type,
      effect: 0,
      use: function () {
        return 0;
      },
    };
  }
}

// ===========================
// Shopping Functions
// Functions that handle buying items
// ===========================

function buyWeapon(weaponName) {
  let chosenItem;
  if (weaponName === "Sword") {
    chosenItem = sword;
  }
  if (weaponName === "Steel Sword") {
    chosenItem = steelSword;
  }
  if (weaponName === "Wooden Shield") {
    chosenItem = woodenShield;
  }

  if (playerGold >= chosenItem.value) {
    console.log(
      `\nBlacksmith: 'A fine ${chosenItem.name} for a brave adventurer!'`
    );
    playerGold -= chosenItem.value;
    inventory.push({ ...chosenItem });
    console.log(
      `You bought a ${chosenItem.name} for ${chosenItem.value} gold!`
    );
    console.log("Gold remaining: " + playerGold);
  } else {
    console.log("\nBlacksmith: 'Come back when you have more gold!'");
  }
}

function buyPotion() {
  if (playerGold >= helthPotion.value) {
    console.log("\nMerchant: 'This potion will heal your wounds!'");
    playerGold -= helthPotion.value;
    inventory.push({ ...helthPotion });
    console.log(
      `You bought a ${helthPotion.name} for ${helthPotion.value} gold!`
    );
    console.log("Gold remaining: " + playerGold);
  } else {
    console.log("\nMerchant: 'Come back when you have more gold!'");
  }
}

// =========================================
// FUNCTIONS: BATTLE
// =========================================

function monsterType(type) {
  if (type === "dragon") {
    monsterHealth = 50;
    monsterDefense = 30;
    monsterDamage = 20;
  } else if (type === "standart") {
    monsterHealth = 10;
    monsterDefense = 5;
    monsterDamage = 1;
  }
}

/**
 * Battle: if the isDragon flag = true -> final battle with dragon
 * if false -> regular forest battle.
 * Checks if player has weapon and armor: if no -> back to the village, if yes - fight.
 * Player loses helth on every attack.
 */
function combat(isDragon = false) {
  let inBattle = true;
  let playerDefense;
  let playerAttack;
  if (isDragon) {
    monsterType("dragon");
  } else {
    monsterType("standart");
  }
  if ((isDragon && hasGoodEquip()) || (!isDragon && hasItemType("weapon"))) {
    // let weapon = getBestItem("weapon");
    // let armor = getBestItem("armor");
    let weapon = chooseWeaponForBattle("weapon");
    let armor = chooseWeaponForBattle("armor");
    playerDefense = armor.use();
    playerAttack = weapon.use();
    //playerDefense = armor.effect;
    console.log(`\nYou started the battle!`);
    while (inBattle) {
      console.log("Monster health: " + monsterHealth);
      console.log("Monster defense: " + monsterDefense);
      console.log("You attack!");

      if (monsterDefense > 0) {
        let leftoverDamage = Math.max(0, playerAttack - monsterDefense);
        if (leftoverDamage > 0) {
          monsterDefense = 0;
          monsterHealth -= leftoverDamage;
        } else {
          monsterDefense -= playerAttack;
        }
      } else {
        monsterHealth -= playerAttack;
      }
      if (monsterHealth > 0) {
        if (playerDefense > 0) {
          let leftoverDamage = Math.abs(monsterDamage) - playerDefense;
          playerDefense = Math.max(0, playerDefense - Math.abs(monsterDamage));
          if (leftoverDamage > 0) {
            updateHelth(-leftoverDamage);
          }
          console.log("Player defense level is " + playerDefense);
        } else {
          updateHelth(-monsterDamage);
        }
      }

      if (monsterHealth <= 0 && playerHealth <= 0) {
        console.log("Both you and the monster fall in battle");
        inBattle = false;
      } else if (monsterHealth <= 0 && !isDragon) {
        console.log("Monster defeated!");
        console.log("You found 10 gold!");
        playerGold += 10;
        inBattle = false;
        battleWin = true;
        currentLocation = "village"; // Return to village after battle
        console.log("\nYou return to the safety of the village.");
      } else if (monsterHealth <= 0 && isDragon) {
        console.log("You killed the Dragon!");
        console.log("Game Over");
        quit();
      } else if (playerHealth <= 0) {
        inBattle = false;
      }
    }
  } else {
    console.log("\nWithout proper equipment you must retreat");
    updateHelth(-20);
    currentLocation = "village"; // Return to village after battle
  }
}

// =========================================
// FUNCTIONS: SAVE AND LOAD THE GAME
// =========================================

function saveGame() {
  const gameState = {
    helth: playerHealth,
    gold: playerGold,
    inventory: inventory,
    playerName: playerName,
    location: currentLocation,
    firstVisit: firstVisit,
    battleWin: battleWin,
  };

  try {
    fs.writeFileSync("savegame.json", JSON.stringify(gameState, null, 2));
    console.log("Game saved");
  } catch (error) {
    console.log("Failed to save the game: " + error.message);
  }
}

function loadGame() {
  try {
    const gameData = fs.readFileSync("savegame.json", "utf8");
    const parsedData = JSON.parse(gameData);

    playerGold = parsedData.gold;
    playerName = parsedData.playerName;
    playerHealth = parsedData.helth;
    currentLocation = parsedData.location;
    inventory = parsedData.inventory;
    firstVisit = parsedData.firstVisit;
    battleWin = parsedData.battleWin;

    console.log("Game loaded");
  } catch (error) {
    console.log("Failed to load the game: " + error.message);
  }
}

function startDialog() {
  try {
    let choise = readline.question("Dowload saved game: Y/N\n");
    if (choise.trim().toLowerCase() === "y") {
      loadGame();
    } else if (choise.trim().toLowerCase() === "n") {
      // Get player's name
      playerName = readline.question("\nWhat is your name, brave adventurer? ");
      console.log("\nWelcome, " + playerName + "!");
      // Weapon damage (starts at 0 until player buys a sword)

      console.log("Starting weapon damage: " + weaponDamage);
      console.log("When you buy a weapon, weapon damage will increase!");
      console.log("Healing potion value: " + healingPotionValue);
      console.log("A potion will restore 30 health!");
      console.log("You start with " + playerGold + " gold.");
    } else {
      throw new Error("Invalid choise: " + choise);
    }
  } catch (error) {
    console.log(error.message);
  }
}
