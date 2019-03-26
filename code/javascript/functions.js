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
        car2._x = car2._x + car2.xSpeed/2;
        car2._y = car2._y + car2.ySpeed/2;
    }
    if(car1.lane.light == "G")
    {
        car1._x = car1._x + car1.xSpeed/2;
        car1._y = car1._y + car1.ySpeed/2;
    }
    if(car3.lane.light == "G")
    {
        car3._x = car3._x + car3.xSpeed/2;
        car3._y = car3._y + car3.ySpeed/2;
    }
    if(car4.lane.light == "G")
    {
        car4._x = car4._x + car4.xSpeed/2;
        car4._y = car4._y + car4.ySpeed/2;
    }
  }
  