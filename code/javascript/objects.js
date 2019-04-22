class Lane {
    /* Input:   Name, frequency, position (x or y), sign (1 or -1), dotted line,
                car starting X position, car starting Y position, lane position in
                lanes array (0 to 3)
       Output:  Instantiates the Lane object */
    constructor(name, frequency = tinytim, pos, sign, dLine, startX, startY, carPos) {
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
        this._maxLine = startX;
        if (this._pos == "y") {
            this._maxLine = startY;
        }
    }
    /* Getters and Setters */
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
    get frequency() {
      return this._frequency;
    }
    get sign() {
        return this._sign;
    }
    get timer() {
        return this._timer;
    }
    set light(l) {
        this._light = l;
    }
    set frequency(f) {
      this._frequency = f;
    }
    set timer(t) {
        this._timer = Math.floor(t);
    }
    /* Output:  Returns true if a car is present in the left lane array */
    hasLeft() {
        if (this._leftLane.length == 0) {
            return false;
        }
        return !this.pastDottedLine(this._leftLane[this._leftLane.length - 1]);
    }
    /* Output:  Returns true if a car is present in the straight lane array */
    hasStraight() {
        if (this._straightLane.length == 0) {
            return false;
        }
        return !this.pastDottedLine(this._straightLane[this._straightLane.length - 1]);
    }
    /* Output:  Returns true if a car is present in either lane array */
    hasCar() {
        return this.hasStraight() || this.hasLeft();
    }
    /* Input:   A lane array (either straight or left)
       Output:  Returns the last car in that array */
    lastCar(lane) {
        return lane[lane.length - 1];
    }
    /* Input:   A car, a reference point
       Output:  Returns true if the car is beyond the reference point (based on the
                lane's dimension) */
    withinBounds(car, reference) {
        var dim;
        if (this._pos == "x") {
            dim = car.x;
        } else {
            dim = car.y;
        }
        return dim * this._sign < reference * this._sign;
    }
    /* Input:   A car, a reference point
       Output:  Returns true if the car is behind the reference point (based on the
                lane's dimension) */
    compare(car, reference) {
        var dim;
        if (this._pos == "x") {
            dim = car.x;
        } else {
            dim = car.y;
        }
        return dim * this._sign > reference * this._sign;
    }
    /* Input:   A car
       Output:  Returns true if the car is beyond the line that divides the lane from
                the intersection */
    pastDottedLine(car) {
        return this.compare(car, this._dLine);
    }
    /* Input:   A car
       Output:  Returns true if the car is beyond this lane's right turn line  */
    pastRightTurnLine(car) {
        return this.compare(car, this._rightTurnLine);
    }
    /* Input:   A car
       Output:  Returns true if the car is beyond this lane's left turn line */
    pastLeftTurnLine(car) { 
        return this.compare(car, this._leftTurnLine);   
    }
    /* Input:   A lane array (either straight or left)
       Output:  Returns true if there is a car in an array and that car is within 60
                units of the lane's starting position */
    arrayMaxed(lane) {
        var lastCar = this.lastCar(lane);
        return lastCar != null && this.withinBounds(lastCar, this._maxLine + 60);
    }
    /* Input:   A lane array (either straight or left)
       Output:  Removes the first 10 elements of the lane array if the array's length
                is 20 or greater */
    cleanLane(lane) {
        if (lane.length > 20) {
            lane.splice(0, 10);
            for (var i = 0; i < lane.length; i++) {
                lane[i].index = i;
            }
        }
    }
    /* Output:  Adds a car to the Lane object in one of the lane arrays. If one lane
                array is unavailable, the other array is chosen. Otherwise the array
                is chosen randomly. After the car is added, the lane is checked for
                excess cars and "cleaned". */
    addCar() {
        var sMax = this.arrayMaxed(this._straightLane);
        var lMax = this.arrayMaxed(this._leftLane);
        if (sMax && lMax) return;
        var direction;
        if (sMax) {
            direction = "L";
        } else if (lMax) {
            direction = "S";
        } else {
            direction = directionGen();
        }
        if(direction  == "L") {
            var car = new Car(this._carPos, this._leftX, this._leftY, colorGen(), this, direction);
            car._myIndex = this._leftLane.length;
            this._leftLane[this._leftLane.length] = car;
            this.cleanLane(this._leftLane);
        } else {
            var car = new Car(this._carPos, this._startX, this._startY, colorGen(), this, direction);
            car._myIndex = this._straightLane.length;
            this._straightLane[this._straightLane.length] = car;
            this.cleanLane(this._straightLane);
        }
    }
    /* Output:  Updates the lane timer unless the lane is turned off If the timer
                falls below 0, adds a car and resets the timer. */
    progress() {
        if (this._frequency > 0) {
            this._timer -= 1;
            if (this._timer <= 0) {
                this._timer += this._frequency * boxMuller();
                this.addCar();
            }
        }
    }
}

class Car {
    /* Input:   Position index in lane array, starting X value, starting Y value,
                color, lane, direction (Left, Straight, or Right)
       Output:  Instantiates the Car object */
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
    /* Getters and Setters */
    get x() {
        return this._x;
    }
    get y() {
        return this._y
    }
    get lane() {
        return this._lane;
    }
    get index() {
        return this._myIndex
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
    set index(i) {
        this._myIndex = i;
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
    /* Output:  Updates the car's x and y coordinates based on its speed */
    move() {
        this._x = this._x + this._xSpeed;
        this._y = this._y + this._ySpeed;
    }
    /* Output:  Updates the car's x and y speeds if it turns */
    turn() {
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
            var temp = this._carWidth;
            this._carWidth = this._carLength;
            this._carLength = temp;
        }
    }
    /* Input:   A light state, a lane array (either straight or left) 
       Output:  Moves the car under 3 primary conditions:
                 - the car's lane's light matches the input state (or the "All" state)
                 - the car is beyond the line dividing the lane from the intersection
                 - the car is sufficently far behind the car in front of it OR the line
                   dividing the lane from the intersection.
                If the car has not turned, it checks for turning conditions */
    update(goColor, lane) {
        if (this.lane.light == goColor || this.lane.light == 'A') {
            this.move();
        } else if (this._lane.pastDottedLine(this)) {
            this.move();
        } else {
            var nextCar = lane[this._myIndex - 1];
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
        if (!this._turned) {  
            this.turn();    
        }
    }
    /* Output:  Updates a car's X and Y coordinates based on the status of the straight
                lane array */
    updateStraight() {
        this.update('G', this._lane._straightLane);
    }
    /* Output:  Updates a car's X and Y coordinates based on the status of the left
                lane array */
    updateLeft() {
        this.update('L', this._lane._leftLane);
    }
    /* Output:  Displays a car */
    display() {
        fill(this._color);
        if (this._lane._name == "west" || this._lane._name == "east" ) {
            rect(this._x, this._y, this._carWidth, this._carLength);
        } else {
            rect(this._x, this._y, this._carLength, this._carWidth);
        }
    }
}

class LightControl {
    /* Input:   North, east, south, and west cardinal Lane objects
       Output:  Instantiates the Light Control object */
    constructor(n, e, s, w) {
        this._a = [n, s];
        this._i = [e, w];
        this._lanes = [n, e, s, w];
        this._q = [];
        this._state = "GRGR";
        this._timer = 0;
        this.createPattern();
    }
    /* Input:   A new light state, a duration for the light state
       Output:  Updates the 4 lanes lights to the new state nad sets the timer to the
                new duration. If the light state is a handoff: checks for swapping
                active and inactive lights, and then creates a new queue of light states*/
    changeState(newState, duration) {
        if (newState == "handoff") {
            this.handoff();
            this.createPattern();
            this.changeState(this._q.pop(), this._q.pop());
            return;
        }
        for (var i = 0; i < 4; i++) {
            this._state = this._state.replaceAt(i, newState[i]);
            this._lanes[i].light = newState[i];
        }
        this._timer = duration;
    }
    /* Output:  Returns 0 the active lanes are North & South, 1 otherwise */
    orthogonal() {
        if (this._a[0] == this._lanes[0]) {
            return 0;
        }
        return 1;
    }
    /* Output:  Returns a new string representing the 4 lane lights when both active 
                lanes display left turn lights */
    bothLeft() {
        var s = "RRRR";
        var ortho = this.orthogonal();
        s = s.replaceAt(ortho, "L");
        s = s.replaceAt(ortho + 2, "L");
        return s;
    }
    /* Output:  Returns a new string representing the 4 lane lights when both active 
                lanes display green lights */
    bothStraight() {
        var s = "RRRR";
        var ortho = this.orthogonal();
        s = s.replaceAt(ortho, "G");
        s = s.replaceAt(ortho + 2, "G");
        return s;
    }
    /* Output:  Returns a new string representing the 4 lane lights when one lane displays
                a left turn light and a green light */
    singleDisplay(n) {
        var s = "RRRR";
        var ortho = this.orthogonal();
        s = s.replaceAt(2 * n + ortho, "A");
        return s;
    }
    /* Input:   A string representing one of the lanes, and string command
       Output:  Manually updates the light control's state to any legal state based on the
                inputs */
    manualUpdate(laneReference, command) {
        if (laneReference == "N" || laneReference == "S") {
            // make sure N & S are active
            if (this._a[0] != this._lanes[0]) {
                this.forceHandoff();
            }
        } else {
            if (this._a[0] != this._lanes[1]) {
                this.forceHandoff();
            }
        }
        var gen;
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
        this._q.unshift("handoff");
        this._q.unshift(0);
        this.changeState(gen, 300);
        draw();
    }
    /* Output:  If the inactive lanes have any cars, swaps the active and inactive lanes */
    handoff() {
        if (this._i[0].hasCar() || this._i[1].hasCar()) {
            this.forceHandoff();
        }
    }
    /* Output:  Swaps the active and inactive lanes */
    forceHandoff() {
        var temp = [this._a[0], this._a[1]];
        this._a = [this._i[0], this._i[1]];
        this._i = [temp[0], temp[1]];
    }
    /* Output:  Creates a new queue of traffic light patterns and pattern durations based on
                the presence of cars in the active lanes */
    createPattern() {
        this._q = [];
        var tQ = [];
        if (this._a[0].hasLeft() && this._a[1].hasLeft()) {
            tQ.unshift(this.bothLeft());
            tQ.unshift(lTime);
        } else if (this._a[0].hasLeft() || this._a[1].hasLeft()) {
            var left = 0;
            if (this._a[1].hasLeft()) {
                left = 1;
            }
            tQ.unshift(this.singleDisplay(left));
            tQ.unshift(aTime);
        }
        tQ.unshift(this.bothStraight());
        tQ.unshift(gTime);
        var prevPos = -1;
        while (tQ.length > 0) {
            var nextState = tQ.pop();
            var dur = tQ.pop();
            var prevState;
            if (prevPos == -1) {
                prevState = this._state;
            } else {
                prevState = this._q[prevPos];
            }
            var trans = prevState;
            for (var i = 0; i < 4; i++) {
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
                    this._q.unshift(yTime);
                    trans = trans.replace("Y", "R");
                    trans = trans.replace("Y", "R");
                    this._q.unshift(trans);
                    this._q.unshift(rTime);
                    prevPos += 2;
                } else {
                    this._q.unshift(trans);
                    this._q.unshift(rTime);
                    prevPos += 2;
                }
            }
            this._q.unshift(nextState);
            this._q.unshift(dur);
            prevPos += 2;
        }
        this._q.unshift("handoff");
        this._q.unshift(0);
    }
    /* Output:  Updates the light timer, and changes states with the timer reaches 0 */
    progress() {
        this._timer -= 1;
        if (this._timer <= 0) {
            this.changeState(this._q.pop(), this._q.pop());
        }
    }
}