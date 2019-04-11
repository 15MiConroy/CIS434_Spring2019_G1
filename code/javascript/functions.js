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
var freq;
var low=15;
var high=10;
var bigboi=77777777777777777777777777777777;
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
// function updateCars() {
//     if(car2.lane.light == "G" || car2._y > 110)
//     {
//         car2._x = car2._x + car2.xSpeed/2;//N
//         car2._y = car2._y + car2.ySpeed/2;
//     }
//     if(car1.lane.light == "G" || car1._x > 205)
//     {
//         car1._x = car1._x + car1.xSpeed/2;//W
//         car1._y = car1._y + car1.ySpeed/2;
//     }
//     if(car3.lane.light == "G" || car3._x < 413)
//     {
//         car3._x = car3._x + car3.xSpeed/2; //E
//         car3._y = car3._y + car3.ySpeed/2;
//     }
//     if(car4.lane.light == "G" || car4._y < 320)
//     {
//         car4._x = car4._x + car4.xSpeed/2; //S
//         car4._y = car4._y + car4.ySpeed/2;
//     }
// }
//
