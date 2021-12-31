
//Create Basket object
// let basket = new Basket("object_001_basket.png", (window.innerWidth / 2), 150, speedOfGame);

let basket = new Basket("/assets/images/objects/object_001_basket.png", (window.innerWidth / 2), 150, 150, 1);
// Create Egg object
let randomPosition = Math.random();
let createObjectEgg = setInterval(() => {
    new Egg("/assets/images/objects/object_012_egg.png", (randomPosition * window.innerWidth), 75, 65);
    randomPosition = Math.random();
}, ((basket.SpeedOfFallEggs * 2) - (-100)) * 10);

// let x = new Egg("object_012_egg.png", 150, 75, 65);


let minute = 0;
let second = 0;
let timeText = document.querySelector("label[id=userTime]");
let restartContainer = window.document.querySelector("div");
let restartBtn = window.document.querySelector("button");
let winnerWin = window.document.querySelector("script[id=winnerWin]");


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

    if (basket.NumberOfCollectEggs >= 10) {
        winnerWin.setAttribute("src", "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js");
        restartContainer.setAttribute("Style", "display: block;");
        clearInterval(createObjectEgg);
        clearInterval(timer);
        window.document.querySelector("img[id=basket]").remove();
    }
}, 1000);


function timeForm(_time) {
    return (_time < 10) ? ("0" + _time) : _time;
}

restartBtn.addEventListener("click", () => {
    restartContainer.setAttribute("Style", "display: non;");
    winnerWin.remove();
    window.location.reload();
});
