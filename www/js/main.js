// $(function() {
//     FastClick.attach(document.body);
// });

window.scrollTo(0,1);

$(document).ready(function(){
    $(".chooseRoom").hide();
})
function sortPairing() {
    if(document.getElementById('host').checked){
        document.getElementById('host').value="on";
        $(".option1").show();
        $(".chooseRoom").hide();
    } else {
        document.getElementById('host').value="off";
        // console.log("works");
        $(".option1").hide();
        socket.emit('get rooms');
        $(".chooseRoom").show();
    }
}


function updateWindow(prev, next){
  if(correctData(prev, next)) {
    $("#" + prev).hide();
    $("#" + next).show();
  }
}

function correctData(screen, next){
    if(screen === "secondScreen" && next === "thirdScreen"){
      if(document.getElementById('showTimer').checked){
          document.getElementById('showTimer').value="on";
      } else {
          document.getElementById('showTimer').value="off";
      }
      if(document.getElementById('host').checked){
        if(document.getElementById('subjCode1').value == ""){
          document.getElementById('err').innerHTML = "Please insert the first subject code";
          showAlertPopup();
          return false;
        }
        if(document.getElementById('subjCode2').value == ""){
          document.getElementById('err').innerHTML = "Please insert the second subject code";
          showAlertPopup();
          return false;
        }
        if(document.getElementById('picture').value == "empty"){
          document.getElementById('err').innerHTML = "Please select a picture";
          showAlertPopup();
          return false;
        }
        keep();
      }
    }
    if(screen === "thirdScreen" && next === "fourthScreen"){
        if(document.getElementById("subjCode").value === "0"){
          document.getElementById('err').innerHTML = "Please select your subject code";
          showAlertPopup();
          return false;
        }
        if(document.getElementById("gender").value === "0"){
          document.getElementById('err').innerHTML = "Please select your gender";
          showAlertPopup();
          return false;
        }
    }
    if(screen === "sixthScreen" && next === "fifthScreen" && popupCloseEvent != -1){
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

function confirmFinish() {
  popupCloseEvent = -2;
  if(!timeIsUp){
    document.getElementById('err').innerHTML = "Are you sure you want to finish the game?\n You won't be able to continue after you finish.";
    showConfirmPopup();
  }
  else
    confirmPopup();
}

function confirmPopup(){
  if(popupCloseEvent == -2)
  {
    /*var canvas = document.getElementById("imgCanvas");
    var str="correctDiffs[\"img/\"] = [{x: -1, y: -1}, ";
    var i;
    for(i=1;i<=12;i++)
      str += "{x: " + ((foundDiff[i].pos.x/canvas.width).toFixed(3)).toString() + ", y: " + ((foundDiff[i].pos.y/canvas.height).toFixed(3)).toString() + "}, ";
    str += "];";
    console.log(str);*/
    finalCheck();
    pauseTimer();
    $("#" + "timerDiv").hide();
    $("#" + "resultDiv").show();
    $("#" + "finishButton").hide();
    $("#" + "submitButton").show();
  }
  if(popupCloseEvent == -1)
  {
    $("#" + "timerDiv").show();
    $("#" + "resultDiv").hide();
    $("#" + "finishButton").show();
    $("#" + "submitButton").hide();
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

function subColor(){
  if(document.getElementById("subjCode").value === "0")
    document.getElementById("subjCode").style.color = "#aaaaaa";
  else
    document.getElementById("subjCode").style.color = "#111111";
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

function updateSlideText(val) {
  if(val == 1)
  	document.getElementById('timevalue').innerHTML = val + " minute ";
  else
  	document.getElementById('timevalue').innerHTML = val + " minutes";
}

// $(function() {
//     $("#picture")
//         .change(function() {
//             if(document.getElementById('host').value === "on"){
//                 var value = this.value +'A.jpg';
//             } else {
//                 var value = this.value + 'B.jpg';
//             }
//             var src = $("img").attr("src").replace(value, ".jpg");
//             $("img").attr("src", value);
//         });
// });

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
      timeLog[totalTaps].action = "attempted to cancel difference";
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
    //console.log(timeLog[totalTaps]);
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

  for(i=1; i<=numDiff; i++){
    if(i == popupCloseEvent)
      context.strokeStyle = "#FF8000";
    else
      context.strokeStyle = "#00FF00";
    context.beginPath();
    context.arc(foundDiff[i].pos.x, foundDiff[i].pos.y, circleRadius, 0, 2*Math.PI);
    context.lineWidth = 4;
    context.stroke();
  }
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
  timeIsUp = false;
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

var timeIsUp;

function updateTimer(){
    if(document.getElementById('timer').innerHTML === "00:00"){
      timeIsUp = true;
    	paused = true;
      clearInterval(time);
      popupCloseEvent = 0;
      closeModal();
      draw();
      document.getElementById('err').innerHTML = "Time is up!";
      showAlertPopup();
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

function closeModal() {
  $("#" + "popup").hide();
  $("#" + "popup2").hide();
}

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


function finalCheck(){
  var correctDiffs = [], i, j;

  correctDiffs["img/beach1"] = [{x: -1, y: -1}, {x: 0.926, y: 0.639}, {x: 0.925, y: 0.420}, {x: 0.795, y: 0.414}, {x: 0.698, y: 0.328}, {x: 0.563, y: 0.593}, {x: 0.583, y: 0.868}, {x: 0.101, y: 0.846}, {x: 0.113, y: 0.498}, {x: 0.049, y: 0.358}, {x: 0.126, y: 0.132}, {x: 0.223, y: 0.208}, {x: 0.476, y: 0.437}];
  correctDiffs["img/beach2"] = [{x: -1, y: -1}, {x: 0.908, y: 0.433}, {x: 0.809, y: 0.193}, {x: 0.936, y: 0.214}, {x: 0.750, y: 0.171}, {x: 0.893, y: 0.658}, {x: 0.389, y: 0.095}, {x: 0.136, y: 0.182}, {x: 0.065, y: 0.214}, {x: 0.180, y: 0.353}, {x: 0.047, y: 0.823}, {x: 0.417, y: 0.710}, {x: 0.910, y: 0.862}];
  correctDiffs["img/beach3"] = [{x: -1, y: -1}, {x: 0.972, y: 0.541}, {x: 0.931, y: 0.345}, {x: 0.821, y: 0.424}, {x: 0.375, y: 0.499}, {x: 0.235, y: 0.289}, {x: 0.268, y: 0.202}, {x: 0.134, y: 0.292}, {x: 0.166, y: 0.621}, {x: 0.180, y: 0.922}, {x: 0.667, y: 0.565}, {x: 0.844, y: 0.115}, {x: 0.765, y: 0.685}];
  correctDiffs["img/beach4"] = [{x: -1, y: -1}, {x: 0.969, y: 0.132}, {x: 0.839, y: 0.201}, {x: 0.572, y: 0.127}, {x: 0.714, y: 0.338}, {x: 0.887, y: 0.642}, {x: 0.806, y: 0.805}, {x: 0.646, y: 0.635}, {x: 0.330, y: 0.249}, {x: 0.217, y: 0.464}, {x: 0.363, y: 0.553}, {x: 0.269, y: 0.713}, {x: 0.147, y: 0.803}];
  correctDiffs["img/farm1"] = [{x: -1, y: -1}, {x: 0.643, y: 0.323}, {x: 0.624, y: 0.429}, {x: 0.969, y: 0.517}, {x: 0.715, y: 0.658}, {x: 0.943, y: 0.710}, {x: 0.232, y: 0.635}, {x: 0.153, y: 0.369}, {x: 0.056, y: 0.260}, {x: 0.205, y: 0.239}, {x: 0.250, y: 0.922}, {x: 0.266, y: 0.510}, {x: 0.723, y: 0.861}];
  correctDiffs["img/farm2"] = [{x: -1, y: -1}, {x: 0.887, y: 0.360}, {x: 0.627, y: 0.274}, {x: 0.803, y: 0.464}, {x: 0.193, y: 0.125}, {x: 0.426, y: 0.412}, {x: 0.901, y: 0.735}, {x: 0.829, y: 0.740}, {x: 0.741, y: 0.903}, {x: 0.330, y: 0.745}, {x: 0.211, y: 0.849}, {x: 0.146, y: 0.596}, {x: 0.455, y: 0.165}];
  correctDiffs["img/farm3"] = [{x: -1, y: -1}, {x: 0.392, y: 0.570}, {x: 0.146, y: 0.535}, {x: 0.384, y: 0.753}, {x: 0.609, y: 0.769}, {x: 0.167, y: 0.202}, {x: 0.231, y: 0.123}, {x: 0.236, y: 0.378}, {x: 0.925, y: 0.282}, {x: 0.854, y: 0.162}, {x: 0.898, y: 0.727}, {x: 0.753, y: 0.430}, {x: 0.792, y: 0.565}];
  correctDiffs["img/farm4"] = [{x: -1, y: -1}, {x: 0.968, y: 0.147}, {x: 0.847, y: 0.312}, {x: 0.715, y: 0.258}, {x: 0.962, y: 0.593}, {x: 0.685, y: 0.555}, {x: 0.941, y: 0.856}, {x: 0.421, y: 0.861}, {x: 0.243, y: 0.295}, {x: 0.472, y: 0.277}, {x: 0.042, y: 0.811}, {x: 0.339, y: 0.404}, {x: 0.416, y: 0.553}];
  correctDiffs["img/park"] = [{x: -1, y: -1}, {x: 0.616, y: 0.088}, {x: 0.735, y: 0.405}, {x: 0.063, y: 0.253}, {x: 0.203, y: 0.076}, {x: 0.325, y: 0.885}, {x: 0.507, y: 0.873}, {x: 0.517, y: 0.739}, {x: 0.907, y: 0.864}, {x: 0.842, y: 0.600}, {x: 0.455, y: 0.252}, {x: 0.623, y: 0.385}, {x: 0.198, y: 0.421}];
  correctDiffs["img/street1"] = [{x: -1, y: -1}, {x: 0.802, y: 0.247}, {x: 0.895, y: 0.532}, {x: 0.737, y: 0.775}, {x: 0.577, y: 0.906}, {x: 0.070, y: 0.774}, {x: 0.062, y: 0.418}, {x: 0.346, y: 0.342}, {x: 0.726, y: 0.270}, {x: 0.194, y: 0.196}, {x: 0.307, y: 0.207}, {x: 0.438, y: 0.189}, {x: 0.794, y: 0.085}];
  correctDiffs["img/street2"] = [{x: -1, y: -1}, {x: 0.859, y: 0.338}, {x: 0.937, y: 0.428}, {x: 0.892, y: 0.553}, {x: 0.678, y: 0.057}, {x: 0.595, y: 0.249}, {x: 0.465, y: 0.135}, {x: 0.524, y: 0.840}, {x: 0.310, y: 0.685}, {x: 0.114, y: 0.941}, {x: 0.104, y: 0.246}, {x: 0.249, y: 0.086}, {x: 0.575, y: 0.059}];
  correctDiffs["img/street3"] = [{x: -1, y: -1}, {x: 0.965, y: 0.334}, {x: 0.931, y: 0.645}, {x: 0.616, y: 0.945}, {x: 0.735, y: 0.418}, {x: 0.670, y: 0.200}, {x: 0.852, y: 0.428}, {x: 0.353, y: 0.685}, {x: 0.400, y: 0.393}, {x: 0.230, y: 0.358}, {x: 0.205, y: 0.190}, {x: 0.220, y: 0.658}, {x: 0.061, y: 0.688}];
  correctDiffs["img/street4"] = [{x: -1, y: -1}, {x: 0.439, y: 0.325}, {x: 0.400, y: 0.498}, {x: 0.640, y: 0.330}, {x: 0.195, y: 0.319}, {x: 0.091, y: 0.702}, {x: 0.093, y: 0.948}, {x: 0.527, y: 0.907}, {x: 0.673, y: 0.874}, {x: 0.797, y: 0.966}, {x: 0.942, y: 0.660}, {x: 0.931, y: 0.319}, {x: 0.766, y: 0.145}];

  var canvas = document.getElementById("imgCanvas");
  var context = canvas.getContext("2d");
  var img = document.getElementById("picture").value;
  var ok;
  var spottedDiffs = 0;

  for(i=1;i<=12;i++){
    correctDiffs[img][i].x = correctDiffs[img][i].x*canvas.width;
    correctDiffs[img][i].y *= canvas.height;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "#00FF00";

  for(i=1; i<=numDiff; i++){
    ok = false;
    distmin = 999999;
    for(j=1;j<=12;j++)
      if(dist(foundDiff[i].pos, correctDiffs[img][j]) <= circleRadius + 10)
      {
        spottedDiffs++;
        ok = true;
        correctDiffs[img][j].x = -10000;
        console.log("found:");
        console.log(foundDiff[i].pos);
        break;
      }
    /*if(ok)
      context.strokeStyle = "#22B14C";*/
    context.strokeStyle = "#00FF00";
    if(ok)
      context.strokeStyle = "#046402";
    context.beginPath();
    context.arc(foundDiff[i].pos.x, foundDiff[i].pos.y, circleRadius, 0, 2*Math.PI);
    context.lineWidth = 4;
    context.stroke();
    if(!ok){
      context.strokeStyle = "#ED1C24";
      context.beginPath();
      context.moveTo(foundDiff[i].pos.x - circleRadius, foundDiff[i].pos.y - circleRadius);
      context.lineTo(foundDiff[i].pos.x + circleRadius, foundDiff[i].pos.y + circleRadius);
      context.lineWidth = 2;
      context.stroke();
      context.moveTo(foundDiff[i].pos.x + circleRadius, foundDiff[i].pos.y - circleRadius);
      context.lineTo(foundDiff[i].pos.x - circleRadius, foundDiff[i].pos.y + circleRadius);
      context.lineWidth = 2;
      context.stroke();
    }
  }

  context.strokeStyle = "#F24044";

  for(i=1; i<=12; i++){
    if(correctDiffs[img][i].x == -10000)
      continue;
    context.beginPath();
    context.arc(correctDiffs[img][i].x, correctDiffs[img][i].y, circleRadius, 0, 2*Math.PI);
    context.lineWidth = 4;
    context.stroke();
  }

  if(spottedDiffs == 1)
    document.getElementById("result").innerHTML = "You got " + spottedDiffs.toString() + " difference right!";
  else
    document.getElementById("result").innerHTML = "You got " + spottedDiffs.toString() + " differences right!";
}
