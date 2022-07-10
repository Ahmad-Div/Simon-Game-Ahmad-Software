$(document).ready(function () {


    let buttonColors = ["red", "blue", "green", "yellow"];

    let gamePattern = [];

    let userClickedPattern = [];

    let started = false;

    let buttonClicked = 0;

    let level = 0;
    $(document).keypress(function () {
        if (!started) {
            $("#level-title").text("Level: " + level + "");
            setTimeout(function () {
                nextSequence();
            }, 500);
            started = true;
        }
    });

    $(".mobile-button-start-game").click(function () {
        if (!started) {
            $("#level-title").text("Level: " + level + "");
            setTimeout(function () {
                nextSequence();
            }, 500);
            started = true;
        }
    })


    $(".btn").click(function () {
        if (started == true) {
            let userChoosenColor = this.id;
            userClickedPattern.push(userChoosenColor);
            animatePress(userChoosenColor);
            playSound(userChoosenColor);


            if (userChoosenColor != gamePattern[buttonClicked]) {
                gameOver();
                return;
            }
            buttonClicked++;
            if (buttonClicked == gamePattern.length) {
                checkAnswer(userClickedPattern);
            }
        }
    });



    function nextSequence() {
        level++;
        $("#level-title").text("Level: " + level + "");
        let randomNumber = Math.floor(Math.random() * 3 + 1);

        let randomChoosenColor = buttonColors[randomNumber - 1];
        gamePattern.push(randomChoosenColor);


        $("#" + randomChoosenColor + "").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChoosenColor);

    }




    function playSound(name) {
        let buttonSound = new Audio("" + name + ".mp3");
        buttonSound.play();
    }


    function animatePress(currentColor) {
        $("#" + currentColor + "").addClass("pressed");
        setTimeout(function () {
            $("#" + currentColor + "").removeClass("pressed");
        }, 100)
    }

    function checkAnswer(userAnswer) {
        for (let i = 0; i < userAnswer.length; i++) {
            if (userAnswer[i] != gamePattern[i]) {
                gameOver();
                return;
            }
        }
        userClickedPattern = [];
        buttonClicked = 0;
        setTimeout(function () {
            nextSequence();
        }, 500)

    }

    function gameOver() {
        let gameOverSound = new Audio("wrong.mp3");
        gameOverSound.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
        buttonClicked = 0;
        userClickedPattern = [];
    }



})
