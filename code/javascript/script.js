window.onload = function(){
    document.getElementById('stopButton').onclick = stop;
    document.getElementById('goButton').onclick= go;

    function stop(){
        illuminateYellow();
        setTimeout(illuminateRed,5000);
    }

    function go(){
        if(document.getElementById('stopLight-yn').style.backgroundColor == "red"){
            illuminateYellow2();
            setTimeout(illuminateGreen,5000)
        }
    }

    function illuminateRed() {
    clearLights();
    document.getElementById('stopLight-yn').style.backgroundColor = "red";
    document.getElementById('stopLight-ys').style.backgroundColor = "red";
    document.getElementById('goLight-xe').style.backgroundColor = "green";
    document.getElementById('goLight-xw').style.backgroundColor = "green";
    }

    function illuminateYellow() {
    clearLights();
    document.getElementById('slowLight-yn').style.backgroundColor = "yellow";
    document.getElementById('slowLight-ys').style.backgroundColor = "yellow";

    document.getElementById('stopLight-xe').style.backgroundColor = "red";
    document.getElementById('stopLight-xw').style.backgroundColor = "red";
    }
        function illuminateYellow2() {
    clearLights();
    document.getElementById('slowLight-xe').style.backgroundColor = "yellow";
    document.getElementById('slowLight-xw').style.backgroundColor = "yellow";

    document.getElementById('stopLight-yn').style.backgroundColor = "red";
    document.getElementById('stopLight-ys').style.backgroundColor = "red";
    }

    function illuminateGreen() {
    clearLights();
    document.getElementById('goLight-yn').style.backgroundColor = "green";
    document.getElementById('goLight-ys').style.backgroundColor = "green";

    document.getElementById('stopLight-xe').style.backgroundColor = "red";
    document.getElementById('stopLight-xw').style.backgroundColor = "red";
    }

    function clearLights() {
    document.getElementById('stopLight-yn').style.backgroundColor = "black";
    document.getElementById('slowLight-yn').style.backgroundColor = "black";
    document.getElementById('goLight-yn').style.backgroundColor = "black";

    document.getElementById('stopLight-ys').style.backgroundColor = "black";
    document.getElementById('slowLight-ys').style.backgroundColor = "black";
    document.getElementById('goLight-ys').style.backgroundColor = "black";

    document.getElementById('stopLight-xe').style.backgroundColor = "black";
    document.getElementById('slowLight-xe').style.backgroundColor = "black";
    document.getElementById('goLight-xe').style.backgroundColor = "black";

    document.getElementById('stopLight-xw').style.backgroundColor = "black";
    document.getElementById('slowLight-xw').style.backgroundColor = "black";
    document.getElementById('goLight-xw').style.backgroundColor = "black";
    }
}