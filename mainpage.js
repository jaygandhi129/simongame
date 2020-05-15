var userClickedPattern = [];

var gamePattern = [];
var colours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).on("keydown", function() {
  if (started === false) {
    nextSequence();
    started = true;
    $("h1").text("Level " + level);
  }
});

$(".btn").on("click", function() {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").html("Game Over<br>Press any key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChoosenColor = colours[randomNumber];
  gamePattern.push(randomChoosenColor);

  $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);

}

function playSound(name) {
  var buttonAudio = new Audio("sounds/" + name + ".mp3");
  buttonAudio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}





function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
