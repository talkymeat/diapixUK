function updateWindow(prev, next){
  if(correctData(prev, next)) {
    $("#" + prev).hide();
    $("#" + next).show();
  }
}
function correctData(screen, next){
  if(screen === "secondScreen" && next === "thirdScreen"){
    if(document.getElementById("subjCode").value === "")
    {
      document.getElementById('err').innerHTML = "Please insert your subject code";
      showAlertPopup();
      return false;
    }
    if(document.getElementById("gender").value === "0")
    {
      document.getElementById('err').innerHTML = "Please select your gender";
      showAlertPopup();
      return false;
    }
  }
  if(screen === "thirdScreen" && next === "fourthScreen"){
    if(document.getElementById("picture").value === "empty")
    {
      document.getElementById('err').innerHTML = "Please select a picture";
      showAlertPopup();
      return false;
    }
  }
  if(screen === "fifthScreen" && next === "fourthScreen" && popupCloseEvent != -1){
    document.getElementById('err').innerHTML = "Are you sure you want to exit the game?\n Your progress will be lost.";
    showConfirmPopup();
    popupCloseEvent = -1;
    return false;
  }
  return true;
}

function showAlertPopup() {
  $("#" + "closeModal").show();
  $("#" + "popup").show();
  $("#" + "confirmButtons").hide();
}
function showConfirmPopup(){
  $("#" + "closeModal").hide();
  $("#" + "popup").show();
  $("#" + "confirmButtons").show();
}

function confirmPopup(){
  if(popupCloseEvent === -1)
  {
    updateWindow("fifthSCreen", "fourthScreen");
    pauseTimer();
  }
  if(popupCloseEvent > 0)
  {
    removeDifference(popupCloseEvent);
    popupCloseEvent = 0;
    draw();
  }
  popupCloseEvent = 0;
  closeModal();
}

function genderColor(){
  if(document.getElementById("gender").value === "0") 
    document.getElementById("gender").style.color = "#aaaaaa";
  else 
    document.getElementById("gender").style.color = "#111111";
}

function showResume(){
  $("#pauseButton").hide();
  $("#resumeButton").show();
  document.getElementById("img").classList.add("blur-filter");
  document.getElementById("imgCanvas").classList.add("blur-filter");
}
function showPause(){
  $("#resumeButton").hide();
  $("#pauseButton").show();
  document.getElementById("img").classList.remove("blur-filter");
  document.getElementById("imgCanvas").classList.remove("blur-filter");
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
  circleRadius = document.getElementById("imgCanvas").height / 18;
}

var popupCloseEvent=0;

function handleEvent(e) {
	if(paused)
		return;

  var canvas = document.getElementById("imgCanvas");
  var pos = getMousePos(canvas, e);

  totalTaps++;
  timeLog[totalTaps] = new Object;
  timeLog[totalTaps].time = document.getElementById("timer").innerHTML;

  var i;
  for(i=1; i<=numDiff; i++)
    if(dist(foundDiff[i].pos, pos) <= circleRadius){
      timeLog[totalTaps].action = "difference cancelled";
      timeLog[totalTaps].difference = foundDiff[i];
      confirmRemoval(i);
      draw();
      console.log(timeLog[totalTaps]);
      return;
    }

  if(numDiff == 12){
    document.getElementById('err').innerHTML = "You have already spotted 12 differences!";
    showAlertPopup();
    timeLog[totalTaps].action = "exceeded 12 differences";
    timeLog[totalTaps].difference = new Object;
    timeLog[totalTaps].difference.pos = pos;
    console.log(timeLog[totalTaps]);
    return;
  }

  addDifference(pos);
  draw();

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

function confirmRemoval(index) {
  if(foundDiff[index].pos.x > document.getElementById("imgCanvas").width/2)
    document.getElementById('popupContainer').style.left = (foundDiff[index].pos.x - circleRadius - 10 - $('#popupContainer').width()).toString() + "px";
  else
    document.getElementById('popupContainer').style.left = (foundDiff[index].pos.x + circleRadius + 10).toString() + "px";
  document.getElementById('popupContainer').style.top = (foundDiff[index].pos.y - $('#popupContainer').height()/2).toString() + "px";
  
  if(foundDiff[index].pos.y - $('#popupContainer').height()/2 < 10)
    document.getElementById('popupContainer').style.top = "10px";
  if(foundDiff[index].pos.y + $('#popupContainer').height()/2 > $('#imgCanvas').height() - 10)
    document.getElementById('popupContainer').style.top = ($('#imgCanvas').height() - $('#popupContainer').height() - 20).toString() + "px";
  popupCloseEvent = index;
  $("#popup2").show();
}

function dist(a, b){
  return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

function draw(){
  var canvas = document.getElementById("imgCanvas");
  var context = canvas.getContext("2d");

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineWidth = 7;
  for(i=1; i<=numDiff; i++){
    if(i == popupCloseEvent)
      context.strokeStyle = "#FF8000"
    else
      context.strokeStyle = "#00FF00";
    context.beginPath();
    context.arc(foundDiff[i].pos.x, foundDiff[i].pos.y, circleRadius, 0, 2*Math.PI);
    context.lineWidth = 4;
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
        document.getElementById('err').innerHTML = "Time is up!";
        showAlertPopup();
        //alert("Time is up!");
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







// Get the <span> element that closes the modal

// When the user clicks the button, open the modal 
// When the user clicks on <span> (x), close the modal
function closeModal() {
  
  document.getElementById('popup').style.display = "none";
  $("#" + "popup").hide();
  $("#" + "popup2").hide();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  var popup = document.getElementById('popup');
  if (event.target == popup) {
      popup.style.display = "none";
      return;
  }
  var popup2 = document.getElementById('popup2')
  if (event.target == popup2) {
      popup2.style.display = "none";
      popupCloseEvent = 0; 
      draw();
      return;
  }
}