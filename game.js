
const buttonColor = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).on("keypress", function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

const playSound = (name) => {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}   

$(".btn").on("click", function(e){
    const userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

const checkAnswer = (currentLevel) => {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("Success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    }else {
        // console.log("wrong");
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200);
        $('h1').text("Game Over, Press Any Key to Restart");
        $('*').on('keypress', startOver());
    }
}

const nextSequence = () => {
    userClickedPattern = [];

    level += 1;
    $('h1').text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

const animatePress = (currentColor) =>{
    $("#" + currentColor).addClass('pressed');

    setTimeout(() => {
        $("#" + currentColor).removeClass('pressed')
    }, 100);
}

const startOver = () => {
    level = 0;
    gamePattern = [];
    started = false;
}



