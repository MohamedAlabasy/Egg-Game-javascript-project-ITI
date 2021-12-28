class Basket extends Shapes {
    #horizontalPosition = 0;   // privet horizontal direction
    #verticalPosition;   // privet horizontal direction
    #basketObject; //The Basket that creat from this Class
    #numberOfCollectEggs=0;
    #numberOfLossEggs=0;
    #speedOfFallEggs=1;
    constructor(_basketImg, _horizontalPosition, _height, _width,_speedOfGame) {
        super(_basketImg, _height, _width);
        if (_horizontalPosition == "" || _horizontalPosition == undefined || _horizontalPosition == null || _horizontalPosition <= 0 || typeof _horizontalPosition == 'string') {
            throw new Error(`You must Enter ball Location in positive number only`);
        } else {
            this.#horizontalPosition = _horizontalPosition;
            this.#verticalPosition = window.innerHeight - super.Height;
            this.#speedOfFallEggs=_speedOfGame;
            this.createBasket();   // to  call this fun in while creating object
            this.moveBasketByKey();
            this.moveBasketByMouse();
        }
    }
    // getter & Setter for horizontal direction 
    get HorizontalPosition() {
        return this.#horizontalPosition;
    }
    // set HorizontalPosition(_horizontalPositionValue) {
    //     if (_horizontalPositionValue == "" || _horizontalPositionValue == undefined || _horizontalPositionValue == null || _horizontalPositionValue <= 0 || typeof _horizontalPositionValue == 'string') {
    //         throw new Error(`You must Enter Basket position in number only`);
    //     } else {
    //         this.#horizontalPosition = _horizontalPositionValue;
    //     }
    // }


    // getter & Setter for vertical direction 
    get VerticalPosition() {
        return this.#verticalPosition;
    }
    // set VerticalPosition(_verticalPositionValue) {
    //     if (_verticalPositionValue == "" || _verticalPositionValue == undefined || _verticalPositionValue == null || _verticalPositionValue <= 0 || typeof _verticalPositionValue == 'string') {
    //         throw new Error(`You must Enter Basket position in number only`);
    //     } else {
    //         this.#verticalPosition = _verticalPositionValue;
    //     }
    // }


    // getter & Setter for number Of Eggs Collected 
    get NumberOfCollectEggs() {
        return this.#numberOfCollectEggs;
    }
    set NumberOfCollectEggs(_numberOfCollectEggs) {
        if (_numberOfCollectEggs == "" || _numberOfCollectEggs == undefined || _numberOfCollectEggs == null || _numberOfCollectEggs <= 0 || typeof _numberOfCollectEggs == 'string') {
            throw new Error(`You must Enter number Of Collect Eggs in number only`);
        } else {
            this.#numberOfCollectEggs = _numberOfCollectEggs;
        }
    }

    

    get NumberOfLossEggs() {
        return this.#numberOfLossEggs;
    }
    set NumberOfLossEggs(_numberOfLossEggs) {
        if (_numberOfLossEggs == "" || _numberOfLossEggs == undefined || _numberOfLossEggs == null || _numberOfLossEggs <= 0 || typeof _numberOfLossEggs == 'string') {
            throw new Error(`You must Enter number Of Collect Eggs in number only`);
        } else {
            this.#numberOfLossEggs = _numberOfLossEggs;
        }
    }

    // getter & Setter for Speed Of Fall Eggs Collected 
    get SpeedOfFallEggs() {
        return this.#speedOfFallEggs;
    }
    set SpeedOfFallEggs(_speedOfFallEggs) {
        if (_speedOfFallEggs == "" || _speedOfFallEggs == undefined || _speedOfFallEggs == null || _speedOfFallEggs <= 0 || typeof _speedOfFallEggs == 'string') {
            throw new Error(`You must Enter number Of Eggs in number only`);
        } else {
            this.#speedOfFallEggs = _speedOfFallEggs;
        }
    }
    createBasket() {
        //CSS Style for Basket Shape 
        let cssBasketStyle = {
            "position": "fixed",
            "width": `${super.Width}px`,
            "height": `${super.Height}px`,
            "top": `${this.#verticalPosition}px`,
            "left": `${this.#horizontalPosition}px`,
        }
        //shape inside the main ball which is rectangle
        this.#basketObject = document.createElement("img");    
        this.#basketObject.setAttribute("src", super.Shape)
        for (let i in cssBasketStyle) {
            this.#basketObject.style[i] = cssBasketStyle[i];
        }
        window.document.body.querySelector("div[id=gameScreen]").append(this.#basketObject);
    }
    
    moveBasketByKey() {
        window.document.addEventListener("keydown", (event) => {
            this.#basketObject.style.top = `${this.#verticalPosition = window.innerHeight - super.Height}px`;
            switch (event.key) {
                case "ArrowRight":
                    if ((this.#horizontalPosition + super.Width) >= window.innerWidth) {
                        this.#horizontalPosition = window.innerWidth - super.Width;
                    } else {
                        this.#basketObject.style.left = `${this.#horizontalPosition += this.#speedOfFallEggs*10}px`;
                    }
                    break;
                case "ArrowLeft":
                    if (this.#horizontalPosition <= 0) {
                        this.#horizontalPosition = 0;
                    } else {
                        this.#basketObject.style.left = `${this.#horizontalPosition -= this.#speedOfFallEggs*10}px`;
                    }
                    break;
            }
        });
    }
    moveBasketByMouse() {
        window.document.addEventListener("mousemove", (event) => {
            this.#basketObject.style.top = `${this.#verticalPosition = window.innerHeight - super.Height}px`;
            if ((event.x + super.Width / 2) >= window.innerWidth) {
                this.#basketObject.style.left = `${this.#horizontalPosition = (window.innerWidth - super.Width)}px`;
            }
            else if (event.x <= 0 || event.x <= super.Width / 2) {
                this.#basketObject.style.left = `${this.#horizontalPosition = 0}px`;
            } else {
                this.#basketObject.style.left = `${this.#horizontalPosition = (event.x - super.Width / 2)}px`;
            }
        })
    }
}


