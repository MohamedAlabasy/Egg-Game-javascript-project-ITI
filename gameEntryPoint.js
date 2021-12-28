let userNameText = window.document.querySelector("input[name=userName]");
let welcomeScreen = window.document.querySelector("div[id=welcomeScreen]");
let gameScreen = window.document.querySelector("div[id=gameScreen]");
let startGamesBtn = window.document.body.querySelector("input[id=startGames]");

let radioArray = document.querySelectorAll("input[type=radio]");


startGamesBtn.addEventListener("click", function () {
    console.log(userNameText.value);
    let speedOfGame = getGameLevel();


    if (userNameText.value == "mohamed") {
        welcomeScreen.setAttribute("style", "display: none;");
        gameScreen.setAttribute("style", "display: block;");

        //Create Basket object
        basket = new Basket("object_001_basket.png", (window.innerWidth / 2), 150, speedOfGame);

        // Create Egg object
        let randomPosition = Math.random();
        let createObjectEgg = setInterval(() => {
            new Egg("object_012_egg.png", (randomPosition * window.innerWidth), 75, 65);
            randomPosition = Math.random();
        }, ((basket.SpeedOfFallEggs * 2) - (-100)) * 10);

        // let x = new Egg("object_012_egg.png", 150, 75, 65);
    } else {
        welcomeScreen.setAttribute("style", "display:block ;");
        gameScreen.setAttribute("style", "display: none;");
    }
})//close start Games Btn

function getGameLevel() {
    let radioArray = document.querySelectorAll("input[type=radio]");
    let gameLevel;
    let speedOfGame=0;
    for (let i = 0; i < radioArray.length; i++) {
        if (radioArray[i].checked) {
            gameLevel = radioArray[i].getAttribute("value");
        }

        switch (gameLevel) {
            case "easy":
                speedOfGame = 1;
                break;
            case "normal":
                speedOfGame = 4;
                break;
            case "hard":
                speedOfGame = 8;
                break;
        }
        return speedOfGame;
    }

}//close get Game level

