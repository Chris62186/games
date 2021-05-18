var randomNumber1;
var randomNumber2;
var gameActive = false;
var p1Wins = 0;
var p2Wins = 0;

diceP1 = randomizeDice();
diceP2 = randomizeDice();

document.querySelector(".img1").setAttribute("src", "images/dice" + diceP1 + ".png");
document.querySelector(".img2").setAttribute("src", "images/dice" + diceP2 + ".png");

//If game hasn't started, display instructions
if (!gameActive) {
  document.querySelector("h1").innerHTML = "Press Space to Roll";
}

//Each time a key is pressed, make sound, roll dice, change images, and process results
document.addEventListener("keydown", function() {

  gameActive = true;

  var diceRollAudio = new Audio("music/dice-roll.mp3");
  diceRollAudio.volume = 0.05;
  diceRollAudio.play();

  diceP1 = randomizeDice();
  diceP2 = randomizeDice();

  document.querySelector(".img1").setAttribute("src", "images/dice" + diceP1 + ".png");
  document.querySelector(".img2").setAttribute("src", "images/dice" + diceP2 + ".png");

  determineWinner(diceP1, diceP2);
})


//FUNCTIONS
function randomizeDice () {
  number = Math.floor(Math.random() * 6) + 1;
  return number;
}

function determineWinner(p1Value, p2Value) {
  if (p1Value > p2Value) {
    p1Wins++;
    console.log(p1Wins);
    document.querySelector("h1").innerHTML = "🏆 Player One Wins";
    document.querySelector(".p1").innerHTML = p1Wins;

  }
  else if (p1Value < p2Value) {
    p2Wins++;
    console.log(p2Wins);
    document.querySelector("h1").innerHTML = "Player Two Wins 🏆";
    document.querySelector(".p2").innerHTML = p2Wins;
  }
  else {
    document.querySelector("h1").innerHTML = "It's a tie!";
  }
}
