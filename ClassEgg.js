class Egg extends Shapes {
    #horizontalPosition = 0;   // privet horizontal direction
    #verticalPosition = 0;   // privet horizontal direction
    #eggObject; //the oject that creat from this Class
    #timeID;    //for time setInterval & setTimeout
    constructor(_eggsImg, _horizontalPosition, _height, _width = _height) {
        super(_eggsImg, _height, _width);
        if (!new.target) {//=> Not important in ES6(Class) but Very important in ES5 (fun)
            throw new Error(`Shape() must be called with new`);
        } else if (_horizontalPosition == "" || _horizontalPosition == undefined || _horizontalPosition == null || _horizontalPosition <= 0 || typeof _horizontalPosition == 'string') {
            throw new Error(`You must Enter egg position in number only`);
        } else {
            this.#horizontalPosition = _horizontalPosition;
            this.createEgg();   // to  call this fun in while creating object
            this.startFall();
            window.document.getElementsByTagName("audio")[1].setAttribute("src", "assets/sounds/rollover4.wav");
        }
    }
    createEgg() {
        //CSS Style for Egg Shape 
        let cssEggStyle = {
            "position": "fixed",
            "width": `${super.Width}px`,
            "height": `${super.Height}px`,
            "top": `${this.#verticalPosition}px`,
            "left": `${this.#horizontalPosition}px`,
        }
        //Egg shape
        this.#eggObject = document.createElement("img");
        this.#eggObject.setAttribute("src", super.Shape)
        for (let i in cssEggStyle) {
            this.#eggObject.style[i] = cssEggStyle[i];
        }
        window.document.body.append(this.#eggObject);
    }
    startFall() {
        let numberOfLostEgg = document.querySelector("label[id=userLostEgg]");
        let numberOfCollectEggs = document.querySelector("label[id=userScore]");
        this.#timeID = setInterval(() => {
            this.#eggObject.style.top = `${this.#verticalPosition += basket.SpeedOfFallEggs}px`;
            if ((this.#verticalPosition + super.Height) >= window.innerHeight) {
                this.#eggObject.setAttribute("src", "/assets/images/objects/object_012_broken_egg.png");
                this.#eggObject.style.width = "120px";
                window.document.querySelector("audio[id=eggAudio]").setAttribute("src", "assets/sounds/click1.wav");
                this.stopFall();
                this.removeEggObject(2000)
                numberOfLostEgg.innerText = ++basket.NumberOfLossEggs;
            }
            if (this.#horizontalPosition >= basket.HorizontalPosition && (this.#horizontalPosition + super.Width) <= (basket.HorizontalPosition + basket.Width)
                && (this.#verticalPosition + super.Height) >= (window.innerHeight - basket.Height / 2)) {
                this.stopFall();
                this.removeEggObject(0);
                numberOfCollectEggs.innerText = ++basket.NumberOfCollectEggs;
            }

            if ((basket.NumberOfLossEggs > (basket.NumberOfCollectEggs + 20)) || basket.NumberOfCollectEggs >= 100) {
                window.document.querySelector("audio[id=eggAudio]").setAttribute("src", "");
                this.removeEggObject(0);
            }

        }, 10); //close of start Fall function
    }
    //for make shape stop by clear Interval 
    stopFall() {
        clearInterval(this.#timeID);
    }
    //for remove Egg Object that is created
    removeEggObject(_timeToRemove) {
        setTimeout(() => {
            this.#eggObject.remove();
        }, _timeToRemove);
    }
}







