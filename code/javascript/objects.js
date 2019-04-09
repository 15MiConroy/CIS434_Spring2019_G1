let LANE_LENGTH = 5;

class Lane {
    constructor(name, frequency = 90, pos, sign, dLine, startX, startY, carPos) {
        this._name = name;
        this._frequency = frequency;
        this._pos = pos;
        this._sign = sign;
        this._dLine = dLine;
        this._startX = startX;
        this._startY = startY;
        this._carPos = carPos;
        this._light = "R";
        this._straightLane = [];
        this._maxIndex = -1;
        this._timer = this._frequency;
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
    get frequency() {
      return this._frequency;
    }
    get sign() {
        return this._sign;
    }
    set light(l) {
        this._light = l;
    }
    set frequency(f) {
      this._frequency = f;
    }
    hasCar() {
        return this._maxIndex > -1;
    }
    addCar() {
        // if (this._maxIndex >= 4) {
        //     console.log("There are too many cars in this lane.");
        //     return false;
        // }
        this._maxIndex += 1;
        let car = new Car(this._carPos, this._startX, this._startY, colorGen(), this._maxIndex, this);
        this._straightLane[this._maxIndex] = car;
    }
    // removeCar() {
    //     if (this._maxIndex == -1) {
    //         return false;
    //     }
    //     let car = this._straightLane[0];
    //     for (let i = 0; i < this._maxIndex; i++) {
    //         this._straightLane[i] = this._straightLane[i + 1];
    //     }
    //     this._straightLane[this._maxIndex] = null;
    //     this._maxIndex -= 1;
    //     return true;
    // }
    pastDottedLine(car) {
        if(this._pos == "x") {
            return car.x * this._sign > this._dLine * this._sign;
        } else {
            return car.y * this._sign > this._dLine * this._sign;
        }
    }
    progress() {
      this._timer -= 1;
      // let added
      // let removed = "";
      if (this._timer <= 0) {
        // added = "added";
        this.addCar();
        this._timer += this._frequency;
      }
      // if (this.frontCar != null) {
      //   if (this.frontCar._x < -5 || this.frontCar._x > 645 || this.frontCar._y < -5 || this.frontCar._y > 485) {
      //     this.removeCar();
      //     // this._straightLane.splice(1, this._straightLane.length - 1);
      //     console.log(this.name + ": Car = Dead");
      //   }
      // }
      // if (this._light == "G") {
      //   if (this.removeCar() == true) {
      //       removed = "removed";
      //   }
      // }
      // let numCars = this._maxIndex + 1;
      // console.log("There are " + numCars + " cars in the " + this._name + " lane. (" + added + " / " + removed + ")");
    }
}

class Car {
    constructor(positionIndex, startX, startY, color, myIndex, lane) {

        //need an array of x initial positions
        var xPosition = [265, w, 370, 0];
        //need an array of y initial positions
        var yPosition = [0, 170, h, 270];
        this._x = startX;
        this._y = startY;
        this._color = color;
        this._moving = false;
        this._lane = lane;
        this._myIndex = myIndex;

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
    get sign() {
        return this._lane.sign;
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
    move() {
        this._x = this._x + this._xSpeed;
        this._y = this._y + this._ySpeed;
    }
    update() {
        if(this.lane.light == 'G') {
            this._move();
        } else if(this._lane.pastDottedLine(this)) {
            this._move();
        }
        // } else {
        //     if (this._lane._pos == "x") {
        //         if (this._x < this._lane._straightLane[this._myIndex - 1]._x - 10) {
        //             this._move();
        //         }
        //     } else if (this._lane._pos = "y") {
        //         // 
        //     }
        // }
        // else if (this._x < this._lane._straightLane[this.index - 1]._x + 10)
        

        //if(space in front)
        //if(this.light.pastDottedLine(this)){

        //}
    }
    display() {
        fill(this._color);
        circle(this._x, this._y, 10);
    }
}

class LightControl {
    constructor(n, e, s, w) {
        this._lanes = [n, e, s, w];
        this._queue = [];
        this._state = "RRRR";
        this._lastState = "RGRG";
        this._timer = 0;
    }
    changeState(newState) {
        if (this._state == newState) {
            return;
        }
        if (this._state != "RRRR") {
            this._lastState = this._state;
        }
        this._state = newState;
        for (let i = 0; i < 4; i ++) {
            this._lanes[i].light = newState[i]
        }
    }
    updateQueue() {
        this._queue.unshift(180);
        this._queue.unshift("RRRR");
        this._queue.unshift(180);
        if (this._lastState == "GRGR") {
            this._queue.unshift("RGRG");
        } else {
            this._queue.unshift("GRGR");
        }
    }
    progress() {
        this._timer -= 1;
        if (this._timer <= 0) { // swap before displaying
            if (this._queue.length == 0) {
                this.updateQueue();
            }
            this._timer = this._queue.pop();
            this.changeState(this._queue.pop());
        }
        // this.printLights();
    }
    printLights() {
        console.log("");
        console.log("State: " + this._state);
        // console.log("N: " + this._lanes[0].light + ", E: " + this._lanes[1].light + ", S: " + this._lanes[2].light + ", W: " + this._lanes[3].light);
    }
}
