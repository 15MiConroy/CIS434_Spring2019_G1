lanes = [laneN, laneE, laneS, laneW]
function updateCars() {
  for (let lane of lanes)
    for (let i = 0; i < lane.numCars; i++) {
      lane._straightLane[i].update();
    }
}
function displayCars() {
  for (let lane of lanes) {
    for (let i = 0; i < lane.numCars; i++) {
      lane._straightLane[i].display();
    }
  }
}

function updateLightColor() {
    if (laneN._light == "R"){
        fill("red");
        circle(195, 15, 12);
    }
    else if (laneN._light == "Y")
    {
        fill("yellow");
        circle(195, 40, 12);
    }
    else if (laneN._light == "G")
    {
        fill("green");
        circle(195, 65, 12);
    }
    else if (laneN._light == "L")
    {
        fill("blue");
        circle(195, 90, 12);
    }
    if (laneE._light == "R")
    {
        fill("red");
        circle(620, 105, 12);
    }
    else if (laneE._light == "Y")
    {
        fill("yellow");
        circle(595, 105, 12);
    }
    else if (laneE._light == "G")
    {
        fill("green");
        circle(570, 105, 12);
    }
    else if (laneE._light == "L")
    {
        fill("blue");
        circle(570, 130, 12);
    }
    if (laneW._light == "R"){
        fill("red");
        circle(20, 335, 12);
    }
    else if (laneW._light == "Y")
    {
        fill("yellow");
        circle(45, 335, 12);
    }
    else if (laneW._light == "G")
    {
        fill("green");
        circle(70, 335, 12);
    }
    else if (laneW._light == "L")
    {
        fill("blue");
        circle(95, 335, 12);
    }
    if (laneS._light == "R"){
        fill("red");
        circle(430, 460, 12);
    }
    else if (laneS._light == "Y")
    {
        fill("yellow");
        circle(430, 435, 12);
    }
    else if (laneS._light == "G")
    {
        fill("green");
        circle(430, 410, 12);
    }
    else if (laneS._light == "L")
    {
        fill("blue");
        circle(430, 385, 12);
    }
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
var low=15;
var high=10;
var bigboi=7777777777777777777777777777777777777777777777777777777777;
function changeFrequency(freq) {
  laneN._timer=freq;
  laneN._frequency=freq;
  laneE._timer=freq;
  laneE._frequency=freq;
  laneS._timer=freq;
  laneS._frequency=freq;
  laneW._timer=freq;
  laneW._frequency=freq;
}
function changeNFrequency(freq) {
  laneN._timer=freq;
  laneN._frequency=freq;
}
function changeEFrequency(freq) {
  laneE._timer=freq;
  laneE._frequency=freq;
}
function changeSFrequency(freq) {
  laneS._timer=freq;
  laneS._frequency=freq;
}
function changeWFrequency(freq) {
  laneW._timer=freq;
  laneW._frequency=freq;
}
function startDeadSimulation() {
  laneN._timer=bigboi;
  laneN._frequency=bigboi;
  laneE._timer=bigboi;
  laneE._frequency=bigboi;
  laneS._timer=bigboi;
  laneS._frequency=bigboi;
  laneW._timer=bigboi;
  laneW._frequency=bigboi;
  loop();
}
