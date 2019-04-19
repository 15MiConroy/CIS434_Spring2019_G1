let LANE_LENGTH = 5;

class Lane {
    constructor(name, frequency = bigboi, pos, sign, dLine, startX, startY, carPos) {
        this._name = name;
        this._frequency = frequency;
        this._pos = pos;
        this._sign = sign;
        this._dLine = dLine;
        this._rightTurnLine = this._dLine + 50 * sign;
        this._leftTurnLine = this._dLine + 190 * sign;
        this._startX = startX;
        this._startY = startY;
        this._carPos = carPos;
        this._light = "R";
        this._straightLane = [];
        this._leftLane = [];
        this._timer = this._frequency;
        this._leftX = this._startX;
        this._leftY = this._startY;
        if(this._name == "north") {
            this._leftX = this._startX + 95;
        } else if(this._name == "south"){
            this._leftX = this._startX - 100;
        } else if (this._name == "east") {
            this._leftY = this._startY + 93;
        } else if (this._name == "west"){
            this._leftY = this._startY - 90;
        }
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
    get numLeftCars() {
        return this._leftLane.length;
    }
    get frontCar() {
        if (this._straightLane.length == 0) {
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
    hasLeft() {
        if (this._leftLane.length == 0) {
            return false;
        }
        return !this.pastDottedLine(this._leftLane[this._leftLane.length - 1]);
    }
    hasStraight() {
        if (this._straightLane.length == 0) {
            return false;
        }
        return !this.pastDottedLine(this._straightLane[this._straightLane.length - 1]);
    }
    hasCar() {
        return this.hasStraight() || this.hasLeft();
    }
    addCar() {
        let direction = directionGen();
        if(direction  == "L") {
            let car = new Car(this._carPos, this._leftX, this._leftY, colorGen(), this, direction);
            car._myIndex = this._leftLane.length;
            this._leftLane[this._leftLane.length] = car;
        } else {
            let car = new Car(this._carPos, this._startX, this._startY, colorGen(), this, direction);
            car._myIndex = this._straightLane.length;
            this._straightLane[this._straightLane.length] = car;
        }
    }
    compare(car, reference) {
        let dim;
        if (this._pos == "x") {
            dim = car.x;
        } else {
            dim = car.y;
        }
        return dim * this._sign > reference * this._sign;
    }
    pastDottedLine(car) {
        return this.compare(car, this._dLine);
    }
    pastRightTurnLine(car) {
        return this.compare(car, this._rightTurnLine);
    }
    pastLeftTurnLine(car) {	
        return this.compare(car, this._leftTurnLine);	
    }
    progress(){
    this._timer -= 1;
      // randCarGen = [Math.floor(Math.random() * (40*this._frequency))];
      if (this._timer <= 0) {
        this._timer += this._frequency;
        this.addCar();
        // if (this._frequency>=randCarGen){
        //   this.addCar();
        // }
      }
    }
}

class Car {
    constructor(positionIndex, startX, startY, color, lane, direction) {

        this._direction = direction;
        this._x = startX;
        this._y = startY;
        this._color = color;
        this._moving = false;
        this._lane = lane;
        this._myIndex = null;
        this._turned = false;
        this._carLength = 20;
        this._carWidth = 40;

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
    turn(){	
        if(this._direction == "R" & this.lane.name == "north" & this._lane.pastRightTurnLine(this)) {	
            this._xSpeed = -1;	
            this._ySpeed = 0;	
            this._turned = true;	
        } else if(this._direction == "R" & this.lane.name == "east" & this._lane.pastRightTurnLine(this)){	
            this._xSpeed = 0;	
            this._ySpeed = -1;	
            this._turned = true;	
        } else if(this._direction == "R" & this.lane.name == "west" & this._lane.pastRightTurnLine(this)){	
            this._xSpeed = 0;	
            this._ySpeed = 1;	
            this._turned = true;	
        }	
        else if(this._direction == "R" & this.lane.name == "south" & this._lane.pastRightTurnLine(this)){	
            this._xSpeed = 1;	
            this._ySpeed = 0;	
            this._turned = true;	
        } else if(this._direction == "L" & this.lane.name == "north" & this._lane.pastLeftTurnLine(this)) {	
            this._xSpeed = 1;	
            this._ySpeed = 0;	
            this._turned = true;	
        } else if(this._direction == "L" & this.lane.name == "east" & this._lane.pastLeftTurnLine(this)){	
            this._xSpeed = 0;	
            this._ySpeed = 1;	
            this._turned = true;	
        } else if(this._direction == "L" & this.lane.name == "west" & this._lane.pastLeftTurnLine(this)){	
            this._xSpeed = 0;	
            this._ySpeed = -1;	
            this._turned = true;	
        }	
        else if(this._direction == "L" & this.lane.name == "south" & this._lane.pastLeftTurnLine(this)){	
            this._xSpeed = -1;	
            this._ySpeed = 0;	
            this._turned = true;	
        }	
        if(this._turned) {
            let temp = this._carWidth;
            this._carWidth = this._carLength;
            this._carLength = temp;
        }
    }
    update() {
        if(this.lane.light == 'G' || this.lane.light == 'A') {
            this.move();
        } else if(this._lane.pastDottedLine(this)) {
            this.move();
        } else {
            let nextCar = this._lane._straightLane[this._myIndex - 1];
            if (this._lane._pos == "x") {
                if (this._myIndex == 0 || this._lane.pastDottedLine(nextCar)) {
                    if (this._x  * this.sign < (this._lane._dLine - (60 * this.sign)) * this.sign) {
                        this.move();
                    }
                } else {
                    if (!this._lane.pastDottedLine(nextCar) && this._x * this.sign < (nextCar._x - (60 * this.sign)) * this.sign) {
                        this.move();
                    }
                }
            } else if (this._lane._pos == "y") {
                if (this._myIndex == 0 || this._lane.pastDottedLine(nextCar)) {
                    if (this._y  * this.sign < (this._lane._dLine - (60 * this.sign)) * this.sign) {
                        this.move();
                    }
                } else {
                    if (!this._lane.pastDottedLine(nextCar) && this._y * this.sign < (nextCar._y - (60* this.sign)) * this.sign) {
                        this.move();
                    }
                }
            }
        }
        if(!this._turned){  
            this.turn();    
        }
    }
    updateLeft() {
        if(this.lane.light == 'L' || this.lane.light == 'A') {
            this.move();
        } else if(this._lane.pastDottedLine(this)) {
            this.move();
        } else {
            let nextCar = this._lane._leftLane[this._myIndex - 1];
            if (this._lane._pos == "x") {
                if (this._myIndex == 0 || this._lane.pastDottedLine(nextCar)) {
                    if (this._x  * this.sign < (this._lane._dLine - (60 * this.sign)) * this.sign) {
                        this.move();
                    }
                } else {
                    if (!this._lane.pastDottedLine(nextCar) && this._x * this.sign < (nextCar._x - (60 * this.sign)) * this.sign) {
                        this.move();
                    }
                }
            } else if (this._lane._pos == "y") {
                if (this._myIndex == 0 || this._lane.pastDottedLine(nextCar)) {
                    if (this._y  * this.sign < (this._lane._dLine - (60 * this.sign)) * this.sign) {
                        this.move();
                    }
                } else {
                    if (!this._lane.pastDottedLine(nextCar) && this._y * this.sign < (nextCar._y - (60 * this.sign)) * this.sign) {
                        this.move();
                    }
                }
            }
        }
        if(!this._turned){	
            this.turn();	
        }
    }
    display() {
        fill(this._color);
        if (this._lane._name == "west" || this._lane._name == "east" )
        {
            rect(this._x, this._y, this._carWidth, this._carLength);
        }
        else {
            rect(this._x, this._y, this._carLength, this._carWidth);
        }
       // circle(this._x, this._y, 10);
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
    manualUpdate(laneReference, command) {
        if (laneReference == "N" || laneReference == "S") {
            // make sure N & S are active
            if (this._a[0] != this._lanes[0]) {
                forceHandoff();
            }
        } else {
            if (this._a[0] != this._lanes[1]) {
                forceHandoff();
            }
        }
        let gen;
        if (command == "bothLeft") {
            gen = this.bothLeft();
        } else if (command == "bothStraight") {
            gen = this.bothStraight();
        } else if (command == "singleDisplay") {
            if (laneReference == "N" || laneReference == "E") {
                gen = this.singleDisplay(0);
            } else {
                gen = this.singleDisplay(1);
            }
        }
        this._q = [];
        changeState(gen, 300);
    }
    handoff() {
        if (this._i[0].hasCar() || this._i[1].hasCar()) {
            this.forceHandoff();
        }
    }
    forceHandoff() {
        let temp = [this._a[0], this._a[1]];
        this._a = [this._i[0], this._i[1]];
        this._i = [temp[0], temp[1]];
    }
    updateQueue() {
        this._queue.unshift(180);
        this._queue.unshift("RRRR");
        this._queue.unshift(600);
        if (this._lastState == "GRGR") {
            this._queue.unshift("RGRG");
        } else {
            this._queue.unshift("GRGR");
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
                    } else {
                        if (nextState[this.orthogonal()] == "L") {
                            trans = trans.replaceAt(i, "R");
                        } else if (nextState[i] == "A") {
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
                    prevPos += 2;
                } else {
                    this._q.unshift(trans);
                    this._q.unshift(180);
                    prevPos += 2;
                }
            }
            this._q.unshift(nextState);
            this._q.unshift(300);
            prevPos += 2;
        }
        this._q.unshift("handoff");
        this._q.unshift(0);
    }
    progress() {
        this._timer -= 1;
        if (this._timer <= 0) {
            this.changeState(this._q.pop(), this._q.pop());
        }
    }
}