  function displayCars() {
    for (let i = 0; i < laneN.numCars; i++) {
       laneN._straightLane[i].display();
    }
    for (let i = 0; i < laneE.numCars; i++) {
       laneN._straightLane[i].display();
    }
    for (let i = 0; i < laneS.numCars; i++) {
       laneN._straightLane[i].display();
    }
    for (let i = 0; i < laneW.numCars; i++) {
       laneN._straightLane[i].display();
    }
  }
  function updateCars() {
    for (let i = 0; i < laneN.numCars; i++) {
       laneN._straightLane[i].update();
    }
    for (let i = 0; i < laneE.numCars; i++) {
       laneN._straightLane[i].update();
    }
    for (let i = 0; i < laneS.numCars; i++) {
       laneN._straightLane[i].update();
    }
    for (let i = 0; i < laneW.numCars; i++) {
       laneN._straightLane[i].update();
    }
  }
  