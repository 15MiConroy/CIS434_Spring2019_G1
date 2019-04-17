
  function drawBackground() {
    //x street
    fill(51);
    rect(0,h/3,w,h/3);
    //y streen
    fill(51);
    rect(w/3,0,h/3,h);
    //West Dotted Line
    fill(255);
    rect(256, 326, 10, 140);
    //East Dotted Line
    fill(255);
    rect(500, 234, 10, 140);
    //North Dotted Line
    fill(255);
    rect(266, 223, 140, 10);
    //South Dotted Line
    fill(255);
    rect(360, 466, 140, 10);
    //South Vertical Yellow
    fill(255, 204, 0);
    rect(350, 466, 10, 250);
    //South Vertical White
    fill(255, 255, 255);
    rect(424, 476, 10, 240);
    //North Vertical Yellow
    fill(255, 204, 0);
    rect(406, 0, 10, 233);
    //North Vertical White
    fill(255, 255, 255);
    rect(334, 0, 10, 223);
    //East Horizontal Yellow
    fill(255, 204, 0);
    rect(500, 370, 300, 10);
    //East Horizontal White
    fill(255, 255, 255);
    rect(510, 295, 300, 10);
    //West Horizontal Yellow
    fill(255, 204, 0);
    rect(0, 317, 266, 10);
    //West Horizontal White
    fill(255, 255, 255);
    rect(0, 388, 256, 10);
 }
