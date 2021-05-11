

// Find all drum buttons & add event listener to each using an anonymous function
var buttonsList = document.querySelectorAll(".drum")

for (i = 0; i < (buttonsList.length); i++) {
  buttonsList[i].addEventListener("click", function () {
    soundSwitchboard(this.innerHTML);
    addAnimation(this.innerHTML);
  });
}

document.addEventListener("keydown", function(event) {
  soundSwitchboard(event.key);
  addAnimation(event.key);
})


function soundSwitchboard(key) {
  switch (key) {

    case "w":
    var tom1Audio = new Audio("sounds/tom-1.mp3");
    tom1Audio.play();
      break;

    case "a":
      var tom2Audio = new Audio("sounds/tom-2.mp3");
      tom2Audio.play();
        break;

    case "s":
      var tom3Audio = new Audio("sounds/tom-3.mp3");
      tom3Audio.play();
        break;

    case "d":
      var tom4Audio = new Audio("sounds/tom-4.mp3");
      tom4Audio.play();
        break;

    case "j":
      var snareAudio = new Audio("sounds/snare.mp3");
      snareAudio.play();
        break;

    case "k":
      var crashAudio = new Audio("sounds/crash.mp3");
      crashAudio.play();
        break;

    case "l":
      var kickAudio = new Audio("sounds/kick-bass.mp3");
      kickAudio.play();
        break;

    default: console.log(this.innerHTML);

  }
}

function addAnimation (keyCode) {

  var activeButton = document.querySelector("." + keyCode);
  activeButton.classList.toggle("pressed");
  setTimeout (function(){
    activeButton.classList.toggle("pressed");
  }, 100); 

}
