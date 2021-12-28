class Shapes {
    #shapeImage = "";
    #height = 0;
    #width = 0;
    constructor(_shapeImg, _height, _width = _height) {
        if (!new.target) {//=> Not important in ES6(Class) but Very important in ES5 (fun)
            throw new Error(`Shape() must be called with new`);
        }
        if (_shapeImg == "" || _shapeImg == undefined || _shapeImg == null || !isNaN(_shapeImg)
            || _height == "" || _height == undefined || _height == null || _height <= 0 || typeof _height == 'string'
            || _width == "" || _width == undefined || _width == null || _width <= 0 || typeof _width == 'string')  //mack No opject with out paramter
        {
            throw new Error(`You must enter valid dimensions then Enter name of "image.extension" Shape only`);
        }else{
            this.#shapeImage = _shapeImg;
            this.#height = _height;
            this.#width = _width;
        }
    }
    //getter & setter for Shape in ES10
    get Shape() {
        return this.#shapeImage;
    }
    set Shape(_shapeValue) {
        if (_shapeValue == "" || !isNaN(_shapeValue)) {
            throw new Error(`You must enter "path of namedImage.extension" Shape only`);
        }
        else {
            this.#shapeImage = _shapeValue;
        }
    }
    //getter & setter for Shape in ES10
    set Height(_heightValue) {
        if (_heightValue == "" || _heightValue == undefined || _heightValue == null || _heightValue <= 0 || typeof _heightValue == 'string') {
            throw new Error(`You must Enter Shape height in number only`);
        } else {
            this.#height = _heightValue;
        }
    }
    get Height() {
        return this.#height;
    }
    //getter & setter for Shape in ES10
    get Width() {
        return this.#width;
    }
    set Width(_widthValue) {
        if (_widthValue == "" || _widthValue == undefined || _widthValue == null || _widthValue <= 0 || typeof _widthValue == 'string') {
            throw new Error(`You must Enter Shape width in number only`);
        } else {
            this.#width = _widthValue;
        }
    }
}


