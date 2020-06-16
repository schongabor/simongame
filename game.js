var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

var buttonColors = ["red", "blue", "green", "yellow"];

//game start on first keypress
$(document).keypress(function(){
    if(!started) {
        nextSequence();
        started = true;
    }
})

//1. random number = > random color + flash + sound

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    var selector = "#" + randomChosenColor;
    $(selector).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
}

//2. user input

$(".btn").click(function(){
    
    var buttonClicked = this.id;
    userClickedPattern.push(buttonClicked); //add user input to array
    playSound(buttonClicked);
    animatePress(buttonClicked);

    checkAnswer(userClickedPattern.length-1);

});

//check user input

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if(gamePattern.length === userClickedPattern.length){

            setTimeout(function(){

                nextSequence();

            }, 1000);

        }
        
    } else {
        
        gameOver();

    }

}

//compare arrays

//flash next step

//take multiple input


function gameOver(){
    
    var gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();

    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    startOver();

}

function startOver(){

    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;

    $("#level-title").text("Az újrakezdéshez nyomj meg egy gombot!");

}


//flash button on click
function animatePress(currentColor){

    var className = "." + currentColor;
    $(className).addClass("pressed");

    setTimeout(function(){
        $(className).removeClass("pressed");
    }, 100);

}

//play sound on button click && on random generated step
function playSound(input){

    var functionInput = input;
    var sound = new Audio("sounds/" + functionInput + ".mp3");
    sound.play();

}