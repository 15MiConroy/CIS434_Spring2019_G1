/* Independent Global Parameters */
var h = 700;
var w = 800;
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

/* Create the 4 Lanes */
let lightControl;
let laneN = new Lane("north", 275, "y",  1, 230, 300, 0,   0);
let laneE = new Lane("east",  300, "x", -1, 505, w,   265, 1);
let laneS = new Lane("south", 325, "y", -1, 475, 475, h,   2);
let laneW = new Lane("west",  350, "x",  1, 275, 0,   440, 3);

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
