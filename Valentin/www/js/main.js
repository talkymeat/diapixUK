function updateWindow(prev, next){
  $("#" + prev).hide();
  $("#" + next).show();
}
function updateTextInput(val) {
  document.getElementById('timevalue').valueint=val; 
  document.getElementById('timevalue').value=val + " minutes"; 
}

function createCanvas() {
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.lineWidth=5;
    var img=document.getElementById("Beach1A");
    ctx.drawImage(img,100,100);
};

var canvas = document.getElementById("imgCanvas");
var context = canvas.getContext("2d");

function createImageOnCanvas(imageId) {
    canvas.style.display = "block";
    document.getElementById("images").style.overflowY = "hidden";
    var img = new Image(300, 300);
    img.src = document.getElementById(imageId).src;
    context.drawImage(img, (0), (0)); //onload....
}

function draw(e) {
    var pos = getMousePos(canvas, e);
    posx = pos.x;
    posy = pos.y;
    context.strokeStyle = "#00FF00";
    context.beginPath();
    context.arc(posx, posy, 20, 0, 2*Math.PI);
    context.stroke();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

window.draw = draw;


/*$(document).ready(function() {
  alert("aa");
  $window.StatusBar.hide();
});*/

/*var app = angular.module('ionicApp', ['ionic', 'ngCordova'])

app.run(function($cordovaStatusbar) {
  alert("aa");

  $cordovaStatusbar.overlaysWebView(true)

  $cordovaStatusBar.style(1) //Light
  $cordovaStatusBar.style(2) //Black, transulcent
  $cordovaStatusBar.style(3) //Black, opaque
});*/