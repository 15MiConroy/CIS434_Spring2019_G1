/* Create the 4 Lanes */
let laneN = new Lane("north");
let laneE = new Lane("east");
let laneS = new Lane("south");
let laneW = new Lane("west");


var h = 480;
var w = 640;



function setup() {
    createCanvas(w, h);
    background(00,66,45);
    car1 = new Car(3, "purple", laneW);
    car2 = new Car(0, "yellow", laneN);
    car3 = new Car(1, "red", laneE);
    car4 = new Car(2, "blue", laneS);
  }
  
  function draw() {
    drawBackground();
    displayCars();
    updateCars();
  }