/* Create the 4 Lanes */
let laneN = new Lane("north", 3);
let laneE = new Lane("east", 3.5);
let laneS = new Lane("south", 2);
let laneW = new Lane("west", 2.5);

let lightControl = new LightControl(laneN, laneE, laneS, laneW);

lightControlLoop = setInterval(() => lightControl.progress(), 4000);
laneNLoop = setInterval(() => laneN.progress(), 4000);
laneELoop = setInterval(() => laneE.progress(), 4000);
laneSLoop = setInterval(() => laneS.progress(), 4000);
laneWLoop = setInterval(() => laneW.progress(), 4000);



var h = 480;
var w = 640;



function setup() {
    createCanvas(w, h);
    background(00,66,45);
    car1 = new Car(3, "purple", laneW);
    car2 = new Car(0, "yellow", laneN);
    car3 = new Car(1, "red", laneE);
    car4 = new Car(2, "blue", laneS);
}

function draw() {
    drawBackground();
    displayCars();
    updateCars();
}