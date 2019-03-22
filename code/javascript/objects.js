let LANE_LENGTH = 5;

class Lane {
    constructor(name, frequency = 3) {
        this._name = name;
        this._light = "R";
        this._straightLane = [];
        this._maxIndex = -1;
        this._frequency = frequency;
        this._timer = this._frequency;
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
    get frequency() {
      return this._frequency;
    }
    set light(l) {
        this._light = l;
    }
    set frequency(f) {
      this._frequency = f;
    }
    addCar() {
        if (this._maxIndex >= 4) {
            console.log("There are too many cars in this lane.");
            return false;
        }
        this._maxIndex += 1;
        let car = new Car(0, 0, "", this);
        this._straightLane[this._maxIndex] = car;
    }
    removeCar() {
        if (this._maxIndex == -1) {
            return false;
        }
        let car = this._straightLane[0];
        for (let i = 0; i < this._maxIndex; i++) {
            this._straightLane[i] = this._straightLane[i + 1];
        }
        this._straightLane[this._maxIndex] = null;
        this._maxIndex -= 1;
        car.move();
        return true;
    }
    progress() {
      this._timer -= 1;
      let added = "";
      let removed = "";
      if (this._timer <= 0) {
        added = "added";
        this.addCar();
        this._timer += this._frequency;
      }
      if (this._light == "G") {
        if (this.removeCar() == true) {
            removed = "removed";
        }
      }
      let numCars = this._maxIndex + 1;
      console.log("There are " + numCars + " cars in the " + this._name + " lane. (" + added + " / " + removed + ")");
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

class LightControl {
    constructor(n, e, s, w) {
        this._lanes = [n, e, s, w];
        this._timer = 4;
        // start with N and S green
        this.changeState("GRGR");
    }
    changeState(newState) {
        if (this._state == newState) {
            return;
        }
        this._state = newState;
        for (let i = 0; i < 4; i ++) {
            this._lanes[i].light = newState[i]
        }
    }
    switchLight() {
        if (this._state == "GRGR") {
            this.changeState("RGRG");
        } else {
            this.changeState("GRGR");
        }
    }
    // Move 1 second at a time down the list
    progress() {
        this._timer -= 1;
        if (this._timer <= 0) {
            this.switchLight();
            this._timer = 3;
        }
        console.log("");
        console.log("State: " + this._state);
        console.log("N: " + this._lanes[0].light + ", E: " + this._lanes[1].light + ", S: " + this._lanes[2].light + ", W: " + this._lanes[3].light);
    }
}
