
let startGameContainer = window.document.querySelector("div");
startGameContainer.setAttribute("Style", "display: block;");  //

let userName = document.querySelector("input[id=getUserName]");
let userNameSpan = document.querySelector("span");
let startGame = document.querySelector("input[id=Restart]");

let userNameValue;

userName.addEventListener("blur", function () {
    if (this.value == "" || this.value == null || typeof this.value != 'string') {
        userNameSpan.style.visibility = "visible";
    } else {
        userNameValue = this.value;
        console.log(userNameValue);
        userNameSpan.style.visibility = "hidden";
    }
})

userName.addEventListener("focus", function () {
    if (this.getAttribute("value") == "Enter Your Name") {
        this.setAttribute("value", "");
    }
})


let speedOfGame = getGameLevel();


function getGameLevel() {
    let radioArray = document.querySelectorAll("input[type=radio]");
    for (let i = 0; i < radioArray.length; i++) {
        if (radioArray[i].checked) {
            return Number(radioArray[i].getAttribute("value"));
        }
    }
}

startGame.addEventListener("click", function (event) {
    if (checkName(userNameValue)) {
        window.location.href = "Game.html";
        // export let  Data={
        //         playerName:userNameValue,
        //         playedSpeed:speedOfGame,
        // }
    } else {
        userNameSpan.style.visibility = "visible";
    }
})


function checkName(_name) {
    if (_name != "" && _name != null && typeof _name == 'string' && userName.getAttribute("value") != "Enter Your Name")
        return true;
    return false;
}

let getData = async function () {
    let comments = await fetch(`https://node-monge-iti-project.herokuapp.com/games/${userNameValue}`)
    let data = await comments.json()
    console.log(data);
    return data;
}

let setData = async function () {
    let comments = await fetch(`https://node-monge-iti-project.herokuapp.com/games/`, { method: 'POST', body: { name: userNameValue } })// ajax
    let data = await comments.json()
    console.log(data);
    return data;
}