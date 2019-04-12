class Lane {
    constructor(name, frequency = bigboi, pos, sign, dLine, startX, startY) {
        this._name = name;
        this._frequency = frequency;
        this._pos = pos;
        this._sign = sign;
        this._dLine = dLine;
        this._startX = startX;
        this._startY = startY;
        this._light = "R";
        this._straightLane = [];
        this._leftLane = [];
        this.resetTimer();
    }
    get name() {
        return this._name;
    }
    get light() {
        return this._light;
    }
    get numCars() {
        return this._straightLane.length;
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
    resetTimer() {
        this._timer = Math.floor(this._frequency * getGaussian());
    }
    hasLeft() {
        if (this._leftLane.length == 0) {
            return false;
        }
        return !this.pastDottedLine(this._leftLane[this._leftLane.length - 1]);
    }
    hasCar() {
        if (this._straightLane.length == 0) {
            return false;
        }
        return !this.pastDottedLine(this._straightLane[this._straightLane.length - 1]);
    }
    addCar() {
        let car = new Car(this._startX, this._startY, colorGen(), this._straightLane.length, this);
        this._straightLane[this._straightLane.length] = car;
    }
    pastDottedLine(car) {
        if(this._pos == "x") {
            return car.x * this._sign > this._dLine * this._sign;
        } else {
            return car.y * this._sign > this._dLine * this._sign;
        }
    }
    progress() {
      this._timer -= 1;
      // randCarGen = [Math.floor(Math.random() * (40*this._frequency))];
      if (this._timer <= 0) {
        this.addCar();
        this.resetTimer();
        // if (this._frequency>=randCarGen){
        //   this.addCar();
        // }
      }
    }
}

class Car {
    constructor(startX, startY, color, myIndex, lane) {
        this._x = startX;
        this._y = startY;
        this._color = color;
        this._moving = false;
        this._lane = lane;
        this._myIndex = myIndex;

        //setting speed of car (x and y direction)
        if(lane.name == "north"){
            this.xSpeed = 0;
            this.ySpeed = 1;
        }
        else if(lane.name == "east"){
            this.xSpeed = -1;
            this.ySpeed = 0;
        }
        else if(lane.name == "south"){
            this.xSpeed = 0;
            this.ySpeed = -1;
        }
        else if(lane.name == "west"){
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
    move() {
        this._x = this._x + this._xSpeed;
        this._y = this._y + this._ySpeed;
    }
    update() {
        if(this.lane.light == 'G') {
            this.move();
        } else if(this._lane.pastDottedLine(this)) {
            this.move();
        } else {
            let nextCar = this._lane._straightLane[this._myIndex - 1];
            if (this._lane._pos == "x") {
                if (this._myIndex == 0 || this._lane.pastDottedLine(nextCar)) {
                    if (this._x  * this.sign < (this._lane._dLine - (30 * this.sign)) * this.sign) {
                        this.move();
                    }
                } else {
                    if (!this._lane.pastDottedLine(nextCar) && this._x * this.sign < (nextCar._x - (30 * this.sign)) * this.sign) {
                        this.move();
                    }
                }
            } else if (this._lane._pos == "y") {
                if (this._myIndex == 0 || this._lane.pastDottedLine(nextCar)) {
                    if (this._y  * this.sign < (this._lane._dLine - (30 * this.sign)) * this.sign) {
                        this.move();
                    }
                } else {
                    if (!this._lane.pastDottedLine(nextCar) && this._y * this.sign < (nextCar._y - (30 * this.sign)) * this.sign) {
                        this.move();
                    }
                }
            }
        }
    }
    display() {
        fill(this._color);
        circle(this._x, this._y, 10);
    }
}

class LightControl {
    constructor(n, e, s, w) {
        this._a = [n, s];
        this._i = [e, w];
        this._lanes = [n, e, s, w];
        this._q = [];
        this._state = "GRGR";
        this._timer = 0;
        this.createPattern();
    }
    changeState(newState, duration) {
        if (newState == "handoff") {
            this.handoff();
            this.createPattern();
            this.changeState(this._q.pop(), this._q.pop());
            return;
        }
        for (let i = 0; i < 4; i++) {
            this._state = this._state.replaceAt(i, newState[i]);
            this._lanes[i].light = newState[i];
        }
        this._timer = duration;
    }
    orthogonal() {
        // returns 0 if N/S, 1 if E/W
        if (this._a[0] == this._lanes[0]) {
            return 0;
        }
        return 1;
    }
    bothLeft() {
        let s = "RRRR";
        let ortho = this.orthogonal();
        s = s.replaceAt(ortho, "L");
        s = s.replaceAt(ortho + 2, "L");
        return s;
    }
    bothStraight() {
        let s = "RRRR";
        let ortho = this.orthogonal();
        s = s.replaceAt(ortho, "G");
        s = s.replaceAt(ortho + 2, "G");
        return s;
    }
    singleDisplay(n) {
        let s = "RRRR";
        let ortho = this.orthogonal();
        s = s.replaceAt(2 * n + ortho, "A");
        return s;
    }
    handoff() {
        if (this._i[0].hasCar() || this._i[1].hasCar()) {
            let temp = [this._a[0], this._a[1]];
            this._a = [this._i[0], this._i[1]];
            this._i = [temp[0], temp[1]];
        }
    }
    createPattern() {
        this._q = [];
        let tQ = [];
        if (this._a[0].hasLeft() && this._a[1].hasLeft()) {
            tQ.unshift(this.bothLeft());
            tQ.unshift(180);
        } else if (this._a[0].hasLeft() || this._a[1].hasLeft()) {
            let left = 0;
            if (this._a[1].hasLeft()) {
                left = 1;
            }
            tQ.unshift(this.singleDisplay(left));
            tQ.unshift(180);
        }
        tQ.unshift(this.bothStraight());
        tQ.unshift(300);
        let prevPos = -1;
        while (tQ.length > 0) {
            let nextState = tQ.pop();
            let dur = tQ.pop();
            let prevState;
            if (prevPos == -1) {
                prevState = this._state;
            } else {
                prevState = this._q[prevPos];
            }
            let trans = prevState;
            for (let i = 0; i < 4; i++) {
                if (prevState[i] != "R" && prevState[i] != nextState[i]) {
                    if (prevState[i] == "A") {
                        trans = trans.replaceAt(i, "G");
                    } else if (prevState[i] == "L") {
                        trans = trans.replaceAt(i, "R");
                    } else { // prevState[i] == "G"
                        if (nextState[i] == "A") {
                            trans = trans.replaceAt(i, "G");
                        } else {
                            trans = trans.replaceAt(i, "Y");
                        }
                    }
                }
            }
            if (trans != nextState) {
                if (trans.includes("Y")) {
                    this._q.unshift(trans);
                    this._q.unshift(120);
                    trans = trans.replace("Y", "R");
                    trans = trans.replace("Y", "R");
                    this._q.unshift(trans);
                    this._q.unshift(180);
                    prevPos += 4;
                } else {
                    this._q.unshift(trans);
                    this._q.unshift(180);
                    prevPos += 2;
                }
            }
            this._q.unshift(nextState);
            this._q.unshift(300);
            this._q.unshift("handoff");
            this._q.unshift(0);
            prevPos += 4;
        }
    }
    progress() {
        this._timer -= 1;
        if (this._timer <= 0) {
            this.changeState(this._q.pop(), this._q.pop());
        }
    }
}
