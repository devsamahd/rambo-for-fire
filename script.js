// ** Grabs elements from the DOM and stores them into variables **
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

// ** Check if either players health is  0 and if it is, then update isOver to true **
const updateGame = (p1,p2,gameState) => {
  // Update the DOM with the names and the latest health of players
  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health
  // Condition IF either player health is <= 0 then set isOver to true and declareWinner
  if(p1.health <=0 || p2.health <= 0){
    game.isOver = true
    gameState = game.isOver
    resultDiv.innerText = game.declareWinner(game.isOver, p1, p2)
    return gameState
  }
}

// ** Create the Player class which can create a player with all it's attributes and methods **
// qazi = new Player('Qazi', 100, 7)
// qazi.name 👉 'Qazi'
// qazi.health 👉 100
// qazi.attackDmg 👉 7
class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  // ** Attack an enemy with a random number from 0 to YOUR attackDmg bonus **
  strike (player, enemy, attackDmg) {
    const damage = Math.ceil(Math.random()*attackDmg)
    enemy.health -= damage
    updateGame(p1, p2, game.isOver)
    return `${player.name} attacks ${enemy.name} for ${damage}`
  }
  heal (player) {
    
    // Get random number between 1 - 5 and store that in hpAmount
    const heal = Math.ceil(Math.random()*5)
    // Add hpAmount to players health
    player.health += heal
    //  Update the game and DOM with updateGame()
    updateGame(p1, p2, game.isOver)
    //  Return a message of 'player name heals for hpAmount HP'
    return `${player} healed for ${heal} amount`
  }
}

// ** Create the Game class with all it's attributes and methods to run a match **
// game = new Game()
// game.isOver 👉 false
class Game {
  constructor() {
    this.isOver = false;
  }

  // ** If the game is over and a player has 0 health declare the winner! **
  declareWinner(isOver,p1, p2) {
    let message;
    if(isOver== true && p1.health <= 0){
      message = `${p2.name} wins`
    }else if(isOver == true && p2.health <= 0){                       
      message = `${p1.name} wins`
    }
    document.getElementById('victory').play()
    
    return message
  }

  // ** Reset the players health back to it's original state and isOver to FALSE **
  reset(p1,p2) {
    p1.health = 100
    p2.health = 100
    this.isOver = false
    resultDiv.innerText = ''
    updateGame(p1, p2, this.isOver)
  }
  
  // ** Simulates the whole match untill one player runs out of health **
  play(p1, p2) {
    while (!this.isOver) {
      p1.strike(p1,p2, p1.attackDmg)
      p2.heal(p2)
      p2.strike(p2,p1, p2.attackDmg);
      p1.heal(p1)
    }
    // Once isOver is TRUE run the declareWinner() method 
    this.declareWinner(this.isOver, p1, p2)
  }

}

// ** Create 2 players using the player class **
let player1 = new Player('Rambo', 100, 10)
let player2 = new Player('Not Rambo', 100, 10)

// ** Save original Player Data into a variable in order to reset **
let p1 = player1;
let p2 = player2;

// ** Create the game object from the Game class **
let game = new Game()
// ** Intialize the game by calling updateGame() **
updateGame(p1, p2, game.isOver)

// ** Save intial isOver from the game object inside this variable **
let gameState;


// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  if(e.key == 'q' && p2.health > 0 && game.isOver == false){
    p1.strike(p1, p2, p1.attackDmg)
    document.getElementById('p1attack').play()
  }
  if(e.key == 'a' && p2.health > 0){
    p1.heal(p1)
    document.getElementById('p1heal').play()
  }
  if(e.key == 'p' && p1.health > 0 && game.isOver == false){
    p2.strike(p2, p1, p2.attackDmg)
    document.getElementById('p2attack').play()
  }
  if(e.key == 'l' && p1.health > 0){
    p2.heal(p2)
    document.getElementById('p2heal').play()
  }
});


playButton.onclick = () => {
  game.play(p1, p2)
}




