/* Independent Global Parameters */
var h = 480;
var w = 640;
let gaussSize = 100;
let gaussian = [];
let gaussIndex = -1;
fillGaussian();

/* String Modification */
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

/* Create the 4 Lanes */
let lightControl;
let laneN = new Lane("north", 350, "y",  1, 110, 265, 0);
let laneE = new Lane("east",  350, "x", -1, 413, w,   170);
let laneS = new Lane("south", 350, "y", -1, 320, 370, h);
let laneW = new Lane("west",  350, "x",  1, 205, 0,   270);

function fillGaussian() {
  let x1, x2, rad, result;
  for (let i = 0; i < gaussSize; i++) {
    do {
      do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        rad = x1 * x1 + x2 * x2;
      } while (rad >= 1 || rad == 0)
      result = x1 * Math.sqrt(-2.0 * Math.log(rad) / rad) / 2;
    } while (Math.abs(result) > 1)
    gaussian[i] = result + 1;
  }
}
function getGaussian() {
  gaussIndex = (gaussIndex + 1) % gaussSize;
  return gaussian[gaussIndex];
}

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