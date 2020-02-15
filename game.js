
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keydown ((evt) => {    
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;            
    }
});

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour); 
    playSound(userChosenColour);
    animatePress(userChosenColour); 
    checkAnswer(userClickedPattern.length-1);   
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumer = Math.floor(Math.random() * 4); 
    let randomChosenColour = buttonColours[randomNumer];
    gamePattern.push(randomChosenColour); 

    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);            
}

function playSound(name) {
    let audio = document.querySelector('audio');    
    audio.setAttribute("src", "sounds/" + name + ".mp3");    
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {        
        if (userClickedPattern.length === gamePattern.length) {        
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}



