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
    constructor(positionIndex, color, lane) {
        
        //need an array of x initial positions
        var xPosition = [265, w, 370, 0]; 
        //need an array of y initial positions
        var yPosition = [0, 170, h, 270];

        this._x = xPosition[positionIndex];
        this._y = yPosition[positionIndex];
        
        this._color = color;    
        this._moving = false;
        this._lane = lane;
        
        //setting speed of car (x and y direction)
        if(positionIndex == 0){
            this.xSpeed = 0;
            this.ySpeed = 1;
        }
        else if(positionIndex == 1){
            this.xSpeed = -1;
            this.ySpeed = 0;
        }
        else if(positionIndex == 2){
            this.xSpeed = 0;
            this.ySpeed = -1;
        }
        else if(positionIndex == 3){
            this.xSpeed = 1;
            this.ySpeed = 0;
        }
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
    get xSpeed() {
        return this._xSpeed;
    }
    get ySpeed() {
        return this._ySpeed
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
    set xSpeed(xSpeed){
        this._xSpeed = xSpeed;
    }
    set ySpeed(ySpeed){
        this._ySpeed = ySpeed;
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
    display() {
        fill(this._color);
        circle(this._x, this._y, 10);
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
        this._timer = 0;
        // start with N and S green
        this._n.color = "G";
        this._s.color = "G";
    }
    // non-yellow, non-left light combos
    // 1: GRGR
    // 2: RGRG
    // 3: RRRR
    // Pattern: 1 => 3 => 2 => 3 => 1 etc.
}
