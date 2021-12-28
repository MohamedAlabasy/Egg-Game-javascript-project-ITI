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
        }
    }
    //getter for vertical direction 
    //   get VerticalPosition() {
    //     return this.#verticalPosition;
    // }
    // getter & Setter for horizontal direction 
    // get HorizontalPosition() {
    //     return this.#horizontalPosition;
    // }
    // set HorizontalPosition(_horizontalPositionValue) {
    //     if (_horizontalPositionValue == "" || _horizontalPositionValue == undefined || _horizontalPositionValue == null || _horizontalPositionValue <= 0 || typeof _horizontalPositionValue == 'string') {
    //         throw new Error(`You must Enter egg position in number only`);
    //     } else {
    //         this.#horizontalPosition = _horizontalPositionValue;
    //     }
    // }

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
        window.document.body.querySelector("div[id=gameScreen]").append(this.#eggObject);
    }
    startFall() {
        this.#timeID = setInterval(() => {
            this.#eggObject.style.top = `${this.#verticalPosition += basket.SpeedOfFallEggs}px`;
            if ((this.#verticalPosition + super.Height) >= window.innerHeight) {
                this.#eggObject.setAttribute("src", "object_012_broken_egg.png");
                this.stopFall();
                this.removeEggObject(2000)
                basket.NumberOfLossEggs++;
            }
            if (this.#horizontalPosition >= basket.HorizontalPosition && (this.#horizontalPosition + super.Width) <= (basket.HorizontalPosition + basket.Width)
                && (this.#verticalPosition + super.Height) >= (window.innerHeight - basket.Height / 2)) {
                this.stopFall();
                this.removeEggObject(0);
                basket.NumberOfCollectEggs++
                if (basket.NumberOfCollectEggs == (basket.SpeedOfFallEggs * 10)) {
                    basket.SpeedOfFallEggs++;
                }
                if (basket.NumberOfLossEggs > (basket.NumberOfCollectEggs+ 20)) {
                    console.log("Loss");
                }
                console.log("Number Of Collect Eggs", basket.NumberOfCollectEggs);
                console.log("Number Of loss Eggs", basket.NumberOfLossEggs);

            }
        }, 10);
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







