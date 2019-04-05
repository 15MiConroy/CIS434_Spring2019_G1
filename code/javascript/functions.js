  function displayCars() {
    for (let i = 0; i < laneN.numCars; i++) {
       laneN._straightLane[i].display();
       console.log(i)
    }
    for (let i = 0; i < laneE.numCars; i++) {
       laneE._straightLane[i].display();
    }
    for (let i = 0; i < laneS.numCars; i++) {
       laneS._straightLane[i].display();
    }
    for (let i = 0; i < laneW.numCars; i++) {
       laneW._straightLane[i].display();
    }
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