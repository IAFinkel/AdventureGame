let healingPotionValue = 30; // How much health is restored
let weaponDamage = 0; // Will increase to 10 when player gets a sword
let playerName = "";
let playerHealth = 100;
let playerGold = 200; // Starting gold
let playerDefense = 0;
let playerAttack = 0;
let gameRunning = true;
let currentLocation = "village";
let firstVisit = true;
let battleWin = false;

//Getters and Setters functions

function getHealingPotionValue() {
  return healingPotionValue;
}

function setHealingPotionValue(newHealingPotionValue) {
  healingPotionValue = newHealingPotionValue;
}

function getweaponDamage() {
  return weaponDamage;
}

function setweaponDamage(newweaponDamage) {
  weaponDamage = newweaponDamage;
}

function getplayerName() {
  return playerName;
}

function setplayerName(newplayerName) {
  playerName = newplayerName;
}

function getplayerHealth() {
  return playerHealth;
}

function setplayerHealth(newplayerHealth) {
  playerHealth = newplayerHealth;
}

function getplayerGold() {
  return playerGold;
}

function setplayerGold(newplayerGold) {
  playerGold = newplayerGold;
}

function getplayerDefense() {
  return playerDefense;
}

function setplayerDefense(newplayerDefense) {
  playerDefense = newplayerDefense;
}

function getplayerAttack() {
  return playerAttack;
}

function setplayerAttack(newplayerAttack) {
  playerAttack = newplayerAttack;
}

function getgameRunning() {
  return gameRunning;
}

function setgameRunning(newgameRunning) {
  gameRunning = newgameRunning;
}

function getcurrentLocation() {
  return currentLocation;
}

function setcurrentLocation(newcurrentLocation) {
  currentLocation = newcurrentLocation;
}

function getfirstVisit() {
  return firstVisit;
}

function setfirstVisit(newfirstVisit) {
  firstVisit = newfirstVisit;
}

function getbattleWin() {
  return battleWin;
}

function setbattleWin(newbattleWin) {
  battleWin = newbattleWin;
}

module.exports = {
  getHealingPotionValue,
  setHealingPotionValue,
  getweaponDamage,
  setweaponDamage,
  getplayerName,
  setplayerName,
  getplayerHealth,
  setplayerHealth,
  getplayerGold,
  setplayerGold,
  getplayerDefense,
  setplayerDefense,
  getplayerAttack,
  setplayerAttack,
  getgameRunning,
  setgameRunning,
  getcurrentLocation,
  setcurrentLocation,
  getfirstVisit,
  setfirstVisit,
  getbattleWin,
  setbattleWin,
};
