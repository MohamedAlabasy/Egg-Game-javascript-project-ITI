
let startGameContainer = window.document.querySelector("div");
startGameContainer.setAttribute("Style", "display: block;");  //

let userName = document.querySelector("input[id=userName]");
let userNameSpan = document.querySelector("span");


userName.addEventListener("blur", function () {
    if (this.value == ""  || this.value == null || typeof this.value != 'string') {
        userNameSpan.style.visibility = "visible";
    } else {
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

 