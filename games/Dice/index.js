var randomNumber1;
var randomNumber2;

diceP1 = randomizeDice();
diceP2 = randomizeDice();

document.querySelector(".img1").setAttribute("src", "images/dice" + diceP1 + ".png");
document.querySelector(".img2").setAttribute("src", "images/dice" + diceP2 + ".png");

determineWinner(diceP1, diceP2);



//FUNCTIONS
function randomizeDice () {
  number = Math.floor(Math.random() * 6) + 1;
  return number;
}

function determineWinner(p1Value, p2Value) {
  if (p1Value > p2Value) {
    document.querySelector("h1").innerHTML = "🏆 Player One Wins";
  }
  else if (p1Value < p2Value) {
    document.querySelector("h1").innerHTML = "Player Two Wins 🏆";
  }
  else {
    document.querySelector("h1").innerHTML = "It's a tie!";
  }
}
