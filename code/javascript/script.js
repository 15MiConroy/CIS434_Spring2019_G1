/* Independent Global Parameters */
var h = 700;
var w = 800;
var lightControl;
var low = 700;
var high = 325;
var tinytim = -1;
var gTime = 300;
var rTime = 240;
var yTime = 120;
var lTime = 300;
var aTime = 300;

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

/* Create the 4 Lanes */
var laneN = new Lane("north", low, "y",  1, 210, 290,   -140,    0);
var laneE = new Lane("east",  low, "x", -1, 490, w+100,  255,    1);
var laneS = new Lane("south", low, "y", -1, 455, 465,   h+100,   2);
var laneW = new Lane("west",  low, "x",  1, 240, -140,   420,    3);
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
    for (var lane of lanes) {
        lane.timer = 20 * boxMuller();
    }
    stopSimulation();
}

function draw() {
    progress();
    drawBackground();
    displayCars();
    updateCars();
    updateLightColor();
}
