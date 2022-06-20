
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
//------------------------------------------------------------------------------

$(document).keydown(function() {
  while(!gameStarted) {
    $("h1").text("Level " + level);
    gameStarted = true;
    nextSequence();
  }
});
//------------------------------------------------------------------------------

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound("sounds/" + userChosenColor + ".mp3");
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
//------------------------------------------------------------------------------

function nextSequence() {
  level++;
  $("h1").text("Level " + level);

  userClickedPattern = [];

  randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound("sounds/" + randomChosenColor + ".mp3");
}
//------------------------------------------------------------------------------

function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}
//------------------------------------------------------------------------------

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 50);
}
//------------------------------------------------------------------------------

function checkAnswer(currentLevel) {
  var gpIndex = gamePattern.length - 1;
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("sounds/wrong.mp3");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
//------------------------------------------------------------------------------

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
