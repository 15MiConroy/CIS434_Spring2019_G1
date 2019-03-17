let LANE_LENGTH = 5;

class Lane {
    constructor(name) {
        this._name = name;
        this._straightLane = [];
        this._maxIndex = -1;
        for (let i = 0; i < LANE_LENGTH; i++) {
            this._straightLane[i] = null;
        }
    }
    get name() {
        return this._name;
    }
    get numCars() {
        return this._maxIndex + 1;
    }
    get frontCar() {
        if (this._maxIndex == -1) {
            return null;
        }
        return this._straightLane[0];
    }
    addCar(car) {
        if (!(car instanceof Car)) {
            console.log("addCar() does not work: input must be a Car");
            return;
        }
        if (this._maxIndex >= 4) {
            console.log("There are too many cars in this lane.");
            return;
        }
        this._maxIndex += 1;
        this._straightLane[this._maxIndex] = car;
    }
    removeCar() {
        if (this._maxIndex == -1) {
            console.log("No cars in this lane.");
            return;
        }
        let car = this._straightLane[0];
        for (let i = 0; i < this._maxIndex; i++) {
            this._straightLane[i] = this._straightLane[i + 1];
        }
        this._straightLane[this._maxIndex] = null;
        this._maxIndex -= 1;
        return car;
    }
}

class Car {
    constructor(initX, initY, color, lane) {
        this._x = initX;
        this._y = initY;
        this._color = color;    
        this._moving = false;
        this._lane = lane;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y
    }
    get lane() {
        return this._lane;
    }
    get color() {
        return this._color;
    }
    get moving() {
        return this._moving;
    }
    set x(newX) {
        this._x = newX;
    }
    set y(newY) {
        this._y = newY;
    }
    set color(color) {
        this._color = color;
    }
    isMoving() {
        return this._moving;
    }
    isNotMoving() {
        return !this._moving;
    }
    move() {
        this._moving = true;
    }
    stop() {
        this._moving = false;
    }
}

class Light {
    constructor(name) {
        this._name = name;
        this._color = "red";
    }
    get name() {
        return this._name;
    }
    get color() {
        return this._color;
    }
    set color(color) {
        this._color = color;
    }
    isGreen() {
        return this._color == "green";
    }
    isRed() {
        return this._color == "red";
    }
}