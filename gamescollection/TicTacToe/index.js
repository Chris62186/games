const tiles = Array.from(document.querySelectorAll('.tile'));
const btnReset = document.querySelector('.reset_btn');

let activePlayerLabel = document.querySelector('.active_player');
let gameMessageText = document.querySelector('.message_center');
let currentGameMessage = '';
let currentPlayer = 'X';
let startingPlayer ='';
let isGameActive = true;
let turn = 0;
let victoryFormation = [];
let gameWon = false;
let gameNumber = 0;
let xWins = 0;
let oWins = 0;
let xoTies = 0;
let tieStreak = 0;

const locationDescriptions = [
  "upper left",
  "middle top",
  "upper right",
  "middle left",
  "center",
  "middle right",
  "lower left",
  "bottom center",
  "lower right"
]

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


//SETTING UP GAME//

setTileDescriptions();

document.querySelector("#gamesPlayed").innerHTML = gameNumber;
document.querySelector("#xWon").innerHTML = xWins;
document.querySelector("#oWon").innerHTML = oWins;
document.querySelector("#xoTie").innerHTML = xoTies;

//Setting click event listener for each square which sets up the play
for (i = 0; i < tiles.length; i++) {
  tiles[i].addEventListener("click", function() {
    if (isGameActive) {
      if (checkForValidMove(this)) {
        turn++;
        if (turn === 1) {
          startingPlayer = currentPlayer;
        }
        this.innerHTML = currentPlayer;
        currentGameMessage = "Player " + currentPlayer + " selected the " + this.locationDescription + " tile.";
        updateGameMessage(currentGameMessage);
        var selectAudio = new Audio("sfx/selecttile.wav");
        selectAudio.play();
        checkForWinCondition();
        if (!gameWon) {
          showSelectedTile(this);
        }
      } else {
        console.log("Invalid move. Sqaure already claimed. Please select another square.")
      }
    }
  })
}

function setTileDescriptions () {
  tiles.forEach(function(element) {
    element.locationDescription = "default";
  })

  for (i = 0; i < tiles.length; i++) {
    tiles[i].locationDescription = locationDescriptions[i];
  }
}

btnReset.addEventListener("click", function() {
  resetGame();
});


btnReset.disabled=true;


//GAME PLAY FUNCTIONS//

function updateGameMessage (message) {
  gameMessageText.innerHTML = message;
}

function checkForValidMove(selectedTile) {
  if (selectedTile.innerHTML === 'X' || selectedTile.innerHTML === 'O') {
    gameMessageText.innerHTML = "Square is already claimed. Please try again.";
    showInvalidTile(selectedTile);
    var errorAudio = new Audio("sfx/error.wav");
    errorAudio.play();
    return false;
  } else {
    if (turn === 0) {
      btnReset.disabled = false;
      btnReset.classList.remove("disabled");
    }
    return true;
  }
}

function showSelectedTile (selectedTile) {
  selectedTile.classList.toggle("pressed");
  setTimeout(function() {
    selectedTile.classList.toggle("pressed");
  }, 100)
}

function showInvalidTile(selectedTile) {
  selectedTile.classList.toggle("already-selected");
  setTimeout(function() {
    selectedTile.classList.toggle("already-selected");
  }, 100)
}

function switchPlayer() {
  if (isGameActive) {
    if (currentPlayer === 'X') {
      currentPlayer = 'O';
      activePlayerLabel.innerHTML = "Player O - it is your turn."
    } else {
      currentPlayer = 'X'
      activePlayerLabel.innerHTML = "Player X - it is your turn."
    }
  }
}

function checkForWinCondition() {
  for (i = 0; i < winningConditions.length; i++) {

    //checking for empty square before continuing
    if (tiles[winningConditions[i][0]].innerHTML === '') {

      // assuming not empty, compare the first index against the 2nd one. If they match, check the third.
    } else if (tiles[winningConditions[i][0]].innerHTML === tiles[winningConditions[i][1]].innerHTML) {

      if (tiles[winningConditions[i][1]].innerHTML === tiles[winningConditions[i][2]].innerHTML) {
        console.log(winningConditions[i] + " has been met!");
        victoryFormation = winningConditions[i]
        gameWon = true;
        if (currentPlayer === 'X') {
          xWins++;
        } else {
          oWins++;
        }
        gameOver();
        return;
      }
    };
  }
  if (!gameWon) {
    if (turn === 9) {
      xoTies++;
      tieStreak++;
      gameOver();
    } else {
      switchPlayer();
    }
  }
}

function gameOver() {

  if (victoryFormation != '') {
    for (i = 0; i < victoryFormation.length; i++) {
      tiles[victoryFormation[i]].classList.toggle("winning-tile");
    }
    gameMessageText.innerHTML = "Player " + currentPlayer + " WINS!";
    activePlayerLabel.innerHTML = "";
    var winAudio = new Audio("sfx/win.wav");
    winAudio.play();
  } else {
    for (i = 0; i < tiles.length; i++) {
      tiles[i].classList.toggle("tie");
    }
    gameMessageText.innerHTML = "It's a TIE! Try again.";
    activePlayerLabel.innerHTML = "";
    var tieAudio = new Audio ("sfx/tie.mp3");
    tieAudio.play();
  }
  isGameActive = false;
  gameNumber++;
  btnReset.innerHTML = "Play Again";

  document.querySelector("#gamesPlayed").innerHTML = gameNumber;
  document.querySelector("#xWon").innerHTML = xWins;
  document.querySelector("#oWon").innerHTML = oWins;
  document.querySelector("#xoTie").innerHTML = xoTies;
}



//END PLAY FUNCTIONS//

function resetGame() {

  //Removing any special color coding on the tiles
  for (i = 0; i < tiles.length; i++) {
    tiles[i].innerHTML = '';
    tiles[i].classList.remove("winning-tile","tie");
  }


  //If the game was won, the winner goes first in the name game.
  //Else, determine current player and switch to start the new game
  if (gameWon) {
    gameMessageText.innerHTML = "";
    activePlayerLabel.innerHTML = "Player " + currentPlayer + " - since you won, you go first.";
  } else if (gameWon === false && turn < 9) {
    gameMessageText.innerHTML = "";
    currentPlayer = startingPlayer;
    activePlayerLabel.innerHTML = "Board reset - Player " + startingPlayer + " begins.";
  } else {
    if (startingPlayer === 'X') {
      currentPlayer = 'O';
      gameMessageText.innerHTML = "";
      activePlayerLabel.innerHTML = "Player O - since it was a tie, you start this time."
    } else {
      currentPlayer = 'X'
      gameMessageText.innerHTML = "";
      activePlayerLabel.innerHTML = "Player X - since it was a tie, you start this time."
    }
  }

  //Resetting all game states
  turn = 0;
  isGameActive = true;
  victoryFormation = [];
  gameWon = false;
  btnReset.innerHTML = "Reset Board";
  btnReset.disabled = true;
  btnReset.classList.add("disabled");
  console.clear();
  console.log("Total Games: " + gameNumber + ". X Won: " + xWins + ". O Won: " + oWins + ". Ties: " + xoTies + ".");
}
