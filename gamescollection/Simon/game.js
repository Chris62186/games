var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).on("keypress", function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    started = true;
    setTimeout(function(){
      nextSequence();
    }, 500);
  }
})

$(".btn").on("click", function () {
  if(started) {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  }
});

function checkAnswer (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success!");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout (function(){
        nextSequence()

      }, 1000)
    }
  } else {
    console.log("boooooooo. You fail.")
    endGame();
  }
}

function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var audioButton = new Audio("sounds/" + name + ".mp3")
  audioButton.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).toggleClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).toggleClass("pressed");
  }, 100);
}

function endGame() {
  endGameAudio = new Audio("sounds/wrong.mp3");
  $("body").toggleClass("game-over");
  $("#level-title").text("Game Over. Press Any Key to Restart");
  startOver();
  setTimeout(function(){
    $("body").toggleClass("game-over");
  }, 500);
}

function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}
