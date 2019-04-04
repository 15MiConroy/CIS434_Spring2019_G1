/* Create the 4 Lanes */
let laneN = new Lane("north", 120);
let laneE = new Lane("east", 100);
let laneS = new Lane("south", 90);
let laneW = new Lane("west", 150);

let lightControl = new LightControl(laneN, laneE, laneS, laneW);

function progress() {
    lightControl.progress();
    laneN.progress();
    laneE.progress();
    laneS.progress();
    laneW.progress();
}

function startSimulation() {
    loop();
}
function stopSimulation() {
    noLoop();
}


var h = 480;
var w = 640;



function setup() {
    createCanvas(w, h);
    background(00,66,45);
    drawBackground();
    noLoop();
    car1 = new Car(3, "purple", laneW);
    car2 = new Car(0, "yellow", laneN);
    car3 = new Car(1, "red", laneE);
    car4 = new Car(2, "blue", laneS);
}

function draw() {
    progress();
    drawBackground();
    displayCars();
    updateCars();
}