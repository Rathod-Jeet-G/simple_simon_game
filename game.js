const buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
var level = 0;
var start = false;
$(document).keypress(function(){
    if (!start){
        $("#level-title").text("Level "+ level);
        nextSequence();
        start = true;
    }  
});

$(".btn").on("click",function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    // console.log(userClickedPattern);
});
function nextSequence(){
    userClickedPattern = [];
    level++;
    console.log(level)
    $("#level-title").text("Level " + level);
    var rendomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[rendomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
function playSound(songName){
    let audio = new Audio("sounds/"+songName+".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
  
      }
}

function startOver(){
    level = 0;
    start = false;
    gamePattern = [];
}