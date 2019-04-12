/* Independent Global Parameters */
var h = 480;
var w = 640;
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

/* Create the 4 Lanes */
let laneN = new Lane("north", 275, "y",  1, 110, 265, 0,   0);
let laneE = new Lane("east",  300, "x", -1, 413, w,   170, 1);
let laneS = new Lane("south", 325,  "y", -1, 320, 370, h,   2);
let laneW = new Lane("west",  350, "x",  1, 205, 0,   270, 3);

let lightControl = new LightControl(laneN, laneE, laneS, laneW);

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
    createCanvas(w, h);
    background(00,66,45);
    noLoop();
}

function draw() {
    progress();
    drawBackground();
    displayCars();
    updateCars();
}