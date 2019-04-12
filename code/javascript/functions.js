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
function changeFrequency(lane, freq) {
  lane._timer = freq + lane._timer - lane._frequency;
  lane._frequency = freq;
}
function changeLaneFrequency(laneIndex, freq) {
  changeFrequency(lanes[laneIndex], freq);
}
function changeAllFrequencies(freq) {
  for (let lane of lanes) {
    changeFrequency(lane, freq);
  }
}
function startSimulation() {
    loop();
}
function stopSimulation() {
    noLoop();
}
