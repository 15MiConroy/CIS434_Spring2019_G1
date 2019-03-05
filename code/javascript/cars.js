class Car {
    constructor(initX, initY, color, lane) {
        this.x = initX;
        this.y = initY;
        this.color = color;    
        this.moving = false;
        this.lane = lane;
    }
    get x() {
        return this.x;
    }
    get y() {
        return this.y
    }
    get lane() {
        return this.lane;
    }
    get color() {
        return this.color;
    }
    get moving() {
        return this.moving;
    }
    set x(newX) {
        this.x = newX;
    }
    set y(newY) {
        this.y = newY;
    }
    isMoving() {
        return this.moving;
    }
    isNotMoving() {
        return !this.moving;
    }
    move() {
        this.moving = true;
    }
    stop() {
        this.moving = false;
    }
}
