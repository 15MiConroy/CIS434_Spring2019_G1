let LANE_LENGTH = 5;

class Lane {
    constructor(name) {
        this._name = name;
        this._light = new Light(this);
        this._straightLane = [];
        this._maxIndex = -1;
        for (let i = 0; i < LANE_LENGTH; i++) {
            this._straightLane[i] = null;
        }
    }
    get name() {
        return this._name;
    }
    get light() {
        return this._light;
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
        this._color = "R";
    }
    get lane() {
        return this._lane;
    }
    get color() {
        return this._color;
    }
    set color(color) {
        this._color = color;
    }
    get isGreen() {
        return this._color == "green";
    }
    get isRed() {
        return this._color == "red";
    }
}

class LightControl {
    constructor(n, e, s, w) {
        this._n = n;
        this._e = e;
        this._s = s;
        this._w = w;
        this._timer = 3;
        // start with N and S green
        this.nsG();
    }
    // TODO: Find a better way to represent the states
    nsG() {
        if (this._state == "nsG") {
            return;
        }
        this._state = "nsG";
        this._n.light.color = "G";
        this._e.light.color = "R";
        this._s.light.color = "G";
        this._w.light.color = "R";
    }
    ewG() {
        if (this._state == "ewG") {
            return;
        }
        this._state = "ewG";
        this._n.light.color = "R";
        this._e.light.color = "G";
        this._s.light.color = "R";
        this._w.light.color = "G";
    }
    allR() {
        if (this._state == "allR") {
            return;
        }
        this._state = "allR";
        this._n.light.color = "R";
        this._e.light.color = "R";
        this._s.light.color = "R";
        this._w.light.color = "R";    
    }
    switchLight() {
        if (this._state == "nsG") {
            this.ewG();
        } else {
            this.nsG();
        }
    }
    // Move 1 second at a time down the list
    progress() {
        this._timer -= 1;
        if (this._timer <= 0) {
            this.switchLight();
            this._timer = 3;
        }
        console.log("State: " + this._state);
        console.log("N: " + this._n.light.color + ", E: " + this._e.light.color + ", S: " + this._s.light.color + ", W: " + this._e.light.color);
    }
}
