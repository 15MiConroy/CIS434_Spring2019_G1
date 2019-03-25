  function displayCars() {
    //for(laneE._straightLane.)
    car1.display();
    car2.display();
    car3.display();
    car4.display();
  }

    function updateCars() {
    if(car2.lane.light == "G")
    {
        car2._x = car2._x + car2.xSpeed;
        car2._y = car2._y + car2.ySpeed;
    }
  }
  