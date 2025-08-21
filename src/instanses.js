const { Weapon, Armor, Potion, Goblin, Orc, Dragon } = require("./classes");

const sword = new Weapon(
  "Sword",
  "weapon",
  10,
  10,
  "weapon increase the damage"
);
const steelSword = new Weapon(
  "Steel Sword",
  "weapon",
  15,
  15,
  "weapon increase the damage"
);
const woodenShield = new Armor(
  "Wooden Shield",
  "armor",
  5,
  5,
  "reduces damage taken in combat"
);
const healthPotion = new Potion(
  "Health Potion",
  "potion",
  5,
  30,
  "health potion restore players health"
);

const goblin = new Goblin(
  "Forest goblin",
  "easy",
  20,
  5,
  5,
  "forest goblins are angry but not to powerfull"
);

const orc = new Orc("Orc", "hard", 30, 15, 10, "orcs are strong and furious");

const dragon = new Dragon(
  "Dragon",
  "boss",
  50,
  30,
  20,
  "dragons are very powerfull and have strong defense"
);

module.exports = {
  sword,
  steelSword,
  woodenShield,
  healthPotion,
  goblin,
  orc,
  dragon,
};
