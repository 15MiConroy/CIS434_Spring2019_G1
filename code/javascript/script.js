/* Create the 4 Lanes */
let laneN = new Lane("north");
let laneE = new Lane("east");
let laneS = new Lane("south");
let laneW = new Lane("west");

let lightControl = new LightControl(laneN, laneE, laneS, laneW);

// lightControlLoop = setInterval(() => lightControl.progress(), 2000);
// laneNLoop = setInterval(() => laneN.progress(), 2000);


var h = 480;
var w = 640;
var x = w;
var y = h;
var xSpeed;
var ySpeed;
var colorR = 200;
var colorG = 0;
var colorB = 0;
//need an array of x initial positions
var xPosition = [0, 265, 370, w]; 
//need an array of y initial positions
var yPosition = [270, 0, h, 170];

function setup() {
    createCanvas(w, h);
    background(00,66,45);
}

// function draw() {
//     //x street
//     fill(51);
//     rect(-1,h/4,w+1,200);
//     //y streen
//     fill(51);
//     rect(w/3,-1,200,h);
//     fill(255);
//     rect(205, 220, 10, 100);
//     fill(255);
//     rect(413, 120, 10, 100);
//     fill(255);
//     rect(215, 110, 100, 10);
//     fill(255);
//     rect(315, 320, 100, 10);
//     fill(255, 204, 0);
//     rect(315, 320, 10, 160);
//     fill(255, 204, 0);
//     rect(315, -40, 10, 160);
//     fill(255, 204, 0);
//     rect(412, 210, 230, 10);
//     fill(255, 204, 0);
//     rect(-15, 210, 230, 10);
//     fill(colorR, colorG, colorB);
//     circle(x, 170, 10);
//     //    car();
//     x--;
//   }
