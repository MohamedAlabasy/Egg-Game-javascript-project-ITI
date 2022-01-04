let minute = 0;
let second = 0;
let URL_Data = location.search.substring(1).split("&");

let timeText = document.querySelector("label[id=userTime]"); //time of playing

let userDate = document.querySelector("label[id=userName]"); //name of user
userName.innerText = URL_Data[0].split("=")[1].split("+").join(" ");

let dateText = document.querySelector("label[id=userDate]"); //the date of last play
dateText.innerText = localStorage.getItem("userDate");

let restartContainer = window.document.querySelector("div");
let restartBtn = window.document.querySelector("button[id=Restart]");

let finishGameScript = window.document.querySelector("script[id=finishGame]");
let finishGameSound = window.document.querySelector("audio[id=finishGameAudio]");
let finishGame = window.document.querySelector("lottie-player");


//Create Basket object
let basket = new Basket("/assets/images/objects/image_102_ob.png", (window.innerWidth / 2), 150, 160, Number(URL_Data[1].split("=")[1]));


// Create Egg object
let randomPosition = Math.random();
let createObjectEgg = setInterval(() => {
    new Egg("/assets/images/objects/object_012_egg.png", (randomPosition * window.innerWidth), 75, 65);
    randomPosition = Math.random();
}, ((basket.SpeedOfFallEggs * 2) - (-100)) * 10);  //for decrease time of setInterval To make the eggs fall more


//for increase playing time
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


    //when user win  
    if (basket.NumberOfCollectEggs >= 100) {
        finishGameSound.setAttribute("src", "assets/sounds/Victory.mp3");
        finishGameScript.setAttribute("src", "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js");
        finishGame.setAttribute("src", "https://assets10.lottiefiles.com/temp/lf20_2BmOqX.json");
        restartContainer.setAttribute("Style", "display: block;");
        clearInterval(createObjectEgg);
        clearInterval(timer);
        window.document.querySelector("img[id=basket]").remove();
    }


    //when user lose 
    if (basket.NumberOfLossEggs > (basket.NumberOfCollectEggs + 20)) {
        finishGameSound.setAttribute("src", "assets/sounds/gameOver.mp3");
        finishGameScript.setAttribute("src", "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js");
        finishGame.setAttribute("src", "https://assets6.lottiefiles.com/packages/lf20_OyFTHm.json");
        restartContainer.setAttribute("Style", "display: block;");
        clearInterval(createObjectEgg);
        clearInterval(timer);
        window.document.querySelector("img[id=basket]").remove();
    }


    //for increase speed of game
    if (basket.NumberOfCollectEggs == (basket.SpeedOfFallEggs * 10)) {
        basket.SpeedOfFallEggs++;
    }
}, 1000); //close of setInterval


//for time Form => 01:05 
function timeForm(_time) {
    return (_time < 10) ? ("0" + _time) : _time;
}


//if user need to play again
restartBtn.addEventListener("click", () => {
    restartContainer.setAttribute("Style", "display: non;");
    setData(URL_Data[0].split("=")[1].split("+").join(" "));
});


//for send last date to server when game over 
let setData = async function (_useName) {
    let comments = await fetch("https://node-monge-iti-project.herokuapp.com/games", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name: _useName }),
    })
    let data = await comments.json();
    finishGame.remove();
    window.location.reload();
    return data;
}