/* Independent Global Parameters */
var h = 700;
var w = 800;
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

/* Create the 4 Lanes */
let lightControl;
let laneN = new Lane("north", 275, "y",  1, 210, 290, -20,   0);
let laneE = new Lane("east",  300, "x", -1, 490, w+10,   255, 1);
let laneS = new Lane("south", 325, "y", -1, 455, 465, h+20,   2);
let laneW = new Lane("west",  350, "x",  1, 240, -10,   420, 3);

let x = 0;

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
    noLoop();
}

function draw() {
    progress();
    drawBackground();
    displayCars();
    updateCars();
    updateLightColor();
}
