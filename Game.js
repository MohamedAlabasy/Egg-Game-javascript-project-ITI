let minute = 0;
let second = 0;
let timeText = document.querySelector("label[id=userTime]");

let restartContainer = window.document.querySelector("div");
let restartBtn = window.document.querySelector("button[id=Restart]");

let finishGameScript = window.document.querySelector("script[id=finishGame]");
let finishGameSound = window.document.getElementsByTagName("audio")[0];
let finishGame = window.document.querySelector("lottie-player");



//Create Basket object
let basket = new Basket("/assets/images/objects/object_001_basket.png", (window.innerWidth / 2), 150, 150, 1);
// Create Egg object
let randomPosition = Math.random();
let createObjectEgg = setInterval(() => {
    new Egg("/assets/images/objects/object_012_egg.png", (randomPosition * window.innerWidth), 75, 65);
    randomPosition = Math.random();
}, ((basket.SpeedOfFallEggs * 2) - (-100)) * 10);




let timer = setInterval(() => {
    second++;
    if (second >= 59) {
        second = 0;
        minute++;
    }
    if (minute >= 59) {
        minute = 0;
    }
    if (minute > 0) {
        timeText.innerText = `${timeForm(minute)} : ${timeForm(second)}`;
    } else {
        timeText.innerText = `${timeForm(second)}`;
    }

    if (basket.NumberOfCollectEggs >= 5) {
        window.document.getElementsByTagName("audio")[1].remove();
        finishGameSound.setAttribute("src", "assets/sounds/Victory.mp3");
        finishGameScript.setAttribute("src", "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js");
        finishGame.setAttribute("src", "https://assets10.lottiefiles.com/temp/lf20_2BmOqX.json");
        restartContainer.setAttribute("Style", "display: block;");
        clearInterval(createObjectEgg);
        clearInterval(timer);
        window.document.querySelector("img[id=basket]").remove();
    }
    if (basket.NumberOfLossEggs > (basket.NumberOfCollectEggs + 5)) {
        window.document.getElementsByTagName("audio")[1].remove();
        finishGameSound.setAttribute("src", "assets/sounds/gameOver.mp3");
        finishGameScript.setAttribute("src", "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js");
        finishGame.setAttribute("src", "https://assets6.lottiefiles.com/packages/lf20_OyFTHm.json");
        restartContainer.setAttribute("Style", "display: block;");
        clearInterval(createObjectEgg);
        clearInterval(timer);
        window.document.querySelector("img[id=basket]").remove();
    }

    if (basket.NumberOfCollectEggs == (basket.SpeedOfFallEggs * 10)) {
        basket.SpeedOfFallEggs++;
    }


    if (basket.NumberOfCollectEggs == 100) {
        restartContainer.setAttribute("Style", "display: block;")
    }
}, 1000);


function timeForm(_time) {
    return (_time < 10) ? ("0" + _time) : _time;
}

restartBtn.addEventListener("click", () => {
    restartContainer.setAttribute("Style", "display: non;");
    finishGame.remove();
    window.location.reload();
});

