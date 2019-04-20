lanes = [laneN, laneE, laneS, laneW]
function updateCars() {
  for (let lane of lanes){
    for (let i = 0; i < lane.numCars; i++) {
      lane._straightLane[i].update();
    }
    for (let i = 0; i < lane.numLeftCars; i++) {
        lane._leftLane[i].updateLeft();
    }
  }
}
function displayCars() {
  for (let lane of lanes) {
    for (let i = 0; i < lane.numCars; i++) {
      lane._straightLane[i].display();
    }
    for (let i = 0; i < lane.numLeftCars; i++) {
        lane._leftLane[i].display();
    }
  }
}

function updateLightColor() {
  greyLights();
  //North
    if (laneN._light == "R"){
        fill("red");
        circle(238, 65, 20);
    }
    else if (laneN._light == "Y")
    {
        fill("yellow");
        circle(238, 111, 20);
    }
    else if (laneN._light == "A"){
      fill("green");
      circle(238, 157, 20);
      fill("blue");
      circle(238, 203, 20);
    }
    else if (laneN._light == "G")
    {
        fill("green");
        circle(238, 157, 20);
    }
    else if (laneN._light == "L")
    {
    //    fill("blue");
      //  circle(238, 203, 20);
      fill("green");
      triangle(226, 210, 226, 196, 238, 210)
    }
    //East
    if (laneE._light == "R")
    {
        fill("red");
        circle(672, 204, 20);
    }
    else if (laneE._light == "Y")
    {
        fill("yellow");
        circle(626, 204, 20);
    }
    else if (laneE._light == "A"){
      fill("green");
      circle(580, 204, 20);
      fill("blue");
      circle(534, 204, 20);
    }
    else if (laneE._light == "G")
    {
        fill("green");
        circle(580, 204, 20);
    }
    else if (laneE._light == "L")
    {
        fill("blue");
        circle(534, 204, 20);
    }
    //West
    if (laneW._light == "R"){
        fill("red");
        circle(96, 497, 20);
    }
    else if (laneW._light == "Y")
    {
        fill("yellow");
        circle(142, 497, 20);
    }
    else if(laneW._light == "A"){
      fill("green");
      circle(188, 497, 20);
      fill("blue");
      circle(234, 497, 20);
    }
    else if (laneW._light == "G")
    {
        fill("green");
        circle(188, 497, 20);
    }
    else if (laneW._light == "L")
    {
        fill("blue");
        circle(234, 497, 20);
    }
    //South
    if (laneS._light == "R"){
        fill("red");
        circle(530, 636, 20);
    }
    else if (laneS._light == "Y")
    {
        fill("yellow");
        circle(530, 590, 20);
    }
    else if (laneS._light == "A"){
      fill("green");
      circle(530, 544, 20);
      fill("blue");
      circle(530, 498, 20);
    }
    else if (laneS._light == "G")
    {
        fill("green");
        circle(530, 544, 20);
    }
    else if (laneS._light == "L")
    {
        fill("blue");
        circle(530, 498, 20);
    }
}
function greyLights() {
  fill("grey");
  //South
  circle(530, 498, 20);
  circle(530, 544, 20);
  circle(530, 590, 20);
  circle(530, 636, 20);
  //West
  circle(96, 497, 20);
  circle(142, 497, 20);
  circle(188, 497, 20);
  circle(234, 497, 20);
  //North
  circle(238, 65, 20);
  circle(238, 111, 20);
  circle(238, 157, 20);
  circle(238, 203, 20);
  //East
  circle(672, 204, 20);
  circle(626, 204, 20);
  circle(580, 204, 20);
  circle(534, 204, 20);
}
function colorGen() {
  //Generate random color
  var hexChars = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  return color;
}
function directionGen() {
    //Generate random direction
    var directionArray = ["L","R","S"];
    var direction = directionArray[Math.floor(Math.random() * 3) - 1];
    return direction;
}
var freq;
var randCarGen;
var low=500;
var high=250;
var bigboi=7777777777777777777777777777777777777777777777777777777777;
function changeSingleFrequency(lane, freq) {
  lane._timer = freq;
  lane._frequency = freq;
}
function changeFrequency(freq) {
  for (let lane of lanes) {
    changeSingleFrequency(lane, freq);
  }
}
function changeNFrequency(freq) {
  changeSingleFrequency(laneN, freq);
}
function changeEFrequency(freq) {
  changeSingleFrequency(laneE, freq);
}
function changeSFrequency(freq) {
  changeSingleFrequency(laneS, freq);
}
function changeWFrequency(freq) {
  changeSingleFrequency(laneW, freq);
}
function startDeadSimulation() {
  changeFrequency(bigboi);
  startSimulation();
}
