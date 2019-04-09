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
<<<<<<< HEAD
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
  function changeFrequency(freq) {
    laneN._frequency=freq;
    laneE._frequency=freq;
    laneS._frequency=freq;
    laneW._frequency=freq;
=======
}
>>>>>>> de702501bef0f0826ae629bc0dabc426a5fcf249

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
