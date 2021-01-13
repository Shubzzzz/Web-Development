var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function() { //imp function
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id"); //important step
    userClickedPattern.push(userChosenColour); //"push()" is a method of array so it should have "()"
    // console.log(userClickedPattern);

    playSound(userChosenColour); //function usagef

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});


function checkAnswer(currentLevel) { //imp function
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        $("#level-title").text("Game Over, Press Any Key To Restart");

        setTimeout(() => { $("body").removeClass("game-over"); }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); //function usage

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed"); //use "#" when your reffering to an "id"

    setTimeout(() => { $("#" + currentColour).removeClass("pressed") }, 100);
}