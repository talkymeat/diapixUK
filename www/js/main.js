function updateWindow(prev, next){
  $("#" + prev).hide();
  $("#" + next).show();
}
function showResume(){
  $("#pauseButton").hide();
  $("#resumeButton").show();
}
function showPause(){
  $("#resumeButton").hide();
  $("#pauseButton").show();
}
function updateTextInput(val) {
  if(val == 1)
  	document.getElementById('timevalue').innerHTML = val + " minute ";
  else
  	document.getElementById('timevalue').innerHTML = val + " minutes";
}

$(function() {
    $("#picture")
        .change(function() {
            var value = this.value +'A.jpg';
            var src = $("img").attr("src").replace(value, ".jpg");
            $("img").attr("src", value);
        });
});

var foundDiff, numDiff, circleRadius, totalTaps, timeLog, totalDiff;

function canv() {
  document.getElementById("imgCanvas").width = document.getElementById("imgCanvas").offsetWidth;
  document.getElementById("imgCanvas").height = document.getElementById("imgCanvas").offsetHeight;
  numDiff = 0;
  foundDiff = [];
  var i;
  for(i=1; i<=12; i++)
    foundDiff[i] = new Object;
  totalTaps = 0;
  timeLog = [];
  totalDiff = 0;
  circleRadius = document.getElementById("imgCanvas").height / 20;
}

function handleEvent(e) {
	if(paused)
		return;

  var canvas = document.getElementById("imgCanvas");
  var context = canvas.getContext("2d");
  var pos = getMousePos(canvas, e);

  totalTaps++;
  timeLog[totalTaps] = new Object;
  timeLog[totalTaps].time = document.getElementById("timer").innerHTML;

  var i;
  for(i=1; i<=numDiff; i++)
    if(dist(foundDiff[i].pos, pos) <= circleRadius){
      timeLog[totalTaps].action = "difference cancelled";
      timeLog[totalTaps].difference = foundDiff[i];
      removeDifference(i);
      draw(context, canvas);
      console.log(timeLog[totalTaps]);
      return;
    }

  if(numDiff == 12){
    alert("You have already spotted 12 differences!");
    timeLog[totalTaps].action = "exceeded 12 differences";
    timeLog[totalTaps].difference = new Object;
    timeLog[totalTaps].difference.pos = pos;
    console.log(timeLog[totalTaps]);
    return;
  }

  addDifference(pos);
  draw(context, canvas);

  timeLog[totalTaps].action = "difference spotted";
  timeLog[totalTaps].difference = foundDiff[numDiff];

  console.log(timeLog[totalTaps]);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function addDifference(pos) {
  totalDiff++;
  numDiff++;
  foundDiff[numDiff].no = totalDiff;
  foundDiff[numDiff].pos = pos;
}

function removeDifference(index){
  var i;
  for(i=index; i<numDiff; i++){
  	foundDiff[i].no = foundDiff[i+1].no;
  	foundDiff[i].pos.x = foundDiff[i+1].pos.x;
  	foundDiff[i].pos.y = foundDiff[i+1].pos.y;
  }
  numDiff--;
}

function dist(a, b){
  return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

function draw(context, canvas){
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "#00FF00";
  context.lineWidth = 7;
  for(i=1; i<=numDiff; i++){
    context.beginPath();
    context.arc(foundDiff[i].pos.x, foundDiff[i].pos.y, circleRadius, 0, 2*Math.PI);
    context.stroke();
  }
}

function addToDo(subjectCode,age,gender,record,time,timer,pictureChoice,condition) {
  var todo = {
    _id: new Date().toISOString(),
    subjectNumber: subjectCode,
    age: age,
    gender:gender,
    recording:record,
    countdown:time,
    timerONOFF:timer,
    picture: pictureChoice,
    condition: condition
    //completed: false
  };
  db.put(todo, function callback(err, result) {
    if (!err) {
      console.log('Successfully created a new Experiment!');
    }
  });
}

function recordAudio() {
    var src = "myrecording.mp3";
    var mediaRec = new Media(src,
        // success callback
        function() {
            console.log("recordAudio():Audio Success");
        },

        // error callback
        function(err) {
            console.log("recordAudio():Audio Error: "+ err.code);
        });
    // mediaRec.play();
    // Record audio
    mediaRec.startRecord();
}
// Timer

var time;
var seconds, minutes;
var paused = true;

function startTimer(){
    if(document.getElementById('showTimer').checked)
        $("#timer").show();
    else
        $("#timer").hide();

  minutes = parseInt(document.getElementById('timevalue').innerHTML);
  seconds = 0;

  document.getElementById('timer').innerHTML = "";
  if(minutes < 10)
    document.getElementById('timer').innerHTML += "0";
  document.getElementById('timer').innerHTML += minutes.toString() + ":00";

  paused = false;
  time = setInterval(updateTimer, 1000);
}

function pauseTimer(){
	paused = true;
    clearInterval(time);
}

function resumeTimer() {
	paused = false;
    clearInterval(time);
    time = setInterval(updateTimer, 1000);
}

function updateTimer(){
    if(document.getElementById('timer').innerHTML === "00:00"){
    	paused = true;
        clearInterval(time);
        alert("Time is up!");
        return;
    }

    seconds--;
    if(seconds<0){
        minutes--;
        seconds+=60;
    }
    document.getElementById('timer').innerHTML = ""

    if(minutes < 10)
        document.getElementById('timer').innerHTML += "0";
    document.getElementById('timer').innerHTML += minutes.toString() + ":";
    if(seconds < 10)
        document.getElementById('timer').innerHTML += "0"
    document.getElementById('timer').innerHTML += seconds.toString();

}
