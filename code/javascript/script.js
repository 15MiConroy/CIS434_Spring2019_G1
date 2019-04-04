/* Create the 4 Lanes */
let laneN = new Lane("north", 120, "y", 1, 110, 265, 0);
let laneE = new Lane("east", 100, "x", -1, 413, w, 170);
let laneS = new Lane("south", 90, "y", -1, 320, 370, h);
let laneW = new Lane("west", 150, "x", 1, 205, 0, 270);

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
    noLoop();
}

function draw() {
    progress();
    drawBackground();
    //displayCars();
    //updateCars();
}