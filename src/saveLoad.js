const { getInventory, setInvetory } = require("./inventory");
const { Weapon, Armor, Potion, Item } = require("./classes");
const gameState = require("./gameState");
const fs = require("fs");
const readline = require("readline-sync");

function saveGame() {
  const status = {
    health: gameState.getplayerHealth(),
    gold: gameState.getplayerGold(),
    playerName: gameState.getplayerName(),
    location: gameState.getcurrentLocation(),
    firstVisit: gameState.getfirstVisit(),
    battleWin: gameState.getbattleWin(),
    inventory: getInventory().map((item) => ({
      ...item,
      classType: item.constructor.name,
    })),
    //...item - this creates a copy of the item object
    // classType - additional field that we added to the item object
    // item.constructor.name - method that will return the type of the class instance of witch the item is (ex: Potion)
  };

  try {
    fs.writeFileSync("savegame.json", JSON.stringify(status, null, 2));
    console.log("Game saved");
  } catch (error) {
    console.log("Failed to save the game: " + error.message);
  }
}

function loadGame() {
  try {
    const gameData = fs.readFileSync("savegame.json", "utf8");
    const parsedData = JSON.parse(gameData);

    gameState.setplayerGold(parsedData.gold);
    gameState.setplayerName(parsedData.playerName);
    gameState.setplayerHealth(parsedData.health);
    gameState.setcurrentLocation(parsedData.location);
    gameState.setfirstVisit(parsedData.firstVisit);
    gameState.setbattleWin(parsedData.battleWin);

    setInvetory(
      parsedData.inventory.map((item) => {
        switch (item.classType) {
          case "Potion":
            return new Potion(
              item.name,
              item.type,
              item.value,
              item.effect,
              item.description
            );
          case "Weapon":
            return new Weapon(
              item.name,
              item.type,
              item.value,
              item.effect,
              item.description
            );
          case "Armor":
            return new Armor(
              item.name,
              item.type,
              item.value,
              item.effect,
              item.description
            );

          default:
            return new Item(
              item.name,
              item.type,
              item.value,
              item.effect,
              item.description
            );
        }
      })
    );

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
      gameState.setplayerName(
        readline.question("\nWhat is your name, brave adventurer? ")
      );
      console.log("\nWelcome, " + gameState.getplayerName() + "!");
      // Weapon damage (starts at 0 until player buys a sword)

      console.log("Starting weapon damage: " + gameState.getweaponDamage());
      console.log("When you buy a weapon, weapon damage will increase!");
      console.log("Healing potion value: " + gameState.getHealingPotionValue());
      console.log("A potion will restore 30 health!");
      console.log("You start with " + gameState.getplayerGold() + " gold.");
    } else {
      throw new Error("Invalid choise: " + choise);
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { saveGame, loadGame, startDialog };
