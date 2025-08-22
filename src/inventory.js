const gameState = require("./gameState");
const readline = require("readline-sync");
let inventory = []; //Array will store weapon, armor and heath potions

function getInventory() {
  return inventory;
}

function setInvetory(newInventory) {
  inventory = newInventory;
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

// ===========================
// Shopping Functions
// Functions that handle buying items
// ===========================

function buyItems(item) {
  const ItemClass = item.constructor;

  if (gameState.getplayerGold() >= item.value) {
    gameState.setplayerGold(gameState.getplayerGold() - item.value);
    inventory.push(
      new ItemClass(
        item.name,
        item.type,
        item.value,
        item.effect,
        item.description
      )
    );
    console.log(`You bought a ${item.name} for ${item.value} gold!`);
    console.log("Gold remaining: " + gameState.getplayerGold());
  } else {
    console.log("\n'Come back when you have more gold!'");
  }
}

/*
If player does not want to use automatic weapon/armor choise when in battle, he can use it manually
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
          `\nWhat ${type} do you choose?\nEnter the number or type "quit" to continue without any: `
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
    console.log(`\nYou do not have any ${type}`);
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

module.exports = {
  getInventory,
  setInvetory,
  inventoryCheck,
  showInventoryNames,
  useItem,
  hasItemType,
  getItemsByType,
  getBestItem,
  hasGoodEquip,
  buyItems,
  chooseWeaponForBattle,
};
