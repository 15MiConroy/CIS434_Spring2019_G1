/* Independent Global Parameters */
var h = 700;
var w = 800;
let lightControl;
var low=700;
var high=325;
var bigboi=7777777777777777777777777777777777777777777777777777777777;

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

/* Create the 4 Lanes */
let laneN = new Lane("north", low, "y",  1, 210, 290, -20,   0);
let laneE = new Lane("east",  low, "x", -1, 490, w+10,   255, 1);
let laneS = new Lane("south", low, "y", -1, 455, 465, h+20,   2);
let laneW = new Lane("west",  low, "x",  1, 240, -10,   420, 3);

lanes = [laneN, laneE, laneS, laneW]

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

function setup() {
    lightControl = new LightControl(laneN, laneE, laneS, laneW);
    createCanvas(w, h);
    background(00,66,45);
    for (let lane of lanes) {
        lane.addCar();
    }
    noLoop();
}

function draw() {
    progress();
    drawBackground();
    displayCars();
    updateCars();
    updateLightColor();
}
