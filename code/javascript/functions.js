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
        circle(180, 25, 15);
    }
    else if (laneN._light == "G")
    {
        fill("green");
        circle(180, 25, 15);
    }
    if (laneE._light == "R"){
        fill("red");
        circle(615, 100, 15);
    }
    else if (laneE._light == "G")
    {
        fill("green");
        circle(615, 100, 15);
    }
    if (laneW._light == "R"){
        fill("red");
        circle(25, 350, 15);
    }
    else if (laneW._light == "G")
    {
        fill("green");
        circle(25, 350, 15);
    }
    if (laneS._light == "R"){
        fill("red");
        circle(440, 450, 15);
    }
    else if (laneS._light == "G")
    {
        fill("green");
        circle(440, 450, 15);
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
