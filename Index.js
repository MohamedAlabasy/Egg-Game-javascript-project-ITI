
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
     getData(userNameValue);
    } else {
        userNameSpan.style.visibility = "visible";
       
    }
})


function checkName(_name) {
    if (_name != "" && _name != null && typeof _name == 'string' && userName.getAttribute("value") != "Enter Your Name")
        return true;
    return false;
}

let getData = async function (_userNameValue) {
    let comments = await fetch(
        `https://node-monge-iti-project.herokuapp.com/games/${_userNameValue}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ) 
    let data = await comments.json();
    localStorage.setItem("userDate", data["date"]); 
    document.forms["myForm"].submit();
    return data;
}