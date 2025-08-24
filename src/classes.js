const { updateHealth } = require("./utils");
const gameState = require("./gameState");

class Item {
  constructor(name, type, value, effect, description) {
    this.name = name;
    this.type = type;
    this.value = value;
    this.effect = effect;
    this.description = description;
  }

  use() {
    console.log(`\nYou took the ${this.name}, + ${this.effect} to attack`);
    return this.effect;
  }
}

class Weapon extends Item {
  constructor(name, type, value, effect, description) {
    super(name, type, value, effect, description);
  }
}

class Armor extends Item {
  constructor(name, type, value, effect, description) {
    super(name, type, value, effect, description);
  }
  use() {
    console.log(`You took the ${this.name}, + ${this.effect} to defense`);
    return this.effect;
  }
}

class Potion extends Item {
  constructor(name, type, value, effect, description) {
    super(name, type, value, effect, description);
  }

  use() {
    if (gameState.getplayerHealth() < 100) {
      console.log(`You drink the ${this.name}, + ${this.effect} to health`);
      updateHealth(this.effect);

      return true;
    } else {
      console.log("You can not use it. The player health is maximum");
      return false;
    }
  }
}

class Enemy {
  constructor(name, type, health, defense, damage, description) {
    this.name = name;
    this.type = type;
    this.health = health;
    this.defense = defense;
    this.damage = damage;
    this.description = description;
  }

  attack() {
    if (this.health > 0) {
      if (gameState.getplayerDefense() > 0) {
        let leftoverDamage = Math.abs(
          this.damage - gameState.getplayerDefense()
        );
        gameState.setplayerDefense(
          Math.max(0, gameState.getplayerDefense() - Math.abs(this.damage))
        );
        if (leftoverDamage > 0) {
          updateHealth(-leftoverDamage);
        }
        console.log("Player defense level is " + gameState.getplayerDefense());
      } else {
        updateHealth(-this.damage);
      }
    } else {
      return false;
    }
  }
}

class Goblin extends Enemy {
  constructor(name, type, health, defense, damage, description) {
    super(name, type, health, defense, damage, description);
  }
}

class Orc extends Enemy {
  constructor(name, type, health, defense, damage, description) {
    super(name, type, health, defense, damage, description);
  }
}

class Dragon extends Enemy {
  constructor(name, type, health, defense, damage, description) {
    super(name, type, health, defense, damage, description);
  }
}

module.exports = { Item, Weapon, Armor, Potion, Enemy, Goblin, Orc, Dragon };
