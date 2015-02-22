function Unit(barracks) {
  console.log("Barracks " + barracks.teamName + " is creating a unit.");
}
 
Unit.prototype = {
  attack: function(enemy){
    enemy.damage(this.attackPower);
  },
  damage: function(healthPoints){
    this.healthPoints -= healthPoints;
  },
  toString: function(){
    return "HP: " + this.healthPoints + " AP: " + this.attackPower;
  }
}
 
function Footman(barracks){
  this.healthPoints = 100;
  this.attackPower = 10;
  this.barracks = barracks;
  Unit.call(this, barracks); // call super
}
 
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
Footman.prototype = Object.create(Unit.prototype); // make Footman inherit from Unit
Footman.prototype.constructor = Footman;
 
 
function Barracks(teamName){
  this.food = 1000;
  this.gold = 500;
  this.teamName = teamName;
}
 
// Alternate way to define prototype properties
Barracks.prototype.trainFootman = function(){
  this.food -= 100;
  this.gold -= 75;
  return new Footman(this);
}
 
Barracks.prototype.toString = function(){
  return "Team: " + this.teamName + " FOOD: " + this.food + " GOLD: " + this.gold;
}
 
function status() {
  console.log('---- status ------');
  console.log('  Barracks ' + redBarracks);
  console.log('  Barracks ' + blueBarracks);
  console.log('  red footman ' + redFootman);
  console.log('  blue footman ' + blueFootman);
  console.log('-------end--------');
}
 
var redBarracks = new Barracks("red");
var blueBarracks = new Barracks("blue");
 
status();
 
console.log('training red footman');
var redFootman = redBarracks.trainFootman();
 
console.log('training blue footman');
var blueFootman = blueBarracks.trainFootman();
 
status();
 
console.log('red footman attacks blue footman');
redFootman.attack(blueFootman);
 
status();