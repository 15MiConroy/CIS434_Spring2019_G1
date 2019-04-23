/* Independent Global Parameters */

// Intersection height and width`
var h = 700;
var w = 800;

// Light control unit declaration (for global scope)
var lightControl;

// Traffic frequency values
var low = 700;
var high = 325;
var tinytim = -1;

// Durations of light timers 
var gTime = 300;
var rTime = 240;
var yTime = 120;
var lTime = 300;
var aTime = 300;

/* Input:   Index of a string, replacement string 
   Output:  Returns a new string with the replacement string in the place of the 
            substring starting at the given index. This applies to all Strings */
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

// Creates the 4 Lanes and puts them in the global lanes array
var laneN = new Lane("north", low, "y",  1, 210, 290,   -140,    0);
var laneE = new Lane("east",  low, "x", -1, 490, w+100,  255,    1);
var laneS = new Lane("south", low, "y", -1, 455, 465,   h+100,   2);
var laneW = new Lane("west",  low, "x",  1, 240, -140,   420,    3);
lanes = [laneN, laneE, laneS, laneW]

/* Output:  Upates the light control unit and each of the lanes */
function progress() {
    lightControl.progress();
    laneN.progress();
    laneE.progress();
    laneS.progress();
    laneW.progress();
}
/* Output:  Starts (or restarts) the simulation */
function startSimulation() {
    loop();
}
/* Output:  Stops the simulation */
function stopSimulation() {
    noLoop();
}
/* Output:  Initializes the light control unit, canvas, and background at the start
            of the simulation. Then sets the timer of each lane to a small value to
            add 1 car early. Stops the simulation so the user must begin it manually. */
function setup() {
    lightControl = new LightControl(laneN, laneE, laneS, laneW);
    createCanvas(w, h);
    background(00,66,45);
    for (var lane of lanes) {
        lane.timer = 20 * boxMuller();
    }
    stopSimulation();
}
/* Output:  Progresses the light control unit, all lanes, and all cars by 1 cycle.
            Re-draws the background, displays the crs over it, and updates the color
            of the traffic lights. */
function draw() {
    progress();
    drawBackground();
    displayCars();
    updateCars();
    updateLightColor();
}
