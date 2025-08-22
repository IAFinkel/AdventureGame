const {
  hasGoodEquip,
  hasItemType,
  chooseWeaponForBattle,
} = require("./inventory");
const { updateHealth, quit } = require("./utils");
const gameState = require("./gameState");

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
    gameState.setplayerDefense(armor.use());
    gameState.setplayerAttack(weapon.use());

    console.log(`\nYou started the battle!\n`);
    while (inBattle) {
      console.log("\nYou attack!");

      if (enemyClone.defense > 0) {
        let leftoverDamage = Math.max(
          0,
          gameState.getplayerAttack() - enemyClone.defense
        );
        if (leftoverDamage > 0) {
          enemyClone.defense = 0;
          enemyClone.health -= leftoverDamage;
        } else {
          enemyClone.defense -= gameState.getplayerAttack();
        }
      } else {
        enemyClone.health -= gameState.getplayerAttack();
      }

      console.log(
        `\nMonster stat: \nHealth - ${enemyClone.health}\nDefense - ${enemyClone.defense}\nDamage - ${enemyClone.damage}`
      );
      console.log(`${enemyClone.name} strikes back!`);
      enemyClone.attack();

      if (enemyClone.health <= 0 && gameState.getplayerHealth() <= 0) {
        console.log("Both you and the monster fall in battle");
        inBattle = false;
      } else if (enemyClone.health <= 0 && enemyClone.type === "easy") {
        console.log("Monster defeated!");
        console.log("You found 10 gold!");
        gameState.setplayerGold(gameState.getplayerGold() + 10);
        inBattle = false;
        gameState.setbattleWin(true);
        gameState.setcurrentLocation("village"); // Return to village after battle
        console.log("\nYou return to the safety of the village.");
      } else if (enemyClone.health <= 0 && enemyClone.type === "hard") {
        console.log("Monster defeated!");
        console.log("You found 30 gold!");
        gameState.setplayerGold(gameState.getplayerGold() + 30);
        inBattle = false;
        gameState.setbattleWin(true);
        gameState.setcurrentLocation("village"); // Return to village after battle
        console.log("\nYou return to the safety of the village.");
      } else if (enemyClone.health <= 0 && enemyClone.type === "boss") {
        console.log("You killed the Dragon!");
        console.log("Game Over");
        quit();
      } else if (gameState.getplayerHealth() <= 0) {
        inBattle = false;
      }
    }
  } else {
    console.log("\nWithout proper equipment you must retreat");
    updateHealth(-20);
    gameState.setcurrentLocation("village"); // Return to village after battle
  }
}

module.exports = { combat };
