var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var levelNumber = 0;
var started = false;


function nextSequence() {
  userClickedPattern = [];
  levelNumber++;
  $("#level-title").text("Level " + levelNumber);
  var randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  // console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}


$(document).keydown(function() {
  if(!started) {
  $("#level-title").text("Level " + levelNumber);
  nextSequence();
  started = true;
  }
});


$(".btn").click(function() {
  if(started) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);


  // console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
  }
});

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // console.log("success");
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    // console.log("wrong");
    playSound("wrong");
    $("#level-title").text("Game Over! Press Any Key to Restart");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    reset();
  }
}


function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function reset() {
  levelNumber = 0;
  gamePattern = [];
  started = false;
}
