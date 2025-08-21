const {
  hasGoodEquip,
  hasItemType,
  chooseWeaponForBattle,
} = require("./inventory");
const { updateHealth, quit } = require("./utils");
const {
  playerHealth,
  playerGold,
  playerDefense,
  playerAttack,
} = require("./gameState");

/**
 * Battle: receives enemy object
 * Checks if player has weapon and armor: if no -> back to the village, if yes - fight.
 * for boss battle checks if player has proper wepon and armor
 * Player loses health on every attack.
 */
function combat(enemy) {
  let inBattle = true;
  //to be able to use not the original enemy oblect, but its clone
  //need to create new Object - Object.create where prototype is enemy - Object.getPrototypeOf(enemy)
  //and then assign to the empty new object the values of enemy
  let enemyClone = Object.assign(
    Object.create(Object.getPrototypeOf(enemy)),
    enemy
  );
  if (
    (enemyClone.type === "boss" && hasGoodEquip()) ||
    (enemyClone.type !== "boss" && hasItemType("weapon"))
  ) {
    let weapon = chooseWeaponForBattle("weapon");
    let armor = chooseWeaponForBattle("armor");
    playerDefense = armor.use();
    playerAttack = weapon.use();

    console.log(`\nYou started the battle!\n`);
    while (inBattle) {
      console.log("\nYou attack!");

      if (enemyClone.defense > 0) {
        let leftoverDamage = Math.max(0, playerAttack - enemyClone.defense);
        if (leftoverDamage > 0) {
          enemyClone.defense = 0;
          enemyClone.health -= leftoverDamage;
        } else {
          enemyClone.defense -= playerAttack;
        }
      } else {
        enemyClone.health -= playerAttack;
      }

      console.log(
        `\nMonster stat: \nHealth - ${enemyClone.health}\nDefense - ${enemyClone.defense}\nDamage - ${enemyClone.damage}`
      );
      console.log(`${enemyClone.name} strikes back!`);
      enemyClone.attack();

      if (enemyClone.health <= 0 && playerHealth <= 0) {
        console.log("Both you and the monster fall in battle");
        inBattle = false;
      } else if (enemyClone.health <= 0 && enemyClone.type === "easy") {
        console.log("Monster defeated!");
        console.log("You found 10 gold!");
        playerGold += 10;
        inBattle = false;
        battleWin = true;
        currentLocation = "village"; // Return to village after battle
        console.log("\nYou return to the safety of the village.");
      } else if (enemyClone.health <= 0 && enemyClone.type === "hard") {
        console.log("Monster defeated!");
        console.log("You found 30 gold!");
        playerGold += 30;
        inBattle = false;
        battleWin = true;
        currentLocation = "village"; // Return to village after battle
        console.log("\nYou return to the safety of the village.");
      } else if (enemyClone.health <= 0 && enemyClone.type === "boss") {
        console.log("You killed the Dragon!");
        console.log("Game Over");
        quit();
      } else if (playerHealth <= 0) {
        inBattle = false;
      }
    }
  } else {
    console.log("\nWithout proper equipment you must retreat");
    updateHealth(-20);
    currentLocation = "village"; // Return to village after battle
  }
}

module.exports = { combat };
